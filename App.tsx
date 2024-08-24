import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Yup from 'yup';
import { Formik } from 'formik';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'should be min 4 char')
    .max(16, 'should be max of 16')
    .required('this is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(true);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digitChars = '0123456789';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvxyz';
    const symbolChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (number) {
      characterList += digitChars;
    }
    if (symbol) {
      characterList += symbolChars;
    }
    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setLowerCase(false);
    setUpperCase(true);
    setNumber(false);
    setSymbol(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              console.log(values);
              generatePasswordString(+values.passwordLength);
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.head}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>{errors.passwordLength}</Text>
                    )}
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="e.g., 8"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include LowerCase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include UpperCase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numeric</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={number}
                    onPress={() => setNumber(!number)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbol</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbol}
                    onPress={() => setSymbol(!symbol)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.formAction}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.primaryBtnText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text style={styles.secondaryBtnText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {password ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputColumn: {
    marginBottom: 10,
  },
  head: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  formAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryBtn: {
    backgroundColor: '#29AB87',
    padding: 10,
    borderRadius: 5,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  secondaryBtn: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  secondaryBtnText: {
    color: '#000',
    fontSize: 16,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginTop: 20,
  },
  cardElevated: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  generatedPassword: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
