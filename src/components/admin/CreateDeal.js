import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

import {connect} from 'react-redux';
import Meteor from 'react-native-meteor';

class CreateDeal extends Component{
	
	createDeal(){

	}

	render() {
		return(
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					keyboardType="name"
					ref="name"
					returnKeyType={"next"}
					onChangeText={(name) => this.setState({name})}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Deal name"
					onSubmitEditing={() => this.refs.date.focus()}
				/>
			{/* Implement the calendar date chooser and also the image uploader */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});

const mapStateToProps = (state, ownProps) => {
	return: {
		references: state.references,
	}
}

export default connect(mapStateToProps)(CreateDeal);


