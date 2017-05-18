import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const Button = React.createClass({
  render() {
    let { text, onPress } = this.props;

    if(this.props.width && this.props.height){
      /*if(this.props.search.isSearching){
        return (
          <TouchableOpacity style={[styles.searchButton, {width: this.props.width}]} onPress={onPress}>
            <ActivityIndicator style={{color: '#8d4993'}}/>
          </TouchableOpacity>
        );
      }*/
      return (
        <TouchableOpacity style={[styles.searchButton, {width: this.props.width, height: this.props.height}]} onPress={onPress}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      );
    }else if(this.props.width){
      return (
        <TouchableOpacity style={[styles.searchButton, {width: this.props.width, height: this.props.height}]} onPress={onPress}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#eee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 140
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#eee',
    margin: 5,
  },
  text: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	color: '#8d4993',
  	fontWeight: 'bold',
  	fontSize: 20,
    textAlign: 'center',
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    search: state.search
  };
};

export default Button;


