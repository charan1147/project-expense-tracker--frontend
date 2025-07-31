import { useState, useEffect } from "react";
import {
  getGroups,
  createGroup,
  addGroupExpense,
  getGroupExpenses,
  deleteGroup,
} from "../api/api";
import GroupForm from "../components/GroupForm";
import AddGroupExpense from "../components/AddGroupExpense";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function GroupExpenses() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupExpenses, setGroupExpenses] = useState([]);
  const [selectedGroupDetails, setSelectedGroupDetails] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchGroups();
  }, [user]);

  const fetchGroups = async () => {
    try {
      const res = await getGroups();
      setGroups(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateGroup = async (data) => {
    try {
      await createGroup(data);
      fetchGroups();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create group");
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await deleteGroup(groupId);
        fetchGroups();
        if (selectedGroup === groupId) {
          setSelectedGroup(null);
          setSelectedGroupDetails(null);
        }
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete group");
      }
    }
  };

  const fetchGroupExpenses = async (groupId) => {
    try {
      const res = await getGroupExpenses(groupId);
      const group = groups.find((g) => g._id === groupId);
      setSelectedGroupDetails(group);
      setGroupExpenses(res.data.data);
      setSelectedGroup(groupId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddGroupExpense = async (data) => {
    try {
      await addGroupExpense(selectedGroup, data);
      fetchGroupExpenses(selectedGroup);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add group expense");
    }
  };

  return (
    <div className="my-4">
      <h2>Groups</h2>
      <GroupForm onSubmit={handleCreateGroup} />
      <h3>Your Groups</h3>
      <ul className="list-group">
        {groups.map((group) => (
          <li key={group._id} className="list-group-item">
            {group.name} - {group.description || "No description"}
            <button
              onClick={() => fetchGroupExpenses(group._id)}
              className="btn btn-primary btn-sm ms-2"
            >
              View Expenses
            </button>
            <button
              onClick={() => handleDeleteGroup(group._id)}
              className="btn btn-danger btn-sm ms-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {selectedGroup && selectedGroupDetails && (
        <>
          <h3>Expenses for {selectedGroupDetails.name}</h3>
          <div>
            <h4>Group Members:</h4>
            <ul>
              {[...new Set(selectedGroupDetails.members.map((m) => m._id))].map(
                (uniqueId) => {
                  const member = selectedGroupDetails.members.find(
                    (m) => m._id === uniqueId
                  );
                  return <li key={uniqueId}>{member.username}</li>;
                }
              )}
            </ul>
          </div>
          <AddGroupExpense
            groupId={selectedGroup}
            onAdd={handleAddGroupExpense}
          />
          <ul className="list-group">
            {groupExpenses.map((expense) => (
              <li key={expense._id} className="list-group-item">
                {expense.amount} - {expense.category} -{" "}
                {expense.date.split("T")[0]} -
                {expense.description || "No description"} -
                <strong>
                  Paid by: {expense.userId?.username || "Unknown"}
                </strong>
              </li>
            ))}
          </ul>
          <Link
            to={`/groups/${selectedGroup}/calculate`}
            className="btn btn-primary mt-2"
          >
            <span role="img" aria-label="calculator">
              🧮
            </span>{" "}
            Calculate Expenses
          </Link>
        </>
      )}
    </div>
  );
}

export default GroupExpenses;
