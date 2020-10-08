import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { Container, Content, H1 } from 'native-base';

import { homeScreen } from '../styles/ProjectStyles';
import EventCard from '../components/EventCard';
import AnnouncementBox from '../components/AnnouncementBox';

// The imports will be separated into their appropriate screens/components, this is just for testing
import {
  init,
  fetchTodaysCalendarEventsForUser,
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

  const fetch = async () => {
    const dateStart = new Date().toISOString().split('T')[0];
    await fetchTodaysCalendarEventsForUser(1, dateStart).then((res) => {
      setCalendarList(res.rows._array);
    });
    setLoading(!loading);
  };

  useEffect(() => {
    if (loading) {
      fetch();
    }
  }, [loading]);

  return (
    <Container style={homeScreen.pageLayout}>
      {/* VirtualizedLists should never be nested inside plain ScrollViews with the same orientation */}
      {/* The error comes from using a flatlist inside the Content component, which is basically a ScrollView component */}

      {/* <Content contentContainerStyle={{ flex: 1 }}> */}
      <Content>
        <AnnouncementBox setVisibility={setAnnouncementVisible} />
        <View
          // If announcement is visible, use padding to reposition the title and EventCard from underneath the AnnouncementBox
          style={announcementVisible ? { paddingTop: 40 } : { paddingTop: 0 }}
        >
          <Text style={homeScreen.title}>Today's events</Text>
          <View>
            {calendarList.length > 0 ? (
              calendarList.map((item) => (
                <EventCard
                  key={item.id}
                  dateStart={item.dateStart}
                  dateEnd={item.dateEnd}
                  topic={item.topic}
                  message={item.message}
                  activityType={item.activityType}
                />
              ))
            ) : (
              <H1>No events for today</H1>
            )}
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default HomeScreen;
