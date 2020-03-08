import React from 'react';
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import * as Amplitude from 'expo-analytics-amplitude';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import Text from '../components/Text';
import Button from '../components/Button';

const handleGive = campus => {
  Amplitude.logEventWithProperties('mobileEngagementAction', {
    app: 'mobile',
    giving: campus,
  });

  Linking.openURL(`https://pushpay.com/g/${campus}`);
};

const GivingScreen = () => {
  const insets = useSafeArea();

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <ImageBackground
        source={require('../assets/images/giving_bg.png')}
        style={styles.backgroundImage}
      />
      <ScrollView style={styles.container}>
        <Text bold style={styles.headerTitle}>
          GIVING
        </Text>
        <Text style={styles.header}>Changing lives together</Text>
        <Text style={styles.content}>
          We believe that Christians ought to be the most generous people on
          Earth, because our God is a generous God — giving to us sacrificially
          over and over again. By contributing financially, you can be a part of
          changing people’s lives forever.
        </Text>

        <Button
          title="North San Jose"
          onPress={() => handleGive('echochurchnorth')}
          style={styles.button}
        />
        <Button
          title="South San Jose"
          onPress={() => handleGive('echochurchsouth')}
          style={styles.button}
        />
        <Button
          title="Sunnyvale"
          onPress={() => handleGive('echochurchsunnyvale')}
          style={styles.button}
        />
        <Button
          title="Fremont"
          onPress={() => handleGive('echochurchfremont')}
          style={styles.button}
        />
      </ScrollView>
    </View>
  );
};

GivingScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerTitle: {
    marginTop: 10,
    fontSize: 30,
    color: Colors.red,
  },
  backgroundImage: {
    width: '100%',
    height: Layout.window.height,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.7,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    color: Colors.white,
  },
  content: {
    marginBottom: 20,
    fontSize: 16,
    color: Colors.gray,
  },
  button: { marginVertical: 10 },
});

export default GivingScreen;
