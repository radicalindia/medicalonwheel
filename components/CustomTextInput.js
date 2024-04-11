import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalStyles} from '../utils/GlobalStyles';
import theme from '../utils/theme';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

export const CustomTextInput = ({
  label,
  value,
  setValue,
  placeholder,
  marginTop,
  numeric,
  secure,
  iconName,
  visible,
  setVisible
}) => {
  return (
    <View style={{marginTop: marginTop,}}>
      <Text style={[globalStyles.text2, {opacity: 0.3, marginVertical: 5}]}>
        {label}
      </Text>
     <View style={{flexDirection:"row",alignItems:"center"}}>
     <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={e => setValue(e)}
        keyboardType={numeric}
        secureTextEntry={visible}
        style={{
          width: '100%',
        //   borderRadius: 5,
          backgroundColor: theme.colors.white,
        //   elevation: 2,
          height: 40,
          justifyContent: 'center',
          borderBottomWidth:1,
          borderColor:theme.colors.primaryOpacity,
          paddingHorizontal: 20,
          color: 'black',
        }}
      />
{      secure&&<TouchableOpacity onPress={()=>setVisible(!visible)}>
  <Ionicons name={visible?"eye-off-sharp":"eye"} size={20} color="black" style={{marginLeft:-30}}/>
</TouchableOpacity>
}
     </View>
    </View>
  );
};
