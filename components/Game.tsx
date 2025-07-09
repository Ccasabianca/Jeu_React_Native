import { Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from "react-native";
import { RootParamList } from "../routes";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootParamList, 'Game'>;
export const Game = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Game page</Text>
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