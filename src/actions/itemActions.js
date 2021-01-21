import { GET_ITEMS,DELETE_ITEM,ADD_ITEM, ITEMS_LOADING} from './types'
import axios from 'axios'
import {tokenConfig} from './authAction'
import {returnErrors} from './errorAction'
import { getSalt } from 'bcryptjs'

export const getItems= ()=> (dispatch,getState)=>{
    dispatch(setItemsLoading())

    axios.get('http://localhost:5000/api/items',tokenConfig(getState))
    .then(res=> dispatch
        ({
        type : GET_ITEMS,
        payload : res.data
    }))
    .catch(err=>
        dispatch(returnErrors(err.response.data,err.response.status))
    )
}
export const deleteItem= (id)=> (dispatch,getState)=>{
    dispatch(setItemsLoading())

    axios.delete(`http://localhost:5000/api/items/${id}`,tokenConfig(getState))
    .then(res=> dispatch
        ({
        type : DELETE_ITEM,
        payload : id
    }))
    .catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status))
    })
}

 export const addItem= (items)=> (dispatch,getState)=>{
    dispatch(setItemsLoading())

    axios.post('http://localhost:5000/api/items',items,tokenConfig(getState))
    .then(res=> dispatch
        ({
        type : ADD_ITEM,
        payload : res.data
    }))
    .catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status))
    })
}
 export const setItemsLoading=()=>{
     return {
         type: ITEMS_LOADING
     }
 }