import React from "react";
import { Menu, Container } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import LoginButton from "../auth/LoginButton"
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../auth/LogoutButton";


const Navbar = () => {

    const { isAuthenticated } = useAuth0();
    
    return (
      <div>
        <Menu
          fixed="top"
          inverted
          style={{ position: "absolute", width: "100%", background:"rgb(77 141 189)", textAlign:"center", height:"30px", padding:"auto"}}
        >
          <Container>
            <Menu.Item
              style={{ paddingRight: "5px"}}
              name="Home"
              as={NavLink}
              to="/"
            />
            {isAuthenticated && <Menu.Item
              style={{ paddingRight: "5px" }}
              name="To Do lists"
              as={NavLink}
              to="/todolists"
            />}
            
            <Menu.Item name="Privacy" as={NavLink} to="/privacy"/>
            {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
            
          </Container>
        </Menu>
      </div>
    );
  }


export default Navbar;
