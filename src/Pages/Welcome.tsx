import React from 'react'
import {Text, SafeAreaView,
        StyleSheet, Image,
        TouchableOpacity,
        Dimensions, View} from 'react-native'
import wateringImg from '../Assets/watering.png'
import colors from '../styles/colors'
import { Feather } from '@expo/vector-icons'
import fonts from '../styles/fonts'
import { useNavigation } from '@react-navigation/core'

export function Welcome(){
  const navigation = useNavigation();

  function handleStart(){
    navigation.navigate('UserIdentification')
  }

  return(
    <SafeAreaView style={style.container}>
      <View style={style.wrapper}>
        <Text style={style.title}>
              Gerencie{'\n'} 
              suas plantas{'\n'}de forma fácil
        </Text>
        <Image 
          source={wateringImg}
          style={style.image}
          resizeMode= 'contain'
        />
        <Text style={style.subtitle}>
              Não esqueça mais de regar suas{'\n'}
              plantas. Nós cuidamos de lembrar
              você{'\n'}sempre que precisar.
        </Text>
        <TouchableOpacity style={style.button} onPress={handleStart}>
          <Text> 
            <Feather
              name="chevron-right"
              style={style.buttonIcon}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
  },
  wrapper:{
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10, 
  },
  title:{
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },
  subtitle:{
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 18,
    color: colors.heading,
    fontFamily: fonts.text
  },
  image:{
    height: Dimensions.get('window').width * 0.7
  },
  button:{
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  buttonIcon:{
    fontSize: 32,
    color: colors.white,
  }
})
