import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import FilterListDefaultArgs from "../constants/FilterList";

type TProps = {
  onOrientationChange: (orientation: string) => void;
};

export default function OrientationSelector({
  onOrientationChange,
}: TProps): React.ReactElement {
  const [selectedOrientation, setSelectedOrientation] = useState(
    FilterListDefaultArgs.orientation
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Orientation:</Text>
      <Picker
        selectedValue={selectedOrientation}
        onValueChange={(itemValue) => {
          setSelectedOrientation(itemValue);
          onOrientationChange(itemValue);
        }}
      >
        <Picker.Item label="Landscape" value="landscape" />
        <Picker.Item label="Portrait" value="portrait" />
        <Picker.Item label="Squarish" value="squarish" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    color: "black",
  },
  label: {
    marginBottom: 6,
  },
});
