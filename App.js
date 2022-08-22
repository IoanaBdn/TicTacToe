import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, ImageBackground, Pressable } from "react-native";
import bg from "./assets/bg.jpeg";

export default function App() {
  const [map, setMap] = useState([
    ["o", "", ""], //1st row
    ["", "x", "x"], //2nd row
    ["o", "", ""], //3rd row
  ]);
  const onPress = (rowIndex, columnIndex) =>{

    if(map[rowIndex][columnIndex]!==""){
      Alert.alert("Position already occupied");
      return;
    }

    setMap((existingMap)=>{
      const updatedArray= [...existingMap];
      updatedArray[rowIndex][columnIndex] ='o';
      return updatedArray;
    });

  }
   
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Pressable style={styles.cell} onPress={()=>onPress(rowIndex, columnIndex)}>
                  {cell === "o" && <View style={styles.circle} />}
                  {cell === "x" && (
                    <View style={styles.cross}>
                      <View style={styles.crossLine} />
                      <View
                        style={[styles.crossLine, styles.crossLineReversed]}
                      />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          ))}

          {/*
          <View style={styles.circle} />
          <View style={styles.cross}>
            <View style={styles.crossLine} />
            <View style={[styles.crossLine, styles.crossLineReversed]} />
          </View>
      */}
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
  map: {
    width: "80%",
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: {
    width: 100,
    height: 100,
    flex: 1,
    borderColor: "white",
    borderWidth: 1,
  },
  circle: {
    left: 0 * 105,
    top: 0 * 105,
    width: 75,
    height: 75,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 10,
    borderColor: "white",
  },
  cross: {
   flex:1
  },

  crossLine: {
    position: "absolute",
    left: '48%',
    width: 10,
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },
  crossLineReversed: {
    transform: [
      {
        rotate: "-45deg",
      },
    ],
  },
});
