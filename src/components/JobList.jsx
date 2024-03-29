import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import { JobContext } from "../JobContext";
import { useSQLiteContext } from "expo-sqlite/next";
import { getAllJobs } from "../services/dbService";
import { Link } from "expo-router";
import Card from "./ui/Card";

const JobList = () => {
  const db = useSQLiteContext();

  const { jobs, setJobs } = useContext(JobContext);

  // Retriving all jobs from database and storing data in jobs
  useEffect(() => {
    getAllJobs(db)
      .then((data) => setJobs(data))
      .catch((e) => console.log("error in getting all data: ", e));
  }, [setJobs, db]);

  return (
    <View>
      <FlatList
        data={jobs}
        contentContainerStyle={{ gap: 8, padding: 8 }}
        renderItem={({ item }) => (
          <Link href={`${item.id}`}>
            <Card
              jobTitle={item.jobTitle}
              company={item.company}
              status={item.status}
              dateSaved={item.dateSaved}
            />
          </Link>
        )}
      />
    </View>
  );
};

export default JobList;
