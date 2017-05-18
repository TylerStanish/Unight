import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import DealCard from '../DealCard';
import Loading from '../../misc/Loading';

class DealsList extends Component{
	
	renderList(){

		var arr = this.props.deals.sort(function(b,a) {
		    return parseFloat(a.upvotes.length) - parseFloat(b.upvotes.length);
		});

		return arr.map(deal => {
			return(
				<View key={deal._id}>
					<DealCard fromBook={this.props.fromBook} deal={deal}/>
				</View>
			);
		});
	}

	render() {
		
		if(!this.props.deals){
			return <Loading/>
		}

		return(
			<View>
				{this.renderList()}
			</View>
		);
	}
}

const styles = StyleSheet.create({

});

export default DealsList;