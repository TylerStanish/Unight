import React, {Component} from 'react';
import {
	View, 
	TouchableOpacity, 
	Text, 
	StyleSheet, 
	Image, 
	Dimensions, 
	Platform,
	Modal,
	TouchableHighlight,
} from 'react-native';

import Loading from '../misc/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../misc/Button';

import Meteor from 'react-native-meteor';
import {connect} from 'react-redux';

class PageCard extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		}
	}

	setHeight(event){
		var height = event.nativeEvent.layout.height;
		if(height && (this.state.height != height)){
			this.setState({height});
		}
	}

	addToFavorites(){
		Meteor.call('page.favorite', this.props.page._id, (error) => {
			if(error){
				console.log(error);
			}
		});
	}

	render() {

		if(!this.props.page){
			return <Loading/>
		}

		console.log(this.props.page);

		var uri;
		if(this.props.page.image.substring(0,1) == '/'){
			uri = 'https://www.veeroption.com' + this.props.page.image;
		}else{
			uri = this.props.page.image;
		}

		var text;
		if(this.props.fromBook){
			text = "Remove from favorites";
		}else{
			text = "Add to favorites";
		}

		return(
			<View>
				<TouchableOpacity onPress={() => this.setState({visible: true})} activeOpacity={0.8} onLayout={(event) => this.setHeight(event)} style={[{height: this.state.height}, styles.card]}>
					<Image
						source={{uri}}
						style={{marginRight: 5, width: width/4, height: width/4}}
					/>
					<View style={{flexDirection: 'column'}}>
						<Text style={styles.title}>{this.props.page.pageName}</Text>
						<Text style={styles.text}>{this.props.page.about}</Text>
						<TouchableHighlight onPress={this.addToFavorites.bind(this)} activeOpacity={0.8} underlayColor={this.props.references.color}>
							<Text>{text}</Text>
						</TouchableHighlight>
					</View>
				</TouchableOpacity>
				<Modal visible={this.state.visible} animationType='slide'>
					<View style={{alignItems: 'flex-end', backgroundColor: this.props.references.color, width, height: this.props.references.globalMarginHeight}}>
						<TouchableOpacity style={{padding: 15,}} onPress={() => this.setState({visible: false})}>
							<Icon name="times" size={30} color="white"/>
						</TouchableOpacity>
					</View>
					<View style={{alignItems: 'center'}}>
						<View style={styles.imageWrapper}>
							<Image
								source={{uri}}
								style={styles.bigImage}
							/>
						</View>
						<Text style={styles.title}>{this.props.page.pageName}</Text>
						<Text style={styles.text}>{this.props.page.about}</Text>
						<Text style={styles.text}>{this.props.page.phone}</Text>
					</View>
				</Modal>
			</View>
		);
	}
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 18
	},
	text: {
		fontSize: 16
	},
	card: {
		marginVertical: 5, 
		flexDirection: 'row', 
		width,
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.2,
		elevation: (Platform.OS == 'android') ? 2 : 0,
	},
	bigImage: {
		height: width-10,
		width: width-10,
	},
	imageWrapper: {
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.2,
		elevation: (Platform.OS == 'android') ? 2 : 0,
		margin: 5,
		marginBottom: 10,
	}
});

const mapStateToProps = (state, ownProps) => {
	return{
		references: state.references
	}
}

export default connect(mapStateToProps)(PageCard);


