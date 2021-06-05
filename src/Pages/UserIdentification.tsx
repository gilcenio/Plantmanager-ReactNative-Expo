import React, { useState } from 'react'
import {SafeAreaView,
        StyleSheet,
        View,
        Text,
        TextInput,
        KeyboardAvoidingView,
        TouchableWithoutFeedback,
        Platform,
        Keyboard,
        Alert} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import {Button} from '../Components/Button'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function UserIdentification(){
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();
  const navigation = useNavigation();

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!name)
  }

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputChange(value: string){
    setIsFilled(!!value)
    setName(value)
  }

  async function handleSubmit(){
    //confirmacao de digitacao do nome
    if(!name)
      return Alert.alert('Me diz como chama voçê 😥')

    //salvando dados asyncstorage
    await AsyncStorage.setItem('@plantmenager:user', name);

    navigation.navigate('Confirmation')
  }

  return(
    <SafeAreaView  style={style.container}>
      <KeyboardAvoidingView 
        style={style.container} 
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={style.content}>
            <View style={style.form}>
              <View style={style.header}>
                <Text style={style.emoji}>
                  { isFilled ? '😄' : '😀'}
                </Text>
                <Text style={style.title}>
                  Como podemos{'\n'}chamar você?
                </Text>
              </View>
              <TextInput
                style={[
                  style.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={style.footer}>
                <Button onPress={handleSubmit} title="confirmar"/>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const style =  StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content:{
    flex: 1,
    width: '100%',
  },
  form:{
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },
  header:{
    alignItems: 'center'
  },
  emoji:{
    fontSize: 44,
  },
  input:{
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
  title:{
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  footer:{
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
  }
})