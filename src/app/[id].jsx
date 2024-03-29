import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite/next";
import { JobContext } from "../JobContext";
import { ColorText, Colors } from "../Colors";
import { MaterialIcons } from "@expo/vector-icons";
import DetailCard from "../components/ui/DetailCard";
import { Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";
import RNPickerSelect from "react-native-picker-select";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import SelectDate from "../services/SelectDate";

const JobDetailsPage = () => {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const { jobs, setJobs } = useContext(JobContext);
  const [job, setjob] = useState(
    jobs.filter((job) => job.id === Number(id))[0]
  );
  const [dateSaved, setDateSaved] = useState(new Date());
  const dateSavedPicker = SelectDate(dateSaved, setDateSaved);
  const [dateApplied, setDateApplied] = useState(new Date());
  const dateAppliedPicker = SelectDate(dateApplied, setDateApplied);
  const [dateFollowUp, setDateFollowUp] = useState(new Date());
  const dateFollowUpPicker = SelectDate(dateFollowUp, setDateFollowUp);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const [status, setStatus] = useState(job.status);

  const toggleModal = (event, data) => {
    setModalVisible(!isModalVisible);
    if (!isModalVisible) {
      setModalData(Object.values(data)[0]);
      setModalTitle(data.title);
    }
  };

  const onChangeDate = (event, selectedDate, setDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (event, currentMode, date, setDate) => {
    DateTimePickerAndroid.open({
      value: date,
      onChangeDate: onChangeDate(event, selectedDate, setDate),
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = (event, date, setDate) => {
    showMode("date", event, date, setDate);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Modal */}
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: Colors.color1,
            padding: 16,
            borderRadius: 6,
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.modalTitle}>{modalTitle}</Text>
          <TextInput
            style={{
              ...styles.label,
              marginBottom: 12,
              // borderWidth: 2,
              backgroundColor: Colors.color2,
              borderRadius: 6,
              padding: 12,
              width: "100%",
            }}
            value={modalData}
            onChangeText={setModalData}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Pressable style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={{ ...styles.modalButton, backgroundColor: Colors.color3 }}
            >
              <Text style={styles.modalButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* JOB TITLE */}
      <Text style={styles.title}>{job.jobTitle}</Text>

      <DetailCard
        label="Company"
        value={job.company}
        placeholder="Add a company"
        icon={
          <MaterialIcons
            style={styles.icon}
            name="edit"
            size={20}
            color={Colors.color3}
            onPress={(e) =>
              toggleModal(e, { company: job.company, title: "Company" })
            }
          />
        }
      />
      <DetailCard
        style={{ text: { fontSize: 14 } }}
        label="URL"
        value={job.url}
        placeholder="Add an URL"
        icon={
          <MaterialIcons
            name="edit"
            size={20}
            color={Colors.color3}
            onPress={(e) => toggleModal(e, { company: job.url, title: "URL" })}
          />
        }
      />

      {/* STATUS */}
      <Text style={styles.label}>Status</Text>
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        onValueChange={(state) => setStatus(state)}
        value={status}
        items={[
          { label: "Bookmarked", value: "Bookmarked" },
          { label: "Applying", value: "Applying" },
          { label: "Applied", value: "Applied" },
          { label: "Interviewing", value: "Interviewing" },
          { label: "Negotiating", value: "Negotiating" },
          { label: "Accepted", value: "Accepted" },
          { label: "Declined", value: "Declined" },
          { label: "Rejected", value: "Rejected" },
          { label: "Archived", value: "Archived" },
        ]}
        Icon={() => (
          <Feather name="chevron-right" size={24} color={Colors.color3} />
        )}
        style={customPickerStyles}
      />

      {/* Dates */}
      <Text style={styles.title}>Dates</Text>
      <DetailCard
        label="Job saved on"
        value={dateSaved.toLocaleString().split(",")[0]}
        placeholder="Add when the application was saved"
        icon={
          <MaterialIcons
            name="edit-calendar"
            size={20}
            color={Colors.color3}
            onPress={dateSavedPicker}
          />
        }
      />
      <DetailCard
        label="Applied on"
        value={dateApplied.toLocaleString().split(",")[0]}
        placeholder="Add submission date"
        icon={
          <MaterialIcons
            name="edit-calendar"
            size={20}
            color={Colors.color3}
            onPress={dateAppliedPicker}
          />
        }
      />
      <DetailCard
        label="Follow Up"
        value={dateFollowUp.toLocaleString().split(",")[0]}
        placeholder="When will you follow up"
        icon={
          <MaterialIcons
            name="edit-calendar"
            size={20}
            color={Colors.color3}
            onPress={dateFollowUpPicker}
          />
        }
      />

      <DetailCard
        style={{
          text: {
            color: ColorText.color4,
            fontSize: 16,
            maxWidth: "100%",
          },
          container: {
            minHeight: 200,
            flexDirection: "column",
            marginBottom: 28,
          },
        }}
        label="Notes"
        value={job.notes}
        placeholder="Add job details"
        icon={
          <MaterialIcons
            style={{ alignSelf: "flex-end" }}
            name="edit"
            size={20}
            color={Colors.color3}
            onPress={(e) =>
              toggleModal(e, { notes: job.notes, title: "Notes" })
            }
          />
        }
      />
    </ScrollView>
  );
};

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    borderRadius: 6,
    color: ColorText.color2,
    paddingRight: 30, // to ensure the text is never behind the icon

    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: Colors.color2,
    elevation: 4,
    gap: 8,
  },
  iconContainer: {
    top: 30,
    right: 12,
  },
});

const styles = StyleSheet.create({
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
  modalButton: {
    elevation: 2,
    backgroundColor: Colors.color2,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  modalButtonText: {
    color: Colors.color4,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default JobDetailsPage;
