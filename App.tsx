import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import AppNavigator from "./AppNavigator";

export default function App() {
  
  
  return  (
    <View style={styles.container}>
     <AppNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
