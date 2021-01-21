import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import './App.css'
import {v4 as uuidv4} from 'uuid';
import {connect} from 'react-redux'
import {addItem} from './actions/itemActions'
import PropTypes from 'prop-types'
class itemModel extends Component{
    state = {
        model : false,
        name  : '',
        quantity: '1'
    }
    
    static propTypes={
        isAuthenticated: PropTypes.bool
    }

    toggle = ()=>{
        this.setState({
            modal : !this.state.modal
        })
    }
    onChange= (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onChangeq= (e)=>{
        this.setState({
            [e.target.quantity]: e.target.value
        });
    }
    
    onSubmit= e=>{
        e.preventDefault();
        const newItem = {
    
            name:this.state.name,
            quantity:this.state.quantity
        }
        this.props.addItem(newItem)

        this.toggle()
    }
    render(){
        return(
            <div>
                {this.props.isAuthenticated?
                 <Button color="primary" onClick={this.toggle}>ADD Item</Button>:
                 <h3>Please login/regiter to add item</h3>}
             


              <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>ADD to List</ModalHeader>
              <ModalBody>
                  <Form onSubmit={this.onSubmit}>
                     <FormGroup>
                        <Label color='primary'>ITEM</Label>
                         <Input type='text' name='name' placeholder='add item ' onChange={this.onChange}/>
                         <Input type='text' name='quantity' placeholder='enter quantity ' onChange={this.onChangeq}/> 
                         <Button color="primary" block>ADD Item</Button>

                    </FormGroup>
                  </Form>
              </ModalBody>


                  </Modal>
            </div>
        )
    }
}
const mapStateToprops = state =>({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToprops, {addItem})(itemModel)