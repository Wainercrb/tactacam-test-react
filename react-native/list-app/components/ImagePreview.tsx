import { Image } from "react-native";

type TProps = {
  idx: string;
  uri?: string;
};

export default function ImagePreview({ idx, uri = 'None' }: TProps) {
  return (
    <Image
      onProgress={() => {console.log('uno dos')}}
      key={idx}
      source={{ uri }}
      style={{
        width: 'auto',
        height: 400,
        borderWidth: 2,
        borderColor: "white",
        resizeMode: "contain",
        margin: 8,
      }}
    />
  );
}
