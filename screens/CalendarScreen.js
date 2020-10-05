import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Dialog from 'react-native-dialog';
import { calendarScreen } from '../styles/ProjectStyles.js';

const CalendarScreen = () => {
  const [selected, setSelected] = useState('');
  const [eventModalVisible, setEventModalVisible] = useState(false);

  // calendar date string format: yyyy-mm-dd
  // addCalendarEvent = (userId, dateStart, dateEnd, topic, message)

  const onDayPress = (day) => {
    setSelected(day.dateString);
    console.log(day.dateString);
    setEventModalVisible(true);
  };

  return (
    <View>
      <View>
        <Text style={calendarScreen.text} />
        <Calendar
          current={Date}
          style={calendarScreen.calendar}
          hideExtraDays={false}
          onDayPress={onDayPress}
          onDayLongPress={(day) => {
            console.log('selected day', day);
          }}
          firstDay={1}
          enableSwipeMonths
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: false,
              selectedColor: '',
              selectedTextColor: '',
              dotColor: '',
            },
            // testing: marking a day with a dot
            '2020-10-06': { marked: true },
          }}
        />
      </View>
      <View>
        <Dialog.Container visible={eventModalVisible}>
          <Dialog.Title>date:{selected.day}</Dialog.Title>
          <Dialog.Title>topictest</Dialog.Title>
          <Dialog.Description>message here: {selected.day}</Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => setEventModalVisible(false)}
          />
          <Dialog.Button label="Add" />
        </Dialog.Container>
      </View>
    </View>
  );
};

export default CalendarScreen;
