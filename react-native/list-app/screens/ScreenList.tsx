import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { useGetPhotosQuery } from "../services/unsplash";
import ImageList from "../components/ImageList";
import CustomSelect from "../components/CustomSelect";

const ORIENTATION_STATE_LIST = [
  { value: "landscape", label: "Landscape" },
  { value: "portrait", label: "Portrait" },
  { value: "squarish", label: "Squarish" },
];

const COLOR_STATE_LIST = [
  { value: "black_and_white", label: "Black And White" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "yellow", label: "Yellow" },
  { value: "orange", label: "Orange" },
  { value: "red", label: "Red" },
  { value: "purple", label: "Purple" },
  { value: "magenta", label: "Magenta" },
  { value: "green", label: "Green" },
  { value: "teal", label: "Teal" },
  { value: "blue", label: "Blue" },
];

const FILTER_INITIAL_STATE = {
  color: COLOR_STATE_LIST[0].value,
  orientation: ORIENTATION_STATE_LIST[0].value,
  page: 1,
};

export default function ScreenList() {
  const [filterArgs, setFilterArgs] = useState(FILTER_INITIAL_STATE);
  const { data, isFetching, error } = useGetPhotosQuery(filterArgs);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <CustomSelect
          label="Orientation:"
          data={ORIENTATION_STATE_LIST}
          handleChange={(value) => {
            setFilterArgs((prevState) => {
              return { ...prevState, orientation: value, page: 1 };
            });
          }}
        />

        <CustomSelect
          label="Color:"
          data={COLOR_STATE_LIST}
          handleChange={(value) => {
            setFilterArgs((prevState) => {
              return { ...prevState, color: value, page: 1 };
            });
          }}
        />
      </View>
      <ImageList
        page={filterArgs.page}
        photos={data ?? []}
        handleNextPage={() => {
          setFilterArgs((prevState) => ({
            ...prevState,
            page: prevState.page + 1,
          }));
        }}
      />
      <View style={styles.loadingContainer}>
        {isFetching && <Text>Loading...</Text>}
        {!isFetching && error && <Text>{JSON.stringify(error)}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loadingContainer: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
