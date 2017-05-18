import React, {Component} from 'react';
import {
	View, 
	Text, 
	TouchableOpacity, 
	Dimensions, 
	Image, 
	StyleSheet,
	Platform,
	Alert,
	Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Meteor, {createContainer} from 'react-native-meteor';

import InfoColumn from './InfoColumn';
import Loading from '../misc/Loading';
import Button from '../misc/Button';

class DealCard extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			height: 0,
			visible: false,
		}
	}

	upvote(){
		console.log('tyring to upvote');
		Meteor.call('profile.book', this.props.deal._id, (error) => {
			if(error){
				Alert.alert('There was an error');
			}
		});
	}

	setHeight(event){
		var height = event.nativeEvent.layout.height;
		if(height && (this.state.height != height)){
			this.setState({height});
		}
	}

	render() {

		if(!this.props.profile || !this.props.deal){
			return <Loading/>
		}

		var uri;
		if(this.props.deal.picture.substring(0,1) == '/'){
			uri = 'https://www.veeroption.com' + this.props.deal.picture;
		}else{
			uri = this.props.deal.picture;
		}

		return(
			<View>
				<TouchableOpacity onPress={() => this.setState({visible: true})} onLayout={this.setHeight.bind(this)} style={styles.container}>
					<Image
						source={{uri}}
						style={[{zIndex: 5, width: 50, height: 50}, styles.image]}
						
					/>
					<InfoColumn deal={this.props.deal}/>
					<TouchableOpacity activeOpacity={0.8} onPress={() => this.upvote()}>
						<Icon name="thumbs-up" color={(this.props.fromBook) ? this.props.references.color : "black"} size={20}/>
						<Text>{this.props.deal.upvotes.length}</Text>
					</TouchableOpacity>
				</TouchableOpacity>
				<Modal animationType="slide" visible={this.state.visible}>
					<View style={{flex: 1,}}>
						<View style={{padding: 15, backgroundColor: this.props.references.color, justifyContent: 'flex-end', alignItems: 'flex-end', height: this.props.references.globalMarginTop, width: width}}>
							<TouchableOpacity onPress={() => this.setState({visible: false})}>
								<Icon name="times" size={30} color="white"/>
							</TouchableOpacity>
						</View>
						<Image
							source={{uri: this.props.deal.picture}}
						/>
						<TouchableOpacity activeOpacity={0.8} onPress={() => this.upvote()}>
							<Icon name="thumbs-up" color={(this.props.fromBook) ? this.props.references.color : "black"} size={20}/>
							<Text>{this.props.deal.upvotes.length}</Text>
						</TouchableOpacity>
						<InfoColumn deal={this.props.deal}/>
					</View>
				</Modal>
			</View>
		);
	}
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		width: width-10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.2,
		elevation: (Platform.OS == 'android') ? 2 : 0,
	},
	image: {

	}
});

const mapStateToProps = (state, ownProps) => {
	return{
		references: state.references,
	}
}

const MeteorContainer = createContainer((props) => {
	
	Meteor.subscribe('profile');

	return{
		profile: Meteor.collection('profile').findOne({}),
	}
}, DealCard);

export default connect(mapStateToProps)(MeteorContainer);

