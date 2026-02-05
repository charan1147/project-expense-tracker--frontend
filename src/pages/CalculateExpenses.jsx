import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGroupDetails, calculateSplit } from "../api/api";

const CalculateExpenses = () => {
  const { groupId } = useParams();

  const [groupName, setGroupName] = useState("Group");
  const [split, setSplit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const res = await getGroupDetails(groupId);
        setGroupName(res.data.data.name);
      } catch {
        setError("Failed to load group details");
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  const handleCalculateSplit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await calculateSplit(groupId);
      setSplit(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to calculate expenses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculate-expenses my-4">
      <h2>Calculate Expenses for {groupName}</h2>

      <button
        className="btn btn-primary"
        onClick={handleCalculateSplit}
        disabled={loading}
      >
        🧮 {loading ? "Calculating..." : "Calculate Expenses"}
      </button>

      {error && <p className="alert alert-danger mt-3">{error}</p>}

      {split.length > 0 && (
        <div className="split-results mt-4">
          <h3>Split Results</h3>

          {split.map(
            ({ expenseId, description, payer, totalAmount, debts }) => (
              <div key={expenseId} className="card mb-3">
                <div className="card-body">
                  <p>
                    <strong>{description}</strong> — Paid by {payer}: $
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
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default CalculateExpenses;
