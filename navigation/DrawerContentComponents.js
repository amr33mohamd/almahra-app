import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { white } from 'ansi-colors';

export default class drawerContentComponents extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <ImageBackground source={require('../assets/images/intro.jpeg')} style={{flex: 1, width: 280, justifyContent: 'center'}} >
                    <Text style={{textAlign:'center',fontSize:25}}>Al Mahra</Text>
                </ImageBackground>
            </View>
            <View style={styles.screenContainer}>

                <View style={styles.screenStyle}>
                    <Text style={styles.screenStyle} onPress={this.navigateToScreen('OffersTab')}>Offers</Text>
                </View>
                <View style={styles.screenStyle}>
                    <Text style={styles.screenStyle} onPress={this.navigateToScreen('SettingsScreen')}>Settings</Text>
                </View>
                <View style={styles.screenStyle}>
                    <Text style={styles.screenStyle} onPress={this.navigateToScreen('CartScreen')}>Bag</Text>
                </View>
                <View style={styles.screenStyle}>
                    <Text style={styles.screenStyle} onPress={this.navigateToScreen('OrdersTabs')}>Orders</Text>
                </View>

            </View>
        </View>

    )
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor:'black',
        height:'100%'
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: {
        paddingTop: 20,
    },
    screenStyle: {
        height: 45,
        marginTop: 10,
        flexDirection: 'row',
        fontSize:25,
        color:'#ffffff'
    },
    screenTextStyle:{
        marginLeft: 20,
        fontSize:25
    },

});
