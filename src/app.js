import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import Meteor, {connectMeteor} from 'react-native-meteor';
import {Router, Scene, Actions} from 'react-native-router-flux';

import Init from './components/landing/Init';
import Main from './components/user/Main';
import Loading from './components/misc/Loading';
import Map from './components/user/Map';
import AdminMain from './components/admin/AdminMain';

import {connect} from 'react-redux';
import * as actions from './actions';

@connectMeteor
class App extends Component{
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(nextState.loading !== this.state.loading){
			return true;
		}
		return false;
	}

	componentWillMount() {
		const url = 'wss://veeroption.meteorapp.com/websocket';
		Meteor.connect(url);
	}

	getMeteorData(){	
		return {
			user: Meteor.user()
		};
	}

	render(){

		console.log('-------------rendered root-------------');

		var bool;
		if(Meteor.loggingIn()){
			console.log('stuck logging in');
			return <Loading/>;
		}

		if(!this.props.references.statusBarHeight){
			//console.log(StatusBar);
			//this.props.setStatusBarHeight(StatusBar.currentHeight);
		}

		if(Meteor.userId()){
			bool = true;
		}else{
			bool = false;
		}

		const scenes = Actions.create(
			<Scene key="root">
				<Scene initial={bool} key="tabbar" tabs={true} tabBarStyle={{backgroundColor: 'white'}}>
					<Scene leftButtonIconStyle={{tintColor: 'white'}} key="MainScene">
						<Scene key="Main" component={Main} rightButtonTextStyle={{fontSize: 22, color: 'white',}} rightTitle="Veer" onRight={() => {}}/>
						<Scene key="Map" component={Map}/>
						<Scene key="AdminMain" component={AdminMain}/>
					</Scene>
				</Scene>
				<Scene initial={!bool} hideNavBar={true} key="LoggedOut">
					<Scene key="LoogedOutMain" component={Init}/>
				</Scene>
			</Scene>
		);

		return(
			<Router scenes={scenes} titleStyle={{color: 'white', fontWeight: 'bold'}} style={{borderTopWidth: 0.5, borderColor: '#999999', backgroundColor: 'white'}} navigationBarStyle={{backgroundColor: '#4cd964', opacity: 0.95, shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.4,}} />
		);
	}

}

const mapStateToProps = (state, ownProps) => {
	return{
		references: state.references
	}
}

export default connect(mapStateToProps)(App);



