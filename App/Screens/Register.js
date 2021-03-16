import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { isEmail, printLog } from '../Utils/Validators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constant from '../Utils/Constant';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CommonStyles } from '../Styles/CommonStyles';


class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			gender: '',
			residence: '',
			email: '',
			password: '',
			confirmPassword: '',
			instagramName: ''

		}
	}


	checkValidation = () => {
		const { firstname, lastname, gender, residence, email, password, confirmPassword, instagramName } = this.state
		if (firstname === '') {
			alert('Please enter firstname.')
			return false;
		} else if (lastname === '') {
			alert('Please enter lastname.')
			return false;
		} else if (residence === '') {
			alert('Please enter residence.')
			return false;
		} else if (email === '') {
			alert('Please enter email.')

			return false;
		} else if (!isEmail(email)) {
			alert('Please enter valid email')

			return false;

		} else if (password === '') {
			alert('Please enter password.');

			return false;
		} else if (confirmPassword === '') {
			alert('Please confirm your password.');

			return false;
		}
		else if (password !== confirmPassword) {
			alert('Password and confirm password is not matching');
			return false;
		} else if (instagramName == '') {
			alert('Please enter instagram Name');

			return false;
		} else {
			return true;
		}
	}

	onRegisterPress = () => {
		//this.goToDashboard();
		if (this.checkValidation()) {
			const { firstname, lastname, gender, residence, email, password, confirmPassword, instagramName } = this.state
			const registerData = new FormData();
			/* first_name:Shailesh
			last_name:Patel
			email:abc@siddhiinfosoft.com
			password:123456
			is_term_accept:1
			role:3
			dob:22-08-1994
			gender:1
			address:Ganesh Marediam Ahmedabad
			address_lat:22.999110
			address_long:72.608680
			company_name:Siddhi Infosoft
			contact_person:aasd
			phone:1234
			category:1
			referral_code:1234
			instagram_client_id:1234
			tripadvisor_client_id:1234 */

			registerData.append('first_name', firstname);
			registerData.append('last_name', lastname);
			registerData.append('email', email);
			registerData.append('password', password);
			registerData.append('is_term_accept', 1);
			registerData.append('role', 3);
			registerData.append('dob', '22-08-1994');
			registerData.append('gender', 1);
			registerData.append('address', residence);
			registerData.append('address_lat', '22.999110');
			registerData.append('address_long', '72.608680');
			registerData.append('company_name', 'xyz');
			registerData.append('contact_person', 'xyz');
			registerData.append('category', 1);
			registerData.append('referral_code', '1234');
			registerData.append('instagram_client_id', '1234');
			registerData.append('tripadvisor_client_id', '1234');
			const header = {
				lang: "en",
				apiKey: "T56c5+xwOzn/BjwN774rJ6ugk8i/N7GYJuL2KpxXhuo=",
				appversion: "v1",
				deviceId: "123",
				deviceType: "1",
				deviceToken: "1234",
			}

			fetch('http://tagyou.siddhidevelopment.com/api/v1/auth/register', {
				method: "POST",
				body: registerData,
				headers: header
			})

				.then(response => response.json())
				.then(response => {
					printLog("Response Register===>", response)
					if (response.data.status == 200) {
						alert(response.data.message)
						this.goToLogin();
					} else {
						alert('Please try again')
					}

				})
				.catch(err => console.log('Request Failed', err));

		}
	}

	saveUserData = (userDetails, token) => {
		printLog("saveUserData", userDetails);
		printLog("token", token, token);

		try {
			AsyncStorage.setItem(Constant.USER, JSON.stringify(userDetails));
			AsyncStorage.setItem(Constant.TOKEN, JSON.stringify(token));
			this.goToDashboard();

		} catch (error) {
			printLog('Error in AsyncStorage=====>', error)
		}
	}

	goToLogin = () => {
		this.props.navigation.replace('Login');
	}

	render() {
		const { firstname, lastname, gender, residence, email, password, confirmPassword, instagramName } = this.state
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Login
        		</Text>

				<View style={{ flexDirection: 'row', width: '100%' }}>
					<TextInput
						placeholder="First Name"
						value={firstname}
						onChangeText={(firstname) => this.setState({ firstname })}
						numberOfLines={1}
						maxLength={15}
						style={[styles.textInput, { width: '50%', marginEnd: 10 }]}
					/>

					<TextInput
						placeholder="Last Name"
						value={lastname}
						onChangeText={(lastname) => this.setState({ lastname })}
						numberOfLines={1}
						maxLength={15}
						style={[styles.textInput, { width: '50%', marginEnd: 10 }]}
					/>

				</View>



				<TextInput
					placeholder="Residence"
					value={residence}
					onChangeText={(residence) => this.setState({ residence })}
					numberOfLines={1}
					maxLength={15}
					style={[styles.textInput]}
				/>

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

				<TextInput
					value={confirmPassword}
					placeholder={'ConfirmPassword'}
					secureTextEntry={true}
					numberOfLines={1}
					maxLength={20}
					style={styles.textInput}
					onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
				/>

				<TextInput
					value={instagramName}
					placeholder={'Instagram Name'}
					numberOfLines={1}
					maxLength={20}
					style={styles.textInput}
					onChangeText={(instagramName) => this.setState({ instagramName })}
				/>


				<TouchableOpacity style={CommonStyles.button}
					onPress={this.onRegisterPress}>
					<Text style={styles.text} >
						Register
					</Text>
				</TouchableOpacity>



			</View>
		);
	}



}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white,
		paddingHorizontal: 20
	},
	welcome: {
		fontSize: 22,
		textAlign: 'center',
		margin: 10,
		color: '#F5FCFF',
		fontWeight: 'bold'
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
		marginVertical: 5,
		paddingStart: 10,
		borderColor: 'grey',
		borderWidth: 1,
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
		textAlign: 'center',
		fontWeight: 'bold'
	},
	validationText: {
		fontSize: 15,
		textAlign: 'left',
	}
});

export default Register;