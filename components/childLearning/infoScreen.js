import { useState, useEffect } from "react";

import { StyleSheet, View, ImageBackground } from "react-native";
import { Card, Title, Button, Text } from "react-native-paper";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export function InfoScreen({ route, navigation }) {
  const [doneReading, setDoneReading] = useState(false);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (!doneReading) {
        e.preventDefault();
      } else {
        navigation.dispatch(e.data.action);
      }
    });
  }, [doneReading]);

  const Timer = () => (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/greenBlob.png")}
        style={{
          flex: 1,
          justifyContent: "center",
          width: 500,
          height: 500,
          position: "absolute",
        }}
      />
      <View style={styles.cardView}>
        <Card style={styles.card}>
          <Title style={styles.title}>{route.params.content}</Title>
        </Card>
      </View>
      <View style={styles.timer}>
        <CountdownCircleTimer
          isPlaying={true}
          duration={3}
          size={100}
          strokeWidth={5}
          colors={["#ff5e5e", "#ffa15e", "#ffdc5e", "#5eff79"]}
          colorsTime={[10, 7, 4, 2]}
          onComplete={() => {
            setDoneReading(true);
          }}
        >
          {({ remainingTime, color }) => (
            <Text style={{ color, fontSize: 20 }}>{remainingTime}</Text>
          )}
        </CountdownCircleTimer>
      </View>
    </View>
  );
  if (!doneReading) {
    return <Timer />;
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
          position: "absolute",
        }}
      />
      <View style={styles.cardView}>
        <Card style={styles.card}>
          <Title style={styles.title}>{route.params.content}</Title>
        </Card>
      </View>
      <Button
        mode="outlined"
        color={"#36DB7B"}
        style={{
          position: "relative",
          marginTop: "50%",
          padding: 10,
          borderRadius: 30,
        }}
        onPress={() => {
          navigation.navigate("Question");
        }}
      >
        Go back
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d1fff2",
    height: "100%",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    paddingTop: 30,
    elevation: 10,
    borderRadius: 20,
    height: "100%",
    paddingBottom: 20,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardView: {
    flex: 1,
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "50%",
    marginBottom: 10,
    justifyContent: "center",
  },

  title: {
    borderBottomWidth: 0.5,
    borderColor: "#808080",
    paddingBottom: 20,
    color: "green",
  },
  timer: {
    position: "relative",
    marginTop: "50%",
  },
});
