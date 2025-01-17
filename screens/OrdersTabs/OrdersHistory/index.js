import React from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import OrderBox from '../../../components/OrderBox';
import Colors from '../../../constants/Colors';
import LoadingIndicator from '../../../components/LoadingIndicator';
import Server from '../../../constants/server';

const Center = ({ children }) => (
	<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#ffffff' }}>{children}</View>
);
export default class OrdersHistory extends React.Component {
	return_image = (status) => {
		if (status == 0) {
			return 'https://images.pexels.com/photos/41280/agent-business-call-center-41280.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
		}
		else {
			return 'https://images.pexels.com/photos/296888/pexels-photo-296888.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
		}
	}

	componentDidMount() {
		//this.fetch_data();
	}

	fetch_data() {
		AsyncStorage.getItem('userid').then(id => {
			fetch(Server.dest + '/api/show-orders-past?user_id=' + id)
				.then(res => res.json())
				.then(orders => {
					this.setState({
						doneFetches: 1,
						orders: orders.response
					})
				});
		});
	}
	constructor(props) {
		super(props)

        /*orders status
         0 ----> waiting
         1 ----> accepted on way
         2 ----> Delivered
        */
		this.state = {
			doneFetches: 0,
			orders: [

			]
		}
	}

	componentWillMount() {
		this.didFocusSubscription = this.props.navigation.addListener(
			'didFocus',
			() => {
				this.setState({ doneFetches: 0 });
				this.fetch_data();
			}
		);
		this.fetch_data();
	}

	componentWillUnmount() {
		// Remove the listener when you are done
		this.didFocusSubscription.remove();
	}

	getStatusAsStr = (status) => {
		switch (status) {
			case 0:
				return ("قيد القبول");
			case 1:
				return ("جاري التوصيل");
			case 2:
				return ("تم التوصيل");
		}
	};

	render() {
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		if (this.state.orders) {
			return (

				<SafeAreaView style={{ flex: 1, ios: { marginTop: 20 } }}>
					<View style={{ flex: 1, marginTop: 20 }}>
						<FlatList
							automaticallyAdjustContentInsets={false}
							style={{ backgroundColor: 'white' }}
							removeClippedSubviews={false}
							ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} />}
							data={this.state.orders}
							renderItem={({ item }) => (
								<TouchableOpacity  >
									<OrderBox
										name={item.title}
										idkey={item.key}
										status={item.status}
										desc='تم التوصيل'
										image={require('../../../assets/images/delivered.png')}
										price={item.price}
									/>
								</TouchableOpacity>
							)}
						/>
					</View>
				</SafeAreaView>

			);
		}
		else {
			return (
				<Center><Text style={{
					fontFamily: 'Droid Arabic Kufi',
					fontSize: 16
				}}>You Donot have orders Now</Text></Center>
			);
		}

	}
}
