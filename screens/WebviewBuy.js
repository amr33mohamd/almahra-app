import React from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
  WebView
} from 'react-native';
import OfferBox from '../components/OfferBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';

var styles = StyleSheet.create({
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

export default class WebviewBuy extends React.Component {
	componentDidMount() {
		fetch(`${Server.dest}/api/all-offers`)
			.then(res => res.json())
			.then(res =>
				this.setState({ offers: res.response }, () =>
					this.setState({ doneFetches: 1 })
				)
			);
	}

	constructor(props) {
		super(props);
		this.state = {
			doneFetches: 0,
			offers: []
		};
	}

	_keyExtractor = (item) => String(item.id);

	render() {

		return (

      <View style={{ flex: 1 }}>
               <WebView
                 bounces={false}
                 scrollEnabled={true}
      					 ref={(ref) => { this.webview = ref; }}
                 source={{  uri:this.props.navigation.state.params.url}}
      					 onNavigationStateChange={(event) => {
                if (event.url == 'http://example.com/') {
                  this.webview.stopLoading();
                  AsyncStorage.setItem('cart', '').then(() => {
										AsyncStorage.setItem('CartResturantId','').then(()=>{
										AsyncStorage.setItem('hot_request','1').then(()=>{
											this.props.navigation.navigate('طلبات');
											this.closeModal();
										})
									})
									})
                  // this.props.navigation.navigate('Notes')
                }}
      				}
      					 />
             </View>



		);
	}
}
