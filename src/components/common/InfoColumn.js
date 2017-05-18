import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class InfoColumn extends Component{
	render(){
		
		return(
			<View>
				<Text style={styles.title}>{this.props.deal.title}</Text>
				<Text style={styles.text}>{this.props.deal.pageName}</Text>
				<Text style={styles.text}>{this.props.deal.date}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 20,
	},
	text: {
		textAlign: 'center',
		fontSize: 18,
	}
});

export default InfoColumn;