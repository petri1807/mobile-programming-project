import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Accordion } from 'native-base';

import { homeScreen } from '../styles/ProjectStyles';
import {
  fetchAllAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
} from '../connection/DBConnection';

const AnnouncementBox = ({ setVisibility }) => {
  const [loading, setLoading] = useState(true);
  const [announcementList, setAnnouncementList] = useState([]);

  const fetch = async () => {
    const date = new Date().toDateString();
    await fetchAllAnnouncements(date).then((res) => {
      setAnnouncementList(res.rows._array);
      setVisibility(true);
    });
  };

  const add = async () => {
    const date = new Date().toDateString();
    const title = 'Announement Title';
    const content = 'Announement content';
    await addAnnouncement(date, title, content);
  };

  const deleteA = async () => {
    await deleteAnnouncement(1);
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
      <Accordion headerStyle={homeScreen.header} dataArray={announcementList} />
    </View>
  );
};

export default AnnouncementBox;
