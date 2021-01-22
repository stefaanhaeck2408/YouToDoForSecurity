import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import Terms from "./terms";
import Insight from "./insight";
import DeleteData from "./delete";
import Objection from "./Objection";

export class privacy extends Component {
  state = {
    term: false,
    insight: false,
    delete: false,
    object: false
  };

  toggleTerms = () => {
    this.setState({ term: !this.state.term, insight: false, delete: false, object: false });
  };

  toggleInsight = () => {
    this.setState({ insight: !this.state.insight, term: false, delete: false, object: false });
  };

  toggleDelete = () => {
    this.setState({ delete: !this.state.delete, term: false, insight: false, object: false });
  };

  toggleObjection = () => {
    this.setState({ object: !this.state.object, term: false, insight: false, delete:false });
  };

  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <h1>YouToDO</h1>
        <h3>Find all info regarding privacy here!</h3>
        <Button.Group>       
        <Button onClick={this.toggleTerms}>Show Terms of Privacy</Button>
        <Button onClick={this.toggleInsight}>
          Show insight of personal data
        </Button>
        <Button onClick={this.toggleDelete}>
          Delete personal data from MakeYourLists website
        </Button>
        <Button onClick={this.toggleObjection}>
          Objection personal data
        </Button>
        </Button.Group>
        <br></br>
        {this.state.term ? <Terms /> : <div />}
        {this.state.insight ? <Insight /> : <div />}
        {this.state.delete ? <DeleteData /> : <div />}
        {this.state.object ? <Objection /> : <div />}
      </div>
    );
  }
}

export default privacy;
