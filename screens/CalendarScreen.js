import React, { useState, Fragment } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState('');

  return (
    <View>
      <Text style={styles.text} />
      <Calendar
        current={Date}
        style={styles.calendar}
        hideExtraDays={false}
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
        firstDay={1}
        enableSwipeMonths
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
});

export default CalendarScreen;
