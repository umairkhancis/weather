import React, { Component } from 'react'
import {
  Text, 
  View, 
  StyleSheet, 
  StatusBar
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {fetchWeather} from './weatherAPI.js'

export default class App extends Component {

  componentDidMount() {
    this.getLocation();
    fetchWeather(24, 67)
      .then(resp => console.log(resp.main));
  }

  getLocation() {
      navigator.geolocation.getCurrentPosition(
        (posData) => console.log(posData),
        (error) => alert(error),
        {timeout: 10000}
      )
  }

  render() {
    return (
    <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Icon name={'ios-sunny'} size={80} color={'white'} /> 
          <Text style={styles.temp}>24°</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>
            Build an <Text style={{color: 'red'}}> Awesome </Text> Weather App
          </Text>
          <Text style={styles.subtitle}>Let's Make a Rain</Text>
        </View>
      </View>            
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD017',
  },  
  header: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  body: {
    flex: 5,
    // backgroundColor: 'red',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    margin: 8,
  },
  temp: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 24,
    color: 'white'
  },
  title: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 68,
    color: 'white',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 20,
    color: 'white',
  }  
})