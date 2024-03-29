import { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { openDatabase } from "../services/dbService";
import JobList from "../components/JobList";

export default function Page() {
  // loading Database
  // const loadDataCallback = useCallback(async () => {
  //   try {
  //     await openDatabase();
  //   } catch (error) {
  //     console.error("loadDataCallback err: ", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   loadDataCallback();
  // }, [loadDataCallback]);

  return (
    <View>
      <JobList />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//   },
//   main: {
//     flex: 1,
//     justifyContent: "center",
//     maxWidth: 960,
//     marginHorizontal: "auto",
//   },
//   title: {
//     fontSize: 64,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 36,
//     color: "#38434D",
//   },
// });
