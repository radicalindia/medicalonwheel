// import React from 'react';
// import { View, StyleSheet, Text, Image, SafeAreaView, FlatList } from 'react-native';
// import theme from '../utils/theme';
// import { globalStyles } from '../utils/GlobalStyles';

// const Data = [
//     { id: 1, title: 'Item 1' },
//     { id: 2, title: 'Item 2' },
//     { id: 3, title: 'Item 3' },
//     { id: 3, title: 'Item 4' },
//     // { id: 3, title: 'Item 5' },
// ];

// const Item = ({ title }) => (
//     <View style={[styles.item,{width:120}]}>

//             <Image style={{ width: 60, height: 20, marginLeft: 5, marginTop: 5 }} source={require("../assests/images/medical.png")} />
//             <Image style={{ height: 70, }} resizeMode='contain' source={{ uri: "https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/5cc48b44bac744eba09ef6c33b006cef.jpg" }} />
//             <Text style={{ color: "black", fontWeight: "bold", marginLeft: 5, textAlign: "center", fontSize: 13 }}>Himalaya Vitals</Text>
//     </View>
// );

// const Medicine = () => {
//     return (
//         <View style={[globalStyles.container2]}>
//             <FlatList
//                 data={Data}
//                 renderItem={({ item }) => <Item/>}
//                 keyExtractor={item => item.id}
//                 numColumns={2}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     name: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 40,
//     },
//     item: {
//         width: "40%",
//         height: 120,
//         borderRadius: 10,
//         backgroundColor: "white",
//         elevation: 2,
//         borderBottomColor: theme.colors.primaryOpacity,
//         borderBottomWidth: 2,
//         flex: 1,
//         justifyContent: 'center',
//         // alignItems: 'center',
//     }
// })

// export default Medicine;

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {globalStyles} from '../utils/GlobalStyles';
import theme from '../utils/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicines } from '../redux/actions/medicine';
import { http } from '../utils/AxiosInstance';
import { getCarts } from '../redux/actions/cart';
import { addNavREf } from '../redux/actions/navigationREf';
import { useIsFocused } from '@react-navigation/native';


const Medicine = ({navigation}) => {
    const [searchMed, setSearch] = useState();
    const medicines = useSelector(({medicine})=>medicine?.data?.response);
    const [medicineSearchesData ,setMedicinessearchesData]=useState();
    const user = useSelector(({user})=>user?.data)
    const cart = useSelector(({cart})=>cart?.data)
    console.log("cart",cart)

    const focus = useIsFocused()
    useEffect(()=>{
      if(focus){
        dispatch(addNavREf("Medicine"))
      }
    },[focus])


    // console.log(medi)
    // console.log(medicines);
    const [laoding,setLoading]=useState(false);
    const dispatch=useDispatch();
    const [ modalVisible,setModalVisible]=useState(false);
    const [ loadingId,setLoadingId]=useState()
  
    useEffect(()=>{
   const fetch=async()=>{
    try {
      setLoading(true);
      await dispatch(getMedicines());
      setLoading(false)  
    } catch (error) {
      console.log(error)
    }
    }
   fetch();
    },[])

    const addtoCart=async(item)=>{
    try {
      const method="addtocart"
      const userId=user?.userId
      const type="medicine"
      console.log(item)

      const {data} = await http.get('/',{  params: {
        method,
        type,
        userId,
        productId:item?.medicineId,
        price:item?.mrp,
        qty:1

      },});
      console.log(data);
      dispatch(getCarts())
      Alert.alert("Product added to the cart")
    } catch (error) {
      console.log(error)
    }
    }

    useEffect(()=>{

      const fetch=async()=>{
       try {
         setLoading(true);
         const method="searchMedicine"
         const search=searchMed
         if(searchMed &&searchMed.length>2){
          const {data}= await http.get("/",{params:{
            method,search
          }})
          // console.log(data);
          setMedicinessearchesData(data?.response)

         }
         // await dispatch(getMedicines());
         setLoading(false)  
       } catch (error) {
         console.log(error)
       }
       }
      fetch();
       },[searchMed])


  const data = [
    { name: 'blood test ', value: '345', includes: '5 test' },
    { name: 'Complete check up ', value: '345', includes: '6 test' },
    { name: 'blood test ', value: '345', includes: '5 test' },
    { name: 'Complete check up ', value: '345', includes: '6 test' },
  ];

  const Renderitem = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate("MedicineIndex",{item:item})} style={[styles.producBo]}>
      {/* <Image style={{ width: 60, height: 20, marginLeft: 5, marginTop: 5 }} source={require("../assests/images/medical.png")} /> */}
      <Image style={{ height: 70, }} resizeMode='contain' source={{ uri:item.img }} />
      <Text style={{ color: "black", fontWeight: "bold", textAlign: "center", fontSize: 12 }}>{item.productName.substring(0,60)}</Text>
      
      <View style={{ marginLeft: 10, marginRight: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
        <View style={{flexDirection:"row"}}>
          <Text style={{fontSize:14,fontWeight:"bold"}}>₹ {item.offerPrice}</Text>
          <Text style = {{ textDecorationLine: 'line-through', color: 'red',marginLeft:5,fontSize:13 }}>{item.mrp}</Text>
        </View>
      </View>

    </TouchableOpacity>
    );
  };
  const Renderitem2 = ({ item }) => {
    return (
      <View style={[{height:40,flexDirection:"row",marginVertical:10,backgroundColor:"white",elevation:1,marginLeft:2,paddingHorizontal:10}]}>
      {/* <Image style={{ width: 60, height: 20, marginLeft: 5, marginTop: 5 }} source={require("../assests/images/medical.png")} /> */}
      {/* <Image style={{ height: 70, }} resizeMode='contain' source={{ uri:item.img }} /> */}
        <View>
        <Text style={{ color: "black", fontWeight: "bold", textAlign: "center", fontSize: 14 }}>{item.medicineName}</Text>
      
      <View style={{ marginLeft: 10, marginRight: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
        <View style={{flexDirection:"row"}}>
          <Text style={{fontSize:14,fontWeight:"bold"}}>₹ {Math.round((85 / 100) *item.mrp)}</Text>
          <Text style = {{ textDecorationLine: 'line-through', color: 'red',marginLeft:5,fontSize:13 }}>{item.mrp}</Text>
        </View>
      </View>
        </View>
       <TouchableOpacity onPress={()=>addtoCart(item,)} style={{marginLeft:"auto",backgroundColor:"black",justifyContent:"center",alignItems:"center",paddingHorizontal:5,paddingVertical:1,opacity:.7,height:30,borderRadius:5}}><Text style={{color:"white"}}>Add To Cart</Text></TouchableOpacity>
    </View>
    );
  };
  const gottonex=async()=>{
    await dispatch(addNavREf("Home"))
    navigation.navigate("MedicineSearch"); 
  }
  return (
    <View style={[globalStyles.container2]}>
      <View style={[globalStyles.rowflex, globalStyles.searchBox]}>
        <MaterialIcons name="search" color="#35383F" size={20} />
        <TextInput
          style={{ width: '90%' }}
          placeholder="Search Medicine"
          value={searchMed}
          onChangeText={(e) => setSearch(e)}
          onFocus={()=>gottonex()}
          placeholderTextColor={'#35383F'}
        />
      </View>
        
        {laoding?<ActivityIndicator size={"large"} color={"black"} style={{marginTop:50,marginLeft:"auto",marginRight:"auto"}}/>:
       <FlatList
        data={medicines}
        renderItem={Renderitem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
      />
      }
  

      
    </View>
  );
};

const styles = StyleSheet.create({
  producBo: {
    width: "49%",
    height: 160,
    paddingTop:10,
    marginTop:10,
    marginRight: "1%",
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 1,
    justifyContent:"space-between",
    borderBottomColor: theme.colors.primaryOpacity,
    borderBottomWidth: 2,
    paddingHorizontal:5
  },
});

export default Medicine;
