import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite/next";
import { JobContext } from "../JobContext";
import { openDatabase } from "../services/dbService";
import { Colors } from "../Colors";

import * as SystemUI from "expo-system-ui";

const RootLayout = () => {
  const [jobs, setJobs] = useState([]);

  const [dbLoaded, setDbLoaded] = useState(false);
  useEffect(() => {
    SystemUI.getBackgroundColorAsync()
      .then((data) => console.log("BgColor: ", data))
      .catch((e) => console.log(e));
    SystemUI.setBackgroundColorAsync(Colors.color1);

    openDatabase()
      .then(() => setDbLoaded(true))
      .catch((err) => console.error(`DB ERROR ${err}`));
  }, []);

  if (!dbLoaded) return <Text>DATABASE NOT LOADED</Text>;

  return (
    <SQLiteProvider databaseName="jobDatabase.db">
      <JobContext.Provider value={{ jobs, setJobs }}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Colors.color2 },
            // headerTitleAlign: "center",
            statusBarColor: Colors.color1,
            headerTintColor: Colors.color4,
            contentStyle: { backgroundColor: Colors.color1 },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Job Minder",
              headerRight: () => (
                <Link
                  style={{ fontWeight: "bold", color: "#fff" }}
                  href="addJob"
                >
                  Add
                </Link>
              ),
            }}
          />
          <Stack.Screen name="[id]" options={{ title: "Job" }} />
          <Stack.Screen name="addJob" options={{ title: "New job" }} />
        </Stack>
      </JobContext.Provider>
    </SQLiteProvider>
  );
};

export default RootLayout;
