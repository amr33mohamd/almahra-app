import React from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';
import RestaurantBox from '../components/RestaurantBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import  {ListView,ImageBackground,Divider,Title,Subtitle,Tile} from '@shoutem/ui'

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isFetching: false,
			Restaurants: [
                {
                    key: 26,
                    name: "ادوات الاثاث",
                    image: "https://images.pexels.com/photos/205923/pexels-photo-205923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                    desc: null,
                    deliver_price: 0,
                    time: 70,
                    min_delivery_cost: 15,
                    status: 0
                },
                {
                    key: 27,
                    name: "ادوات اوليه",
                    image: "https://images.pexels.com/photos/212236/pexels-photo-212236.jpeg?cs=srgb&dl=brush-brushes-cosmetics-212236.jpg&fm=jpg",
                    desc: null,
                    deliver_price: 12,
                    time: 60,
                    min_delivery_cost: 0,
                    status: 0
                },
                {
                    key: 28,
                    name: "الروج",
                    image: "https://images.pexels.com/photos/6393/red-woman-girl-brown.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                    desc: null,
                    deliver_price: 12,
                    time: 60,
                    min_delivery_cost: 0,
                    status: 0
                },
                {
                    key: 30,
                    name: "الكريم الاولي",
                    image: "https://images.pexels.com/photos/3119/fashion-girl-makeup-paint.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                    desc: null,
                    deliver_price: 12,
                    time: 60,
                    min_delivery_cost: 0,
                    status: 0
                },
                {
                    key: 31,
                    name: "ما تحتاجه البشره",
                    image: "https://images.pexels.com/photos/324654/pexels-photo-324654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                    desc: null,
                    deliver_price: 12,
                    time: 60,
                    min_delivery_cost: 0,
                    status: 0
                },
                {
                    key: 32,
                    name: "مطعم روابي الشام",
                    image: "http://66.45.240.101:90/assets/static/images/uploaded_images/store_images/store_32.jpg",
                    desc: null,
                    deliver_price: 12,
                    time: 60,
                    min_delivery_cost: 0,
                    status: 0
                },
			],
			userid: null,
			offer: {},
			SpecialOrderStatus: 0
		};

		this.currPage = 0;
		this.isLastPage = false;

		AsyncStorage.getItem('hot_request').then((value) => {
			if (value == '1') {
				AsyncStorage.setItem('hot_request', '0').then(() => {
					this.props.navigation.navigate('طلبات')
				})
			}
		})
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		fetch(
			Server.dest +
			'/api/stores?user_id=8' +
			'&maxcost=300' +
			'&maxtime=300' +
			'&sortby=2' +
			'&id=' + this.props.home_id +
			'&page=0'
		)
			.then(res => res.json())
			.then(restaurants => {
				this.setState({
					isFetching: false,
					Restaurants: restaurants.stores
				});
			});
	}

	fetchNextPage = (page) => {
		this.setState({ isFetching: true })

		fetch(
			Server.dest +
			'/api/stores?user_id=8' +
			'&maxcost=300' +
			'&maxtime=300' +
			'&sortby=2' +
			'&id=' + this.props.home_id +
			'&page=' + page
		)
			.then(res => res.json())
			.then(restaurants => {
				this.isLastPage = restaurants.stores.length < 6 ? true : false

				this.setState({
					isFetching: false,
					Restaurants: [...this.state.Restaurants, ...restaurants.stores]
				});
			});
	}

	/*componentDidMount() {
		AsyncStorage.getItem('userid').then(id => {
			// this._shouldRenderOffer(id);
			if (id == null) {
				var id = -1;
			}
			AsyncStorage.getItem('maxcost').then(maxcost => {
				if (maxcost == null) {
					maxcost = 0;
				}
				AsyncStorage.getItem('maxtime').then(maxtime => {
					if (maxtime == null) {
						maxtime = 0;
					}
					AsyncStorage.getItem('sortby').then(sortby => {
						if (sortby == null) {
							sortby = 3;
						}
						fetch(
							Server.dest +
							'/api/stores?user_id=8' +
							'&maxcost=300' +
							'&maxtime=300' +
							'&sortby=2' +
							'&id=' + this.props.home_id
						)
							.then(res => res.json())
							.then(restaurants => {
								this.setState({
									isFetching: false,
									Restaurants: restaurants.stores
								});
							});
					});
				});
			});
		});
	}*/

	// _shouldRenderOffer = id => {
	// 	fetch(`${Server.dest}/api/offers-for-me?user_id=${id}`)
	// 		.then(res => res.json())
	// 		.then(res => {
	// 			if (res.response != 0)
	// 				this.setState({ offerVisible: 1, userid: id, offer: res.response });
	// 			else this.setState({ offerVisible: 0 });
	// 		});
	// };

	// _RenderOffer = () => {
	// 	if (this.state.offerVisible == 1) {
	// 		return (
	// 			<View
	// 				style={{
	// 					position: 'absolute',
	// 					zIndex: 1,
	// 					backgroundColor: 'white',
	// 					borderRadius: 12,
	// 					overflow: 'hidden',
	// 					width: '90%',
	// 					left: '5%',
	// 					top: '10%',
	// 					height: '80%',
	// 					elevation: 1
	// 				}}
	// 			>
	// 				<Ionicons
	// 					onPress={() => this.setState({ offerVisible: 0 })}
	// 					name="ios-close"
	// 					size={50}
	// 					color="white"
	// 					style={{
	// 						position: 'absolute',
	// 						zIndex: 2,
	// 						right: 20,
	// 						marginVertical: 8
	// 					}}
	// 				/>
	//
	// 				<TouchableOpacity
	// 					style={{ flex: 1 }}
	// 					onPress={() =>
	// 						this.props.navigation.navigate('SingleOffer', {
	// 							offer_id: this.state.offer.id
	// 						})
	// 					}
	// 				>
	// 					<Image style={{ flex: 1 }} source={{ uri: this.state.offer.img }} />
	// 				</TouchableOpacity>
	//
	// 				<Button
	// 					onPress={() =>
	// 						this.props.navigation.navigate('SingleOffer', {
	// 							offer_id: this.state.offer.id
	// 						})
	// 					}
	// 					color={Colors.mainColor}
	// 					backgroundColor={Colors.mainColor}
	// 					containerViewStyle={{ borderRadius: 15 }}
	// 					borderRadius={15}
	// 					buttonStyle={{ padding: 10 }}
	// 					textStyle={{ fontFamily: 'Droid Arabic Kufi' }}
	// 					title="مشاهدة العرض"
	// 				/>
	// 			</View>
	// 		);
	// 	} else {
	// 		return;
	// 	}
	// };

	SpecialOrderNavigate = () => {
		if (this.state.SpecialOrderStatus == 0) {
			alert('الخدمه متوقفه الان')
		}
		else {
			this.props.navigation.navigate('SpecialOrderScreen')
		}
	}

	navigate_home = (key,status,stars,name,time,desc,image,deliver_price,min_delivery_price) => {

		this.props.navigation.navigate('CategoriesScreen', { key,status,stars,name,time,desc,image,deliver_price,min_delivery_price })

	}

	renderLoadingMore = () => {
		if(this.state.isFetching) {
			return <LoadingIndicator size="large" color="#B6E3C6" />
		}
		else return null
	}

    renderRow = (category) => {
        return (
            <TouchableOpacity style={{marginVertical:3}} activeOpacity={.8} onPress={() => {
                this.props.navigation.navigate('CategoriesScreen',{main_category_id:category.key})
            }}>


                <View>
                    <ImageBackground
                        styleName="large-ultra-wide"
                        source={{uri: category.image}}
                    >
                        <Tile>
                            <Title style={{fontFamily:"Droid Arabic Kufi",padding:10,textAlign:'center'}} styleName="md-gutter-bottom">{category.name}</Title>
                            <Subtitle style={{fontFamily:"Droid Arabic Kufi",padding:10,textAlign:'center'}} styleName="sm-gutter-horizontal">المزيد</Subtitle>
                        </Tile>
                    </ImageBackground>
                    <Divider styleName="line"/>
                </View>
            </TouchableOpacity>
        );
    };

	render() {
		if (this.state.Restaurants.length < 1)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		return (
			<View>
                <ListView
                    data={this.state.Restaurants}
                    renderRow={this.renderRow}
                    style={{marginTop: 30}}
                />

			</View>
		);
	}
}

const styles = StyleSheet.create({
	box: {
		height: 45,
		backgroundColor: '#FFF',
		shadowColor: '#000000',
		shadowOpacity: 2,
		shadowOffset: {
			height: 2,
			width: 0
		},
		borderColor: 'gray',
		borderWidth: 0.3,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center'
	},

	input: {
		justifyContent: 'center',
		height: 22,
		fontFamily: 'Droid Arabic Kufi',
		marginTop: 5,
		backgroundColor: '#fff',
		fontSize: 13,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7,
		flex: 1
	},

	topbox: {
		alignItems: 'center',
		height: 55,
		justifyContent: 'center',
		backgroundColor: '#fff'
	},

	restaurant: {
		backgroundColor: 'white',
		flex: 1,
		padding: 100
	}
});
