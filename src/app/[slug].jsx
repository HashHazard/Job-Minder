import { View, Text } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getJob } from "../repository/jobRepository";

const JobDetailsPage = () => {
  const { slug } = useLocalSearchParams();
  const [job, setJob] = useState(getJob(slug));

  if (!job) return <Text>Job not found</Text>;
  return (
    <View>
      <Text>JOB Details {job.jobTitle}</Text>
    </View>
  );
};

export default JobDetailsPage;
