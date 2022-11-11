import { useState, useEffect } from "react";

const axios = require("axios").default;
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Card, Title, RadioButton, Button, Text } from "react-native-paper";
const { default: ip } = require("../../assets/ip");

async function fetchQuestion() {
  return await axios
    .get(`http://${ip}:4000/question/get/633c619d920880851ec036c3`)

    .then(function (response) {
      // handle success
      return response.data.question;
    })
    .catch(function (error) {
      // handle error
      console.log(error.message);
    })
    .finally(function () {
      // always executed
    });
}

async function saveAnswer(ans) {
  console.log(ans);
  await axios
    .post(`http://${ip}:4000/answer/create/633c619d920880851ec036c3`, ans)

    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error.message);
    });
}

export function Question({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState({});
  const [value, setValue] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function LoadQuestion() {
      await fetchQuestion().then(function (response) {
        setQuestion(response);
        if (response) setValue(response.options[0]);
        console.log(response);
        setLoading(false);
        setRefresh(false);
      });
    }
    LoadQuestion();
    // setQuestion(q);
  }, [refresh]);
  // const question = {
  //
  // };

  if (loading)
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Loading</Text>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  if (!question) {
    console.log("here");
    return (
      <View style={styles.noQuestionContainer}>
        <Text style={{ textAlign: "center" }}>No more questions left now!</Text>
        <Button
          mode="elevateds"
          style={{ ...styles.button, top: 30 }}
          onPress={() => {
            navigation.navigate("Stats");
          }}
        >
          Stats
        </Button>

        <Button
          mode="elevated"
          style={{ ...styles.button, top: 30 }}
          onPress={() => {
            setRefresh(true);
          }}
        >
          <Text style={styles.text}>Refresh</Text>
        </Button>
      </View>
    );
  }
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
                console.log(selectedValue);
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
        <TouchableOpacity
          onPress={async () => {
            // console.log(value);
            const ans = {
              question: question._id,
              selectedOption: value.statement,
              isCorrect: value.isCorrect,
              childId: "633c619d920880851ec036c3",
            };
            await saveAnswer(ans).then(setRefresh(true));
          }}
        >
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
            navigation.navigate("InfoScreen", { content: question.content });
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
  noQuestionContainer: {
    backgroundColor: "#d1fff2",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
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
