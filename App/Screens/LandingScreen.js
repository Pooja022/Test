import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Image
} from 'react-native';
import Colors from '../Utils/Colors';
import Constant from '../Utils/Constant';
import CommonStyles from '../Styles/CommonStyles';
import Images from '../Utils/Images';



export default class LandingScreen extends Component {


	moveToLogin = () => {
		this.props.navigation.navigate('Login');
	}

	moveToRegister = () => {
		this.props.navigation.navigate('Register');
	}

	render() {
		return (
			<View style={styles.container}>
				<View tyle={{ alignItems: 'center' }}>
					<Image source={Images.logo} style={styles.imageStyle} />
				</View>

				<View style={{ alignItems: 'center', }}>
					<Text style={[styles.buttonText, { color: Colors.black }]}>
						For..
					</Text>

					<TouchableOpacity
						onPress={this.moveToRegister}
						style={styles.button}>
						<Text style={styles.buttonText}>{Constant.creator}</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.moveToRegister}
						style={styles.button}>
						<Text style={styles.buttonText}>{Constant.companies}</Text>
					</TouchableOpacity>
				</View>

				<View style={{ alignItems: 'center' }}>
					<Text>Already have an account?</Text>
					<TouchableOpacity
						onPress={this.moveToLogin}
						style={{ backgroundColor: Colors.white }}>
						<Text style={[styles.buttonText, { color: Colors.black }]}>Login here</Text>
					</TouchableOpacity>

				</View>




			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 30,
		backgroundColor: Colors.white,
	},

	instructions: {
		textAlign: 'center',
		color: '#F5FCFF',
		marginBottom: 5,
	},
	button: {
		height: 70,
		width: 250,
		borderRadius: 10,
		backgroundColor: 'pink',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10
	},

	buttonText: {
		textAlign: 'center',
		color: Colors.white,
		fontSize: 16,
		fontWeight: 'bold'
	},
	imageStyle: {
		height: 100,
		width: 100
	}
});