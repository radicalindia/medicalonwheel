import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import theme from '../utils/theme';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../App';
import { addNavREf } from '../redux/actions/navigationREf';
import { http } from '../utils/AxiosInstance';


const Login = ({navigation}) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState('ashu@gmail.com');
    const [password, setPassword] = useState('123456');
    const [ visible,setVisible]=useState(true);
    const dispactch=useDispatch()

    const login = async () => {

        try {
            const response=  await  http.get('/', {
                params: {
                    method: 'login',
                    email: email?.trim(),
                    password: password?.trim()
                }
            }) 
            console.log('Response:', response.data?.response);
              if(response?.data?.response?.userId){
                AsyncStorage.setItem("user",JSON.stringify(response.data?.response));
                await dispactch(addNavREf("Tab"))
                navigation.replace("Tab");
              }
              else{
                Alert.alert("Invalid Credentials")

              }
        } catch (error) {
             console.log(error)   
        }
        

    }

    return (
        <ScrollView contentContainerStyle={{padding:15,backgroundColor:"white",height:'100%'}}>
 
             
            {/* <CustomTextInput
     label={"Name"}
     value={name}
     setValue={setName}
     placeholder={"Enter Your Name"}
     marginTop={"35%"}
     /> */}
                         <Image source={require("../assests/images/medical.png")}  style={{width:240,height:150,marginTop:20,marginRight:"auto",marginLeft:"auto"}} resizeMode='contain'/>

                         <Text style={[globalStyles.text, { fontSize: 22, marginTop: "25%" }]}>Welcome back!</Text>
            <Text style={[globalStyles.text2]}>Sign In to continue</Text>
            <CustomTextInput
                label={"Email Id"}
                value={email}
                setValue={setEmail}
                placeholder={"Enter Your Email id"}
                marginTop={30}
            />  
            <CustomTextInput
                label={"Password"}
                value={password}
                iconName={true}
                secure={true}
                visible={visible}
                setVisible={setVisible}
                setValue={setPassword}
                placeholder={"Enter Password"}
                marginTop={15}
            />
            <TouchableOpacity style={{ marginLeft: "auto", marginTop: 20 }}><Text style={{ color: theme.colors.primaryOpacity }}>Forgot Password?</Text></TouchableOpacity>
            <CustomButton onPressfuntion={()=>login()} text={"Sign In"} marginTop={"20%"} />
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                <Text style={[styles.text2]}>Don't have an account ? </Text>
                <TouchableOpacity onPress={()=>navigation.navigate("CreateAccount")}>
                    <Text style={{ color: theme.colors.primaryOpacity, fontWeight: "bold" }}> Register now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    googleButton: {
        width: "40%",
        borderRadius: 5,
        elevation: 5,
        backgroundColor: "white",
        height: 40,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonText: {
        color: "black",
        fontSize: 14,
        fontWeight: "bold",

    }
})

export default Login