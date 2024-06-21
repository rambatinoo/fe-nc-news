import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  const handleHomeClick = () => {
    setSearchParams({});
    if (location.pathname === "/") {
      navigate("/", { state: { reset: Date.now() } });
    } else {
      navigate("/");
    }
  };
  return (
    <nav className="nav_bar">
      <button onClick={handleHomeClick} className="nav_link">
        Home
      </button>
      <Link to={`/login`} className="nav_link">
        Login
      </Link>
      <Link to={`/write_article`} className="nav_link">
        Add new Article
      </Link>
    </nav>
  );
};
