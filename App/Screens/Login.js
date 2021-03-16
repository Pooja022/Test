import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image
} from 'react-native';
import { isEmail, printLog } from '../Utils/Validators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constant from '../Utils/Constant';
import { CommonStyles } from '../Styles/CommonStyles';
import Images from '../Utils/Images';
import { Colors } from 'react-native/Libraries/NewAppScreen';


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {

			password: '',
			email: '',

		}
	}


	checkValidation = () => {

		const { email, password } = this.state;


		if (email === '') {
			alert('Please enter email');
			return false;
		} else if (!isEmail(email)) {
			alert('Please enter  valid email');

			return false;
		} else if (password === '') {
			alert('Please enter paswword');
			return false;
		} else {
			return true;
		}
	}

	onLoginPress = () => {
		if (this.checkValidation()) {
			const { email, password } = this.state;

			const logindata = new FormData();

			logindata.append('email', email);
			logindata.append('password', password);
			const header = {
				lang: "en",
				apiKey: "T56c5+xwOzn/BjwN774rJ6ugk8i/N7GYJuL2KpxXhuo=",
				appversion: "v1",
				deviceId: "123",
				deviceType: "1",
				deviceToken: "1234",
			}


			fetch('http://tagyou.siddhidevelopment.com/api/v1/auth/login', {
				method: "POST",
				body: logindata,
				headers: header
			})

				.then(response => response.json())
				.then(response => {
					printLog("Response Login===>", response)
					if (response.data.status == 200) {
						this.saveUserData(response.data.token)
					} else {
						alert('Please try again')
					}

				})
				.catch(err => console.log('Request Failed', err));

		}
	}

	saveUserData = (token) => {
		printLog("token", token);

		try {
			AsyncStorage.setItem(Constant.TOKEN, token);
			this.goToDashboard();

		} catch (error) {
			printLog('Error in AsyncStorage=====>', error)
		}
	}

	goToDashboard = () => {
		this.props.navigation.replace('Dashboard');
	}

	render() {
		const { email, password } = this.state
		return (
			<View style={styles.container}>

				<View tyle={{ alignItems: 'center' }}>
					<Image source={Images.logo} style={CommonStyles.imageStyle} />
				</View>

				<View style={{ width: '100%', justifyContent: 'center' }}>

					<TextInput
						value={email}
						onChangeText={(email) => this.setState({ email })}
						numberOfLines={1}
						maxLength={40}
						style={styles.textInput}
						placeholder={'Email'}
						keyboardType={'email-address'}
					/>

					<TextInput
						value={password}
						placeholder={'Password'}
						secureTextEntry={true}
						numberOfLines={1}
						maxLength={20}
						onChangeText={(password) => this.setState({ password })}
						style={styles.textInput}
					/>

					<Text style={styles.text} >
						Forgot Password?

					</Text>

				</View>


				<TouchableOpacity style={CommonStyles.button}
					onPress={this.onLoginPress}>
					<Text style={styles.text} >
						Login
					</Text>
				</TouchableOpacity>



			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: Colors.white,
		paddingHorizontal: 20
	},

	instructions: {
		textAlign: 'center',
		color: '#F5FCFF',
		marginBottom: 5,
	},
	textInput: {
		height: 50,
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 7,
		marginVertical: 15,
		paddingStart: 10,
		borderColor: 'grey',
		borderWidth: 1
	},

	button: {
		width: '50%',
		marginTop: 30,
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center',
		height: 40,
		justifyContent: 'center'
	},
	text: {
		fontSize: 16,
		textAlign: 'right',
		fontWeight: 'bold'
	},
	validationText: {
		fontSize: 15,
		textAlign: 'left',
	}
});

export default Login;