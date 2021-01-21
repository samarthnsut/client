import React, { useState, Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container
} from 'reactstrap';
import RegisterModal from './RegisterModal'
import Logout from './logout'
import LoginModal from './LoginModal';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Appbar extends Component{
   state= {
       isOpen : false
   }

static propTypes ={
 auth:PropTypes.object.isRequired
}

    toggle = ()=>{
        this.setState=({
            isOpen: !this.state.isOpen

      })

    }

    

    render(){

      const {user, isAuthenticated} = this.props.auth
      const authlink = (
         <Fragment>
             
              <NavItem>
                <span className='m-3'>
                    <strong className="navbar-text mr-3"> { user? `Welcome ${user.name}`:''}</strong>
                </span>
              </NavItem>
             
            
              <NavItem>
                <Logout/>
            </NavItem>  

        </Fragment>

      )
      const glink =(
       <Fragment>
            <NavItem color='dark'>
                 <RegisterModal/>
            </NavItem>
            <NavItem>
                  <LoginModal/>
            </NavItem>         
       </Fragment>
      )
       return(
           <div>
               <Navbar color= "primary"  expand="sm">
                 <Container>
                   <NavbarBrand > Shopping List </NavbarBrand>
                    <NavbarToggler onClick= {this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                       
                      {isAuthenticated?authlink:glink}
                        </Nav>
                        

                    </Collapse>
                 </Container>

               </Navbar>
           </div>
       );
    }
        
}

const mapStateToProps= (state)=> ({
auth: state.auth
})
export default connect(mapStateToProps,null)(Appbar)