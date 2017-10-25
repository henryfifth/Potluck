import React, { Component } from 'react';
import { Card, CardTitle, CardSubtitle, CardBody, Col } from 'reactstrap';
import GroceryInputs from '../GroceryInputs/GroceryInputs';
import './Main.css';
import GroceryList from "../GroceryList/GroceryList";
var axios = require('axios');

export default class Main extends Component {
  constructor(){
    super()
    this.getList = this.getList.bind(this);
    this.sendData = this.sendData.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.selectorToServer = this.selectorToServer.bind(this);
    this.getUser = this.getUser.bind(this);
    this.state = {
      initialized: false
    }
}

sendData(foodObj) {
  axios.put('/houses', {
      name: foodObj.name,
      quantity: foodObj.quantity,
  }, {headers: { 'Content-Type': 'application/json' }}).then((data)=>{
    this.setState({
      items: data.data
    });
  });
};

getUser() {
  axios.get('/user').then((res)=>{
  })
}


deleteItem(id) {
  console.log(id)
  axios.put('/delete', {
    _id: id
  })
  .then((data) => {
    console.log(data)
    this.setState({
      items: data.data
    });
  });
};

selectorToServer(id, toggleValue) {
  axios.put('/selector/', {
    _id: id, selector: toggleValue
  }, {headers: { 'Content-Type': 'application/json' }}
).then((data) => {
  this.setState({
    items: data.data
  });
});
}

getList(){
  if (this.state.initialized) {
    this.setState({
      initialized: false
    });
  }
  axios.get('/houses')
  .then((data)=>{
    this.setState({
      items:data.data,
      initialized: true
    });
  })
}

componentDidMount(){
  this.getList();
  this.getUser();
}

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addItem();
    }
  }

  render(){
    if (this.state.initialized === false) {
      return (
        <div className='main'>
        <Col className='main-col'></Col>
        <Card className='main-card'>
          <CardTitle>Welcome to Potluck!</CardTitle>{' '}
          <CardSubtitle>Create a shared grocery list with your housemates.</CardSubtitle>{' '}
          <CardBody> First, create a house for everyone to join. Already received an invite? Click the Join House link on the navbar. <br/> Clicking the Potluck logo in the top left corner will always bring you back to your shared grocery list.</CardBody>{' '}
        </Card>
        </div>
        )}

    else {
  return(
    <div className='main'>
      <GroceryInputs className='grocery-inputs' 
        sendData={this.sendData} 
        items={this.state.items}
        state={this.state} />
      <GroceryList 
        className='grocery-inputs' 
        selectorToServer={this.selectorToServer} 
        deleteItem={this.deleteItem} 
        items={this.state.items} 
        class='main' 
      />
    </div>
  )} 
  }
}