import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { VictoryPie } from "victory-native";

import { Card, Title, Content } from "react-native-paper";

const graphicColor = ["#00ad34", "#fc7e68"]; // Colors
// const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
const wantedGraphicData = [
  { x: "Correct: 8", y: 80 },
  { x: "Incorrect: 2", y: 20 },
];
// const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];
const defaultGraphicData = [
  { x: "Correct", y: 0 },
  { x: "Incorrect", y: 100 },
]; // Data used to make the animate prop work

function Home({ navigation }) {
  setTimeout(function () {
    //your code to be executed after 1 second
  }, 1000);
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  const wrongColor = "#fc766d";
  const rightColor = "#9afca4";
  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
  }, [graphicData]);

  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView style={styles.container} alwaysBounceVertical={true}>
        <Text>Overview</Text>
        <View
          style={{
            justifyContent: "center",
            backgroundColor: "#36DB7B",
            borderBottomRightRadius: 100,
            elevation: 10,
            padding: 5,
          }}
        >
          <VictoryPie
            animate={{ easing: "exp", duration: 500 }}
            data={graphicData}
            innerRadius={20}
            style={{
              data: {
                fillOpacity: 0.9,
                stroke: "#79f7c7",
                strokeWidth: 2,
              },
              labels: {
                fill: "#212121",
              },
            }}
            colorScale={graphicColor}
          />
        </View>
        <View style={styles.cardView}>
          <Card style={{ ...styles.card, backgroundColor: rightColor }}>
            <Card.Content>
              <Title style={styles.title}>ok</Title>
            </Card.Content>
            <Card.Actions style={{ alignItems: "center" }}></Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    backgroundColor: "#d1fff2",
  },
  card: {
    elevation: 10,
    borderRadius: 20,
    paddingBottom: 20,
  },
  cardView: {
    width: "90%",
    marginTop: 15,
    padding: 10,
  },
});
module.exports = Home;
