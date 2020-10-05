import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Dialog from 'react-native-dialog';
import { calendarScreen } from '../styles/ProjectStyles.js';

const CalendarScreen = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [modalDate, setModalDate] = useState('');

  // calendar date string format: yyyy-mm-dd
  // addCalendarEvent = (userId, dateStart, dateEnd, topic, message)

  const onDayPress = (day) => {
    setSelectedDay(day.dateString);
    console.log(day.dateString);
    setModalDate(`${day.day}.${day.month}.${day.year}`);
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
          // longpress for testing purposes
          onDayLongPress={(day) => {
            console.log('selected day', day);
          }}
          firstDay={1}
          enableSwipeMonths
          markedDates={{
            [selectedDay]: {
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
          <Dialog.Title>{modalDate}</Dialog.Title>
          <Dialog.Title>topic from db here</Dialog.Title>
          <Dialog.Description>message from db here:</Dialog.Description>
          <Dialog.Button
            label="Close"
            onPress={() => setEventModalVisible(false)}
          />
          <Dialog.Input label="new topic" placeholder="write topic here?" />
          <Dialog.Input label="new message" placeholder="write message here?" />
          <Dialog.Button label="Add" />
        </Dialog.Container>
      </View>
    </View>
  );
};

export default CalendarScreen;
