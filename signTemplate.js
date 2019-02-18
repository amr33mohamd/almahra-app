import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native'
import { Container, Content, View } from 'native-base'
import Background from '../../assets/images/png/back.png';

export default class SignTemplate extends Component {
    render() {
        return (
            <Container >
                 <ImageBackground source={Background} style={{flex: 1}}>
                    <Content contentContainerStyle={{flex: 1}}>
	                    {this.props.children}
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
});