import React, {Component} from 'react';
import App from './app.js';
import {Provider} from 'react-redux';
// Fix this redux import!
import {createStore} from 'redux';
import reducers from './reducers';
import Meteor from 'react-native-meteor';

import Drawer from 'react-native-drawer';
import ControlPanel from './ControlPanel';

import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyAWySYueukAQ2izgcYAE_KNharxkS6WLlc');

class Index extends Component{

	constructor(props) {
		super(props);
		
	}

	closeDrawer(){
		this._ref.close();
	}

	render(){
		// perhaps add in the side bar here, in the parent component?
		
		return(
			<Provider store={createStore(reducers)}>
				<Drawer
					ref={(ref) => this._ref = ref}
					type="displace"
					content={<ControlPanel closeDrawer={this.closeDrawer.bind(this)} />}
					tapToClose={true}
					openDrawerOffset={0.2} // 20% gap on the right side of drawer
					panCloseMask={0.2}
					closedDrawerOffset={-3}
					styles={drawerStyles}
					tweenHandler={(ratio) => ({
					main: { opacity:(2-ratio)/2 }
					})}
				>
					<App/>
				</Drawer>
			</Provider>
		);
	}
};

const drawerStyles = {
	drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
	main: {paddingLeft: 3},
}

export default Index;



