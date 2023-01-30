import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ScreenList from "./screens/ScreenList";
import ScreenListPreview from "./screens/ScreenListPreview";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ScreenList} />
        <Stack.Screen name="Profile2" component={ScreenListPreview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}