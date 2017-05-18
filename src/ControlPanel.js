import React, {Component} from 'react';
import {
	View, 
	Text, 
	StyleSheet, 
	Dimensions,
	TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import Meteor, {createContainer} from 'react-native-meteor';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as actions from './actions';

class ControlPanel extends Component{
	
	constructor(props) {
		super(props);
	}

	logout(){
		Meteor.logout();
		Actions.LoggedOut({type: 'reset'});
		this.props.closeDrawer();
	}

	render() {
		
		var which;
		var toggle;
		if(this.props.main.userTab == 'User'){
			which = (
				<View>
					<Text onPress={() => {this.props.setUserType('Pages'); this.props.closeDrawer()}} style={styles.title}>Businesses</Text>
					<Text onPress={() => {this.props.setUserType('Deals'); this.props.closeDrawer()}} style={styles.title}>Daily Deals</Text>
					<Text onPress={() => {this.props.setUserType('Jobs'); this.props.closeDrawer()}} style={styles.title}>Jobs</Text>
				</View>
			);
			toggle = <Text onPress={() => {Actions.AdminMain({type: 'reset'}); this.props.whichTab('Admin'); this.props.closeDrawer()}} style={styles.title}>My Business</Text>
		}else if(this.props.main.userTab == 'Admin'){
			which = (
				<View>
					<Text onPress={() => {this.props.setAdminType('Deals'); this.props.closeDrawer()}} style={styles.title}>Deals</Text>
					<Text onPress={() => {this.props.setAdminType('Feedback'); this.props.closeDrawer()}} style={styles.title}>Feedback</Text>
					<Text onPress={() => {this.props.setAdminType('Jobs'); this.props.closeDrawer()}} style={styles.title}>Jobs</Text>
					<Text onPress={() => {this.props.setAdminType('UpdateInfo'); this.props.closeDrawer()}} style={styles.title}>Update Info</Text>
				</View>
			);
			toggle = <Text onPress={() => {Actions.Main({type: 'reset'}); this.props.whichTab('User'); this.props.closeDrawer()}} style={styles.title}>Back to User</Text>
		}



		return(
			<View style={{alignItems: 'center', flex: 1,}}>
				<View style={{justifyContent: 'flex-end', alignItems: 'flex-end', height: this.props.references.globalMarginTop + 1, width: width*0.8, backgroundColor: this.props.references.color}}>
					<TouchableOpacity style={{padding: 15}} onPress={() => this.props.closeDrawer()}>
						<Icon name="times" size={30} color="white"/>
					</TouchableOpacity>
				</View>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
					<Text>Hello</Text>
					{which}
					<Text style={styles.plain}>Veer Copyright 2017</Text>
					<Text style={[styles.plain, {color: this.props.references.color}]} onPress={() => this.logout()}>Log out</Text>
					{toggle}
				</View>
			</View>
		);
	}
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'blue'
	},
	plain: {
		fontSize: 20,
		textAlign: 'center',

	}
})

const mapStateToProps = (state, ownProps) => {
	return{
		main: state.main,
		references: state.references,
	}
}

const MeteorContainer = createContainer(props => {
	Meteor.subscribe('profile');

	return{
		profile: Meteor.collection('profile').findOne({})
	}
}, ControlPanel);

export default connect(mapStateToProps, actions)(MeteorContainer);


