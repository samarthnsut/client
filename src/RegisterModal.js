import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import './App.css'
import {v4 as uuidv4} from 'uuid';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {register} from './actions/authAction'
import {clearErrors} from './actions/errorAction'
class registerModal extends Component{
    state = {
        modal : false,
        name  : '',
        email : '',
        password : '',
        msg : null
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors : PropTypes.func.isRequired
    }

    componentDidUpdate(preProps){
        const {error, isAuthenticated} = this.props;
        if(error!==preProps.error){

            if(error.id=='REGISTER_FAIL'){
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
            [e.target.email]: e.target.value,
            [e.target.password]: e.target.value
        });
    }
   
    
    onSubmit= e=>{
        e.preventDefault();
        const{name,email,password} = this.state
        const newUser ={
         name,
         email,
        password
        }
        this.props.register(newUser);
      
     
        
    }
    render(){
        return(
            <div>
           <NavLink onClick={this.toggle} href="#" color='dark'>
              <Button> Register</Button>
               
               </NavLink>

              <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Register</ModalHeader>
              <ModalBody>
                  {this.state.msg?(
                      <Alert color='danger'>
                      {this.state.msg}
                      </Alert>
                  ):null}
                  <Form onSubmit={this.onSubmit}>
                     <FormGroup>
                        <Label color='primary'>Name</Label>
                         <Input type='text' name='name'className="mb-3" placeholder='enter name ' onChange={this.onChange}/>

                         <Label color='primary'>E Mail</Label>
                         <Input type='text' name='email' className="mb-3" placeholder='enter email' onChange={this.onChange}/> 

                         <Label color='primary'>Password</Label>
                         <Input type='password' name='password'className="mb-3" placeholder='password' onChange={this.onChange}/> 

                         <Button color="primary" block>Register</Button>

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
export default connect(mapStateToprops, {register,clearErrors})(registerModal)