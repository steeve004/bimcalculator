/* import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
 */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// States

const App = () => {
  const [standard, setStandard] = useState(true);
  const [inputValues, setInputValues] = useState({
    height: null,
    weight: null,
    height_in: null,
  });
  const [bmi, setBmi] = useState(0);

  //Method to select Standard or Metric units

  const switchType = name => {
    if (name === 'metric') {
      setStandard(false);
    } else {
      setStandard(true);
    }
    setInputValues({
      height: null,
      weight: null,
      height_in: null,
    });

    setBmi(0);
  };

  //Method to Set input values

  const changeInput = (e, name) => {
    setInputValues({
      ...inputValues,
      [name]: e,
    });
  };
  const bmiResult = () => {
    if (bmi > 0 && bmi <= 18.5) {
      return (
        <Text style={{ textAlign: 'center', fontSize: 22, color: '#000000' }}>
          Your BMI is {bmi.toFixed(2)} {'! \n'} You fall under the category of
          "Underweight".
        </Text>
      );
    } else if (bmi > 18.5 && bmi <= 24.9) {
      return (
        <Text style={{ textAlign: 'center', fontSize: 22, color: '#000000' }}>
          Your BMI is {bmi.toFixed(2)} {'! \n'} You fall under the category of
          "Normal Weight".
        </Text>
      );
    } else if (bmi > 24.9 && bmi <= 29.9) {
      return (
        <Text style={{ textAlign: 'center', fontSize: 22, color: '#000000' }}>
          Your BMI is {bmi.toFixed(2)} {'! \n'} You fall under the category of
          "Overweight".
        </Text>
      );
    } else if (bmi > 29.9) {
      return (
        <Text style={{ textAlign: 'center', fontSize: 22, color: '#000000' }}>
          Your BMI is {bmi.toFixed(2)} {'! \n'} You fall under the category of
          "Obese".
        </Text>
      );
    }
  };

  const { height, weight, height_in } = inputValues;

  //Method to calulate BMI

  const calculateBMI = () => {
    let calculated = 0;
    if (standard) {
      const ht_in = parseFloat(height_in);
      const ht = parseFloat(height) * 12;
      const total = ht + ht_in;
      console.log(
        ht,
        ht_in,
        'check value',
        weight,
        weight / (total * total),
        total,
      );
      calculated = weight / (total * total);
      calculated = calculated * 703;
      console.log(calculated, 'calculated');
    } else {
      const ht = height / 100;
      calculated = weight / (ht * ht);
    }

    console.log(calculated, 'bmi');
    setBmi(calculated);
  };

  //Designing the views

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          ...styles.mainContainer,
          backgroundColor: standard ? '#0a2e61' : '#d1d1d1',
        }}>
        <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10 }}>
          <View style={{ paddingVertical: 15, alignItems: 'center' }}>
            <Text style={{ fontSize: 28 }}>BMI Calculator</Text>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity
              onPress={() => switchType('standard')}
              style={standard ? styles.activeTabStyle : styles.inactiveTabStyle}>
              <Text
                style={standard ? styles.activeTextStyle : styles.inactiveTextStyle}>
                Standard Units
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => switchType('metric')}
              style={!standard ? styles.activeTabStyle : styles.inactiveTabStyle}>
              <Text
                style={!standard ? styles.activeTextStyle : styles.inactiveTextStyle}>
                Metric Units
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputField}>
              <TextInput
                keyboardType="number-pad"
                name="weight"
                value={weight}
                onChangeText={e => changeInput(e, 'weight')}
                placeholder={'Weight in ' + (!standard ? 'kgs' : 'lbs')}
                style={styles.inputStyle}
              />
            </View>
            <View style={styles.inputField}>
              <TextInput
                keyboardType="number-pad"
                name="height"
                value={height}
                onChangeText={e => changeInput(e, 'height')}
                placeholder={'Height in ' + (!standard ? 'cms' : 'feet')}
                style={styles.inputStyle}
              />
            </View>
            {standard && (
              <View style={styles.inputField}>
                <TextInput
                  keyboardType="number-pad"
                  name="height_in"
                  value={height_in}
                  onChangeText={e => changeInput(e, 'height_in')}
                  placeholder={'Height in ' + (!standard ? 'cms' : 'inches')}
                  style={styles.inputStyle}
                />
              </View>
            )}

            <TouchableOpacity style={styles.btnStyle} onPress={calculateBMI}>
              <Text style={styles.activeTextStyle}>Calculate Your BMI!</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 15, alignItems: 'center' }}>
            {bmi > 0 && bmiResult()}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

//Styles

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  tab: {
    flexDirection: 'row',
  },
  inactiveTabStyle: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 10,
    marginVertical: 10,
    elevation: 5,
  },
  activeTabStyle: {
    flex: 1,
    backgroundColor: '#0a2e61',
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 10,
    marginVertical: 10,
    elevation: 5,
  },
  inactiveTextStyle: {
    fontSize: 18,
    color: '#000000',
  },
  activeTextStyle: {
    color: '#ffffff',
    fontSize: 18,
  },
  inputContainer: {
    marginHorizontal: 15,
    paddingHorizontal: 15,
    marginVertical: 15,
    flex: 1,
  },
  inputField: {
    marginVertical: 10,
  },
  inputStyle: {
    fontSize: 18,
    paddingLeft: 12,
    borderWidth: 0.6,
  },
  btnStyle: {
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#d9580d',
    elevation: 8,
  },
});

export default App;