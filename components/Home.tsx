import { Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from "../routes";

type Props = NativeStackScreenProps<RootParamList, 'Home'>;
export const Home = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate('Game')}>Welcome to the Home page</Text>
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