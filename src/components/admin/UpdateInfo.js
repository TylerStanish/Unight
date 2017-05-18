import React, {Component} from 'react';
import {View, Text, StyleSheet,} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

class UpdateInfo extends Component{
	render(){
		return(
			<View>
				<Text>Update info</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state, ownProps) => {
	return{
		references: state.references,
		main: state.main
	}
}

export default connect(mapStateToProps)(UpdateInfo);