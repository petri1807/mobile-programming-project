import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Container, Content, Accordion } from 'native-base';

import { FlatList } from 'react-native-gesture-handler';
import EventCard from '../components/EventCard';
import { homeScreen } from '../styles/ProjectStyles';

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

// Accordion and it's data to own component
const dataArray = [
  {
    title: 'Prevent COVID-19',
    content:
      'Wear Batman masks. Use hand sanitizer. Trump contracted COVID-19, oops.',
  },
];

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

    // Clear the database table
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
        <Accordion
          headerStyle={homeScreen.header}
          dataArray={dataArray}
          expanded={0}
        />
        <Text style={homeScreen.title}>Today's events</Text>
        {/* Delete Button once no longer needed */}
        <Button title="Add calevent" onPress={addCalendarEventHandler} />
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
      </Content>
    </Container>
  );
};

export default HomeScreen;
