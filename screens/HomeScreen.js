import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { Container, Content, H1 } from 'native-base';

import { homeScreen } from '../styles/ProjectStyles';
import EventCard from '../components/EventCard';
import AnnouncementBox from '../components/AnnouncementBox';

// The imports will be separated into their appropriate screens/components, this is just for testing
import {
  init,
  addActivity,
  addCalendarEvent,
  addFloorballGame,
  addFloorballParticipant,
  addUser,
  deleteCalendarEvent,
  fetchAllActivities,
  fetchAllCalendarEvents,
  fetchAllFloorballGames,
  fetchAllFloorballParticipants,
  fetchTodaysCalendarEventsForUser,
  fetchAllUsers,
} from '../connection/DBConnection';

init()
  .then(() => {
    console.log('Database creation successful');
  })
  .catch((error) => {
    console.log(`Database not created! ${error}`);
  });

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [calendarList, setCalendarList] = useState([]);
  const [announcementVisible, setAnnouncementVisible] = useState(false);

  // Adding dummy data for testing
  const addCalendarEventHandler = async () => {
    setLoading(!loading);
    const dateStart = new Date().toISOString().split('T')[0];
    const dateEnd = new Date().toISOString().split('T')[0];

    console.log('adding event');
    await addCalendarEvent(
      1,
      dateStart,
      dateEnd,
      'Dummy topic',
      'Dummy message'
    );

    // await addFloorballGame(dateStart, dateEnd);
    // await addActivity(1, dateStart, dateEnd, 'Work');

    // // Clear the database table
    // for (let index = 1; index <= calendarList.length; index++) {
    //   await deleteCalendarEvent(index);
    // }
  };

  const fetch = async () => {
    const dateStart = new Date().toISOString().split('T')[0];

    await fetchTodaysCalendarEventsForUser(1, dateStart).then((res) => {
      setCalendarList(res.rows._array);
    });

    // await fetchAllActivities().then((res) => {
    //   setCalendarList((list) => [...list, ...res.rows._array]);
    // });

    // await fetchAllFloorballGames().then((res) => {
    //   setCalendarList((list) => [...list, ...res.rows._array]);
    // });

    // await fetchAllCalendarEvents().then((res) => {
    //   setCalendarList(res.rows._array);
    //   console.log(calendarList);
    // });
  };

  useEffect(() => {
    if (loading) {
      setLoading(!loading);
      fetch();
    }
  });

  return (
    <Container style={homeScreen.pageLayout}>
      <Content>
        <AnnouncementBox setVisibility={setAnnouncementVisible} />
        <View
          // If announcement is visible, use padding to reposition the title and EventCard from underneath the AnnouncementBox
          style={announcementVisible ? { paddingTop: 40 } : { paddingTop: 0 }}
        >
          <Text style={homeScreen.title}>Today's events</Text>
          {/* Delete Button once no longer needed */}
          {/* <Button title="Add calendar event" onPress={addCalendarEventHandler} /> */}
          {calendarList.length > 0 ? (
            <FlatList
              keyExtractor={(item) => calendarList.indexOf(item).toString()}
              data={calendarList}
              renderItem={(itemData) => (
                <EventCard
                  dateStart={itemData.item.dateStart}
                  dateEnd={itemData.item.dateEnd}
                  topic={itemData.item.topic}
                  message={itemData.item.message}
                  activityType={itemData.item.activityType}
                />
              )}
            />
          ) : (
            <H1>No events for today</H1>
          )}
        </View>
      </Content>
    </Container>
  );
};

export default HomeScreen;
