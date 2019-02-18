
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import OffersTab from '../screens/OffersTab';
import SettingsScreen from '../screens/SettingsScreen';
import CartScreen from '../screens/CartScreen';
import OrdersTabs from '../screens/OrdersTabs';
import drawerContentComponents from './DrawerContentComponents';
import MainTabNavigator from './MainTabNavigator';


export const DrawerNav = DrawerNavigator (
    {
      MainTabNavigator:{ screen: MainTabNavigator },
        HomeScreen:{ screen: HomeScreen },
        OffersTab:{ screen: OffersTab },
        SettingsScreen:{ screen: SettingsScreen },
        CartScreen:{ screen: CartScreen },
        OrdersTabs:{ screen: OrdersTabs }
    },
    {
       contentComponent: drawerContentComponents
    });
