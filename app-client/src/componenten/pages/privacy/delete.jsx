import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import LoginButton from "../../auth/LoginButton";

const Delete = () => {
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const [data, setData] = useState();

  const deleteAccount = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        scope: process.env.REACT_APP_SCOPE,
      });
      const headers = {
        Authorization: "Bearer " + accessToken,
      };
      axios
        .get(process.env.REACT_APP_API_URL + "todolist/" + user.name, {
          headers: headers,
        })
        .then((response) => {
          response.data.forEach((element) => {
            axios
              .delete(process.env.REACT_APP_API_URL +  "todolist/" + element.id, {
                headers: headers,
              })
              .then((response) => {
                setData("All personal data is removed from database");
              });
          });
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  return isAuthenticated ? (
    <div>
      <br></br>
      <h3>Delete data</h3>
      <Button onClick={deleteAccount} color="red">
        Click here to delete all your personal data from our website
      </Button>
      <p>
        Warning! You will lose al your to do lists if you click on the button!
      </p>
      {data !== undefined ? <p>{data}</p> : <p></p>}
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
  );;
};

export default Delete;
