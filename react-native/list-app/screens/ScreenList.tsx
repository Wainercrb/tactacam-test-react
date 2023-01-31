import {
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchPhotos } from "../store/slice/photoListSclice";

import ImagePreview from "../components/ImagePreview";
import FilterPhotoList from "../components/FilterList";
import type { TFIlterArgs } from "../types";

const FILTER_INITIAL_STATE: TFIlterArgs = {
    color: '#d98c40',
    orientation: ''
}

export default function ScreenList() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const screenState = useSelector((state: RootState) => state.photoList);
  const [filterArgs, setFilterArgs] = useState<TFIlterArgs>(FILTER_INITIAL_STATE);

  useEffect(() => {
    dispatch(fetchPhotos({ page: 1, ...filterArgs }));
  }, [filterArgs]);

  const handleOnEndReached = () => {
    if (!screenState.loading) {
      dispatch(fetchPhotos({ page: screenState.nextPage }));
    }
  };

  const goToPreviewScreen = (photoID: string) => {
    // alert();
    console.log("asdfasdfasfasdfasf");
    navigation.navigate("Preview", { photoID: photoID });
  };

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <FilterPhotoList setFilterArgs={setFilterArgs} />
      </View>
      <View style={styles.list}>
        <FlatList
          data={screenState.photos}
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
          onEndReached={handleOnEndReached}
        />
      </View>
      <View style={styles.loading}>
        {screenState.loading && <Text>Loading...</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filter: {
    height: 60,
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
