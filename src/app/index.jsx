import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getAllJobs } from "../repository/jobRepository";
import { Link } from "expo-router";

export default function Page() {
  const [jobs, setJobs] = useState(getAllJobs());
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text> */}
        <FlatList
          data={jobs}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <Link href={`${item.slug}`}>{item.jobTitle}</Link>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
