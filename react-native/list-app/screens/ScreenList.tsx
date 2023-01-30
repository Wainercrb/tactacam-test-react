import {
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Text,
  View,
} from "react-native";

export default function ScreenList() {
  return (
    <View style={styles.container}>
      <View style={styles.list}></View>
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  loading: {
    height: 40,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
