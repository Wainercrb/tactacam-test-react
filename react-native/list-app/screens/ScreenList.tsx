import {
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  View,
} from "react-native";
import { GetColorName } from 'hex-color-to-color-name';
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { TFIlterArgs } from "../types";

import ImagePreview from "../components/ImagePreview";
import FilterPhotoList from "../components/FilterList";
import { useGetPhotosQuery } from "../services/unsplash";

// TODO: Move this data into the contants filter
const FILTER_INITIAL_STATE: TFIlterArgs = {
  color: "#d98c40",
  orientation: "",
  page: 1
};

export default function ScreenList() {
  const flatList = useRef<FlatList>(null);
  const navigation = useNavigation();
  const [filterArgs, setFilterArgs] = useState(FILTER_INITIAL_STATE);
  const { data, isFetching, error } = useGetPhotosQuery({
    ...filterArgs,
    color: GetColorName(filterArgs.color)
  });

  useEffect(() => {
      if (flatList && flatList.current && filterArgs.page <= 1) {
        flatList.current.scrollToOffset({ animated: true, offset: 0 });
      }
  }, [filterArgs]);

  const goToPreviewScreen = (photoID: string) => {
    navigation.navigate("Preview" as never, { photoID: photoID } as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <FilterPhotoList setFilterArgs={setFilterArgs} />
      </View>
      <View style={styles.list}>
        <FlatList
          ref={flatList}
          data={data}
          keyExtractor={(_, index) => {
            return index.toString();
          }}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback
              onPress={() => goToPreviewScreen(item.id)}
            >
              <View>
                <ImagePreview uri={item.urls.thumb} idx={index.toString()} />
              </View>
            </TouchableWithoutFeedback>
          )}
          onEndReached={() => {
            setFilterArgs((prevState) => ({
              ...prevState,
              page: prevState.page + 1,
            }));
          }}
        />
      </View>
      <View style={styles.loading}>
        {isFetching && <Text>Loading...</Text>}
        {!isFetching && error && <Text>{JSON.stringify(error)}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  filter: {
    height: 120,
  },
  list: {
    flex: 1,
  },
  loading: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
