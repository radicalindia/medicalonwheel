// Import necessary libraries
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../utils/GlobalStyles';
import theme from '../utils/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { retrireveUserFromLocal } from '../redux/actions/userAction';
import { useIsFocused } from '@react-navigation/native';
import { http } from '../utils/AxiosInstance';
import { getCarts } from '../redux/actions/cart';

// Sample data for products
const productsData = [
  { id: '1', name: 'Product 1', price: 20.99 },
  { id: '2', name: 'Product 2', price: 15.49 },
  { id: '3', name: 'Product 3', price: 25.99 },
  // Add more products as needed
];

const CartProductsPage = ({navigation}) => {
  // State to manage the list of added products
  const user = useSelector(({user})=>user?.data)
//   console.log(user)
  const dispactch = useDispatch()
  const [addedProducts, setAddedProducts] = useState(productsData);
  const cart = useSelector(({cart})=>cart?.data);
  console.log(cart?.length);

  const [loading,setLoading]=useState(false);
  const [ cout, setcount]=useState(0)
  const focus = useIsFocused();
  const [ data,setData]=useState([]);
  const fetch=async()=>{
    console.log(user)
    try {
      setLoading(true);
       dispactch(retrireveUserFromLocal())
      const method="myCart"
      const userId=user?.userId;

      const {data} = await http.get('/',{  params: {
        method,
        userId
      },});
      console.log(data)
      setData(data?.response)
             setLoading(false)  
    } catch (error) {
      console.log(error)
    }
    }
  useEffect(()=>{
    dispactch(getCarts())
    fetch();
     },[focus]);

     const removeFromCart=async(productid)=>{
        const method = "deleteCart"
        const productId=productid;
        const userId=user?.userId

        try {
            const {data }= await http.get('/',{params:{
           method,
           productId,
           userId
            }})
            console.log(data);
            // await fetch();
            dispactch(getCarts())
        } catch (error) {
             console.log(data);
        }
     }
     const addtoCart=async(item)=>{
      // setLoading(true)
      try {
        const method="addtocart"
        const userId=user?.userId
        const type="medicine"
        console.log(item)
  
        const {data} = await http.get('/',{  params: {
          method,
          type,
          userId,
          productId:item?.productId,
          price:item?.price,
          qty:item?.qty+1
  
        },});
        console.log(data);
        dispactch(getCarts())
        setLoading(false);
        // Alert.alert("Product added to the cart")
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
      }

  // Render individual product item
  const renderProductItem = ({ item }) => (
    <View style={[globalStyles.rowflex,{  alignItems: 'center', padding: 10,elevation:2 ,width:"99%",marginVertical:10,marginHorizontal:5,backgroundColor:"white",borderRadius:15}]}>
        {/* <Image source={{uri:"https://www.medicalonwheel.com/images/product/88880.jpg"}} style={{height:120,width:120}}/> */}
         {/* <View style={[globalStyles.rowflex]}>
         <Text>{item.productName}</Text>

<Text style={{color:theme.colors.primaryOpacity,fontWeight:"bold",fontSize:15}}>{item.qty} Qty.</Text>
         </View> */}
         <View>
         <Text style={[globalStyles.text]}>{item?.productName}</Text>
         <Text style={{color:"green",opacity:.4,fontWeight:"bold"}}>off 15%</Text>
         </View>

         <View>
          <Text style={[globalStyles.text2]}>Rs. {item?.price}</Text>
          {/* <Text style={[globalStyles.text2,{fontSize:13,color:theme.colors.primaryOpacity}]}>Rs. {item?.price}</Text> */}
          <View style={[globalStyles.rowflex,{width:90}]}>
            <TouchableOpacity onPress={()=>removeFromCart(item?.productId)} style={{height:25,width:25,borderRadius:20,borderWidth:1,borderColor:"black",justifyContent:"center",alignItems:"center"}}><Text style={[globalStyles.text]}>-</Text></TouchableOpacity>
            <Text style={[globalStyles.text]}>{item?.qty}</Text>
            <TouchableOpacity onPress={()=>addtoCart(item)} style={{height:25,width:25,borderRadius:20,borderWidth:1,borderColor:"black",justifyContent:"center",alignItems:"center"}}><Text style={[globalStyles.text]}>+</Text></TouchableOpacity>

          </View>
         </View>


          {/* <View style={[globalStyles.rowflex,styles.button]}>
            <TouchableOpacity onPress={()=>removeFromCart(item?.productId)}>
            <MaterialCommunityIcons name="delete" size={24} color="white" style={{ marginRight: 10 }} />

            </TouchableOpacity>
      <Text style={{ marginLeft: 'auto',color:"white" }}>₹{item?.price*item?.qty}</Text>
          </View> */}
    </View>
  );


  

  return (
    <View style={[globalStyles.container2]}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
        Cart Products
      </Text>
        <View style={{height:"90%"}}>
        {loading?<ActivityIndicator style={{marginRight:'auto',marginLeft:"auto"}} size={"large"} color={"black"}/>:<FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        // numColumns={2}
      />}
      {data?.length>0?    
        <View style={[globalStyles.rowflex,{backgroundColor:theme.colors.primaryOpacity,height:40,borderRadius:5,paddingHorizontal:10,alignItems:"center"}]}>
          <Text style={{color:"white",fontSize:16,fontWeight:"bold"}}>₹ {cart&&cart?.reduce((accumulator, currentObject) => {
    return accumulator + parseFloat(currentObject.price)*parseFloat(currentObject.qty);
  }, 0)}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Address")} style={[styles.button,{flexDirection:"row",marginLeft:"auto"}]}>
        <MaterialCommunityIcons name="forward" size={24} color="white" style={{ marginRight: 10 }} />

        <Text style={{color:"white",fontSize:16,fontWeight:"bold"}}>Check Out</Text>

        </TouchableOpacity>
      </View>:<Text>Empty cart</Text>}

        </View>
    </View>
  );
};


const styles = StyleSheet.create({
    button:{
        backgroundColor:"rgba(0,0,0,.8)",borderRadius:5,paddingHorizontal:10,paddingVertical:2
    }
})
export default CartProductsPage;
