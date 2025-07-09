import { Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../routes";

type Props = NativeStackScreenProps<RootParamList, "Results">;

const trophyUrl = "https://arenafanzone.com/cdn/shop/products/1copie.jpg";
export const Results = ({ navigation, route }: Props) => {
  const { startingNumber, targetNumber, isHigher } = route?.params || {};
  const isWin =
    (!isHigher && startingNumber > targetNumber) ||
    (isHigher && startingNumber < targetNumber);

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
    if (isWin) {
      return `You've won`;
    } else {
      return `You've lost`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You chose {isHigher ? "Higher" : "Lower"}</Text>
      <Text style={styles.textBold}>{resultMessage()}</Text>
      <Text style={styles.text}>
        Starting number was {startingNumber} and target was {targetNumber}
      </Text>
      {isWin && (
        <View>
          <Image
            source={{ uri: trophyUrl }}
            style={{ width: 240, height: 240, marginTop: 50 }}
          />
        </View>
      )}
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
    textAlign:"center",
  },
    textBold: {
    fontSize: 30,
    marginVertical: 15,
    textAlign:"center",
    fontWeight:"bold",
  },
});
