import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import newspaperImage from "../assets/newspaper-image.jpeg";

export const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="header">
      <div className="logo_header">
        <h1 id="NC_News">NC News</h1>
      </div>

      <p className="header_text">all the gossip from your local community</p>
      <p className="header_text">logged in as {user.username}</p>
    </div>
  );
};
