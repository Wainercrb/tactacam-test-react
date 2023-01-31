import { View, Text, Button, StyleSheet } from "react-native";
import { useGetPhotoByIdQuery } from "../services/unsplash";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TUnsplashPhoto } from "../types";
import type { TRootStackParamList } from "../App";

import ImagePreview from "../components/ImagePreview";

interface Props
  extends NativeStackScreenProps<TRootStackParamList, "Preview"> {}

export default function ScreenListPreview({ route }: Props) {
  const { photoID } = route.params;
  const { data, isFetching } = useGetPhotoByIdQuery(photoID);

  const getImageUrl = (image: TUnsplashPhoto): string => {
    const { urls } = image;
    return urls.full ?? urls.thumb;
  };

  const downloadImage = (image: TUnsplashPhoto | undefined): void => {
    if (image) {
      
    }
  }

  if (isFetching) {
    return (
      <View style={styles.container}>
        <Text>Loading your image :)</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data && (
        <View>
          <ImagePreview uri={getImageUrl(data)} idx={"None"} />
          <Text>Description: {data.description || "---"}</Text>
          <Text>Likes: {data.likes || "No Description :("}</Text>
        </View>
      )}

      <Button
        onPress={() => downloadImage(data)}
        title="Download"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 3
  },
});
