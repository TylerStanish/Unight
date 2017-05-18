import React, {Component} from 'react';
import {Modal, TouchableOpacity, View, Text, StyleSheet, Image, Dimensions, Platform} from 'react-native';

import Loading from '../misc/Loading';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class JobsCard extends Component{
	
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

	render() {

		if(!this.props.job){
			return <Loading/>
		}

		console.log(this.props.job);

		var uri;
		if(this.props.job.picture.substring(0,1) == '/'){
			uri = 'https://www.veeroption.com' + this.props.job.picture
		}else{
			uri = this.props.job.picture;
		}

		return(
			<View>
				<TouchableOpacity onPress={() => this.setState({visible: true})} activeOpacity={0.8} onLayout={(event) => this.setHeight(event)} style={[{height: this.state.height}, styles.card]}>
					<Image
						source={{uri}}
						style={{marginRight: 5, width: width/4, height: width/4}}
					/>
					<View>
						<Text style={styles.title}>{this.props.job.title}</Text>
						<Text style={styles.text}>{this.props.job.pageName}</Text>
						<Text>Date posted: {this.props.job.datePosted}</Text>
					</View>
				</TouchableOpacity>
				<Modal visible={this.state.visible} animationType='slide'>
					<View style={{justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: this.props.references.color, height: this.props.references.globalMarginTop}}>
						<TouchableOpacity style={{padding: 15}} onPress={() => this.setState({visible: false})}>	
							<Icon name="times" color="white" size={30} />
						</TouchableOpacity>
					</View>
					<View style={{alignItems: 'center'}}>
						<View style={styles.imageWrapper}>
							<Image
								source={{uri}}
								style={styles.bigImage}
							/>
						</View>
						<Text style={styles.title}>{this.props.job.title}</Text>
						<Text style={styles.text}>{this.props.job.pageName}</Text>
						<Text style={styles.text}>{this.props.job.datePosted}</Text>
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

export default connect(mapStateToProps)(JobsCard);


