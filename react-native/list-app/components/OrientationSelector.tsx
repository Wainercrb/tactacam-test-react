import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

type TProps = {
  onOrientationChange: (orientation: string) => void;
};

const OrientationSelector: React.FC<TProps> = ({ onOrientationChange }) => {
  const [selectedOrientation, setSelectedOrientation] = useState("portrait");

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedOrientation}
        onValueChange={(itemValue) => {
          setSelectedOrientation(itemValue);
          onOrientationChange(itemValue);
        }}
      >
        <Picker.Item label="Portrait" value="portrait" />
        <Picker.Item label="Landscape" value="landscape" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    color: "black",
  },
});

export default OrientationSelector;
