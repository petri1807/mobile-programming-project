import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Container, H1 } from 'native-base';

import { homeScreen } from '../styles/ProjectStyles';
import EventCard from '../components/EventCard';
import AnnouncementBox from '../components/AnnouncementBox';
import { fetchAllCalendarEvents } from '../connection/CloudConnection';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [calendarList, setCalendarList] = useState([]);
  const [announcementVisible, setAnnouncementVisible] = useState(false);

  const fetch = async () => {
    const date = new Date().toISOString().split('T')[0];
    await fetchAllCalendarEvents().then((res) => {
      // Filters out events that are not today
      const today = res.filter((item) => item.date === date);

      // Compares hours and minutes to sort the list
      const compare = (a, b) => {
        const hoursA = a.timeStart.split('.')[0];
        const hoursB = b.timeStart.split('.')[0];
        const minutesA = a.timeStart.split('.')[1];
        const minutesB = b.timeStart.split('.')[1];

        if (hoursA > hoursB) {
          return 1;
        }
        if (hoursA === hoursB) {
          if (minutesA > minutesB) {
            return 1;
          }
          return -1;
        }
        return -1;
      };
      const organized = today.sort(compare);
      setCalendarList(organized);
    });
    setLoading(!loading);
  };

  useEffect(() => {
    if (loading) {
      fetch();
    }

    const unsub = navigation.addListener('focus', () => {
      fetch();
    });
    return unsub;
  }, [loading, navigation]);

  return (
    <Container style={homeScreen.pageLayout}>
      <View
        style={announcementVisible ? { paddingTop: 40 } : { paddingTop: 0 }}
      >
        <AnnouncementBox setVisibility={setAnnouncementVisible} />
        <Text style={homeScreen.title}>Today's events</Text>
        <View style={homeScreen.cardContainer}>
          {calendarList.length > 0 ? (
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={calendarList}
              renderItem={(itemData) => (
                <EventCard
                  key={itemData.item.id}
                  timeStart={itemData.item.timeStart}
                  timeEnd={itemData.item.timeEnd}
                  topic={itemData.item.topic}
                  message={itemData.item.message}
                />
              )}
            />
          ) : (
            <H1>No events for today</H1>
          )}
        </View>
      </View>
    </Container>
  );
};

export default HomeScreen;
