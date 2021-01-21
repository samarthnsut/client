import React, { Component } from 'react'
import {Container,Button, ListGroup, ListGroupItem } from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {v4 as uuidv4} from 'uuid';
import './App.css';
import {connect} from 'react-redux'
import {getItems, deleteItem} from './actions/itemActions'
import PropTypes from 'prop-types'
class List extends Component{


    static propTypes={
        getItems :PropTypes.func.isRequired,
        item : PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    componentDidMount(){
        console.log('get items action is called')
        this.props.getItems();
    }
 handleDelete= (id)=>{
     this.props.deleteItem(id)
 }
 
  render(){
    const {items} = this.props.item;
      return (
          <div>
             <Container>
                
                 <ListGroup>
                     <TransitionGroup className='list' >
                         {items.map((it)=>(
                             <CSSTransition key={it._id} timeout={500} classNames='fade'>
                                 <ListGroupItem color='primary'className='list-item'>
                                     {this.props.isAuthenticated?
                                      <Button color='danger' className='delete-btn' size='sm'
                                      onClick={this.handleDelete.bind(this,it._id)}
                                      >
                                          &times;
                                      </Button>:""}
                                    
                                     {it.name}
                                 </ListGroupItem>
                             </CSSTransition>                             
                   
                      ))}
                      </TransitionGroup>
                 </ListGroup>
             </Container>
          </div>
      );
  }
}

const mapStateToProps = (state)=>({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{getItems,deleteItem})(List)