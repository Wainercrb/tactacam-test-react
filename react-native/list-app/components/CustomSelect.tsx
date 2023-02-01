import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import FilterListDefaultArgs from "../constants/FilterList";

type TProps = {
  handleChange: (value: string) => void;
  label: string;
  data: {
    value: string;
    label: string;
  }[];
};

export default function CustomSelect({
  handleChange,
  data,
  label,
}: TProps): React.ReactElement {
  const [selectedItem, setSelectedItem] = useState(data[0].value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue) => {
          setSelectedItem(itemValue);
          handleChange(itemValue);
        }}
      >
        {data.map(({ value, label }, idx) => (
          <Picker.Item label={label} key={idx} value={value} />
        ))}
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
