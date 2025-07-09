import { Alert, Modal, Pressable, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from "../routes";
import { useState } from "react";

type Props = NativeStackScreenProps<RootParamList, 'Home'>;
export const Home = ({ navigation }: Props) => {

  const onStartPress = () => {
    Alert.alert("Long press to start the game")
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={onStartPress}
        onLongPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>Start Game!</Text>
      </Pressable>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 300,
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 150,
    backgroundColor: 'purple',
  },
  buttonText: {
    color: 'white',
    fontSize: 48,
  }
});