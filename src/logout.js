import React, { Component, Fragment } from 'react'
import { NavLink, Button } from 'reactstrap'
import {connect }from 'react-redux'
import PropTypes from 'prop-types'
import {logout } from './actions/authAction'

class LogoutComp extends Component{
   static propTypes ={
       logout:PropTypes.func.isRequired
   }

    render(){
        return(
            <Fragment>
                  <NavLink onClick={this.props.logout}>
                      <Button color="dark">
                          LogOut
                      </Button>
                      
                  </NavLink>
            </Fragment>
        )
    }
}

export default connect(null,{logout})(LogoutComp)