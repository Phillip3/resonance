import React, { useReducer, useRef } from 'react';
import { StyleSheet, Platform, View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DropdownAlert from 'react-native-dropdownalert';
import * as Amplitude from 'expo-analytics-amplitude';
import Text from './shared/Text';
import Button from './shared/Button';
import Colors from '../constants/Colors';
import { isEmailValid } from '../utils/groups';
import { askQuestion } from '../data/groups';
import ModalSheet from './ModalSheet';
import Spinner from './shared/Spinner';

const initialState = {
  loading: false,
  success: false,
  firstName: '',
  lastName: '',
  email: '',
  question: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'setLoading':
      return {
        ...state,
        loading: action.value,
      };
    case 'setSuccess':
      return {
        ...state,
        success: action.value,
      };
    case 'setFirstName':
      return {
        ...state,
        firstName: action.value,
      };
    case 'setLastName':
      return {
        ...state,
        lastName: action.value,
      };
    case 'setEmail':
      return {
        ...state,
        email: action.value,
      };
    case 'setQuestion':
      return {
        ...state,
        question: action.value,
      };
    default:
      throw new Error();
  }
}

export default props => {
  const [
    { loading, success, firstName, lastName, email, question },
    dispatch,
  ] = useReducer(reducer, initialState);
  const dropdownAlertRef = useRef(null);

  const handleOpenModal = () => {
    Amplitude.logEventWithProperties('OPEN Group Ask Question', {
      group: props.title,
    });
  };

  const handleAsk = () => {
    if (!firstName || !lastName || !email || !question) {
      return dropdownAlertRef.current.alertWithType(
        'warn',
        '😮',
        `Make sure you've filled out everything`
      );
    }

    if (!isEmailValid(email)) {
      return dropdownAlertRef.current.alertWithType(
        'error',
        '🤔',
        'Make sure your email is correct'
      );
    }

    dispatch({ type: 'setLoading', value: true });
    Amplitude.logEventWithProperties('SUBMIT Group Ask Question', {
      group: props.title,
    });
    askQuestion(props.groupID, firstName, lastName, email, question)
      .then(askSuccess => {
        if (askSuccess) {
          // close this modal
          dispatch({ type: 'setLoading', value: false });
          dispatch({ type: 'setSuccess', value: true });
          setTimeout(() => dispatch({ type: 'setSuccess', value: false }), 0);

          props.showSuccess('Thanks for asking ☺️');
        }
      })
      .catch(err => {
        dispatch({ type: 'setLoading', value: false });
        Amplitude.logEventWithProperties('ERROR Group Ask Question', {
          group: props.title,
          error: err,
        });
      });
  };

  return (
    <ModalSheet
      buttonTitle="Ask a Question"
      success={success}
      handleOpenModal={handleOpenModal}
    >
      {loading && <Spinner style={{ backgroundColor: 'transparent' }} />}

      <View style={styles.container}>
        <Text style={styles.title}>Ask a question</Text>

        <Text style={styles.info}>
          {`The group leaders will reach out to you with more info about this group`}
        </Text>

        <TextInput
          autoCompleteType="name"
          autoCorrect={false}
          keyboardAppearance="dark"
          returnKeyType="done"
          placeholder="First name"
          placeholderTextColor={Colors.gray}
          value={firstName}
          onChangeText={value => dispatch({ type: 'setFirstName', value })}
          style={styles.input}
        />
        <TextInput
          autoCompleteType="name"
          autoCorrect={false}
          keyboardAppearance="dark"
          returnKeyType="done"
          placeholder="Last name"
          placeholderTextColor={Colors.gray}
          value={lastName}
          onChangeText={value => dispatch({ type: 'setLastName', value })}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardAppearance="dark"
          returnKeyType="done"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={Colors.gray}
          value={email}
          onChangeText={value => dispatch({ type: 'setEmail', value })}
          style={styles.input}
        />
        <TextInput
          keyboardAppearance="dark"
          placeholder="Ask a question..."
          placeholderTextColor={Colors.gray}
          multiline={true}
          value={question}
          onChangeText={value => dispatch({ type: 'setQuestion', value })}
          style={styles.input}
        />
        <View style={styles.submitButton}>
          <Button title="Ask" onPress={handleAsk} />
        </View>
      </View>

      {/* $FlowFixMe */}
      <DropdownAlert
        ref={dropdownAlertRef}
        wrapperStyle={{ marginTop: Platform.OS === 'ios' ? 0 : 80 }}
        renderImage={() => (
          <AntDesign
            name={'warning'}
            size={30}
            color={Colors.white}
            style={{ padding: 8, alignSelf: 'center' }}
          />
        )}
        zIndex={1}
      />
    </ModalSheet>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { marginBottom: 40, fontSize: 30, color: Colors.white },
  info: {
    marginBottom: 30,
    fontSize: 18,
    color: Colors.gray,
    textAlign: 'center',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 10,
    fontSize: 18,
    color: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  submitButton: { flex: 1, marginVertical: 10, justifyContent: 'flex-end' },
});
