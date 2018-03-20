import React, { Component } from 'react'
import {
  Text, 
  View, 
  StyleSheet, 
  StatusBar
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {fetchWeather} from './weatherAPI.js'
import Highlighter from 'react-native-highlight-words'

const iconNames = {
  Default: 'md-time',
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloudy',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella'
}

const phrases = {
  Default: {
    title: "Fetching the Awesome Weather Data",
    subtitle: "Be patient, you are witnessing a miracle!",
    highlight: "Awesome",
    color: "#636363",
    backgroundColor: "#9C9C9C"
  },
  Clear: {
    title: "It's Awesome Amaze Balls",
    subtitle: "Let's play cricket",
    highlight: "Awesome",
    color: "#E32500",
    backgroundColor: "#FFD017"
  },
  Rain: {
    title: "Go Rain Go",
    subtitle: "Let's play football",
    highlight: "Rain",
    color: "#004A96",
    backgroundColor: "#2F343A"
  },
  Thunderstorm: {
    title: "Oh! That's Scary",
    subtitle: "Unplug those devices",
    highlight: "Scary",
    color: "#FBFF46",
    backgroundColor: "#020202"
  },
  Clouds: {
    title: "Cloud Storage Limit Reached",
    subtitle: "error: 5000 - cirrocumulus",
    highlight: "Limit",
    color: "#0044FF",
    backgroundColor: "#939393"
  },
  Snow: {
    title: "Snowy Please Go Away",
    subtitle: "Let's code all day",
    highlight: "Please",
    color: "#021D4C",
    backgroundColor: "#15A678"
  },
  Drizzle: {
    title: "Hey! Look Outside",
    subtitle: "Let's go for a walk",
    highlight: "Look",
    color: "#B3F6E4",
    backgroundColor: "#1FBB68"
  }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      temp: 0,
      weather: 'Default'
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
      navigator.geolocation.getCurrentPosition(
        (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
                      .then(res => this.setState({
                        temp: Math.round(res.temp),
                        weather: res.weather
                      })),
        (error) => alert(error),
        {timeout: 10000}
      )
  }

  render() {
    return (
    <View style={[styles.container, {backgroundColor: phrases[this.state.weather].backgroundColor}]}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={80} color={'white'} /> 
          <Text style={styles.temp}>{this.state.temp}°</Text>
        </View>

        <View style={styles.body}>
          <Highlighter
            style={styles.title}
            highlightStyle={{color: phrases[this.state.weather].color}}
            searchWords={[phrases[this.state.weather].highlight]}
            textToHighlight={phrases[this.state.weather].title}
          />
          <Text style={styles.subtitle}>{phrases[this.state.weather].subtitle}</Text>
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