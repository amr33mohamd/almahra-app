import React from 'react';
import {
	ScrollView,
	Modal,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
	View,
	Dimensions,
	Image,
	AsyncStorage,
	I18nManager,
	TextInput,
	KeyboardAvoidingView,
	Alert
} from 'react-native';
import Colors from '../constants/Colors';
import TicketBox from '../components/TicketBox';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNRestart from 'react-native-restart'; // Import package from node modules

import {
	Table,
	Row,
	Rows
} from 'react-native-table-component';

const Center = ({ children }) => (
	<View
		style={{
			alignItems: 'center',
			justifyContent: 'center',
			flex: 1,
			backgroundColor: '#ffffff'
		}}
	>
		{children}
	</View>
);
I18nManager.allowRTL(true);

export default class Meals extends React.Component {
	componentWillMount() {
		this.didFocusSubscription = this.props.navigation.addListener(
			'didFocus',
			() => {
				this.setState({ doneFetches: 0 });
				this.doTheFetching();
			}
		);
	}

	componentWillUnmount() {
		// Remove the listener when you are done
		this.didFocusSubscription.remove();
	}

	CheckIfBannedThenOrder = () => {
		if(this.state.ordering != true){

			AsyncStorage.getItem('login').then(logged => {
				if (logged == 1) {
					AsyncStorage.getItem('userid').then((userid)=>{
						if(userid){

										AsyncStorage.getItem('userid').then((userid)=>{
										AsyncStorage.getItem('token').then(token => {
											fetch(Server.dest + '/api/add-user-token?user_id='+userid+
									            '&token='+token, {headers: {'Cache-Control': 'no-cache'}}).
												then((res) => res.json()).then((resJson) => {
													//console.log("reJson"+resJson.response);
													//console.log("token"+token);
													//console.log("userid"+userid);
												})
											})
										})
										fetch(Server.dest + '/api/store-info?store_id='+this.state.store_id).then((res)=>res.json()).then((restaurants)=>{
										// if(this.state.after_cost >= restaurants.response.min_delivery_cost){
											// we make it here always open
											// if(restaurants.response.status = 1){
												this.make_order();
											// }
											// else{
											// 	this.clear_cart_no_alert();
											// }
									// }
									// else{
									// 	alert('لا يمكن تنفيذ طلبك إلا بعد وصول طلبك للحد الأدنى للطلب');
									// }
									})


								}
						else {
							alert('يجب عليك تسجيل الدخول اولا');
							}
					}
				)
				}
			}
		)
		}

}

	make_order = () => {
		AsyncStorage.getItem('location').then((value) => {
			AsyncStorage.getItem('userid').then((userid)=>{

			if (value === null) {
				this.props.navigation.navigate('LocationSetting');
				RNRestart.Restart();

			}
			else {

				if(userid == 5){
						AsyncStorage.setItem('cart', '').then(() => {
							AsyncStorage.setItem('CartResturantId','').then(()=>{
							AsyncStorage.setItem('hot_request','1').then(()=>{
								this.props.navigation.navigate('السله');
								this.closeModal();
							})
						})
						})
				}
				else{
					AsyncStorage.getItem('userid').then((userid)=>{
					AsyncStorage.getItem('location').then(location => {
						AsyncStorage.getItem('hint').then(hint => {
							this.closeModal();

							this.props.navigation.navigate('WebviewBuy',{url:
								Server.dest +
									'/api/buy-screen?ids=' +
									this.state.ids +
									'&store_id=' +
									this.state.store_id +
									'&user_id=' +
									userid +
									'&cost=' +
									Math.round((this.state.after_cost-this.state.before_cost)*2.65*100) / 100 +
									'&address=' +
									location +
									'&address_hint=' +
									hint +
									'&info=a'+
									'&note='+
									this.state.note
									+'&discounted='+
									this.state.discounted
									})
								.then(res => res.json())
								.then(meals => {
									AsyncStorage.setItem('cart', '').then(() => {
										AsyncStorage.setItem('CartResturantId','').then(()=>{
										AsyncStorage.setItem('hot_request','1').then(()=>{
											this.props.navigation.navigate('طلبات');
											this.closeModal();
										})
									})
									})
								})
						})
					})
				})
			}

			}
	});
});
		}



	componentDidMount() {
		this.doTheFetching();

	}
	doTheFetching = () => {
		AsyncStorage.getItem('cart')
			.then(ids => {
				this.setState({
					ids: ids
				});
			})
			.then(() => {
				fetch(Server.dest + '/api/meals-by-ids?ids=' + this.state.ids)
					.then(res => res.json())
					.then(meals => {

						this.setState({
							meals: meals.meals
						});
					});
			})
			.then(() => {
				fetch(Server.dest + '/api/order-price?ids=' + this.state.ids)
					.then(res => res.json())
					.then(data => {
						this.setState({
							doneFetches: 1,
							before_cost: data.before,
							after_cost: data.after,
							store_id: data.store_id,
              deliveryTime:data.deliveryTime
						});
					});
			});
	};
clear_cart = ()=>{
	AsyncStorage.setItem('cart','').then(()=>{
		AsyncStorage.setItem('CartResturantId','').then(()=>{
			alert(' تم إفراع سلة الشراء و بانتظار طلباتك القادمة من المحلات الأخرى')
			this.props.navigation.navigate('Main');
		})
	})
}

deleteProduct = (value) =>{
	AsyncStorage.getItem('cart').then((cart)=>{
		if(cart.replace(new RegExp(','+value,'g' ), '')){
			if(cart.replace(new RegExp(','+value,'g' ), '') == 'null'){
				AsyncStorage.setItem('cart','').then(()=>{
					AsyncStorage.setItem('CartResturantId','').then(()=>{
						this.props.navigation.navigate('Main');
						// alert(cart.replace(new RegExp(','+value,'g' ), ''))
					});
				});

			}
			else {
				AsyncStorage.setItem('cart',''+cart.replace(new RegExp(','+value,'g' ), '')).then(()=>{
					this.props.navigation.navigate('السله');
					// DeviceEventEmitter.emit('ReloadMyLibraryBooks', { empty: 0 });
					this.doTheFetching();
				});
			}
		}
	})
}
clear_cart_no_alert = ()=>{
	AsyncStorage.setItem('cart','').then(()=>{
		AsyncStorage.setItem('CartResturantId','').then(()=>{

			alert('هذا المحل مغلق الان')
			this.props.navigation.navigate('Main')
		})
	})
}
	openModal() {
		this.setState({ modalVisible: true });
	}
	navigate_location(){

		AsyncStorage.removeItem('location')
		AsyncStorage.setItem('LocationToCart','1')
		this.closeModal();
		let that = this;
			setTimeout(function(){
				that.props.navigation.navigate('LocationSetting');
			},1000)

	}
	closeModal() {
		this.setState({ modalVisible: false });
	}



	constructor(props) {
		super(props);

		this.state = {
			doneFetches: 0,
			meals: [],
			before_cost: 0,
			after_cost: 0,
			discounted: 0,
			after_discout: 0,
			store_id: 0,
			modalVisible: false,
			note: '',
			coupon: '',
			ordering: false,
		};

	}
	store_note = (note) => {
		this.setState({
			note: note
		})
	}
	render_buynow() {
		if (this.state.ordering == false) {
			return <Text style={{ fontSize: 18, color: 'white' }}>شراء الان </Text>
		}
		else {
			return <LoadingIndicator size="large" color="#fff" />
		}

	}
	coupon() {
		AsyncStorage.getItem('CartResturantId').then((store_id) => {

			fetch(Server.dest + '/api/check-coupon?code=' + this.state.coupon + '&store_id=' + store_id)
				.then(res => res.json())
				.then(data => {
					if (data.response == 1) {

						var discounted = (this.state.after_cost - this.state.before_cost) * (data.percent / 100);
						var after_discout = this.state.after_cost - discounted;
						this.setState({
							after_discout,
							discounted
						})
					}
					else {
						alert('الكود غير متاح حاليا')
					}
				})
		})
	}
	costicon = () => (
				 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
				 <Ionicons
					 name="ios-information-circle-outline"
					 size={25}
					 color={Colors.mainColor}
					 onPress={()=>{
						 alert('عملينا العزيز : السعر الإجمالي هو سعر تقريبي ، قد يكون هناك زيادة  في السعر و  سيعتمد على سعر الفاتورة من المحل التجاري')
					 }}
				 />
					 <Text style={{textAlign:'center',paddingHorizontal:40,marginRight:15}}>{Math.round((this.state.after_cost-this.state.before_cost)*2.65*100) / 100}</Text>
				 </View>
		 );

	render() {
		const tableHead = ['السعر', 'التصنيف'];
		const tableData = [
			['' + Math.round(this.state.after_cost-this.state.before_cost) , 'سعر الطلب'],
			// ['' + this.state.discounted, 'الخصم'],

		];
		const { params } = this.props.navigation.state;
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		if (this.state.ids != null) {
			return (


				<View>
				<Modal
										visible={this.state.modalVisible}
										animationType={'slide'}
										onRequestClose={() => this.closeModal()}
									>

										<View style={styles.modalContainer}>
											<View style={styles.innerContainer}>
												<Text style={{ fontFamily: 'Droid Arabic Kufi', fontSize: 25 }}>
												تأكيد عملية الشراء
												</Text>
												<View style={styles.buttons}>

													<TouchableOpacity style={styles.button}
																			onPress={() => this.closeModal()}>
														<Text style={{fontSize: 18,
														color: 'white'}} >رجوع</Text>
													</TouchableOpacity>
													<TouchableOpacity style={styles.button}
																			onPress={() => this.navigate_location()}>
														<Text style={{fontSize: 18,
														color: 'white'}} >تغير عنوان التوصيل</Text>
													</TouchableOpacity>
													<TouchableOpacity style={styles.button} onPress={() => this.CheckIfBannedThenOrder()}>
														{this.render_buynow()}
													</TouchableOpacity>
												</View>
											</View>
										</View>
									</Modal>



					<FlatList
						automaticallyAdjustContentInsets={false}
						style={{ backgroundColor: 'white' }}
						removeClippedSubviews={false}
						ItemSeparatorComponent={() => (
							<View style={{ height: 5, backgroundColor: Colors.smoothGray }} />
						)}
						data={this.state.meals}
						ListHeaderComponent={() => (
							<Image
								resizeMode="cover"
								style={{ padding: 20, height: 150, width: '100%' }}
								source={require('../assets/images/cart.jpeg')}
							/>
						)}
						ListFooterComponent={
							<KeyboardAvoidingView
									behavior='padding'
									keyboardVerticalOffset={70}
									style={{ flex:1 }}
									contentContainerStyle= {{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: Dimensions.get('window').width }}>

							<ScrollView>
							<View style={styles.singleInputContainer}>
							<View style={{ paddingRight: 10, paddingLeft: 10 }}>

								<Table
									borderStyle={{
										borderWidth: 0.5,
										borderColor: Colors.mainColor
									}}
								>
									<Row
										data={tableHead}
										style={styles.head}
										textStyle={styles.text}
									/>
									<Rows
										data={tableData}
										style={styles.row}
										textStyle={styles.text2}
									/>
								</Table>


								{
								/*  ------ notes for order + discount code  premiom version ------
										<TextInput
												underlineColorAndroid='transparent'
												placeholder='ملاحظات للطلب (المزيد من الصوص)'
												placeholderTextColor='#CCCCCC'
												style={styles.textInput}
												value={this.state.note}
												onChangeText={(text)=>{this.store_note(text)}}
												/>
												<View style={{flexDirection:'row'}}>


												<TouchableOpacity
													onPress={() => {
														 this.coupon();
														// alert(this.state.notee)
													}}
													style={{
														flex: .2,
														justifyContent: 'center',
														alignSelf: 'center',
														padding: 3,
														marginTop: 10,
														flexDirection: 'row',
														borderWidth: 5,
														backgroundColor:Colors.mainColor,

														borderColor: Colors.mainColor,

													}}
												>
													<Text
														style={{
															fontFamily: 'Droid Arabic Kufi',
															textAlign:'center',
															color:'white'
														}}
													>
														تطبيق
													</Text>

												</TouchableOpacity>

												<TextInput
														underlineColorAndroid='transparent'
														placeholder='كود خصم'
														placeholderTextColor='#CCCCCC'
														style={{
															flex: .8,
															color: Colors.mainColor,
															justifyContent: 'flex-start',
															alignSelf: 'flex-start',
															textAlign: 'right',
															fontFamily: 'Droid Arabic Kufi',
															padding: 9,
															marginVertical:20,
															borderRadius: 4,
															backgroundColor: 'transparent',
															borderBottomColor: Colors.MainColor,
															borderBottomWidth: 0.7,

														}}
														value={this.state.coupon}
														onChangeText={(text)=>{this.setState({coupon:text})}}
														/>

														</View>


								*/
								}
                            </View>

								<View style={{flexDirection:'row',paddingBottom:90}}>
								<TouchableOpacity
									onPress={() => {
										 this.openModal();
										// alert(this.state.notee)
									}}
									style={{
										flex: 1,
										justifyContent: 'center',
										alignSelf: 'center',
										padding: 10,
										marginTop: 10,
										flexDirection: 'row',
										borderWidth: 5,
										borderColor: '#e9e9ef'
									}}
								>
									<Text
										style={{
											fontFamily: 'Droid Arabic Kufi'
										}}
									>
										تنفيذ الطلب
									</Text>
									<MaterialCommunityIcons
										name="plus-circle"
										size={30}
										color={Colors.secondaryColor}
										style={{ paddingLeft: 5 }}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										this.clear_cart();
									}}
									style={{
										flex: 1,
										justifyContent: 'center',
										alignSelf: 'center',
										padding: 10,
										marginTop: 10,
										flexDirection: 'row',
										borderWidth: 5,
										borderColor: '#e9e9ef'
									}}
								>
									<Text
										style={{
											fontFamily: 'Droid Arabic Kufi'
										}}
									>
										الغاء الطلب
									</Text>
									<MaterialCommunityIcons
										name="minus-circle"
										size={30}
										color={Colors.secondaryColor}
										style={{ paddingLeft: 5 }}
									/>
								</TouchableOpacity>
								</View>
							</View>

							</ScrollView>
							</KeyboardAvoidingView>

						}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={()=>{
								Alert.alert(
							'تنبيه',
							'هل تريد حذف هذا المنتج',
							[
								{text: 'موافق', onPress: () => this.deleteProduct(item.key)},
								{text: 'الغاء', onPress: () => console.log('canceled')},

							],
							{ cancelable: false }
							)
						}}>
								<TicketBox
									name={item.name}
									status="-1"
									keyy={item.key}
									desc={item.desc}
									price={item.price}
									count={item.count}
								/>
								</TouchableOpacity>
						)}
					/>

				</View>

			);
		}

		return (
			<Center>
				<Text
					style={{
						fontFamily: 'Droid Arabic Kufi',
						fontSize: 16
					}}
				>
					You still donot have any thing in cart
				</Text>
			</Center>
		);
	}
}

const styles = StyleSheet.create({
	head: { height: 40, backgroundColor: Colors.mainColor },
	text: {
		textAlign: 'center',
		fontFamily: 'Droid Arabic Kufi',
		fontSize: 18,
		color: 'white'
	},
	textInput: {
		flex: 1,
		color: Colors.mainColor,
		textAlign: 'right',
		fontFamily: 'Droid Arabic Kufi',
		padding: 9,
		marginVertical: 20,
		borderRadius: 4,
		backgroundColor: 'transparent',
		borderBottomColor: Colors.fadedMainColor,
		borderBottomWidth: 0.7
	},
	inputIcon: {
		backgroundColor: 'transparent',
		marginLeft: 9
	},
	inputsContainer: {
		flex: 0.8,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '90%',
	},
	text2: {
		fontFamily: 'Droid Arabic Kufi',
		fontSize: 13,
		color: Colors.secondaryColor,
		textAlign: 'center'
	},
	row: { height: 30 },

	container: {
		flex: 1,
		justifyContent: 'center'
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'grey'
	},
	innerContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		backgroundColor: Colors.mainColor,
		fontFamily: 'Droid Arabic Kufi',
		padding: 20,

		marginLeft: 5,
		borderRadius: 15,

	},
	buttons: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
