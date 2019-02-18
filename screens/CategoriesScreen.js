import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import SingleCategory from '../components/SingleCategory';
import LazyContainer from '../components/LazyContainer';
import RestaurantBox from '../components/RestaurantBox';
import LoadingIndicator from '../components/LoadingIndicator';
import Server from '../constants/server';
import  {ListView,ImageBackground,Divider,Title,Subtitle,Tile} from '@shoutem/ui'
export default class Meals extends React.Component {
	static navigationOptions = () => ({
		title: 'الاقسام',
		headerTintColor: Colors.smoothGray,
		fontFamily: 'Droid Arabic Kufi',
		headerStyle: {
			backgroundColor: Colors.mainColor,
			borderBottomColor: Colors.mainColor,
			borderBottomWidth: 3,
		},
		headerTitleStyle: {
			fontWeight: '300',
			color: '#ffffff',
			fontFamily: 'Droid Arabic Kufi',
			fontSize: 16
		},
	});

	constructor(props) {
		super(props);
		const {params} = this.props.navigation.state
		this.state = {
			doneFetches: 1,

			tabs: [{
				key: 5,
				screenName: 'تحميل ...',
				img:''
			},
			{
				key: 6,
				screenName: 'تحميل ...',
				img:''
			}],
		}
	}

	componentDidMount() {
		fetch(Server.dest + '/api/store-categories?store_id=' + this.props.navigation.state.params.main_category_id).then((res) => res.json()).then((categories) => {
			this.setState({ tabs: categories.response });
		});
		// fetch(Server.dest + '/api/store-info?store_id=' + this.props.navigation.state.params.key).then((res) => res.json()).then((restaurants) => {
		// 	this.setState({
		// 		Restaurant: [restaurants.response],
		// 		doneFetches: 1
		// 	})
		// })


		// Inneed      onPress={() => onPressHandler(page)

	}
    renderRow = (category) => {
        return (
            <TouchableOpacity style={{marginVertical:3}} activeOpacity={.8} onPress={() => {
                this.props.navigation.navigate('ProductsScreen',{sub_category_id:category.key,main_category_id:this.props.navigation.state.params.main_category_id})
            }}>


				<View>
                    <ImageBackground
                        styleName="large-ultra-wide"
                        source={{uri: category.img}}
                    >
                        <Tile>
                            <Title style={{fontFamily:"Droid Arabic Kufi",padding:10,textAlign:'center'}} styleName="md-gutter-bottom">{category.screenName}</Title>
                            <Subtitle style={{fontFamily:"Droid Arabic Kufi",padding:10,textAlign:'center'}} styleName="sm-gutter-horizontal">المزيد</Subtitle>
                        </Tile>
                    </ImageBackground>
                    <Divider styleName="line"/>
                </View>
            </TouchableOpacity>
        );
    };


    render() {
		const { params } = this.props.navigation.state;
		const { navigate } = this.props.navigation;


		return (
			<LazyContainer style={{ backgroundColor: Colors.smoothGray }}>
                <ListView
                    data={this.state.tabs}
                    renderRow={this.renderRow}
                    style={{marginTop: 30}}
                />

			</LazyContainer>
		);
	}
}
