import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getGroupDetails, calculateSplit } from "../api/api";

const CalculateExpenses = () => {
  const { groupId } = useParams();
  const [groupName, setGroupName] = useState("");
  const [split, setSplit] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (groupId?.length === 24) {
      getGroupDetails(groupId)
        .then((res) => setGroupName(res.data.data?.name || "Group"))
        .catch(() => setError("Failed to load group data"));
    } else {
      setError("Invalid group ID");
    }
  }, [groupId]);

  const handleCalculateSplit = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await calculateSplit(groupId);
      setSplit(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to calculate split");
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  return (
    <div className="calculate-expenses my-4">
      <h2>Calculate Expenses for {groupName}</h2>
      <button
        className="calculate-button btn btn-primary"
        onClick={handleCalculateSplit}
        disabled={loading}
      >
        🧮 {loading ? "Calculating..." : "Calculate Expenses"}
      </button>
      {error && <p className="error alert alert-danger">{error}</p>}
      {split.length > 0 && (
        <div className="split-results">
          <h3>Split Results:</h3>
          {split.map(
            ({ expenseId, description, payer, totalAmount, debts }, index) => (
              <div key={expenseId || index} className="expense-card card mb-3">
                <div className="card-body">
                  <p>
                    <strong>{description}</strong> - Paid by {payer}: $
                    {totalAmount.toFixed(2)}
                  </p>
                  <ul>
                    {debts.map(({ username, owes }) => (
                      <li key={username}>
                        {username} owes {payer}: ${owes.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CalculateExpenses;
