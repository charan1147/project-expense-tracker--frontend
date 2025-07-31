import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container dashboard">
      <h1>Welcome, {user?.username || "User"}!</h1>
      <p>This is your expense tracker dashboard. Choose an option below:</p>
      <div className="container1">
        <Link to="/personal">
          <button className="btn btn-primary">Manage Personal Expenses</button>
        </Link>
      </div>
      <div className="container2">
        <Link to="/groups">
          <button className="btn btn-primary">Manage Groups</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
