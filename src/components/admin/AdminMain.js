import React, {Component} from 'react';
import {
	View, 
	Text, 
	StyleSheet, 
	ScrollView,
	TouchableOpacity,
	Modal,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Meteor, {createContainer} from 'react-native-meteor';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../misc/Button';
import DealsList from '../common/lists/DealsList';
import JobsList from '../common/lists/JobsList';
import UpdateInfo from './UpdateInfo';
import CreateDeal from './CreateDeal';
import CreateJob from './CreateJob';

class AdminMain extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			dealVisible: false,
			jobVisible: false,
		}
	}

	createDeal(){
		this.setState({dealVisible: true});
	}

	removeDeals(){

	}

	createJob(){

	}

	removeJobs(){

	}

	setCreateDealVisible(dealVisible){
		this.setState({dealVisible});
	}

	setCreateJobVisible(jobVisible){
		this.setState({jobVisible});
	}

	render() {

		var which;
		var buttons;
		if(this.props.main.adminType == 'Deals'){
			which = (
				<View>
					<Text>My deals offered</Text>
					<DealsList deals={this.props.deals}/>
				</View>
			);
			buttons = (
				<View>
					<TouchableOpacity 
						activeOpacity={0.8} 
						style={styles.plus}
						onPress={() => this.createDeal()}
					>
						<Icon name="plus-circle" color="white" size={20}/>
					</TouchableOpacity>
					<TouchableOpacity 
						activeOpacity={0.8} 
						style={styles.minus}
						onPress={() => this.removeDeals()}
					>
						<Icon name="minus-circle" color="white" size={20}/>
					</TouchableOpacity>
				</View>
			);
		}
		if(this.props.main.adminType == 'Feedback'){
			which = (
				<View>
					<Text>Feedback</Text>
					<Button text="View messages"/>
					<Button text="Manage reviews"/>
				</View>
			);
		}
		if(this.props.main.adminType == 'Jobs'){
			which = (
				<View>
					<Text>Jobs</Text>
					<JobsList jobs={this.props.jobs}/>
				</View>
			);
			buttons = (
				<View>
					<TouchableOpacity 
						activeOpacity={0.8} 
						style={styles.plus}
						onPress={() => this.createJob()}
					>
						<Icon name="plus-circle" color="white" size={20}/>
					</TouchableOpacity>
					<TouchableOpacity 
						activeOpacity={0.8} 
						style={styles.minus}
						onPress={() => this.removeJobs()}
					>
						<Icon name="minus-circle" color="white" size={20}/>
					</TouchableOpacity>
				</View>
			);
		}
		if(this.props.main.adminType == 'UpdateInfo'){
			which = <UpdateInfo/>
		}

		return(
			<View style={{flex: 1}}>
				<View style={{flex: 1, alignItems: 'center',}}>
					<ScrollView style={{marginTop: this.props.references.globalMarginTop}}>
						{which}
					</ScrollView>
				</View>
				{buttons}
				<Modal visible={this.state.dealVisible} animationType="slide">
					<CreateDeal setCreateDealVisible={this.setCreateDealVisible.bind(this)} />
				</Modal>
				<Modal visible={this.state.jobVisible} animationType="slide">
					<CreateJob setCreateJobVisible={this.setCreateJobVisible.bind(this)} />
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	plus: {
		backgroundColor: 'blue',
		position: 'absolute',
		bottom: 80,
		right: 0,
		padding: 5,
		height: 50,
		width: 50,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	minus: {
		backgroundColor: 'red',
		position: 'absolute',
		right: 0,
		bottom: 5,
		padding: 5,
		borderRadius: 25,
		height: 50,
		width: 50,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

const mapStateToProps = (state, ownProps) => {
	return{
		references: state.references,
		main: state.main
	}
}

const MeteorContainer = createContainer(props => {
	Meteor.subscribe('profile');
	Meteor.subscribe('ownPage');
	Meteor.subscribe('ownDeals');
	Meteor.subscribe('ownJobs');

	return{
		profile: Meteor.collection('profile').findOne({}),
		page: Meteor.collection('page').findOne({}),
		deals: Meteor.collection('deal').find(),
		jobs: Meteor.collection('job').find(),
	}	
}, AdminMain);

export default connect(mapStateToProps)(MeteorContainer);



