import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Image} from 'react-native';

class Loading extends Component{

	constructor(props) {
		super(props);
		var width;
		var height;
		if(props.width && props.height){
			width = props.width;
			height = props.height;
		}else{
			width = 50;
			height = 50;
		}
		this.state = {
			width, height
		}
	}

	render() {
		return(
			<Image
				source={require('../../../assets/ring.gif')}
				style={{height: this.state.height, width: this.state.width}}
			/>
		);
	}

}

Loading.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
}

export default Loading;