import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import {Image} from '@shoutem/ui'
export default class IntroBox extends Component {
	render() {
		var styles = StyleSheet.create({
			text: {
				textAlign: 'center',
				backgroundColor: 'transparent',
				color: 'white',
				fontFamily: 'Droid Arabic Kufi',
				fontSize: 16,
				width:150
			},
			box: {
                flex: 1,
				height: 130,
				borderRadius: 10,
				marginHorizontal: 5,
				backgroundColor: 'white',
				overflow: 'hidden'

            },

		});
		var image1 =  require('../assets/images/shop.jpeg');
		var image2 = require('../assets/images/salon.jpg');
		var images = [image1,image2];
		return (
			<View 	style={[styles.box, this.props.style, { backgroundColor: '#9019a4' }]}>


			<Image
			style={{
				width:'100%',
			}}
			styleName='medium-wide'
			source={images[this.props.img]}/>

					<Text style={styles.text}>{this.props.name}</Text>

			</View>
		);
	}
}
