import {v4 as uuidv4} from 'uuid';
import { GET_ITEMS,DELETE_ITEM,ADD_ITEM,ITEMS_LOADING} from '../actions/types'
    import { Form } from 'reactstrap';

const initalState={
    items:[],
    loading: false
    

}
export default function(state= initalState,action){
    
    switch(action.type)
    {
        case GET_ITEMS : console.log('action data ' , action.payload);    return{
            ...state,
            items: action.payload,
            loading:false
            }   
         case DELETE_ITEM: return{
             ...state,
             items: state.items.filter(item => item._id!==action.payload)
         }    
         case ADD_ITEM : return{
             ...state,
             items: [action.payload,...state.items]
         }
         case ITEMS_LOADING: return{
             ...state,
             loading:true
         }
         default : return state
    }
}