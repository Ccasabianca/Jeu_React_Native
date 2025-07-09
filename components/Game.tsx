import React, { useState, useCallback } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../routes";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootParamList, "Game">;

export const Game = ({ navigation }: Props) => {
  const [startingNumber, setStartingNumber] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      const random = Math.floor(Math.random() * 100) + 1;
      setStartingNumber(random);
    }, [])
  );

  const handleChoice = (isHigher: boolean) => {
    const targetNumber = Math.floor(Math.random() * 100) + 1;

    navigation.navigate("Results", {
      startingNumber,
      targetNumber,
      isHigher,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>Number: {startingNumber}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonHigher}
          onPress={() => handleChoice(true)}
        >
          <Text style={styles.buttonText}>Higher</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonLower}
          onPress={() => handleChoice(false)}
        >
          <Text style={styles.buttonText}>Lower</Text>
        </TouchableOpacity>
      </View>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  numberText: {
    fontSize: 46,
    marginBottom: 80,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 20,
  },
  buttonHigher: {
    backgroundColor: "green",
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonLower: {
    backgroundColor: "red",
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: "center",
    marginTop : 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
