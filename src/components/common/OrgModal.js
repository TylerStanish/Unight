import React, {Component} from 'react';
import {
	View, 
	StyleSheet, 
	Text, 
	Modal, 
	Dimensions,
	TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class OrgModal extends Component{
	
	constructor(props) {
		super(props);
		
	}

	render() {
		return(
			<Modal animationType="slide" visible={this.props.visible}>
				<View style={{justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: this.props.references.color, height: this.props.references.globalMarginTop, width: width}}>
					<TouchableOpacity style={{padding: 15}} onPress={() => this.props.setVisible(false)}>
						<Icon name="times" size={30} color="white"/>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({

});

const {width} = Dimensions.get('window');
const mapStateToProps = (state, ownProps) => {
	return{
		references: state.references
	}
}

export default connect(mapStateToProps)(OrgModal);


