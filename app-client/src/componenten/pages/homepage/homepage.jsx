import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Homepage = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <h1>YouToDO</h1>
      <h3>YouToDO is the best place to make your own personal todo lists. And Secure!</h3>
      <br></br>Welcome back {user.name}
      <br></br>      
      <div>
        <img src={user.picture} alt={user.name} />        
      </div>
      <a href={process.env.REACT_APP_WEBSITE + "/privacy"}>
        Click here to see our Terms of Privacy.
      </a>
    </div>
  ) : (
    <div>
      <br></br>
      <br></br>
      Welcome anonymous, you must register before you can make a Todo list
      <a href={process.env.REACT_APP_WEBSITE + "/privacy"}>
        Click here to see our Terms of Privacy.
      </a>
    </div>
  );
};

export default Homepage;
