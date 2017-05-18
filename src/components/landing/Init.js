import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, TextInput, Image, findNodeHandle, Dimensions} from 'react-native';
import {BlurView} from 'react-native-blur';

import Loading from '../misc/Loading';
import Button from '../misc/Button';

import {Actions} from 'react-native-router-flux';
import Meteor from 'react-native-meteor';
import {connect} from 'react-redux';

class Init extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			rotate: new Animated.Value(0),
			margin: new Animated.Value(50),
			opacity: new Animated.Value(0),
		}
	}

	login(){
		this.setState({error: null, loading: true});
		if(this.state.email && this.state.password){
			Meteor.loginWithPassword(this.state.email, this.state.password, (error, res) => {
				if(error){
					this.setState({error: error.reason, loading: false});
				}else{
					console.log('got here');
					Actions.tabbar({type: 'reset'});
					this.setState({email: null, password: null});
				}
			});
		}else{
			this.setState({error: 'Missing field(s)', loading: false});
		}
	}

	createAccount(){

	}

	imageLoaded(){
		this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
	}

	componentDidMount() {
		Animated.sequence([
			Animated.parallel([
				Animated.timing(
					this.state.margin,
					{
						toValue: 0,
						duration: 1500,
					}
				),
				Animated.timing(
					this.state.opacity,
					{
						toValue: 1,
						duration: 1500
					}
				)
			]),
			Animated.sequence([
				Animated.timing(
					this.state.rotate,
					{
						toValue: 12.5,
					}
				),
				Animated.spring(
					this.state.rotate,
					{
						toValue: -100,
						duration: 500,
					}
				)
			])
		]).start();
	}

	render() {

		var interpolatedValue = this.state.rotate.interpolate({
			inputRange: [0, 100],
			outputRange: ['0deg', '360deg']
		});

		return(
			<View style={styles.container}>
		{/* Add in the react-native-dismiss-keyboard library! */}
				<Image
					ref={(img) => this.backgroundImage = img}
					source={require('../../../assets/city.jpg')}
					style={{position: 'absolute', height: 1000, width: 1000}}
					onLoadEnd={this.imageLoaded.bind(this)}
				/>
				<BlurView
					style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
					viewRef={this.state.viewRef}
					blurType="light"
					blurAmount={5}
				/>
				<Animated.View style={{transform: [{rotate: interpolatedValue}]}}>
					<Image
						source={require('../../../assets/veergreen.png')}
						style={{
							marginTop: 40, 
							height: width/2, 
							width: width/2,
						}}
					/>
				</Animated.View>
				<Animated.View style={[{opacity: this.state.opacity, marginTop: this.state.margin}, styles.container]}>
					<TextInput
						style={styles.input}
						keyboardType="email-address"
						ref="email"
						returnKeyType={"next"}
						onChangeText={(email) => this.setState({email})}
						autoCapitalize="none"
						autoCorrect={false}
						placeholder="Email"
						onSubmitEditing={() => this.refs.password.focus()}
					/>
					<TextInput
						style={styles.input}
						secureTextEntry={true}
						ref="password"
						returnKeyType={"go"}
						onChangeText={(password) => this.setState({password})}
						autoCapitalize="none"
						autoCorrect={false}
						placeholder="Password"
						onSubmitEditing={() => this.login()}
					/>
					<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
						<Button onPress={() => this.login()} text="Log in" width={width/2.5} height={60}/>
						<View style={{width: width/9}}/>
						<Button onPress={() => this.createAccount()} text="Create Account" width={width/2.5} height={60}/>
					</View>
					<Text style={styles.error}>{this.state.error}</Text>
				</Animated.View>
				<Text style={[{color: this.props.references.color}, styles.forgotPassword]}>Forgot password?</Text>
			</View>
		);
	}
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
	},
	input: {
		height: 40,
		width: 8*width/9,
		marginHorizontal: width/18,
		padding: 10,
		marginBottom: 10,
		backgroundColor: 'white',
		borderColor: 'gray',
		borderWidth: 1,
	},
	error: {
		margin: 10,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'red',
		backgroundColor: 'transparent'
	},
	forgotPassword: {
		position: 'absolute',
		bottom: 0,
		backgroundColor: 'transparent',
		fontStyle: 'italic',
		paddingBottom: 25,
		fontSize: 16,
		fontWeight: 'bold',
	}
});

const mapStateToProps = (state, ownProps) => {
	return{
		references: state.references,
	}
}

export default connect(mapStateToProps)(Init);



