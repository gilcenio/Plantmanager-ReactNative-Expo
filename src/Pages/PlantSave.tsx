import React, { useState } from 'react'
import {StyleSheet,
        View,
        Text,
        Alert,
        ScrollView,
        Image,
        Platform,
        TouchableOpacity} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import {Button} from '../Components/Button'
import { useRoute } from '@react-navigation/core'
import {SvgFromUri} from 'react-native-svg'
import waterdrop from '../Assets/waterdrop.png'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import DateTimerPicker, {Event} from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'

interface Params{
  plant: {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
      times: string;
      repeat_every: string;
    }
  }
}

export function PlantSave(){
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');
  const route = useRoute();
  const {plant} = route.params as Params;

  function handleChangeTime(event: Event, dateTime: Date|undefined){
    if(Platform.OS == 'android'){
      setShowDatePicker(oldState => !oldState);
    }
    if(dateTime && isBefore(dateTime, new Date())){
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰')
    }
    if(dateTime)
      setSelectedDateTime(dateTime);
  }

  function handleOpenDatetimePickerForAdroid (){
    setShowDatePicker(oldState => !oldState)
  }

  return(
    <View style={style.container}>
      <View style={style.plantInfo}>
        <SvgFromUri 
          uri={plant.photo}
          height={150}
          width={150}
        />
        <Text style={style.plantName}>
          {plant.name}
        </Text>
        <Text style={style.plantAbout}>
          {plant.about}
        </Text>
      </View>

      <View style={style.controller}>
        <View style={style.tipContainer}>
          <Image 
            source={waterdrop}
            style={style.tipImage}
          />
          <Text style={style.tipText}> 
            {plant.water_tips}
          </Text>
        </View>
          <Text style={style.alertLabel}>
            Escolha o melhor horario para ser lembrado:
          </Text>
          {
            showDatePicker && (
            <DateTimerPicker 
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
          )}
          {
            Platform.OS == 'android' && (
              <TouchableOpacity
                onPress={handleOpenDatetimePickerForAdroid}
                style={style.dateTimerPickerButton}
              >
                <Text style={style.dateTimerPickerText}>
                  {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )
          }
          <Button
            title="Cadastrar planta" 
            onPress={() => {}}
          />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'space-between',
    color: colors.shape
  },
  plantInfo:{
   flex: 1,
   paddingHorizontal: 30,
   paddingVertical: 50,
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: colors.shape 
  },
  plantName:{
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout:{
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  controller:{
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60,
  },
  tipImage:{
    width: 56,
    height: 56,
  },
  tipText:{
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify',
  },
  alertLabel:{
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dateTimerPickerText:{
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  },
  dateTimerPickerButton:{
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,

  }
})