import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
//import Src from './app/src';
import Index from './src';

class Root extends Component{
  render(){
    return(
      <Index/>
    );
  }
}

AppRegistry.registerComponent('test', () => Root);