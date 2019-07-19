import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Colors from '../constants/Colors';
import {ImageBackground,Tile,Title,Overlay,Subtitle} from '@shoutem/ui'
export default class ProductBox extends Component {
	render() {
		return (
            <ImageBackground
                styleName="large-banner"
                source={{uri:this.props.image}}
            >
                <Tile>
                    <Title styleName="md-gutter-bottom">{this.props.name}</Title>
                    <Overlay styleName="solid-bright">
                        <Subtitle styleName="sm-gutter-horizontal">{this.props.price}$</Subtitle>
                    </Overlay>
                </Tile>
            </ImageBackground>

        );
	}
}
