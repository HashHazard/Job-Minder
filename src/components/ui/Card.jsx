import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ColorPrimaryShade, ColorText, Colors } from "../../Colors";

const width = Dimensions.get("window").width;
const Card = ({ jobTitle, company, status, dateSaved }) => {
  return (
    <View style={styles.container}>
      {/* Top badge and drop down */}
      <View style={styles.firstRow}>
        <LinearGradient
          colors={[ColorPrimaryShade.dark, Colors.color2]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.badge}
        >
          <Text style={styles.badgeText}>Next Week</Text>
        </LinearGradient>
        <MaterialIcons name="more-horiz" size={24} color={Colors.color3} />
      </View>

      {/* Job Title */}
      <Text style={styles.jobTitle}>{jobTitle}</Text>

      {/* Company name */}
      <Text style={styles.companyName}>{company}</Text>

      {/* Date and status */}
      <View style={styles.firstRow}>
        <Text style={styles.date}>{dateSaved.split(" ")[0]}</Text>

        <LinearGradient
          colors={[Colors.color1, Colors.color1]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.badge}
        >
          <Text style={styles.badgeText}>{status}</Text>
        </LinearGradient>
        {/* <Text style={styles.status}>{status}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 16,
    borderRadius: 6,
    // marginTop: 8,
    // marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: Colors.color2,
    elevation: 4,
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    elevation: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.color4,
    marginBottom: 2,
    marginTop: 10,
  },
  companyName: {
    color: Colors.color3,
    fontStyle: "italic",
    marginBottom: 16,
  },
  date: {
    color: ColorText.color5,
  },
  status: {
    color: ColorPrimaryShade.light,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Card;
