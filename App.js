import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import bg from "./assets/bg.jpeg";
import Cell from "./src/components/Cell";

const emptyMap = [
  ["", "", ""], // 1st row
  ["", "", ""], // 2nd row
  ["", "", ""], // 3rd row
];

export default function App() {
  const [map, setMap] = useState(emptyMap);

  const [currentTurn, setCurrentTurn] = useState("x");

  const onPress = (rowIndex, columnIndex) => {
    if (map[rowIndex][columnIndex] !== "") {
      Alert.alert("Position already occupied");
      return;
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = currentTurn;
      return updatedMap;
    });

    setCurrentTurn(currentTurn === "x" ? "o" : "x");
    const winner = getWinner();
    if (winner) {
      gameWon(winner);
    } else {
      checkTieState();
    }
  };

  const getWinner = () => {
    //Check rows
    for (let i = 0; i < 3; i++) {
      const isRowXWinning = map[i].every((cell) => cell === "x");
      const isRowOWinning = map[i].every((cell) => cell === "o");

      if (isRowXWinning) {
        return "x";
      }
      if (isRowOWinning) {
        return "0";
      }
    }

    //Check columns
    for (let col = 0; col < 3; col++) {
      let isColumnXWinner = true;
      let isColumnOWinner = true;

      for (let row = 0; row < 3; row++) {
        if (map[row][col] !== "x") {
          isColumnXWinner = false;
        }
        if (map[row][col] !== "0") {
          isColumnOWinner = false;
        }
      }

      if (isColumnXWinner) {
        return "x";
      }
      if (isColumnOWinner) {
        return "o";
      }
    }

    //Check diagonals
    let isDiagonal1OWinning = true;
    let isDiagonal1XWinning = true;
    let isDiagonal2OWinning = true;
    let isDiagonal2XWinning = true;

    for (let i = 0; i < 3; i++) {
      if (map[i][i] !== "o") {
        isDiagonal1OWinning = false;
      }
      if (map[i][i] !== "x") {
        isDiagonal1XWinning = false;
      }

      if (map[i][2 - i] !== "o") {
        isDiagonal2OWinning = false;
      }
      if (map[i][2 - i] !== "x") {
        isDiagonal2XWinning = false;
      }
    }
    if (isDiagonal1OWinning || isDiagonal2OWinning) {
      return "0";
    }
    if (isDiagonal1XWinning || isDiagonal2XWinning) {
      return "x";
    }
  };

  const checkTieState = () => {
    if (!map.some((row) => row.some((cell) => cell === ""))) {
      Alert.alert(`It's a tie`, `tie`, [
        {
          text: "Restart",
          onPress: resetGame,
        },
      ]);
    }
  };

  const gameWon = (player) => {
    Alert.alert(`Huraaaayyy`, `Player ${player} won`, [
      {
        text: "Restart",
        onPress: resetGame,
      },
    ]);
  };

  const resetGame = () => {
    setMap(emptyMap);
    setCurrentTurn("x");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <Text style={styles.currentTurnText}>
          Current Turn: {currentTurn.toUpperCase()}
        </Text>
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Cell
                  key={`row-${rowIndex}-col-${columnIndex}`}
                  cell={cell}
                  onPress={() => onPress(rowIndex, columnIndex)}
                />
              ))}
            </View>
          ))}
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#242D34",
  },
  bg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",

    paddingTop: 15,
  },
  currentTurnText: {
    fontSize: 24,
    color: "white",
    position: "absolute",
    top: 50,
  },
  map: {
    width: "80%",
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  buttons: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
  },
  button: {
    color: "white",
    margin: 10,
    fontSize: 16,
    backgroundColor: "#191F24",
    padding: 10,
    paddingHorizontal: 15,
  },
});
