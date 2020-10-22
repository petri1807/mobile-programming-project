import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, H1 } from 'native-base';

import { homeScreen } from '../styles/ProjectStyles';
import EventCard from '../components/EventCard';
import AnnouncementBox from '../components/AnnouncementBox';

// import {
//   init,
//   fetchTodaysCalendarEventsForUser,
// } from '../connection/DBConnection';
import { fetchAllCalendarEvents } from '../connection/CloudConnection';

// init()
//   .then(() => {
//     console.log('Database creation successful');
//   })
//   .catch((error) => {
//     console.log(`Database not created! ${error}`);
//   });

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [calendarList, setCalendarList] = useState([]);
  const [announcementVisible, setAnnouncementVisible] = useState(false);

  // const fetchSQLite = async () => {
  //   const dateStart = new Date().toISOString().split('T')[0];
  //   await fetchTodaysCalendarEventsForUser(1, dateStart).then((res) => {
  //     setCalendarList(res.rows._array);
  //   });
  //   setLoading(!loading);
  // };

  const fetch = async () => {
    const date = new Date().toISOString().split('T')[0];
    await fetchAllCalendarEvents().then((res) => {
      const today = res.filter((item) => item.date === date);
      console.log('home fetch');
      console.log(today);
      setCalendarList(today);
    });
    setLoading(!loading);
  };

  useEffect(() => {
    if (loading) {
      fetch();
    }
  });

  return (
    <Container style={homeScreen.pageLayout}>
      {/* <Content> */}
      <View
        // If announcement is visible, use padding to reposition the title and EventCard from underneath the AnnouncementBox
        style={announcementVisible ? { paddingTop: 40 } : { paddingTop: 0 }}
      >
        <AnnouncementBox setVisibility={setAnnouncementVisible} />
        <Text style={homeScreen.title}>Today's events</Text>
        <View style={homeScreen.cardContainer}>
          {calendarList.length > 0 ? (
            calendarList.map((item) => (
              <EventCard
                key={item.id}
                timeStart={item.timeStart}
                timeEnd={item.timeEnd}
                topic={item.topic}
                message={item.message}
              />
            ))
          ) : (
            <H1>No events for today</H1>
          )}
        </View>
      </View>
      {/* </Content> */}
    </Container>
  );
};

export default HomeScreen;
