import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../auth/LoginButton";
import axios from "axios";
import Lists from "./lists";
import { Button} from "semantic-ui-react";

const Todolists = () => {
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const [data, setData] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    makeRequest()
  }, []);

  function makeRequest(){
    const getData = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH_AUDIENCE,
          scope: process.env.REACT_APP_SCOPE,
        });
        const headers = {
          Authorization: "Bearer " + accessToken,
        };     
        setToken(accessToken);
        axios
          .get(process.env.REACT_APP_API_URL + "todolist/" + user.name , { headers: headers })
          .then((response) => {
            setData(response);
          });
      } catch (e) {
        console.log(e.message);
      }
    };
    getData();
  }

  return isAuthenticated ? (
    <div>
      <br></br>
      <br></br>
      <br></br>
      {data === undefined ? <Button color={"blue"} onClick={makeRequest}>Get your lists</Button> : <Lists data={data} token={token} user={user}/>}      
      <br></br>
      <br></br>
      <a href={process.env.REACT_APP_WEBSITE + "/privacy"} >
        Click here to see our Terms of Privacy.
      </a>
    </div>
  ) : (
    <div>
      You must be logged in before you can view this page, please click here{" "}
      <LoginButton />
      <br></br>
      <a href={process.env.REACT_APP_WEBSITE + "/privacy"}>
        Click here to see our Terms of Privacy.
      </a>
    </div>
  );
};

export default Todolists;
