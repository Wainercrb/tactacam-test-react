import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import type { TFIlterArgs } from "../types";

import OrientationSelector from "./OrientationSelector";
import ColorSelector from "./ColorSelector";

type TProps = {
    setFilterArgs: React.Dispatch<React.SetStateAction<TFIlterArgs>>;
};

export default function FilterPhotoList({ setFilterArgs }: TProps) {

  return (
    <View style={styles.container}>
      <OrientationSelector
        onOrientationChange={(orientation) =>
          setFilterArgs((prevState) => {
            return { ...prevState, orientation };
          })
        }
      />
      <ColorSelector
        onColorChange={(color: string) => {
          setFilterArgs((prevState) => {
            return { ...prevState, color };
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
