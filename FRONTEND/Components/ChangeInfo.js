import React, { Component } from 'react';
import {
    View, Alert, TouchableOpacity, Text, Image, StyleSheet, TextInput
} from 'react-native';
import backSpecial from '../Image/backs.png';
import getToken from "../api/getToken";
import  changeInfoApi from "../api/changeInfoApi";
import global from "./global";
import theme from '../theme';
export default class ChangeInfo extends Component {

    constructor(props) {
        super(props);
        const { name, address, phone } = props.user;
        this.state = { 
            txtName: name , 
            txtAddress: address , 
            txtPhone: phone
        };
    }

    goBackToMain() {
        const {navigator} = this.props;
        navigator.pop();
    }

    alertSuccess() {
        Alert.alert(
            'Thành công',
            'Cập nhật thành công!',
            [
                { text: 'OK', onPress: this.goBackToMain.bind(this) }
            ],
            { cancelable: false }
        );
    }

    clickChangeInfo() {
        const { txtName, txtPhone, txtAddress } = this.state;
        getToken()
        .then(token => changeInfoApi(token, txtName, txtPhone, txtAddress))
        .then((user) => {
                this.alertSuccess();
                global.onSignIn(user);
        })
        .catch(err => console.log(err));
    }

    render(){

        const {
            wrapper, header, headerTitle, backIconStyle, body,
            signInContainer, signInTextStyle, textInput
        } = styles;

        const { txtName, txtAddress, txtPhone } = this.state;

        return (
            <View style={wrapper}>
                <View style={header}>
                    <View />
                    <Text style={headerTitle}>Đổi thông tin</Text>
                    <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
                        <Image source={backSpecial} style={backIconStyle} />
                    </TouchableOpacity>
                </View>
                <View style={body}>
                    <TextInput
                        style={textInput}
                        placeholder="Enter your name"
                        autoCapitalize="none"
                        value={txtName}
                        onChangeText={text => this.setState({...this.state,  txtName:  text })}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Enter your address"
                        autoCapitalize="none"
                        value={txtAddress}
                        onChangeText={text => this.setState({...this.state, txtAddress: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Enter your phone number"
                        autoCapitalize="none"
                        value={txtPhone}
                        onChangeText={text => this.setState({...this.state, txtPhone: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity
                        style={signInContainer}
                        onPress={this.clickChangeInfo.bind(this)}
                    >
                        <Text style={signInTextStyle}>Đổi thông tin</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: { 
        flex: 1, 
        backgroundColor: '#fff' 
    },
    header: { 
        flex: 1,
        backgroundColor:  theme.Color.NiceRed, 
        alignItems: 'center',
        justifyContent: 'space-between', 
        flexDirection: 'row',
        paddingHorizontal: 10 
    },// eslint-disable-line
    headerTitle: { 
        fontFamily: 'Avenir', 
        color: '#fff',
         fontSize: 20 
    },
    backIconStyle: { 
        width: 30,
        height: 30 
    },
    body: { 
        flex: 10, 
        backgroundColor: theme.Color.NiceRed,
         justifyContent: 'center'
     },
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: theme.Color.Black,
        borderWidth: 1,
    },
    signInTextStyle: {
        color: '#FFF', 
        fontFamily: 'Avenir', 
        fontWeight: '600', 
        paddingHorizontal: 20,
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor:  theme.Color.NiceRed,
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        borderColor: theme.Color.White,
        borderWidth: 1,
    },
    signInStyle: {
        flex: 3,
        marginTop: 50,
    }
});
