import {
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  View,
  Text
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useGetPhotosQuery } from "../services/unsplash";
import type { TUnsplashPhoto } from "../types";

export default function TabTwoScreen() {
  const [page, setPage] = useState(1);
  const [fetchData, setFetData] = useState<TUnsplashPhoto[]>([]);
  // const [data, setData] = useState<RootObject[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const { data, isLoading, refetch, isFetching,error } = useGetPhotosQuery({ page: page });
  const [pokemon, setPokemon] = useState<any>([]);
  // console.log(data)

  // useEffect(() => {
  //   if (data && data.length) {
  //     console.log(isFetching, isLoading);
  //     setFetData((prevState) => prevState.concat(data));
  //   }
  // }, [data]);
  // useEffect(() => {
  //   refetch()
  //   console.log('refreshhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
  // }, [page])

  // useEffect(() => {
  //   // loadData();
  //   refetch();
  // }, []);

  // const loadData = async (): Promise<void> => {
  //   setIsLoading(true);
  //   const response = await fetch(
  //     `https://api.unsplash.com/search/photos?page=${page}&query=office&client_id=fn-pVLasIokTQN9i-QrPuH9FeftGgSdo76B4ybimcdQ`
  //   );
  //   const toJson = await response.json();
  //   const result = toJson.results as any[];

  //   result.forEach((item) => {
  //     console.log("item is\n", item);
  //   });

  //   setData((prevState) => prevState.concat(result));
  //   console.log("===============================");
  //   console.log("===============================");
  //   console.log("===============================");

  //   // console.log(JSON.stringify(result))
  //   setIsLoading(false);
  // };


  useEffect(() => {
    if (page > 1) {
        console.log('age', page)
      refetch()

    }
  }, [page])

  // useEffect(() => {
  //   if (data?.length) {
  //     setPokemon((pv: any) => pv.concat(data))
  //   }
  // }, [data])

  const getSingleImageUrl = (item: TUnsplashPhoto): string => {
    console.log('item nam', item.alt_description)
    // console.log("item", item);
    // console.log('------------------------------')
    // console.log(item)
    // if (!item || !item.preview_photos || item.preview_photos.length) {
    //   return 'https://images.unsplash.com/photo-1542228556-0125288e633d?ixlib=rb-4.0.3&w=400&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb'
    // }
    return (
      item.urls.small ||
      "https://images.unsplash.com/photo-1542228556-0125288e633d?ixlib=rb-4.0.3&w=400&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        { error && (
          <Text>{error + ""}</Text>

        )}
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View>
              {/* {!item || !item.urls ? (
                <View></View>
              ) : (
              )} */}
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("Profile2")}
                >
                  <Image
                    key={index}
                    source={{ uri: getSingleImageUrl(item) }}
                    style={{
                      width: "auto",
                      height: 400,
                      borderWidth: 2,
                      borderColor: "white",
                      resizeMode: "contain",
                      margin: 8,
                    }}
                  />
                </TouchableWithoutFeedback>
              <Text style={{ color: "#d35647", fontSize: 12 }}>
                {item.alt_description + item.id}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => {
            setPage((prevState) => prevState + 1);
            // refetch()
            // loadData();
            // setTimeout(() => {
            //   refetch();
              
            // }, 5000);
          }}
          onEndReachedThreshold={1}
        />
      </View>
      {/* <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
      <View style={{ height: 40, backgroundColor: "red" }}>

        {isFetching && <Text>Loading...</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
