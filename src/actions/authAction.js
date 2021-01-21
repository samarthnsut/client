import { USER_LOADING, 
    USER_LOADED, 
    LOGIN_SUCCESS, 
    REGISTER_SUCCESS, 
    AUTH_ERROR,
     LOGIN_FAIL, REGISTER_FAIL, LOGOUT_SUCCESS } from '../actions/types'
import axios from 'axios'
import {returnErrors} from '../actions/errorAction'

export const loadUser = ()=>(dispatch,getState)=>{

    dispatch({
        type: USER_LOADING
    })

    const token = getState().auth.token

    const config = {
        header: {
            "content-type" :"application/json"
        }
    }

    if(token)
    {
        config.header["x-auth-header"]=token;
    }

    axios.get("http://localhost:5000/api/auth/user",config)
      .then(res=>dispatch({
            type: USER_LOADED,
            payload : res.data
      }))
      .catch(err=>{
          dispatch(returnErrors(err.response.data,err.response.status))
          dispatch({
          type: AUTH_ERROR
      })
    })
}
export const logout= ()=>{
    return{
        type: LOGOUT_SUCCESS
    }
}
export const register =({name,email,password})=> dispatch=>{

    const config = {
        header: {
            "Content-Type" :"application/json"
        }
    }

  /*  const body = JSON.stringify({name,email,password});*/
    const body = {
        name:name,
        email: email,
        password:password
    }
    console.log("stringofy json" ,body)

    axios.post('http://localhost:5000/api/users', body,config)
      .then(res => dispatch({
          type : REGISTER_SUCCESS,
          payload: res.data
      }))
      .catch(err=>{
          
        dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'))
        dispatch({
            type : REGISTER_FAIL
        })
      })
  
}

/////LOGIN
export const login =({email,password})=>dispatch=>{
    const config = {
        header: {
            "Content-Type" :"application/json"
        }
    }
    const body = {
        email: email,
        password:password
    }
    console.log("stringofy json" ,body)
    axios.post('http://localhost:5000/api/auth', body,config)
    .then(res => dispatch({
        type : LOGIN_SUCCESS,
        payload: res.data
    }))
    .catch(err=>{
        
      dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'))
      dispatch({
          type : LOGIN_FAIL
      })
    })

}

export const tokenConfig = (getState)=>{
    const token = getState().auth.token

    const config = {
        header: {
            "content-type" :"application/json"
        }
    }

    if(token)
    {
        config.header["x-auth-header"]=token;
    }
  return config
}