import { View, Text, Button, StyleSheet } from "react-native";
import { useGetPhotoByIdQuery } from "../services/unsplash";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IUnsplashPhoto } from "../types";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import type { TRootStackParamList } from "../App";

import ImagePreview from "../components/ImagePreview";
import { useState } from "react";

interface Props
  extends NativeStackScreenProps<TRootStackParamList, "Preview"> {}

export default function ScreenListPreview({ route }: Props) {
  const { photoID } = route.params;
  const { data, isFetching } = useGetPhotoByIdQuery(photoID); // We also can pass this data using the props, but for this example i am using redux-toolkit
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getImageUrl = (image: IUnsplashPhoto): string => {
    const { urls } = image;
    return urls.full ?? urls.thumb;
  };

  const handleDownload = async (
    image: IUnsplashPhoto | undefined
  ): Promise<void> => {
    try {
      if (!image) {
        alert("Image not found!");
        return;
      }

      setIsLoading(true);
      const imageUri = getImageUrl(image);
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      if (status !== "granted") {
        alert("Failed to get media library permission");
        return;
      }

      const fileName = `${Date.now()}.jpg`;
      const fileUri = FileSystem.documentDirectory + fileName;
      const { uri } = await FileSystem.downloadAsync(imageUri, fileUri);

      await MediaLibrary.createAssetAsync(uri);
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

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
          <Text style={styles.titleText}>
            Description: {data.description || "---"}
          </Text>
          <Text style={styles.descriptionText}>
            Likes: {data.likes || "No Description :("}
          </Text>
        </View>
      )}

      <View style={styles.downloadBtn}>
        <Button
          onPress={() => handleDownload(data)}
          title="Download"
          color="#841584"
          disabled={isLoading}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  downloadBtn: {
    marginTop: 24,
  },
  titleText: {
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 16,
  },
});
