import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, Image, ActivityIndicator, Dimensions, } from 'react-native';
// Adjust the import path based on your project structure
import HorizontalPhotoScrollView2 from '../components/Carosoul';
import { globalStyles } from '../utils/GlobalStyles';
import theme from '../utils/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicines } from '../redux/actions/medicine';
import { getCarts } from '../redux/actions/cart';



const YourComponent = () => {
  const [search, setSearch] = useState();
  const medicines = useSelector(({medicine})=>medicine?.data?.response?.slice(0,4));
  // console.log("med",medicines);
  const [laoding,setLoading]=useState(false);
  const dispatch=useDispatch()

  useEffect(()=>{
 const fetch=async()=>{
  try {
    setLoading(true);
    await dispatch(getMedicines());
     dispatch(getCarts())
    setLoading(false)  
  } catch (error) {
    console.log(error)
  }
  }
 fetch();
  },[]);
  const Renderitem = ({item}) => {
    return (
      <View style={[styles.producBo]}>
      {/* <Image style={{ width: 60, height: 20, marginLeft: 5, marginTop: 5 }} source={require("../assests/images/medical.png")} /> */}
      <Image style={{ height: 70, }} resizeMode='contain' source={{ uri:item.img }} />
      <Text style={{ color: "black", fontWeight: "bold", textAlign: "center", fontSize: 12 }}>{item.productName.substring(0,50)}</Text>
      {/* <Text style={{ marginLeft: 10, fontSize: 12 }}>Made in India</Text> */}
      <View style={{ marginLeft: 10, marginRight: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
      <View style={{flexDirection:"row"}}>
          <Text>₹ {item.offerPrice}</Text>
          <Text style = {{ textDecorationLine: 'line-through', color: 'red',marginLeft:5 }}>{item.mrp}/-</Text>
        </View>
        {/* <Text>100gm</Text> */}
      </View>

    </View>
    );
  };
  return (

   <View style={{flex:1,backgroundColor:"white",}}>
    
    <ScrollView contentContainerStyle={[{paddingBottom:70,paddingHorizontal:10,}]}>



      {/* <Text style={[globalStyles.text, { marginVertical: 10 }]}>Home</Text> */}

      <View style={[globalStyles.rowflex, globalStyles.searchBox]}>
        <MaterialIcons name="search" color="#35383F" size={20} />
        <TextInput
          style={{ width: '90%' }}
          placeholder="Search Medicine"
          value={search}
          onChangeText={(e) => setSearch(e)}
          placeholderTextColor={'#35383F'}
        />
      </View>

      <HorizontalPhotoScrollView2 />

      <Text style={[styles.text, globalStyles.text]}>Popular</Text>
      {laoding?<ActivityIndicator size={"large"} color={"black"} style={{marginTop:50,marginLeft:"auto",marginRight:"auto"}}/>:<FlatList
        data={medicines}
        renderItem={Renderitem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
      />}

      <Text style={[styles.text, globalStyles.text, { marginTop: "5%", marginBottom: 5 }]}>Lab Test Package</Text>
      <ScrollView horizontal>

        <View style={[styles.producBox]}>
          <Image style={{ width: 90, height: 30, marginLeft: 5, marginTop: 5, marginBottom: 10 }} source={require("../assests/images/medical.png")} />

          <Text style={{ color: "black", fontWeight: "bold" }}>Cardiac Risk Matters</Text>
          <Text style={{ color: "black", fontWeight: "bold", opacity: .5 }}>Include 5 tests</Text>
          <Text style={{ color: "black", fontWeight: "bold" }}>345</Text>


          {/* <Text style={[{ color: "white", fontSize: 11 }, styles.medicalonwheel]}>Medical On Wheel</Text> */}
        </View>
        <View style={[styles.producBox]}>
          <Image style={{ width: 90, height: 30, marginLeft: 5, marginTop: 5, marginBottom: 10 }} source={require("../assests/images/medical.png")} />

          <Text style={{ color: "black", fontWeight: "bold" }}>Cardiac Risk Matters</Text>
          <Text style={{ color: "black", fontWeight: "bold", opacity: .5 }}>Include 5 tests</Text>
          <Text style={{ color: "black", fontWeight: "bold" }}>345</Text>


          {/* <Text style={[{ color: "white", fontSize: 11 }, styles.medicalonwheel]}>Medical On Wheel</Text> */}
        </View>
        <View style={[styles.producBox]}>
          <Image style={{ width: 90, height: 30, marginLeft: 5, marginTop: 5, marginBottom: 10 }} source={require("../assests/images/medical.png")} />

          <Text style={{ color: "black", fontWeight: "bold" }}>Cardiac Risk Matters</Text>
          <Text style={{ color: "black", fontWeight: "bold", opacity: .5 }}>Include 5 tests</Text>
          <Text style={{ color: "black", fontWeight: "bold" }}>345</Text>


          {/* <Text style={[{ color: "white", fontSize: 11 }, styles.medicalonwheel]}>Medical On Wheel</Text> */}
        </View>
        <View style={[styles.producBox]}>
          <Image style={{ width: 90, height: 30, marginLeft: 5, marginTop: 5, marginBottom: 10 }} source={require("../assests/images/medical.png")} />

          <Text style={{ color: "black", fontWeight: "bold" }}>Cardiac Risk Matters</Text>
          <Text style={{ color: "black", fontWeight: "bold", opacity: .5 }}>Include 5 tests</Text>
          <Text style={{ color: "black", fontWeight: "bold" }}>345</Text>


          {/* <Text style={[{ color: "white", fontSize: 11 }, styles.medicalonwheel]}>Medical On Wheel</Text> */}
        </View>

      </ScrollView>
    </ScrollView>
   </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black"
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    marginVertical: 10,
    marginBottom: 'auto',
  },
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
  producBox: {
    width: "23%",
    height: 120,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 2,
    borderBottomColor: theme.colors.primaryOpacity,
    borderBottomWidth: 2,
    paddingHorizontal: 5


  },
  ext: {
    // margin: 'auto',
    marginTop: 'auto',
    width: "100%",
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  medicalonwheel: {
    width: 115,
    marginLeft: 3,
    backgroundColor: theme.colors.primaryOpacity,
    height: 15,
    textAlign: "center",
    borderRadius: 5,
    opacity: .5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    color: "black"
    // marginLeft:10,
    // marginBottom:5
  }
});


export default YourComponent;
