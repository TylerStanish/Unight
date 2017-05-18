import React, {Component} from 'react';
import {
	View, 
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	Platform,
	Alert,
	Dimensions,
	TextInput,
} from 'react-native';

import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import Meteor, {createContainer} from 'react-native-meteor';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import Geocoder from 'react-native-geocoding';

import Button from '../misc/Button';
import OrgModal from '../common/OrgModal';
import Loading from '../misc/Loading';

class Map extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			latitude: props.profile.lat,
			longitude: props.profile.long,
			latitudeDelta: 25,
			longitudeDelta: 25,
			popup: false,
			visible: false,
			org: null
		}
	}

	goToSearch(){
		this.setState({popup: true}, () => {
			this.refs.search.focus(); 
		});
	}

	goToCurrentLocation(){

		navigator.geolocation.getCurrentPosition((position) => {
			var pos = JSON.stringify(position);
			var lat = pos.coords.latitude;
			var lon = pos.coords.longitude;
			console.log(pos);
			this.setState({latitude: lat, longitude: lon});
		},(error) => console.log(JSON.stringify(error)),
			{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
		);
	}

	search(){
		// display the popup
		// center the map at the location
		// update the profile long and lat
		// hide the popup
		Geocoder.getFromLocation(this.state.search.toString()).then(res => {
			var latitude = res[0].results.geometry.location.lat;
			var longitude = res[0].results.geometry.location.lng;
			this.setState({
				latitude, longitude, latitudeDelta: 0.05, longitudeDelta: 0.05,
			});
			Meteor.call('profile.newLocation', [longitude, latitude], (error) => {
				if(!error){
					this.setState({popup: false});
				}else{
					console.log(error);
				}
			});
		}, error => {
			console.log(error);
			Alert.alert('Invalid address!');
		});
	}

	backToList(){
		Actions.Main({type: 'reset'});
	}

	setVisible(bool){
		this.setState({visible: bool});
	}

	updateRegion(region){
		if(Math.random() > 0.5){
			Meteor.call('profile.newLocation', {long: region.longitude, lat: region.latitude}, (error) => {
				if(error){
					console.log(error);
				}else{
					console.log(this.props.pages);
					Meteor.subscribe('localPages');
					Meteor.subscribe('localDeals');
				}
			});
		}
	}

	renderMarkers(){
		return this.props.pages.map(page => {
			if(this.props.mapType == 'Deals'){	
				var color = 'black';
				this.props.localDeals.map(deal => {
					if(deal.pageID == page._id){
						color = this.props.references.color;
					}
				});
				return(
					<MapView.Marker
						pinColor={color}
						key={page._id}
						coordinate={{latitude: page.lat, longitude: page.long}}
						onSelect={() => this.setState({org: page, visible: true})}
						onPress={() => this.setState({org: page, visible: true})}
					/>
				);
			}
			if(this.props.mapType == 'Jobs'){
				var color = 'black';
				this.props.localJobs.map(job => {
					if(job.pageID == page._id){
						color = this.props.references.color;
					}
				});
				return(
					<MapView.Marker
						pinColor={color}
						key={page._id}
						coordinate={{latitude: page.lat, longitude: page.long}}
						onSelect={() => this.setState({org: page, visible: true})}
						onPress={() => this.setState({org: page, visible: true})}
					/>
				);
			}
			if(this.props.mapType == 'Pages'){
				return(
					<MapView.Marker
						pinColor={this.props.references.color}
						key={page._id}
						coordinate={{latitude: page.lat, longitude: page.long}}
						onSelect={() => this.setState({org: page, visible: true})}
						onPress={() => this.setState({org: page, visible: true})}
					/>
				);
			}
		});
	}

	render(){

		if(!this.props.profile){
			return <Loading/>
		}

		var popup;
		if(this.state.popup){
			popup = (
				<View style={{alignItems: 'center', justifyContent: 'space-between', zIndex: 9, backgroundColor: 'white', position: 'absolute', height: 200, width: 200, top: height/2 - 100, right: width/2 - 100}}>
					<Text style={styles.title}>Search</Text>
					<Text style={styles.text}>Pick a new location</Text>
					<TextInput
						style={styles.input}
						ref="search"
						returnKeyType={"search"}
						onChangeText={(search) => this.setState({search})}
						autoCorrect={false}
						placeholder="Location"
						onSubmitEditing={() => this.search()}
					/>
					<Button text="Search" onPress={() => this.search()}/>
					<Button text="Close" onPress={() => this.setState({popup: false})}/>
				</View>
			);
		}

		return(
			<View style={{flex: 1,}}>
				{/* Insert map here */}
				<MapView.Animated onRegionChange={this.updateRegion.bind(this)} style={{flex: 1,}} initialRegion={{latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: this.state.latitudeDelta, longitudeDelta: this.state.longitudeDelta}}>
					{this.renderMarkers()}
				</MapView.Animated>

				<TouchableOpacity onPress={() => this.backToList()} style={[{right: 10, backgroundColor: this.props.references.color}, styles.button]}>
					<Icon name="list" color="white" size={20}/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.goToSearch()} style={[{right: 70, backgroundColor: 'yellow'}, styles.button]}>
					<Icon name="search" color="white" size={20}/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.goToCurrentLocation()} style={[{right: 130, backgroundColor: 'blue'}, styles.button]}>
					<Icon name="location-arrow" color="white" size={20}/>
				</TouchableOpacity>
				{popup}
				<OrgModal visible={this.state.visible} org={this.state.org} setVisible={this.setVisible.bind(this)}/>
			</View>
		);
	}
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20,
	},
	text: {
		textAlign: 'center',
		fontSize: 18
	},
	input: {
		height: 40,
		width: 180,
		marginHorizontal: 10,
		padding: 10,
		marginBottom: 10,
		backgroundColor: 'white',
		borderColor: 'gray',
		borderWidth: 1,
	},
	button: {
		position: 'absolute',
		bottom: 10,
		height: 50,
		width: 50,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		shadowOffset: {width: 3, height: 5},
		shadowOpacity: 0.2,
		elevation: (Platform.OS == 'android') ? 2 : 0,
	}
});

const mapStateToProps = (state, ownProps) => {
	return{
		references: state.references,
	}
}

const MeteorContainer = createContainer(props => {
	
	var subscription = Meteor.subscribe("profile");
	Meteor.subscribe('localPages');
	Meteor.subscribe("localDeals");
	Meteor.subscribe("localJobs");

	var profile = Meteor.collection('profile').findOne({});
	var localDeals = Meteor.collection('deal').find({});
	console.log(profile);

	var loading = !subscription.ready();

	return{
		profile,
		pages: Meteor.collection('page').find({}),
		localDeals,
		localJobs: Meteor.collection('job').find({}),
		loading,
	}
}, Map);

export default connect(mapStateToProps)(MeteorContainer);


