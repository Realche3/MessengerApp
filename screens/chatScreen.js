import React from "react";
import {Platform, KeyboardAvoidingView, SafeAreaView,Text} from "react-native";
import {GiftedChat}  from 'react-native-gifted-chat';
import fire from "../fire";
import Fire from "../fire";
import { Ionicons } from '@expo/vector-icons';

export default class chatScreen extends React.Component {
   
    state = {
        messages : []
    }
    back = () => {
        this.props.navigation.navigate("Login")
    }

    get user() {
        return{
            _id: Fire.uid,
            name: this.props.navigation.state.params.name
        };
    }

    componentDidMount() {
        Fire.get(message =>
            this.setState(previous=> ({
            messages : GiftedChat.append(previous.messages, message)
        }))
        );
    }

    componentWillMount() {
        Fire.off();
    }
   
    render () {
        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user} />;

        if(Platform.OS == 'android'){
            return (
                <KeyboardAvoidingView style={{flex: 1}} behavior= "padding" keyboardVerticalOffset={30} enabled>
                    {chat}
                </KeyboardAvoidingView>
            );
        }
        return( 
        <SafeAreaView style={{flex: 1}}>
          
            <SafeAreaView style={{backgroundColor:"#cffeff", height: 40, flexDirection: "row"}}>
                    <Ionicons name="arrow-back-circle-sharp" size={35} color="green" style={{marginLeft:5}} onPress={this.back} />
                    <Text style={{color:"Green", marginLeft: 100, marginTop:10, fontWeight:"bold", fontSize: 16}}>Safe Chat</Text>
            </SafeAreaView>

            {chat}
        </SafeAreaView>
        );
   }
}

  