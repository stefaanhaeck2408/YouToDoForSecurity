import React, { Component } from "react";
import SingleToDoList from "./singleToDoLists";
import { Popup, Button, Grid, Header, Input } from "semantic-ui-react";
import axios from "axios";

export class Lists extends Component {
  state = {
    listName: "",
    lists: [],
  };

  componentDidMount = () => {
    this.setState({ lists: this.props.data.data });
  };

  handleChangeListName = (e) => {
    this.setState({ listName: e.target.value });
  };
  addList = () => {
    const headers = {
      Authorization: "Bearer " + this.props.token,
    };
    try {
      axios
        .post(process.env.REACT_APP_API_URL +
          "todolist",
          {
            Name: this.state.listName,
            EmailCreator: this.props.user.name
          },
          { headers: headers }
        )
        .then((response) => {
          this.setState({
            lists: [
              ...this.state.lists,
              { id: response.data.id, name: response.data.name },
            ],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  deleteList = (listId) => {
    const headers = {
      Authorization: "Bearer " + this.props.token,
    };
    try {
      axios
        .delete(process.env.REACT_APP_API_URL +
          "todolist/" + listId,          
          { headers: headers }
        )
        .then((response) => {
          var filteredList = this.state.lists.filter(x => x.id !== listId);
          this.setState({
            lists: filteredList,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e.message);
    }

  }

  render() {
    return (
      <div>
        <h1>YouToDO</h1>
        <h3>Your personal todo lists</h3>
        <Popup
          trigger={<Button color="blue">Click here to create a secure todo list!!!</Button>}
          on="click"
        >
          
          <Grid divided>
            <Grid.Column textAlign="center">
              <Header as="h4">Add a Todo list</Header>
              <Input
                onChange={this.handleChangeListName}
                placeholder="Enter name here.."
                value={this.state.listName}
              ></Input>
              <Button onClick={this.addList}>Add</Button>
            </Grid.Column>
          </Grid>
        </Popup>
        {this.state.lists.map((list, index) => (
          <div key={index}>
            <SingleToDoList
              key={index}
              toDoList={list}
              token={this.props.token}
              deleteList={this.deleteList}
            />
            <br></br>
          </div>
        ))}        
      </div>
    );
  }
}

export default Lists;
