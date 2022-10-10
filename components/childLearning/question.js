import { useState } from "react";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Card, Title, RadioButton, Button, Text } from "react-native-paper";

export function Question({ navigation }) {
  const question = {
    statement: "What is the synonym of charming?",
    options: [
      { statement: "Gleaming", is_correct: true },
      { statement: "Beautiful", is_correct: false },
      { statement: "Ugly", is_correct: false },
    ],
  };

  const [value, setValue] = useState(question.options[0]);
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/greenBlob.png")}
        style={{
          flex: 1,
          justifyContent: "center",
          width: 500,
          height: 500,
        }}
      />
      <View style={styles.cardView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{question.statement}</Title>
            <RadioButton.Group
              onValueChange={(selectedValue) => {
                setValue(
                  question.options.filter(
                    (v) => v.statement === selectedValue
                  )[0]
                );
              }}
              value={value.statement}
            >
              <RadioButton.Item
                label={question.options[0].statement}
                value={question.options[0].statement}
                labelStyle={styles.option}
              />
              <RadioButton.Item
                label={question.options[1].statement}
                value={question.options[1].statement}
                labelStyle={styles.option}
              />
              <RadioButton.Item
                label={question.options[2].statement}
                value={question.options[2].statement}
                labelStyle={styles.option}
              />
            </RadioButton.Group>
          </Card.Content>
          <Card.Actions style={{ alignItems: "center" }}></Card.Actions>
        </Card>
        <TouchableOpacity onPress={() => console.log(value)}>
          <Text
            style={{
              color: "white",
              backgroundColor: "#36DB7B",
              top: 20,
              padding: 20,
              borderRadius: 30,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.button, top: 30 }}
          onPress={() => {
            navigation.navigate("InfoScreen");
          }}
        >
          <Text style={styles.text}> View the info again </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d1fff2",
    height: "100%",
    justifyContent: "center",
  },
  option: {
    textAlign: "center",
    color: "red",
    paddingTop: 10,
    fontSize: 20,
    color: "green",
    marginBottom: 10,
    height: "100%",
  },
  title: {
    borderBottomWidth: 0.5,
    borderColor: "#808080",
    paddingBottom: 20,
    color: "green",
  },
  button: {
    top: 20,
    borderRadius: 20,
    width: "50%",
    textAlign: "center",
    color: "",
  },
  card: {
    elevation: 10,
    borderRadius: 20,
    height: "auto",
    paddingBottom: 20,
  },
  cardView: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50%",
    marginBottom: 10,
  },
  text: {
    color: "green",
    textAlign: "center",
    borderTopWidth: 0.5,
    top: 10,
    paddingTop: 15,
  },
});
