import { View, Text, Button, StyleSheet } from "react-native";
import { useGetPhotoByIdQuery } from "../services/unsplash";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TUnsplashPhoto } from "../types";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import type { TRootStackParamList } from "../App";

import ImagePreview from "../components/ImagePreview";
import { useState } from "react";

interface Props
  extends NativeStackScreenProps<TRootStackParamList, "Preview"> {}

export default function ScreenListPreview({ route }: Props) {
  const { photoID } = route.params;
  const { data, isFetching } = useGetPhotoByIdQuery(photoID);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getImageUrl = (image: TUnsplashPhoto): string => {
    const { urls } = image;
    return urls.full ?? urls.thumb;
  };

  const downloadImage = async (
    image: TUnsplashPhoto | undefined
  ): Promise<void> => {
    if (!image) {
      alert("Image not found!");
      return;
    }
    setIsLoading(true);
    await handleDownload(getImageUrl(image));
  };

  const handleDownload = async (url: string): Promise<void> => {
    try {
      // Retrieve the image data
      const response = await fetch(url);
      const binaryData = await response.arrayBuffer();

      // Save the image to the device's file system
      const imageName = url.substring(url.lastIndexOf("/") + 1);
      const imagePath = FileSystem.documentDirectory + imageName;
      await FileSystem.writeAsByteArray(imagePath, new Uint8Array(binaryData));

      // Open the saved image in the device's photo gallery
      await FileSystem.openBrowserAsync(imagePath);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
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
          <Text>Description: {data.description || "---"}</Text>
          <Text>Likes: {data.likes || "No Description :("}</Text>
        </View>
      )}

      <Button
        onPress={() => downloadImage(data)}
        title="Download"
        color="#841584"
        disabled={isLoading}
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 3,
  },
});
