import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import './App.css'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from './actions/authAction'
import {clearErrors} from './actions/errorAction'
class loginModal extends Component{
    state = {
        modal : false,
        email : '',
        password : '',
        msg : null
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors : PropTypes.func.isRequired
    }

    componentDidUpdate(preProps){
        const {error, isAuthenticated} = this.props;
        if(error!==preProps.error){

            if(error.id=='LOGIN_FAIL'){
                this.setState({
                    msg: error.msg.msg
                })
            }
            else{
                this.setState({
                    msg:null
                })
            }

        }

        if(this.state.modal){
            if(isAuthenticated)
            {
                this.toggle();
            }
        }
    }
    toggle = ()=>{
        this.props.clearErrors()
        this.setState({
            modal : !this.state.modal
        })
    }
    onChange= (e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            
        });
    }
   
    
    onSubmit= e=>{
        e.preventDefault();
        const {email,password} = this.state
        const newUser ={
         email,
         password
        }
        console.log("on submit",newUser)
        this.props.login(newUser);
      
     
        
    }
    render(){
        return(
            <div>
           <NavLink onClick={this.toggle} href="#" color='dark'>
              <Button> Login</Button>
               
               </NavLink>

              <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>login</ModalHeader>
              <ModalBody>
                  {this.state.msg?(
                      <Alert color='danger'>
                      {this.state.msg}
                      </Alert>
                  ):null}
                  <Form onSubmit={this.onSubmit}>
                     <FormGroup>
                     

                         <Label color='primary'>E Mail</Label>
                         <Input type='text' name='email' className="mb-3" placeholder='enter email' onChange={this.onChange}/> 

                         <Label color='primary'>Password</Label>
                         <Input type='password' name='password'className="mb-3" placeholder='password' onChange={this.onChange}/> 

                         <Button color="primary" block>Login</Button>

                    </FormGroup>
                  </Form>
              </ModalBody>


                  </Modal>
            </div>
        )
    }
}
const mapStateToprops = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    
})
export default connect(mapStateToprops, {login,clearErrors})(loginModal)