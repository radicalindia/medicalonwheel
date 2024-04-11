import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './Pages/Home/Home';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import CreateAccount from './Pages/CreateAccount';
import BottomNav from './components/BottomNav';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { addNavREf } from './redux/actions/navigationREf';
import Doctor from './Pages/Doctor';
import Upload from './Pages/Upload';
import DocterData from './Pages/DocterData';
import TopBar from './components/TopBar';
import Profile from './Pages/Profile';
import Pathology from './Pages/Pathology';
import Medicine from './Pages/Medicine';
import PathologyDetail from './Pages/PathologyDetail';
import CartProducts from './Pages/Cart';
import Address from './Pages/Address';
import MedicineIndex from './Pages/MedicineIndex';
import SearchMedicine from './Pages/SearchMedicine';
import SearchPathology from './Pages/SearchPathology';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Fontist from 'react-native-vector-icons/Fontisto.js';
import theme from './utils/theme';


const Tab = createBottomTabNavigator();


// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
const App = () => {
  const [currentroute, setCurrentroute] = useState();

  const nav = useSelector(({ nav }) => nav?.nav);
  console.log(nav)

  const getUserType = async () => {
    return await AsyncStorage.getItem('userType');
  }
  const isFocus = useIsFocused
  useEffect(() => {
    setCurrentroute(navigationRef.current?.getCurrentRoute()?.name);
    console.log("route name", navigationRef.current?.getCurrentRoute()?.name);
  });
  // const nav = useSelector(({nav}) => nav.nav);


  const NavbarAbsentScreens = [

    // "RegisterMineUser"
  ];
  const NavbarAbsentScreensBottom = [
    "CreateAccount",
    "Login",
    "MedicineSearch",
    "PathalogySearch"
  ];



  const dispactch = useDispatch();
  // dispactch(addNavREf('CreateAccount'));


  useEffect(() => {
    console.log(navigationRef)
  }, [navigationRef])

  useEffect(() => {
    const unsubscribe = navigationRef.current.addListener('focus', () => {
      setCurrentroute(navigationRef.current?.getCurrentRoute()?.name);

    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigationRef]);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {/* {!NavbarAbsentScreens.includes(currentroute) && ((getUserType=="mine"||getUserType=="truckOwner")&&<AppBar />)} */}
        {!NavbarAbsentScreensBottom.includes(navigationRef.current?.getCurrentRoute()?.name) && <TopBar/>}
        {/* <TopBar /> */}
        <Stack.Navigator initialRouteName="Tab">
          <Stack.Screen
            name="Tab"
            component={Home}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Welcome', headerShown: false }}
          /> 
          <Stack.Screen
          name="Address"
          component={Address}
          options={{ title: 'Welcome', headerShown: false }}
        />
          <Stack.Screen
            name="Cart"
            component={CartProducts}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="Doctor"
            component={Doctor}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="DocterData"
            component={DocterData}
            options={{ title: 'Welcome', headerShown: false }}
          />
           <Stack.Screen
            name="Pathalogy"
            component={Pathology}
            options={{ title: 'Welcome', headerShown: false }}
          />
           <Stack.Screen
            name="PathalogySearch"
            component={SearchPathology}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="PathalogyDetail"
            component={PathologyDetail}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="Upload"
            component={Upload}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="Medicine"
            component={Medicine}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="MedicineSearch"
            component={SearchMedicine}
            options={{ title: 'Welcome', headerShown: false }}
          />
           <Stack.Screen
            name="MedicineIndex"
            component={MedicineIndex}
            options={{ title: 'Welcome', headerShown: false }}
          />

          {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        </Stack.Navigator>
        {/* {!NavbarAbsentScreens.includes(currentroute) && (getUserType=="mine"?<BottomNav />:getUserType=="mineOwner"?<TruckOwner/>:<DriverBottomNav/>)} */}
        {!NavbarAbsentScreensBottom.includes(navigationRef.current?.getCurrentRoute()?.name) && <BottomNav />}
      </NavigationContainer>
      {/* <CurvedBottomBars/> */}
    </>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{tabBarStyle:{height:60}}}
      tabBarOptions={{
        activeTintColor: '#3498db',
        inactiveTintColor: 'gray',
      }}
    >
      {/* Define your screens and icons */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ()=>null,
          tabBarIcon: ({ color, size,focused }) => (
            <MaterialCommunityIcons            
               name="home"
            color={focused?theme.colors.primaryOpacity:color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Medicine"
        component={Medicine}
        options={{
          tabBarLabel: ()=>null,
          tabBarIcon: ({ color, size ,focused}) => (
            <FontAwesome
               name="first-aid"
            color={focused?theme.colors.primaryOpacity:color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarLabel: ()=>null,
          tabBarIcon: ({ color, size ,focused}) => (
            <View style={{height:45,width:45,borderRadius:25,justifyContent:"center",alignItems:"center",backgroundColor:theme.colors.primaryOpacity,marginBottom:15}}>
                  <MaterialCommunityIcons
               name="plus-thick"
            color={"white"} size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Doctor"
        component={Doctor}
        options={{
          tabBarLabel: ()=>null,
          tabBarIcon: ({ color, size ,focused}) => (
            <MaterialCommunityIcons    
               name="doctor"
            color={focused?theme.colors.primaryOpacity:color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Pathalogy"
        component={Pathology}
        options={{
          tabBarLabel: ()=>null,
          tabBarIcon: ({ color, size,focused }) => (
            <Fontist name="test-bottle" color={focused?theme.colors.primaryOpacity:color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default App;
