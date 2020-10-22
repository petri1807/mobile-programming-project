import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardItem, Fab } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { calendarScreen } from '../styles/ProjectStyles.js';

import {
  fetchAllCalendarEvents,
  addCalendarEvent,
  deleteCalendarEvent,
} from '../connection/CloudConnection';

const CalendarScreen = () => {
  const [items, setItems] = useState({});
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [startTime, setStartTime] = useState('no time');
  const [endTime, setEndTime] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showClock, setShowClock] = useState(false);
  const [time, setTime] = useState(new Date());
  const [startTitle, setStartTitle] = useState('Start');
  const [endTitle, setEndTitle] = useState('End');
  const [timeButton, setTimeButton] = useState('');

  const fetch = async () => {
    await fetchAllCalendarEvents()
      .then((res) => {
        setCalendarEvents(res);
      })
      .then(() => {
        addCalendarEventsToItems();
      })
      .catch((error) => console.log(error));
  };

  const selectedDayHandler = (day) => {
    setSelectedDay(day.dateString);
  };

  const topicHandler = (enteredText) => {
    setNewTopic(enteredText);
  };

  const messageHandler = (enteredText) => {
    setNewMessage(enteredText);
  };

  const timeNow = () => {
    setTime(new Date());
  };

  const timeOneHourFromNow = () => {
    const t = new Date();
    const newTime = t.setHours(t.getHours() + 1);
    setTime(newTime);
  };

  const startTimeHandler = (t) => {
    if (t === undefined) {
      return;
    }
    const timeStr = `${t.getHours()}.${t.getMinutes()}`;
    setShowClock(false);
    setStartTime(timeStr);
    setStartTitle(timeStr);
  };

  const endTimeHandler = (t) => {
    if (t === undefined) {
      return;
    }
    const timeStr = `${t.getHours()}.${t.getMinutes()}`;
    setShowClock(false);
    setEndTime(timeStr);
    setEndTitle(timeStr);
  };

  const settingTimeHandler = (event, selectedTime) => {
    if (timeButton === 'start') startTimeHandler(selectedTime);
    if (timeButton === 'end') endTimeHandler(selectedTime);
  };

  const calendarEventControl = () => {
    if (newTopic === '' || newMessage === '') {
      alert('Please fill topic and message fields.');
    } else {
      addCalendarEventHandler();
    }
  };

  const addCalendarEventHandler = async () => {
    const date = selectedDay;
    const timeStart = startTime;
    const timeEnd = endTime;

    await addCalendarEvent(1, date, timeStart, timeEnd, newTopic, newMessage);
    setEventModalVisible(false);
  };

  const addCalendarEventsToItems = () => {
    const obj = {};
    let keys = calendarEvents.map((item) => item.date); // store dates in array
    keys = [...new Set(keys)]; // remove duplicate dates from array
    keys.map((item) => (obj[item] = [])); // assign a key for each date with value of empty array
    calendarEvents.map((item) =>
      obj[item.date].push({
        timeStart: item.timeStart,
        timeEnd: item.timeEnd,
        topic: item.topic,
        message: item.message,
        id: item.id,
      })
    );

    setItems(obj);
  };

  useEffect(() => {
    console.log('Start time hook:');
    console.log(startTime);
    console.log('End time hook:');
    console.log(endTime);
  }, [startTime, endTime]);

  const onFabPress = () => {
    const day = new Date();
    const start = `${day.getHours()}:${day.getMinutes()}`;
    const end = `${day.getHours() + 1}:${day.getMinutes()}`;

    setStartTitle(start);
    setEndTitle(end);
    setStartTime(start);
    setEndTime(end);
    setEventModalVisible(true);
  };

  const deleteItemAlert = (id) =>
    Alert.alert(
      'Delete event',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => deleteCardItem(id) },
      ],
      { cancelable: false }
    );

  const deleteCardItem = async (id) => {
    console.log('delete pressin toiminta?', id);
    await deleteCalendarEvent(id).then(() => fetch());
  };

  const renderItem = (item) => (
    <TouchableOpacity
      onLongPress={() => {
        deleteItemAlert(item.id);
      }}
      style={{
        marginRight: 10,
        marginTop: 17,
      }}
    >
      <Card>
        <CardItem>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Text style={calendarScreen.itemCardTopic}>
              {item.timeStart} - {item.timeEnd}
            </Text>
            <Text>{item.topic}</Text>
            <Text>{item.message}</Text>
          </View>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={calendarScreen.calendar}>
      <Agenda
        items={items}
        loadItemsForMonth={(selectedDate) => {
          fetch();
        }}
        selected={Date}
        firstDay={1}
        renderItem={renderItem}
        onDayPress={selectedDayHandler}
      />
      <Fab style={{ backgroundColor: '#2e8ee8' }}>
        <Icon name="plus" onPress={onFabPress} />
      </Fab>
      {showClock && (
        <DateTimePicker
          mode="time"
          value={time}
          is24Hour
          display="default"
          onChange={settingTimeHandler}
        />
      )}
      <Dialog.Container visible={eventModalVisible}>
        <Dialog.Title>{selectedDay}</Dialog.Title>
        <Dialog.Input onChangeText={topicHandler} placeholder="Topic" />
        <Dialog.Input onChangeText={messageHandler} placeholder="Message" />
        <View style={calendarScreen.timeContainer}>
          <View style={calendarScreen.timeAndDesc}>
            <Dialog.Description style={calendarScreen.description}>
              Start
            </Dialog.Description>
            <Dialog.Button
              style={calendarScreen.timeSelector}
              label={startTitle}
              onPress={() => {
                timeNow();
                setShowClock(true);
                setTimeButton('start');
              }}
            />
          </View>
          <View style={calendarScreen.timeAndDesc}>
            <Dialog.Description style={calendarScreen.description}>
              End
            </Dialog.Description>
            <Dialog.Button
              style={calendarScreen.timeSelector}
              label={endTitle}
              onPress={() => {
                timeOneHourFromNow();
                setShowClock(true);
                setTimeButton('end');
              }}
            />
          </View>
        </View>
        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setEventModalVisible(false);
            setStartTitle('Start');
            setEndTitle('End');
          }}
        />
        <Dialog.Button
          label="Add"
          onPress={() => {
            calendarEventControl();
          }}
        >
          <Text>Add</Text>
        </Dialog.Button>
      </Dialog.Container>
    </KeyboardAvoidingView>
  );
};

export default CalendarScreen;
