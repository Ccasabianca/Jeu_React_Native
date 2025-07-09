import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../routes";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

type Props = NativeStackScreenProps<RootParamList, "Game">;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const Game = ({ navigation }: Props) => {
  const [startingNumber, setStartingNumber] = useState<number>(0);

  const translateXHigher = useSharedValue(300);
  const translateXLower = useSharedValue(-300);

  useFocusEffect(
    useCallback(() => {
      const random = Math.floor(Math.random() * 100) + 1;
      setStartingNumber(random);

      translateXHigher.value = 300;
      translateXLower.value = -300;

      translateXHigher.value = withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      });
      translateXLower.value = withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      });
    }, [])
  );

  const animatedStyleHigher = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXHigher.value }],
  }));

  const animatedStyleLower = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXLower.value }],
  }));

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

      <AnimatedTouchable
        onPress={() => handleChoice(true)}
        style={[styles.buttonHigher, animatedStyleHigher]}
      >
        <Text style={styles.buttonText}>Higher</Text>
      </AnimatedTouchable>

      <AnimatedTouchable
        onPress={() => handleChoice(false)}
        style={[styles.buttonLower, animatedStyleLower]}
      >
        <Text style={styles.buttonText}>Lower</Text>
      </AnimatedTouchable>

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
  buttonHigher: {
    backgroundColor: "green",
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonLower: {
    backgroundColor: "red",
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
