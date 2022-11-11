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
const { default: ip } = require("../../assets/ip");
const axios = require("axios").default;

import { Card, Title, Content } from "react-native-paper";

const graphicColor = ["#00ad34", "#fc7e68"]; // Colors
// const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
const wantedGraphicData = [
  { x: "", y: 8 },
  { x: "", y: 2 },
];
// const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];
const defaultGraphicData = [
  { x: "Correct", y: 0 },
  { x: "Incorrect", y: 100 },
]; // Data used to make the animate prop work

//fetching data from db
async function fetchStats() {
  console.log(ip);
  return await axios
    .get(`http://${ip}:4000/answer/stats/633c619d920880851ec036c3`)

    .then(function (response) {
      // handle success
      const incorrect = response.data.incorrect.length;
      const correct = response.data.correct.length;

      return {
        correct: correct,
        incorrect: incorrect,
        correctAnswers: response.data.correct,
        incorrectAnswers: response.data.incorrect,
      };
    })
    .catch(function (error) {
      // handle error
      console.log(error.message);
    })
    .finally(function () {
      // always executed
    });
}

export function Stats({ navigation }) {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setInCorrectAnswers] = useState([]);
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  const wrongColor = "#edafa6";
  const rightColor = "#c9f0c5";
  useEffect(() => {
    setGraphicData(wantedGraphicData);
    // Setting the data that we want to display
    async function loadStats() {
      await fetchStats()
        .then(function (response) {
          setGraphicData([
            { x: `${response.correct}`, y: response.correct },
            { x: `${response.incorrect}`, y: response.incorrect },
          ]);
          setCorrectAnswers(response.correctAnswers);
          setInCorrectAnswers(response.incorrectAnswers);
        })
        .catch(function (err) {
          setGraphicData([
            { x: "", y: 0 },
            { x: "", y: 0 },
          ]);
        });
    }
    loadStats();
    // setQuestion(q);
  }, []);

  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView style={styles.container} alwaysBounceVertical={true}>
        <Text style={styles.topHeading}>Overview</Text>
        <View
          style={{
            justifyContent: "center",
            backgroundColor: "#e8e7d8",
            borderBottomRightRadius: 100,
            elevation: 10,
            padding: 5,
          }}
        >
          <View style={styles.pie}>
            <VictoryPie
              animate={{ easing: "exp", duration: 2000 }}
              data={graphicData}
              padAngle={({ datum }) => datum.y}
              innerRadius={70}
              radius={() => {
                return 120;
              }}
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: "#79f7c7",
                  strokeWidth: 2,
                },
                height: 100,
                width: 100,
                labels: {
                  fill: "#212121",
                },
              }}
              colorScale={graphicColor}
            />
          </View>
        </View>
        <View style={styles.cardView}>
          {correctAnswers.map((answer) => (
            <Card
              style={{ ...styles.card, backgroundColor: rightColor }}
              key={correctAnswers.indexOf(answer)}
            >
              <Card.Content>
                <Title style={styles.title}>{answer.question.statement}</Title>
                <Text>Selected: {answer.selectedOption}</Text>
              </Card.Content>
              <Card.Actions style={{ alignItems: "center" }}></Card.Actions>
            </Card>
          ))}

          {incorrectAnswers.map((answer) => (
            <Card
              style={{ ...styles.card, backgroundColor: wrongColor }}
              key={incorrectAnswers.indexOf(answer)}
            >
              <Card.Content>
                <Title style={styles.title}>{answer.question.statement}</Title>
                <Text>Selected: {answer.selectedOption}</Text>
              </Card.Content>
              <Card.Actions style={{ alignItems: "center" }}></Card.Actions>
            </Card>
          ))}
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
    marginBottom: 20,
  },
  cardView: {
    width: "90%",
    marginTop: 15,
    padding: 10,
  },
  topHeading: {
    fontSize: 40,
    textAlign: "center",
    color: "green",
  },
  title: {
    borderBottomWidth: 0.5,
    borderBottomRadius: 1,
    borderBottomColor: "grey",
    paddingBottom: 10,
    marginBottom: 10,
  },
});
