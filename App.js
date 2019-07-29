import React, { useState } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';

export default props => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/echo_logo.png'),
        require('./assets/images/activate.png'),
        require('./assets/images/baptism.jpg'),
        require('./assets/images/volunteer.jpg'),
        require('./assets/images/pray.jpg'),
        require('./assets/images/missions.png'),
        require('./assets/images/connect_bg.png'),
        require('./assets/images/groups_bg.png'),
        require('./assets/images/giving_bg.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        'NunitoSans-Light': require('./assets/fonts/NunitoSans-Light.ttf'),
        'NunitoSans-Regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
        'NunitoSans-Bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
      }),
    ]);
  };

  const handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const handleFinishLoading = () => setIsLoadingComplete(true);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        hidden={true}
        animated
        barStyle="light-content"
        networkActivityIndicatorVisible
        showHideTransition="fade"
        translucent
      />
      <AppNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
