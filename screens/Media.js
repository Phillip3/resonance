import React from 'react';
import { ScrollView, StyleSheet, WebView } from 'react-native';
import Colors from '../constants/Colors';

export default class MediaScreen extends React.Component {
  static navigationOptions = {
    title: 'MEDIA',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }} style={styles.container}>
        <WebView
          style={styles.container}
          javaScriptEnabled={true}
          source={{ uri: 'https://www.youtube.com/embed/wZZ7oFKsKzY' }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: Colors.darkestGray,
  },
});
