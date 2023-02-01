import { Image } from "react-native";

type TProps = {
  idx?: string;
  uri: string;
};

export default function ImagePreview({
  idx = "",
  uri,
}: TProps): React.ReactElement {
  return (
    <Image
      key={idx}
      source={{ uri }}
      style={{
        width: "auto",
        height: 400,
        borderWidth: 2,
        borderColor: "white",
        resizeMode: "contain",
        marginBottom: 12,
      }}
    />
  );
}
