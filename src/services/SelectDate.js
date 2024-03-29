import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const SelectDate = (date, setDate) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return showDatepicker;

  //   return (
  //     <SafeAreaView>
  //       <Button onPress={showDatepicker} title="Show date picker!" />
  //       <Button onPress={showTimepicker} title="Show time picker!" />
  //       <Text>selected: {date.toLocaleString()}</Text>
  //     </SafeAreaView>
  //   );
};
export default SelectDate;
