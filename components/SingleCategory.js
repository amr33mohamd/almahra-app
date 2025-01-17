import React, { Component } from 'react';
import { StyleSheet, Text, View } from "react-native";

export default class SingleCategory extends Component {

	render() {
		var styles = StyleSheet.create({
			text: {
				textAlign: 'center',
				backgroundColor: 'transparent',
				color: '#9019a4',
				fontFamily: 'Droid Arabic Kufi',
				fontSize: 16
			},
			box: {
				width: '90%',
				alignSelf: 'center',
				height: 40,
				marginTop: 15,
				borderRadius: 4,
				borderWidth: 1,
				alignItems: 'center',
				justifyContent: 'center',

			},

		});
		return (
			<View
				style={[styles.box, this.props.style, { backgroundColor: '#9019a4' }]}>
				<Text style={styles.text}>{this.props.name}</Text>
			</View>

		);

	}
}
