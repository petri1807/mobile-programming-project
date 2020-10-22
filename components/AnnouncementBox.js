import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Accordion } from 'native-base';

import { homeScreen } from '../styles/ProjectStyles';
import {
  // fetchAllAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
} from '../connection/DBConnection';

import { fetchAllAnnouncements } from '../connection/CloudConnection';

const AnnouncementBox = ({ setVisibility }) => {
  const [loading, setLoading] = useState(true);
  const [announcementList, setAnnouncementList] = useState([]);

  const fetch = async () => {
    const date = new Date().toISOString().split('T')[0];
    await fetchAllAnnouncements(date).then((res) => {
      const today = res.filter((item) => item.date === date);
      setAnnouncementList(today);
      // setAnnouncementList(res.rows._array);
      setVisibility(true);
    });
  };

  const add = async () => {
    const date = new Date().toDateString();
    const title = 'Announement Title';
    const content =
      'Announement contentAnnounement contentAnnounement contentAnnounement contentAnnounement contentAnnounement content';
    await addAnnouncement(date, title, content);
  };

  const deleteA = async () => {
    await deleteAnnouncement(0);
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
      fetch();
      // add();
      // deleteA();
    }
  });

  return (
    <View style={homeScreen.announcementBox}>
      <Accordion
        headerStyle={homeScreen.header}
        contentStyle={homeScreen.content}
        dataArray={announcementList}
      />
    </View>
  );
};

export default AnnouncementBox;
