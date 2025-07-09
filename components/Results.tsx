import { Image, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from "../routes";

type Props = NativeStackScreenProps<RootParamList, 'Results'>;

const trophyUrl = 'https://arenafanzone.com/cdn/shop/products/1copie.jpg';
export const Results = ({ navigation, route }: Props) => {
  const { startingNumber, targetNumber, isHigher } = route?.params || {};
  const isWin = !isHigher && startingNumber > targetNumber || isHigher && startingNumber < targetNumber;

  if (startingNumber === undefined || targetNumber === undefined || typeof isHigher !== 'boolean') {
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
  }

  return (
    <View style={styles.container}>
      <Text>You chose {isHigher ? 'Higher' : 'Lower'}</Text>
      <Text>{resultMessage()}</Text>
      <Text>Starting number was {startingNumber} and target was {targetNumber}</Text>
      {isWin && (
        <View>
          <Image source={{ uri: trophyUrl }} style={{ width: 100, height: 100 }} />
        </View>
      )}
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
});