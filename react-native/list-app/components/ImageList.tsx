import {
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  View,
} from "react-native";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import ImagePreview from "../components/ImagePreview";
import { IUnsplashPhoto } from "../types";

type TProps = {
  photos: IUnsplashPhoto[];
  page: number;
  handleNextPage(): void;
};

export default function ImageList({
  photos,
  handleNextPage,
  page,
}: TProps): React.ReactElement {
  const flatList = useRef<FlatList>(null);
  const navigation = useNavigation();

  const goToPreviewScreen = (photoID: string) => {
    navigation.navigate("Preview" as never, { photoID: photoID } as never);
  };

  useEffect(() => {
    if (page <= 1 && photos.length <= 10 && flatList && flatList.current) {
      flatList.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [photos]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatList}
        data={photos}
        keyExtractor={(_, index) => {
          return index.toString();
        }}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback onPress={() => goToPreviewScreen(item.id)}>
            <View>
              <ImagePreview uri={item.urls.thumb} idx={index.toString()} />
            </View>
          </TouchableWithoutFeedback>
        )}
        onEndReached={() => handleNextPage()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  }
});
