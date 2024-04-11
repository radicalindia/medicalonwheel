import {
    View,
    Dimensions,
    Text,
    Image,
    Animated,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import React, {useRef, useEffect} from 'react';
  import {
    PanGestureHandler,
    State,
    GestureHandlerRootView,
  } from 'react-native-gesture-handler';
  import theme from '../../utiles/theme';
  import { navigate } from '../../App';
  import { addNavREf } from '../../redux/actions/navigationREf';
  import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const {width, height} = Dimensions.get('window');
  const Splash = ({navigation}) => {
    const animatedScale = useRef(new Animated.Value(0)).current;
    const animatedBorderRadius = animatedScale.interpolate({
      inputRange: [0, 1],
      outputRange: [width / 2, 0], // Adjust the values according to your needs
    });
    const onGestureEvent = Animated.event(
      [{nativeEvent: {translationX: animatedScale}}],
      {
        useNativeDriver: false,
      },
    );
  
    const onHandlerStateChange = ({nativeEvent}) => {
      if (nativeEvent.state === State.END) {
        Animated.timing(animatedScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }).start(() => {
          navigation.replace('Home');
        });
      }
    };
    const dispatch = useDispatch()
    const executeAfterTwoSeconds =async () => {
        const da = await AsyncStorage.getItem("user");
        if(da){
            await  dispatch(addNavREf("Home"))
  
            navigation.replace("Home")
        }
        else{
            navigate.replace("Login")
        }
  
    };
    
    // Call the function after a delay of 2 seconds
    setTimeout(executeAfterTwoSeconds, 1500);
  
    useEffect(() => {
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, []);
  
    return (
      <GestureHandlerRootView style={styles.container}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <Animated.View
            style={[
              styles.imageContainer,
              {
                  overflow: 'hidden',
                borderRadius: animatedScale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [500, 0],
                }),
                transform: [{scale: animatedScale}],
              },
            ]}>
            <Image
              source={require(".././assests/images/medical.png")} // Replace with your image source
              style={{width: width, height: height}}
              resizeMode="cover"
            />
            {/* Your splash screen content goes here */}
            {/* <TouchableOpacity onPress={() => navigation.replace('MainScreen')}>
              <Text>Tap to skip</Text>
            </TouchableOpacity> */}
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    circle: {
      backgroundColor: 'blue', // Adjust color as needed
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default Splash;
  