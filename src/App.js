import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Appbar from './Appbar'
import List from './shoppinglist'
import {Provider} from 'react-redux'
import store from './store'
import Model from './itemModel'
import { loadUser } from './actions/authAction'


class  App extends Component {
  componentDidMount(){
    store.dispatch(loadUser())
  }
  render(){
    return (
      <Provider store={store}>
            <div className="App">
              <Appbar/>
              <Model/>
               <List/> 
             </div>
      </Provider>
      );
  }
}

export default App;
