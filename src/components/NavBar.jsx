import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="nav_bar">
      <Link to={`/`} className="nav_link">
        Home
      </Link>
      <Link to={`/login`} className="nav_link">
        Login
      </Link>
      <Link to={`/write_article`} className="nav_link">
        Add new Article
      </Link>
    </nav>
  );
};
