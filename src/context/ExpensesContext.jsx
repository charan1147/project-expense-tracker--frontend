// ExpensesProvider.jsx
import { createContext, useState, useEffect, useContext } from "react";
import {
  getPersonalExpenses,
  addPersonalExpense,
  updateExpense,
  deleteExpense,
} from "../api/api";

export const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await getPersonalExpenses();
      // Adjust based on your actual backend response structure
      const expensesData = res.data.data || res.data || [];
      setExpenses(Array.isArray(expensesData) ? expensesData : []);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Now accepts the same fields as ExpenseForm
  const addExpense = async ({ category, amount, description, date }) => {
    try {
      const payload = {
        category,
        amount: Number(amount), // ensure number
        description: description || "", // optional field
        date,
      };

      const res = await addPersonalExpense(payload);
      // Assuming backend returns the created expense
      const newExpense = res.data.data || res.data;

      setExpenses((prev) => [...prev, newExpense]);
      return newExpense; // optional: useful if you want to do something after add
    } catch (err) {
      console.error("Error adding expense:", err);
      throw err; // let the caller handle/display the error
    }
  };

  const updateExpenseLocal = async (id, updatedExpense) => {
    try {
      const payload = {
        category: updatedExpense.category,
        amount: Number(updatedExpense.amount),
        description: updatedExpense.description || "",
        date: updatedExpense.date,
      };

      const res = await updateExpense(id, payload);
      const updated = res.data.data || res.data;

      setExpenses((prev) =>
        prev.map((exp) => (exp._id === id ? updated : exp)),
      );

      return updated;
    } catch (err) {
      console.error("Error updating expense:", err);
      throw err;
    }
  };

  const deleteExpenseLocal = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
      throw err;
    }
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        loading,
        fetchExpenses,
        addExpense,
        updateExpense: updateExpenseLocal,
        deleteExpense: deleteExpenseLocal,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpensesContext);
