import { useState, useEffect } from "react";
import { getPersonalExpenses, deleteExpense } from "../api/api";
import ExpenseForm from "../components/ExpenseForm";

const PersonalExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await getPersonalExpenses();
      setExpenses(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = () => {
    setEditingExpense(null);
    fetchExpenses();
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        fetchExpenses();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="expenses-container my-4">
      <h2>Personal Expenses</h2>
      <ExpenseForm
        onComplete={handleComplete}
        initialData={editingExpense || {}}
      />
      {expenses.length > 0 ? (
        <ul className="expenses-list list-group">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="expense-item list-group-item d-flex justify-content-between"
            >
              <span>
                {expense.amount} - {expense.category} -{" "}
                {expense.date.split("T")[0]} -
                {expense.description || "No description"}
              </span>
              <div className="expense-actions">
                <button
                  onClick={() => handleEdit(expense)}
                  className="edit-btn btn btn-secondary btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="delete-btn btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default PersonalExpenses;
