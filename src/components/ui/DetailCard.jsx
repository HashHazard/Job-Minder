import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ColorText, Colors } from "../../Colors";

const DetailCard = ({
  label,
  value,
  placeholder,
  icon,
  style = { label: {}, text: {}, container: {} },
}) => {
  return (
    <View>
      <Text style={{ ...styles.label, ...style.label }}>{label}</Text>
      <View style={{ ...styles.item, ...style.container }}>
        <Text style={{ ...styles.text, ...style.text }}>
          {value ? (
            value
          ) : (
            <Text style={{ color: ColorText.color8 }}>{placeholder}</Text>
          )}
        </Text>
        {icon}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",

    borderRadius: 6,
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: Colors.color2,
    elevation: 4,
    gap: 8,
    flexWrap: "wrap",
  },
  text: {
    color: ColorText.color2,
    backgroundColor: Colors.color2,
    fontSize: 18,
    maxWidth: "90%",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorText.color4,
  },

  icon: {},
});
export default DetailCard;
