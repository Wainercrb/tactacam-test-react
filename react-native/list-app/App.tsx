import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

import ScreenList from "./screens/ScreenList";
import ScreenListPreview from "./screens/ScreenListPreview";

export type TRootStackParamList = {
  List: undefined;
  Preview: { photoID: string };
};

export default function App() {
  const Stack = createNativeStackNavigator<TRootStackParamList>();
  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name="List"
            options={{ title: "Home List" }}
            component={ScreenList}
          />
          <Stack.Screen
            name="Preview"
            options={{ title: "Image Preview" }}
            component={ScreenListPreview}
          />
        </Stack.Navigator>
      </ReduxProvider>
    </NavigationContainer>
  );
}
