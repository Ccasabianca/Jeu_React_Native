import { Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from "../routes";

type Props = NativeStackScreenProps<RootParamList, 'Results'>;
export const Results = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Results page</Text>
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