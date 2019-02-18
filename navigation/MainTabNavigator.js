import React from 'react';
import { Platform, View, Text, AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {  BottomTabBar } from 'react-navigation-tabs';

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import {Icon} from '@shoutem/ui'
import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import OffersTab from '../screens/OffersTab';
import SettingsScreen from '../screens/SettingsScreen';
import CartScreen from '../screens/CartScreen';
import OrdersTabs from '../screens/OrdersTabs';
import Header from '../components/Header';

function cart() {
	AsyncStorage.getItem('cart').then((cart) => {
		if (cart) {
			return cart.split(",").length;
		}
		else {
			return 0;
		}
	})
}

const HomeStack = (props) => {
	const HomeStackNavigator = createStackNavigator({
		HomeScreen: {
			screen: () => <HomeScreen home_id={props.home_id} {...props} />,
			navigationOptions: {
				header: <Header navigation={props.navigation} />
			}
		}
	});

	return <HomeStackNavigator />;
}

const OffersStack = createStackNavigator({
	OffersTab: {
		screen: OffersTab,
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} />
		})
	}
});

const CartStack = createStackNavigator({
	CartScreen: {
		screen: CartScreen,
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} />
		})
	}
});

const SettingsStack = createStackNavigator({
	SettingsScreen: {
		screen: SettingsScreen,
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} />
		})
	}
});

const OrdersStack = createStackNavigator({
	OrdersTabs: {
		screen: OrdersTabs,
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} />
		})
	}
});

export default createBottomTabNavigator(
	{
		مطاعم: {
			screen: (props) => <HomeStack home_id={props.navigation.state.params.id} {...props} />,
		},
		السله: {
			screen: CartStack,
		},
		طلبات: {
			screen: OrdersStack,
		},
		العروض: {
			screen: OffersStack,
		},
		اعدادات: {
			screen: SettingsStack,
		}
	},
	{
		navigationOptions: ({ navigation }) => ({
			header: null,
			tabBarLabel: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                switch (routeName) {
                  case 'مطاعم':
                    return <Text style={{color: tintColor,marginLeft:15, fontSize: 17}}>Home</Text>;
                    break;
                  case 'طلبات':
                    return <Text style={{color: tintColor,marginLeft:15, fontSize: 14}}>Orders</Text>;
                    break;
                  case 'اعدادات':
                      return <Text style={{color: tintColor,marginLeft:15, fontSize: 14}}>Settings</Text>;
                      break;
                  case 'السله':
                    return <Text style={{color: tintColor,marginLeft:17, fontSize: 14}}>Cart</Text>;
                    break;
										case 'العروض':
	                    return <Text style={{color: tintColor,marginLeft:15, fontSize: 14}}>Offers</Text>;
	                    break;


                }

							},
			tabBarIcon: ({ focused }) => {
				const { routeName } = navigation.state;
				let iconName;
				switch (routeName) {
					case 'مطاعم':
						iconName =
							Platform.OS === 'ios'
								? `sweden`
								: 'sweden';
								type = "Entypo"
						break;

					case 'طلبات':
						iconName =
							Platform.OS === 'ios'
								? `ios-paper`
								: 'md-paper';
								type = ""
						break;
					case 'اعدادات':
						iconName =
							Platform.OS === 'ios'
								? `ios-contact`
								: 'md-contact';
								type = ""
						break;
					case 'السله':
					iconName =
						Platform.OS === 'ios'
							? `shopping-bag`
							: 'shopping-bag';
							type = "FontAwesome"

						break;
					case 'العروض':
						iconName =
							Platform.OS === 'ios'
								? `local-offer`
								: 'local-offer';
								type = "MaterialIcons"
						break;
				}
				return (
					(type == "FontAwesome") ?
					<FontAwesome
						name={iconName}
						size={32}
						style={{ marginBottom: 0 }}
						color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
					/>
					:
					(type == "Entypo")?
					<Entypo
						name={iconName}
						size={32}
						style={{ marginBottom: 0 }}
						color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
					/>
					:
					(type == "MaterialIcons")
					?
					<MaterialIcons
						name={iconName}
						size={32}
						style={{ marginBottom: 0 }}
						color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
					/>
					:
					<Ionicons
						name={iconName}
						size={32}
						style={{ marginBottom: 0 }}
						color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
					/>
				);
			}
		}),
		tabBarOptions: { showLabel: true,style: {
            backgroundColor: 'black',
						textAlign:'center'
					        }, },
		animationEnabled: false,
		swipeEnabled: true
	}
);
