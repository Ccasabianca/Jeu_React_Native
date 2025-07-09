import React, { useEffect } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../routes";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

type Props = NativeStackScreenProps<RootParamList, "Results">;

const trophyUrl = "https://arenafanzone.com/cdn/shop/products/1copie.jpg";
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const Results = ({ navigation, route }: Props) => {
  const { startingNumber, targetNumber, isHigher } = route?.params || {};
  const isWin =
    (!isHigher && startingNumber > targetNumber) ||
    (isHigher && startingNumber < targetNumber);

  const playAgainTranslateX = useSharedValue(500);

  useEffect(() => {
    playAgainTranslateX.value = withTiming(0, {
      duration: 600,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const animatedPlayAgainStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: playAgainTranslateX.value }],
  }));

  if (
    startingNumber === undefined ||
    targetNumber === undefined ||
    typeof isHigher !== "boolean"
  ) {
    return (
      <View style={styles.container}>
        <Text>Invalid game results</Text>
        <StatusBar />
      </View>
    );
  }

  const resultMessage = () => {
    return isWin ? "You've won" : "You've lost";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You chose {isHigher ? "Higher" : "Lower"}</Text>
      <Text style={styles.textBold}>{resultMessage()}</Text>
      <Text style={styles.text}>
        Starting number was {startingNumber} and target was {targetNumber}
      </Text>

      <View style={{ alignItems: "center" }}>
        <AnimatedTouchable
          onPress={() => navigation.navigate("Game")}
          style={[styles.buttonHigher, animatedPlayAgainStyle]}
        >
          <Text style={styles.buttonText}>Play again !</Text>
        </AnimatedTouchable>

        {isWin && (
          <Image
            source={{ uri: trophyUrl }}
            style={{ width: 240, height: 240, marginTop: 30 }}
          />
        )}
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
    padding: 20,
  },
  text: {
    fontSize: 30,
    marginVertical: 15,
    textAlign: "center",
  },
  textBold: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonHigher: {
    backgroundColor: "purple",
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginVertical: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
