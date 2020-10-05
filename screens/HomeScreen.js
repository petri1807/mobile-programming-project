import React, { useState, useEffect } from 'react';
import { Text, Button, FlatList } from 'react-native';
import { Container, Content, H1 } from 'native-base';

import { homeScreen } from '../styles/ProjectStyles';
import EventCard from '../components/EventCard';
import AnnouncementBox from '../components/AnnouncementBox';

// The imports will be separated into their appropriate screens/components, this is just for testing
import {
  init,
  addActivity,
  addAnnouncement,
  addCalendarEvent,
  addFloorballGame,
  addFloorballParticipant,
  addUser,
  deleteCalendarEvent,
  fetchAllActivities,
  fetchAllAnnouncements,
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

  // Adding dummy data for testing
  const addCalendarEventHandler = async () => {
    setLoading(!loading);
    const dateStart = new Date().toDateString();
    const dateEnd = new Date().toDateString();

    console.log('added event for tomorrow');
    await addCalendarEvent(
      1,
      dateStart,
      dateEnd,
      'Dummy topic',
      'Dummy message'
    );

    // // Clear the database table
    // for (let index = 1; index <= calendarList.length; index++) {
    //   await deleteCalendarEvent(index);
    // }
  };

  const fetch = async () => {
    const dateStart = new Date().toDateString();

    await fetchTodaysCalendarEventsForUser(1, dateStart).then((res) => {
      setCalendarList(res.rows._array);
    });

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
    <Container>
      <Content style={homeScreen.pageLayout}>
        <AnnouncementBox />
        <Text style={homeScreen.title}>Today's events</Text>
        {/* Delete Button once no longer needed */}
        <Button title="Add calendar event" onPress={addCalendarEventHandler} />
        {calendarList.length > 0 ? (
          <FlatList
            data={calendarList}
            renderItem={(itemData) => (
              <EventCard
                dateStart={itemData.item.dateStart}
                dateEnd={itemData.item.dateEnd}
                topic={itemData.item.topic}
                message={itemData.item.message}
              />
            )}
          />
        ) : (
          <H1>No events for today</H1>
        )}
      </Content>
    </Container>
  );
};

export default HomeScreen;
