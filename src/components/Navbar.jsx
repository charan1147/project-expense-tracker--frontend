import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Expense Tracker
        </Link>
        <div className="navbar-nav">
          {user ? (
            <>
              <Link className="nav-link" to="/personal">
                Personal Expenses
              </Link>
              <Link className="nav-link" to="/groups">
                Groups
              </Link>
              <button className="btn btn-link nav-link" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/auth">
                Login/Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
