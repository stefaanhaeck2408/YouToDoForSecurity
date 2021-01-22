import React, { Component } from "react";
import { Card, Icon, Input, Button } from "semantic-ui-react";
import axios from "axios";

export class singleToDoLists extends Component {
  state = {
    items: [],
    newItem: "",
  };

  componentDidMount() {
    const headers = {
      Authorization: "Bearer " + this.props.token,
      "content-type": "application/json",
    };
    const id = this.props.toDoList.id;
    axios
      .get(process.env.REACT_APP_API_URL +"todoitems/" + id, { headers: headers })
      .then((response) => {
        this.setState({ items: response.data });
      });
  }

  changeInput = (e) => {
    this.setState({ newItem: e.target.value });
  };

  createNewItem = () => {
    const headers = {
      Authorization: "Bearer " + this.props.token,
    };
    try {
      axios
        .post(process.env.REACT_APP_API_URL +
          "todoitems",
          {
            Name: this.state.newItem,
            ListId: this.props.toDoList.id,
          },
          { headers: headers }
        )
        .then((response) => {
          this.setState({
            newItem: "",
            items: [
              ...this.state.items,
              {
                id: response.data.id,
                toDoListId: response.data.toDoListId,
                name: response.data.name,
                description: response.data.description,
              },
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

  deleteItem = (id) => {
    const headers = {
      Authorization: "Bearer " + this.props.token,
    };
    try {
      axios
        .delete(process.env.REACT_APP_API_URL +
          "todoitems/" + id,
          
          { headers: headers }
        )
        .then((response) => {
          this.setState({
            items: this.state.items.filter(
              (item) => item.id !== id
            ),
          })
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
        <br></br>
        <Card>
          <Card.Content>
            
            <Card.Header>
              <Icon name="clipboard list" />
              {this.props.toDoList.name}            
            </Card.Header>
            
            <Card.Meta>
              <span className="date">Tip! To delete items, just click on them.</span>
            </Card.Meta>
            <Card.Description>
              {this.state.items.map((item, index) => (
                <div key={index}>
                  <a key={index} onClick={() =>this.deleteItem(item.id)}>{item.name}</a>                  
                </div>
              ))}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="pencil alternate" />
            <Input
              value={this.state.newItem}
              placeholder="Enter new item here.."
              onChange={this.changeInput}
            ></Input>
            <Button color="instagram" size="mini" onClick={this.createNewItem}>
              Add
            </Button>
            <Button color="red" size="medium" style={{width: "100%", marginTop:"5px"}} onClick={() =>this.props.deleteList(this.props.toDoList.id)}>Delete whole list</Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default singleToDoLists;
