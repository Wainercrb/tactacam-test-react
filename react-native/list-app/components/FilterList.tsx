import React from "react";
import { View, StyleSheet } from "react-native";
import type { TFIlterArgs } from "../types";

import OrientationSelector from "./OrientationSelector";
import ColorSelector from "./ColorSelector";

type TProps = {
  setFilterArgs: React.Dispatch<React.SetStateAction<TFIlterArgs>>;
};

export default function FilterPhotoList({
  setFilterArgs,
}: TProps): React.ReactElement {
  return (
    <View>
      <View style={styles.container}>
        <OrientationSelector
          onOrientationChange={(orientation) =>
            setFilterArgs((prevState) => {
              return { ...prevState, orientation, page: 1 };
            })
          }
        />
        <ColorSelector
          onColorChange={(color: string) => {
            setFilterArgs((prevState) => {
              return { ...prevState, color, page: 1 };
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
