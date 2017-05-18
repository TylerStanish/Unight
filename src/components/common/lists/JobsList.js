import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import Meteor from 'react-native-meteor';

import Loading from '../../misc/Loading';
import JobsCard from '../../common/JobsCard';

class JobsList extends Component{
	
	renderJobs(){
		return this.props.jobs.map(job => {
			return(
				<View key={job._id}>
					<JobsCard job={job}/>
				</View>
			);
		});
	}

	render() {

		if(!this.props.jobs){
			return <Loading/>
		}

		return(
			<View>
				{this.renderJobs()}
			</View>
		);
	}
}

const styles = StyleSheet.create({

});

export default JobsList;