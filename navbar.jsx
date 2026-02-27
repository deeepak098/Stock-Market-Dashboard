import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Stock Dashboard
        </Link>
      </div>

      <div className="nav-links">
        {user && <Link to="/user">My Transactions</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin Panel</Link>}

        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              Welcome {user.name}
            </span>
            <button className="logout-btn" onClick={logoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;