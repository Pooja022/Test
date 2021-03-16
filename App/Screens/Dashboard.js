import React, { Component } from "react";
import { View, FlatList, Text, Image, ActivityIndicator, Dimensions } from 'react-native';
import { DashboardStyle } from "../Styles/DashboardStyle";
import { printLog } from "../Utils/Validators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constant from "../Utils/Constant";

const { width, height } = Dimensions.get('screen')

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			offers: [],

			token: '',
			isLoading: false,
		}
		this.token = ''
	}

	async componentDidMount() {

		this.getDataFromAsyncStorage();
		this.setState({
			isLoading: true
		})
	}

	getDataFromAsyncStorage = async () => {
		try {
			let token = await AsyncStorage.getItem(Constant.TOKEN);
			this.setState({
				token: token
			})
			this.getOffer();

		} catch (error) {
			printLog('catch=======>', error);

		}
	}

	getOffer = () => {


		let token = this.state.token;
		const header = {
			lang: "en",
			apiKey: "T56c5+xwOzn/BjwN774rJ6ugk8i/N7GYJuL2KpxXhuo=",
			appversion: "v1",
			deviceId: "123",
			deviceType: "1",
			deviceToken: "1234",
			Authorization: 'Bearer ' + token
		}
			printLog(header)

		fetch('http://tagyou.siddhidevelopment.com/api/v1/offers', {
			method: "GET",
			headers: header
		})
			.then(response => response.json())
			.then(response => {
				printLog(response);
				if (response.data.status == 200) {
					this.setState({
						offers: response.data.offers.data,
						isLoading: false
					})
				} else {
					alert('Something went wrong');
					this.setState({
						isLoading: false
					})
				}
			})
			.catch(err => {
				this.setState({
					isLoading: false,
				})
				console.log('Request Failed', err)
			});
	}


	render() {
		const { offers, isLoading } = this.state

		return (
			<View style={{ flex: 1 }}>
				<View style={{ position: 'absolute', left: width * 0.5, top: height * 0.4, zIndex: 1 }}>
					<ActivityIndicator size="large" color="#0000ff" animating={isLoading} />
				</View>
				<FlatList
					data={offers}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => renderOffer(item)}
				/>
			</View>
		)
	}
}

const renderOffer = (item) => {
	return (
		<View style={DashboardStyle.cardContainer}>
			<Image
				source={
					{ uri: item.offer_img }
				} style={DashboardStyle.image}
			/>
			<View style={{ flexDirection: 'column', marginStart: 20 }}>
				<Text>{item.offer_title}</Text>
			</View>
		</View>
	)
}


export default Dashboard;
