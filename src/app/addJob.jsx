import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite/next";
import { getAllJobs, insertJob } from "../services/dbService";
import { JobContext } from "../JobContext";
import { ColorText, Colors } from "../Colors";

const addJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigation();

  const db = useSQLiteContext();

  const { jobs, setJobs } = useContext(JobContext);

  async function handleSave() {
    if (!jobTitle || !company) {
      console.log("job title and company empty");
    } else {
      const job = { jobTitle, company, location, url };
      try {
        await insertJob(db, job);
        getAllJobs(db)
          .then((data) => setJobs(data))
          .catch((e) => console.log(e));
      } catch (e) {
        console.error("error in inserting data: ", e);
      }

      navigate.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={jobTitle}
        onChangeText={setJobTitle}
        placeholder="Job Title"
      />

      <TextInput
        style={styles.input}
        value={company}
        onChangeText={setCompany}
        placeholder="Company"
      />

      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
      />

      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        placeholder="URL"
      />
      <View
        style={{
          marginTop: 32,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Pressable style={styles.button} onPress={() => navigate.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>

        <Pressable
          style={{ ...styles.button, backgroundColor: Colors.color3 }}
          onPress={() => handleSave()}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: ColorText.color2,
    backgroundColor: Colors.color2,
    fontSize: 18,

    borderRadius: 6,
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: Colors.color2,
    elevation: 4,
    gap: 8,
  },

  container: {
    padding: 12,
  },

  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: Colors.color4,
    marginBottom: 16,
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorText.color4,
  },

  modalTitle: {
    marginBottom: 16,
    color: Colors.color3,
    fontSize: 20,
  },
  button: {
    elevation: 2,
    backgroundColor: Colors.color2,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 150,
  },
  buttonText: {
    color: Colors.color4,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default addJob;
