import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="header">
      <div className="logo_header">
        <img alt="LOGO HERE"></img>
        <h1>NC News</h1>
      </div>

      <p>all the gossip from your local community</p>
      <p>logged in as {user.username}</p>
    </div>
  );
};
