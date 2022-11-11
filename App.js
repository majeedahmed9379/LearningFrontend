import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
const { Question } = require("./components/childLearning/question");
const { InfoScreen } = require("./components/childLearning/infoScreen");
const { Stats } = require("./components/childLearning/statsScreen");
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Question"
          component={Question}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoScreen"
          component={InfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Stats"
          component={Stats}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#90EE90",
    alignItems: "center",
    // justifyContent: "center",
    height: "100%",
  },
});
