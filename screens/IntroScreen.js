import React from 'react';
import { Image, AsyncStorage, FlatList, TouchableOpacity, View, Dimensions, StatusBar, Platform } from 'react-native';
import Colors from '../constants/Colors';
import IntroBox from '../components/IntroBox';
import LoadingIndicator from '../components/LoadingIndicator';
import Server from '../constants/server';
import firebase, { RemoteMessage, Notification, NotificationOpen } from 'react-native-firebase';
import {ImageBackground,Title,Text,Button} from '@shoutem/ui';
export default class Intro extends React.Component {
	static navigationOptions = () => ({
		title: 'الرئيسيه',
		header: null,
		headerTintColor: Colors.smoothGray,
		fontFamily: 'Droid Arabic Kufi',
		headerStyle: {
			backgroundColor: Colors.mainColor,
			borderBottomColor: Colors.mainColor,
			borderBottomWidth: 3,
		},
		headerTitleStyle: {
			fontWeight: '300',
			color: '#ffffff',
			fontFamily: 'Droid Arabic Kufi',
			fontSize: 16
		},
	});

	constructor(props) {
		super(props);
		firebase.messaging().getToken()
		.then(fcmToken => {
			if (fcmToken) {
				// user has a device token
				console.log('Got device token.')
				AsyncStorage.setItem('token',''+fcmToken);
				AsyncStorage.getItem('userid').then((userid)=>{
					fetch(Server.dest + '/api/add-user-token?user_id=' + userid +
					'&token=' + fcmToken, { headers: { 'Cache-Control': 'no-cache' } }).
					then((res) => res.json()).then((res) => {
						console.log(fcmToken);
						console.log(res);
					})
				})

			} else {
				// user doesn't have a device token yet
				console.log('user does not have a token')
				fetch(Server.dest + '/api/add-user-token?user_id=' + userid +
				'&token=' + "", { headers: { 'Cache-Control': 'no-cache' } }).
				then((res) => res.json()).then((res) => {
					console.log(fcmToken);
					console.log(res);
					// this.navigateToHome();
				})
			}
		});

		this.state = {
			doneFetches: 1,

			tabs: [{
				key: '1',
				screenName: 'المحل التجاري',
				to: 'Home',
				id: 2,
                img:0
			},
			{
				key: '2',
				screenName: 'الصالون',
				to: 'Home',
				id: 1,
                img:1
			}],
			SpecialOrderStatus: 0,
			//image: 'https://pbs.twimg.com/media/DkXAIiKWsAAMRVJ.jpg:large'
			image: 'http://'
		}
	}

	componentWillMount() {
		StatusBar.setBarStyle('light-content')

		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor(Colors.mainColor, true)
		}
	}

	componentDidMount() {
		AsyncStorage.getItem('login').then(
			(logged) => {
				this.setState({ login_state: logged })
			}
		);

		fetch(
			Server.dest +
			'/api/special_orders_status'
		).then(res => res.json())
			.then(status => {
				this.setState({ SpecialOrderStatus: status.status })
			})
		fetch(
			Server.dest +
			'/api/image'
		).then(res => res.json())
			.then(status => {
				this.setState({ image: status.background })
			})
		// fetch(Server.dest + '/api/store-categories?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((categories)=>{
		//    this.setState({ tabs: categories.response });
		//  });
		//  fetch(Server.dest + '/api/store-info?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((restaurants)=>{
		//     this.setState({
		//       Restaurant: [restaurants.response],
		//       doneFetches:1
		//     })
		//   })


		// Inneed      onPress={() => onPressHandler(page)

	}

	shouldRenderLoginButton = () => {
		if (this.state.login_state === undefined) {
			return null
		}
		else if (this.state.login_state === '1') {
			return null
		}
		else {
			return (
				<TouchableOpacity onPress={() => {
					AsyncStorage.setItem('SkippedLogin', '0');
					AsyncStorage.setItem('login', '0');
					this.props.navigation.navigate('Signin', {});
				}}
				>
					<View
						style={{
							alignSelf: 'center',
							height: 50,
							marginTop: 15,
							width: 150,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 50,
							backgroundColor: '#ebb70a'
						}}>
						<Text style={{
							textAlign: 'center',
							backgroundColor: 'transparent',
							color: 'white',
							fontFamily: 'Droid Arabic Kufi',
							fontSize: 16
						}}>تسجيل الدخول</Text>
					</View>

				</TouchableOpacity>
			)
		}
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View>

                <ImageBackground
                    source={require('../assets/images/intro.jpeg')}
                    style={{width:'100%',height:'100%'}}
                >
                    <View style={{width:'90%',flex:.5,justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:30,textAlign:'center'}}> ALMAHRA </Text>
                    <Text style={{color:'white',fontStyle:'italic',textAlign:'center'}}>Fashion Group</Text>
                    </View>
                    <View style={{flex:.2,flexDirection:'column',width:'80%'}} >
                        <Button
                            styleName="confirmation"
							style={{margin:10}}
                            onPress={()=>{
                                navigate('Home', { id: 2 })
                            }}
                        >
                            <Text style={{color:'black',fontStyle:'italic',textAlign:'center',fontSize:15}} >Shop Center</Text>
                        </Button>

                        <Button
                            styleName="confirmation"
                            style={{backgroundColor:Colors.mainColor,borderColor:Colors.mainColor,margin:10}}
                            onPress={()=>{
                                navigate('Home', { id: 1 })
                            }}
                        >
                            <Text style={{color:'white',fontStyle:'italic',textAlign:'center',fontSize:15}}>Beauty Center</Text>
                        </Button>
                    </View>

                    {/*<FlatList*/}
					{/*automaticallyAdjustContentInsets={false}*/}
					{/*style={{*/}
                    {/*}}*/}
					{/*ListFooterComponent={this.shouldRenderLoginButton}*/}
					{/*contentContainerStyle={{  alignItems: 'center', marginTop: '100%' }}*/}
					{/*removeClippedSubviews={false}*/}
                    {/*numColumns={2}*/}
                    {/*data={this.state.tabs}*/}
					{/*renderItem={({ item }) => (*/}
						{/*<TouchableOpacity onPress={() => {*/}
								{/*navigate(item.to, { id: item.id })*/}
						{/*}*/}
						{/*} >*/}
							{/*<IntroBox*/}
								{/*style={{width: '95%', }}*/}
								{/*name={item.screenName}*/}
                                {/*img={item.img}*/}
							{/*/>*/}
						{/*</TouchableOpacity>*/}
					{/*)}*/}
				{/*/>*/}
                </ImageBackground>

			</View>
		);
	}
}
