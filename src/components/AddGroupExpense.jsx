import { useState } from "react";

function AddGroupExpense({ groupId, onAdd }) {
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const categories = ["Food", "Travel", "Bills", "Entertainment", "Other"];

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.amount || !expense.category || !expense.date) {
      alert("Amount, category, and date are required!");
      return;
    }
    onAdd?.({ ...expense, groupId });
    setExpense({ amount: "", category: "", date: "", description: "" });
  };

  return (
    <div className="container mt-4 p-4 shadow rounded bg-light">
      <h4 className="text-center text-primary mb-3">Add Group Expense</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="number"
            name="amount"
            className="form-control"
            placeholder="Amount"
            value={expense.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <select
            name="category"
            className="form-select"
            value={expense.category}
            onChange={handleChange}
            required
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
          <input
            type="date"
            name="date"
            className="form-control"
            value={expense.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Description (optional)"
            value={expense.description}
            onChange={handleChange}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success w-100">
            Add Expense to Group
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddGroupExpense;
