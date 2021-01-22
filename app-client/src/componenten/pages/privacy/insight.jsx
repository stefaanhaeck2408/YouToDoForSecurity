import React, {useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../auth/LoginButton";
import axios from "axios";



const Insight = () => {

  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH_AUDIENCE,
          scope: process.env.REACT_APP_SCOPE,
        });
        const headers = {
          Authorization: "Bearer " + accessToken,
        };     
        axios
          .get(process.env.REACT_APP_API_URL + "todolist/" + user.name  ,{ headers: headers })
          .then((response) => {
            setData(response.data);
          });
      } catch (e) {
        console.log(e.message);
      }
    };
    getData();
  }, []);

  return isAuthenticated ? (
    <div>
      <br></br>
      <h3>Insight</h3>
      <p>Your email adress is used in these to do lists: </p>
      <ul>
      {data !== undefined ? data.map((item, index) => (<li key={index}>{item.name}</li>)) : <li>In no lists used</li>}
      </ul>
      
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

export default Insight;
