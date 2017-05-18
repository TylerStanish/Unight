import React, {Component} from 'react';
import {
	View,
	ScrollView, 
	TouchableOpacity, 
	Platform, 
	Text, 
	Navigator, 
	StyleSheet, 
	Dimensions, 
	NativeModules
} from 'react-native';

import Loading from '../misc/Loading';
import TabBar from '../misc/TabBar';

import Icon from 'react-native-vector-icons/FontAwesome';
import Meteor, {createContainer} from 'react-native-meteor';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';

import DealCard from '../common/DealCard';
import DealsList from '../common/lists/DealsList';
import JobsList from '../common/lists/JobsList';
import PagesList from '../common/lists/PagesList';

const {StatusBarManager} = NativeModules;

class Main extends Component{

	constructor(props) {
		super(props);
		this.state = {
			tab: 'Today',
			loading: true
		}
	}

	changeTab(i){
		this.setState({tab: i});
	}

	componentDidMount() {
		var statusHeight;
		StatusBarManager.getHeight(h => {
			if(h.height){
				console.log(h.height);
				statusHeight = Number(h.height);
			}else{
				statusHeight = 1;
			}

			var navHeight;
			
			if(Platform.OS == 'ios'){ 
				navHeight = Navigator.NavigationBar.Styles.General.NavBarHeight;
			}else if(Platform.OS == 'android'){
				navHeight = 54;
			}

			if(!this.props.references.globalMarginTop && statusHeight && navHeight){
				console.log(statusHeight);
				console.log(navHeight);
				this.props.setGlobalMarginTop(statusHeight + navHeight);
			}
			this.setState({loading: false});
		});	
	}

	render() {

		if(this.state.loading || !this.props.bookDeals || !this.props.deals){
			return <Loading/>
		}

		var which;
		if(this.props.main.userType == 'Deals'){
			var arr = [];
			if(this.state.tab == 'Today'){
				var d = new Date();
				var today = moment(d).format("ll");
				this.props.deals.map(deal => {
					if(deal.date == today){
						arr.push(deal);
					}
				});
			}
			if(this.state.tab == 'Tomorrow'){
				var d = new Date();
				var tomorrow = moment(d).add(1,"day").format("ll");
				this.props.deals.map(deal => {
					if(deal.date == tomorrow){
						arr.push(deal);
					}
				});
			}

			// you still need to sort by upvotes in the list component

			which = (
				<View>
					<View style={{alignItems: 'center', marginTop: 5,}}>	
						<Text>Liked Specials</Text>
						<DealsList fromBook={true} deals={this.props.bookDeals}/>
					</View>
					<View style={styles.bar}/>
					<TabBar changeTab={this.changeTab.bind(this)} isText={true} icons={['Today', 'Tomorrow']}/>
					<View style={{alignItems: 'center'}}>
						<DealsList deals={arr}/>
					</View>
				</View>
			);
		}
		if(this.props.main.userType == 'Pages'){
			
			which = (
				<View>
					<View style={{alignItems: 'center', marginTop: 5,}}>
						<Text>Favorite Businesses</Text>
						<PagesList fromBook={true} pages={this.props.bookPages} />
					</View>
					<View style={styles.bar}/>
					<View style={{alignItems: 'center'}}>
						<Text>Local Businesses</Text>
						<PagesList pages={this.props.pages}/>
					</View>
				</View>
			);
		}
		if(this.props.main.userType == 'Jobs'){
			which = (
				<View style={{alignItems: 'center', marginTop: 5,}}>
					<Text>Jobs</Text>
					<JobsList jobs={this.props.jobs}/>
				</View>
			);
		}

		return(
			<View style={{flex: 1, alignItems: 'center',}}>
				<ScrollView style={{marginTop: this.props.references.globalMarginTop}}>
					{which}
				</ScrollView>
				<TouchableOpacity onPress={() => Actions.Map({type: 'reset', mapType: this.props.main.userType})} activeOpacity={0.8} style={[styles.map, {backgroundColor: this.props.references.color}]}>
					<Icon name="map" color="white" size={20}/>
				</TouchableOpacity>
			</View>
		);
	}
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
	bar: {
		width: width-10,
		height: 1,
		backgroundColor: 'black',
		marginVertical: 10,
	},
	map: {
		padding: 15, 
		position: 'absolute', 
		bottom: 10, 
		right: 10, 
		width: 50, 
		height: 50, 
		borderRadius: 25,
		shadowOffset: {width: 3, height: 5},
		shadowOpacity: 0.2,
		elevation: (Platform.OS == 'android') ? 2 : 0,
	}
});

const mapStateToProps = (state, ownProps) => {
	return{
		references: state.references,
		main: state.main
	}
}

const MeteorContainer = createContainer((props) => {
	Meteor.subscribe('localDeals');
	Meteor.subscribe('bookDeals');
	Meteor.subscribe('localPages');
	Meteor.subscribe('localJobs');

	Meteor.subscribe('profile');

	var profile = Meteor.collection('profile').findOne({});

	return{
		deals: Meteor.collection('deal').find({upvotes: {$not:Meteor.userId()}}),
		bookDeals: Meteor.collection('deal').find({upvotes:Meteor.userId()}),
		pages: Meteor.collection('page').find({_id: {$nin: profile.favorite}}),
		bookPages: Meteor.collection('page').find({_id: {$in: profile.favorite}}),
		jobs: Meteor.collection('job').find(),
		profile
	}
}, Main);

export default connect(mapStateToProps, actions)(MeteorContainer);




