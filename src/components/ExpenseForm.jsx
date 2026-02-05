import { useState, useEffect } from "react";
import { addPersonalExpense, updateExpense } from "../api/api";

const ExpenseForm = ({ onComplete, initialData = {} }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  const categories = ["Food", "Travel", "Bills", "Entertainment", "Other"];

  useEffect(() => {
    if (initialData._id) {
      setExpense({
        category: initialData.category || "",
        amount: initialData.amount || "",
        description: initialData.description || "",
        date: initialData.date ? initialData.date.split("T")[0] : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(expense).some((val) => !val && val !== "")) {
      alert("All required fields must be filled!");
      return;
    }

    try {
      if (initialData._id) {
        await updateExpense(initialData._id, expense);
        alert("Expense updated successfully");
      } else {
        await addPersonalExpense(expense); 
        alert("Expense added successfully");
        setExpense({ category: "", amount: "", description: "", date: "" });
      }
      onComplete?.();
    } catch (error) {
      alert(
        `Failed to ${initialData._id ? "update" : "add"} expense: ${
          error.response?.data?.message || error.message
        }`,
      );
    }
  }


  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h4 className="text-center text-primary mb-3">
          {initialData._id ? "Edit Expense" : "Add an Expense"}
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={expense.amount}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={expense.description}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className={`btn ${
                initialData._id ? "btn-warning" : "btn-primary"
              } w-100`}
            >
              {initialData._id ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};;

export default ExpenseForm;
