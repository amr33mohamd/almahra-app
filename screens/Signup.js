import React from 'react';
import {
	Dimensions, KeyboardAvoidingView, AsyncStorage,
	StyleSheet, TextInput, View, Text, Platform, TouchableOpacity, Linking
} from "react-native";
import { Button } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import LoadingIndicator from '../components/LoadingIndicator';
import Server from '../constants/server';

export default class Signup extends React.Component {
    componentDidMount() {
        AsyncStorage.getItem('location').then(
            (value) => {
                if(value !== null)
                    this.setState({ location: value });
            });
    }
		navigateToHome = () => {
			this.props.navigation.navigate('Main')
		};

		setLoginStatus = value => {
			AsyncStorage.setItem('login', value);
			this.setState({ login: value });
		};
    constructor(props) {
        super(props);
        this.state = {
            'login': '1',
            password: '',
            cpassword: '',
            location: '',
            phone: '',
            username: '',
            email: '',
            errorMsg: '',
            signing:false
        }

        AsyncStorage.getItem('login').then(
            (value) => {
                this.setState({ 'login': value })

                if(value == '1')
                {
                    this.props.navigation.navigate('Main')
                }
            }
        );
    }

    sendDataToServer = () => {

        this.setState({ login: '1' });

        var locationData = "";

        AsyncStorage.multiGet(["location", "latitude", "longitude", "region"], (err, stores) => {
            stores.map((result, i, store) => {
                locationData += "&" + store[i][0] + "=" + store[i][1];
            });
        }).then(() => {
            fetch(Server.dest + '/api/signup?phone='+this.state.phone.substr(1)+
                '&password='+this.state.password +
                '&email='+this.state.email +
                '&username='+this.state.username +
                locationData,
            {headers: {'Cache-Control': 'no-cache'}}).
            then((res) => res.json()).then((resJson) => {
                if(resJson.response == 0)
                {
                    this.setState({ errorMsg: 'انت بالفعل مُسجل عندنا' });
                }
                else
                {
									fetch(
										Server.dest +
										'/api/verifycode?code=' +
										'88' +
										'&identifier=' +
										this.state.phone.substr(1) +
										'&process=' +
										'0',
										{ headers: { 'Cache-Control': 'no-cache' } }
									)
										.then(res => res.json())
										.then(resJson => {
											if (resJson.response == 2) {

													// signup
													AsyncStorage.setItem('userid', resJson.id);
													this.setLoginStatus('1');
													this.navigateToHome();
												}
											}
										);
                    // Navigate to confirm screen
                    // this.props.navigation.navigate("CodeVerification", { process: 0 /* means SIGN-UP*/,
                    //     device: this.state.phone.substr(1) });
                }
            })
        });
    };
    render_signup(){
      if(this.state.signing == false){
        return <Button    onPress={() => {   this.registerUser()  }}  color='white'backgroundColor={Colors.mainColor} containerViewStyle={{borderRadius:15}} borderRadius={15} buttonStyle={{ padding: 10 }} textStyle={{ fontFamily: 'Droid Arabic Kufi' }} title="Create Account" />
      }
      else {
      return	<LoadingIndicator size="large" color="#fff" />
      }

    }
    registerUser = () => {
      this.setState({ sending:true });

        if(this.state.password.length < 6)
        {
            this.setState({ errorMsg: 'كلمة المرور قصيرة. اقل طول مسموح هو ستة' });
            this.setState({ sending:false });
            return;
        }
        if(this.state.phone.length < 6)
        {
            this.setState({ errorMsg: 'رقم الهاتف خاطئ'});
            this.setState({ sending:false });

            return;
        }

        if(this.state.password != this.state.cpassword)
        {
            this.setState({ errorMsg: 'كلمة المرور لا تطابق كلمة المرور التأكيدية' });
            this.setState({ sending:false });

            return;
        }

        if(this.state.username.length < 3)
        {
            this.setState({ errorMsg: 'اسم المستخدم قصير جدا'});
            this.setState({ sending:false });

            return;
        }





        if(this.state.email.length == 0)
        {
            this.setState({ errorMsg: 'يجب ادخال البريد الالكتروني' });
            this.setState({ sending:false });

            return;
        }

        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValidEmail = emailRegex.test(this.state.email);



        this.setState({ errorMsg: '' });
        this.sendDataToServer();
    };

    shouldRenderErrorMessage = () => {
        if(this.state.errorMsg != '')
        {
            return (
                <View style={{ paddingVertical: 3, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'Droid Arabic Kufi', color: 'red' }}>{this.state.errorMsg}</Text>
                </View>
            );
        }
    };

    static navigationOptions = {
        header: null
    };

    render() {

            return (
                <View style={{ backgroundColor: '#FFFFFF',marginTop:15,
                        flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
                        height: Dimensions.get('window').height, width: Dimensions.get('window').width }}>



                    <KeyboardAvoidingView
                        behavior='padding'
                        keyboardVerticalOffset={60}
                        style={{ flex:2 }}
                        contentContainerStyle= {{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: Dimensions.get('window').width }}>

                        <View style={styles.inputsContainer}>
                            {this.shouldRenderErrorMessage()}

                            <View style={styles.singleInputContainer}>
														<Ionicons
																name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
																size={26}
																color={Colors.fadedMainColor}
																style={styles.inputIcon}/>

                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='Username'
                                    placeholderTextColor='#CCCCCC'
                                    autoGrow={false}
                                    multiline={false}
                                    autoFocus={false}
                                    style={styles.textInput}
                                    defaultValue={this.state.username}
                                    onChangeText={(text) => this.setState({username:text})}
                                    onSubmitEditing={(event) => this.registerUser() } />

                            </View>

                            <View style={styles.singleInputContainer}>
														<Ionicons
																name={Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'}
																size={26}
																color={Colors.fadedMainColor}
																style={styles.inputIcon}/>

                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='Email'
                                    placeholderTextColor='#CCCCCC'
                                    autoGrow={false}
                                    multiline={false}
                                    autoFocus={false}
                                    keyboardType='email-address'
                                    style={styles.textInput}
                                    defaultValue={this.state.email}
                                    onChangeText={(text) => this.setState({email:text})}
                                    onSubmitEditing={(event) => this.registerUser() } />

                            </View>

                            <View style={styles.singleInputContainer}>
														<Ionicons
																name={Platform.OS === 'ios' ? 'ios-phone-portrait' : 'md-phone-portrait'}
																size={26}
																color={Colors.fadedMainColor}
																style={styles.inputIcon}/>

                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='Phone Number'
                                    placeholderTextColor='#CCCCCC'
                                    autoGrow={false}
                                    multiline={false}
                                    autoFocus={false}
                                    maxLength={10}
                                    style={styles.textInput}
                                    keyboardType='phone-pad'
                                    defaultValue={this.state.phone}
                                    onChangeText={(text) => this.setState({phone:text})}
                                    onSubmitEditing={(event) => this.registerUser() } />

                            </View>

                            <View style={styles.singleInputContainer}>
														<Ionicons
															name={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
															size={26}
															color={Colors.fadedMainColor}
															style={styles.inputIcon}/>

                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='Password'
                                    placeholderTextColor='#CCCCCC'
                                    autoGrow={false}
                                    multiline={false}
                                    autoFocus={false}
                                    secureTextEntry={true}
                                    style={styles.textInput}
                                    onChangeText={(text) => this.setState({password:text})}
                                    onSubmitEditing={(event) => this.registerUser() }/>

                            </View>

                            <View style={styles.singleInputContainer}>
														<Ionicons
															name={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
															size={26}
															color={Colors.fadedMainColor}
															style={styles.inputIcon}/>

                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='Confirm Password'
                                    placeholderTextColor='#CCCCCC'
                                    autoGrow={false}
                                    multiline={false}
                                    autoFocus={false}
                                    secureTextEntry={true}
                                    style={styles.textInput}
                                    onChangeText={(text) => this.setState({cpassword:text})}
                                    onSubmitEditing={(event) => this.registerUser() }/>

                            </View>

                            <View style={styles.singleInputContainer}>
														<Ionicons
																name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
																size={26}
																color={Colors.fadedMainColor}
																style={styles.inputIcon}/>

                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='Address'
                                    placeholderTextColor='#CCCCCC'
                                    autoGrow={false}
                                    multiline={false}
                                    autoFocus={false}
                                    style={styles.textInput}
                                    defaultValue={this.state.location}
                                    onChangeText={(text) => this.setState({location:text})}
                                    onSubmitEditing={(event) => this.registerUser() } />

                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{ flex:0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                     <View style={{flex: 1, flexDirection:'column', justifyContent: 'center' }}>
                    {this.render_signup()}
                    </View>
                        <TouchableOpacity style={{ flex:0.8, marginTop:1, width: '80%' }}
                            onPress={() => 	this.props.navigation.navigate('AboutUs', {}) }>
                            <Text style={{ fontSize: 13, textAlign:'center', fontFamily: 'Droid Arabic Kufi', color: Colors.mainColor }}>
                            Accept Privacy & Policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );

    }
}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        color: Colors.mainColor,
        textAlign: 'left',
        fontFamily: 'Droid Arabic Kufi',
        padding: 9,
        borderRadius: 4,
        backgroundColor: 'transparent',
        borderBottomColor: Colors.fadedMainColor,
        borderBottomWidth: 0.7
    },
    inputIcon: {
        backgroundColor: 'transparent',
        marginLeft: 9
    },
    inputsContainer: {
        paddingTop: 15,
        flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
        width: '90%'
    },
    singleInputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});
