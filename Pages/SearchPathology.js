import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity ,Image, ActivityIndicator, Dimensions, Alert, BackHandler} from 'react-native'
import React ,{useEffect, useState}from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import theme from '../utils/theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getPathology } from '../redux/actions/pathology';
import { http } from '../utils/AxiosInstance';
import { useIsFocused } from '@react-navigation/native';
import { addNavREf } from '../redux/actions/navigationREf';


const SearchPathology = ({navigation}) => {
  // const [search, setSearch] = useState();
  const data = [{ name: "blood test ", value: "345", includes: "5 test" }, { name: "Complete check up ", value: "345", includes: "6 test" }]
  const pathologyList = useSelector((state)=>state.pathology?.data?.response);
  const [ loading,setLoading]=useState(false);
  const [searchMed, setSearch] = useState();
  const [ searchData,setSearchData]=useState();
  const user = useSelector(({user})=>user?.data);
  const focus = useIsFocused()
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', async() => {

       await dispatch(addNavREf("Home"))
      navigation.navigate("Pathalogy");
      // Optionally, return true to prevent the default back action
      // return true;
    });

    // Clean up the event listener when the component is unmounted
    return () => backHandler.remove();
  }, []);

  const getQtyCount=(id)=>{
    const data= cart&&cart?.find((item)=>item.productId==id);
    console.log(data,id)
    return data
}
  // console.log(pathologyList)
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetch=async()=>{
     try {
       setLoading(true);
       await dispatch(getPathology());
       setLoading(false)  
     } catch (error) {
       console.log(error)
     }
     }
    fetch();
     },[]);

     const addtoCart=async(item)=>{
      try {
        const method="addtocart"
        const userId=user?.userId
        const type="pathology"
        console.log(item?.testId);
  
        const {data} = await http.get('/',{  params: {
          method,
          type,
          userId,
          productId:item?.testId,
          price:item?.discount,
          qty:1
  
        },});
        console.log(data);
        Alert.alert("Product added to the cart")
      } catch (error) {
        console.log(error)
      }
      }
     useEffect(()=>{

      const fetch=async()=>{
       try {
         setLoading(true);
         const method="searchPathalogy"
         const search=searchMed
         if(searchMed &&searchMed.length>2){
          const {data}= await http.get("/",{params:{
            method,search
          }})
          console.log(data);
          setSearchData(data?.response)
         }
         // await dispatch(getMedicines());
         setLoading(false)  
       } catch (error) {
         console.log(error)
       }
       }
      fetch();
       },[searchMed]);

       const Renderitem2 = ({ item }) => {
        return (
          <View style={[{height:50,flexDirection:"row",marginVertical:10,backgroundColor:"white",elevation:1,marginLeft:2,paddingHorizontal:10}]}>
          {/* <Image style={{ width: 60, height: 20, marginLeft: 5, marginTop: 5 }} source={require("../assests/images/medical.png")} /> */}
          {/* <Image style={{ height: 70, }} resizeMode='contain' source={{ uri:item.img }} /> */}
            <View>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 14,}}>{item.testName.substring(0,25)}{item.testName.length>25&&"..."}</Text>
          
          <View style={{marginRight: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{flexDirection:"row"}}>
              {/* <Text style={{fontSize:14,fontWeight:"bold"}}>₹ {Math.round((85 / 100) *item.mrp)}</Text> */}
            <Text style={{fontSize:14,fontWeight:"bold"}}>₹ {item.discount}</Text>

              <Text style = {{ textDecorationLine: 'line-through', color: 'red',marginLeft:5,fontSize:13 }}>{item.mrp}</Text>
            </View>
          </View>
            </View>
           <TouchableOpacity onPress={()=>addtoCart(item)} style={{marginLeft:"auto",backgroundColor:"black",justifyContent:"center",alignItems:"center",paddingHorizontal:5,paddingVertical:1,opacity:.7,height:30,borderRadius:5}}><Text style={{color:"white"}}>Add To Cart</Text></TouchableOpacity>
        </View>
        );
      };
 
  const Renderitem = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate("PathalogyDetail",{id:item})} style={[styles.producBox]}>
        <Image style={{ width: 90, height: 30, marginLeft: 5, marginTop: 5, marginBottom: 10, }} source={require("../assests/images/medical.png")} />

        <Text style={{ color: "black", fontWeight: "bold" }}>{item.packageName}</Text>
        {/* <Text style={{ color: "black", fontWeight: "bold", opacity: .5 }}>{item.discount}</Text> */}
        <View style={{flexDirection:"row"}}>
          <Text style={{fontSize:14,fontWeight:"bold"}}>₹ {item.packge_price-item.discount}</Text>
          <Text style = {{  color: theme.colors.primaryOpacity,textDecorationLine:"line-through",marginLeft:10}}>{item.packge_price}</Text>
        </View>     
         </TouchableOpacity>
    )
  }
  return (
    <View style={[globalStyles.container2]}>
          <View style={[globalStyles.rowflex, globalStyles.searchBox]}>
        <MaterialIcons name="search" color="#35383F" size={20} />
        <TextInput
          style={{ width: '90%' }}
          placeholder="Search pathology tests"
          value={searchMed}
          onChangeText={(e) => setSearch(e)}
          placeholderTextColor={'#35383F'}
        />
      </View>
      
      {loading?<ActivityIndicator size={"large"} color={"black"} style={{marginTop:50,marginLeft:"auto",marginRight:"auto"}}/>:

      <View style={{flex:1,backgroundColor:"white",height:Dimensions.get("window").height,width:Dimensions.get("window").width-20}}>
         <FlatList
        data={searchData}
        // contentContainerStyle={{paddingBottom:150}}
        renderItem={Renderitem2}
        keyExtractor={(_, index) => index.toString()}
        // numColumns={2}
      />
      </View>
      }
      

    </View>
  )
}


const styles= StyleSheet.create({
    producBox: {
        width: "48%",
        height: 140,
        marginRight:"1%",
        marginLeft:"1%",
      
        borderRadius: 10,
        backgroundColor: "white",
        elevation: 1,
        borderBottomColor: theme.colors.primaryOpacity,
        borderBottomWidth: 2,
        paddingHorizontal:5,
        justifyContent:"space-evenly",
        marginVertical:10
    
    
      },
})

export default SearchPathology