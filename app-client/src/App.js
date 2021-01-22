import "./App.css";
import Navbar from "./componenten/nav/navbar";
import React, { Fragment } from "react";
import Homepage from "./componenten/pages/homepage/homepage";
import ToDoLists from "./componenten/pages/todolists/todolists";
import Privacy from "./componenten/pages/privacy/privacy";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <Fragment>
      <Router>
        <Fragment>
        <Navbar />
        <Container>
          <Route path="/" exact component={Homepage} />
        </Container>
        <Container>
          <Route path="/todolists" exact component={ToDoLists} />
        </Container>

        <Container>
          <Route path="/privacy" exact component={Privacy} />
        </Container>
        </Fragment>
        
      </Router>
    </Fragment>
  );
}

export default App;
