import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import PersonalExpenses from "./pages/PersonalExpenses";
import GroupExpenses from "./pages/GroupExpenses";
import CalculateExpenses from "./pages/CalculateExpenses";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="App">
        {user && <Navbar />}
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={user ? <Dashboard /> : <Navigate to="/auth" />}
            />
            <Route
              path="/auth"
              element={!user ? <AuthPage /> : <Navigate to="/" />}
            />
            <Route
              path="/personal"
              element={user ? <PersonalExpenses /> : <Navigate to="/auth" />}
            />
            <Route
              path="/groups"
              element={user ? <GroupExpenses /> : <Navigate to="/auth" />}
            />
            <Route
              path="/groups/:groupId/calculate"
              element={user ? <CalculateExpenses /> : <Navigate to="/auth" />}
            />
            <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
