import React, { useState, useEffect } from 'react';
import { Accordion } from 'native-base';

import { homeScreen } from '../styles/ProjectStyles';
import {
  fetchAllAnnouncements,
  addAnnouncement,
} from '../connection/DBConnection';

const AnnouncementBox = () => {
  const [loading, setLoading] = useState(true);
  const [announcementList, setAnnouncementList] = useState([
    {
      title: 'Default announcement',
      content: 'Nothing in database.',
    },
  ]);

  const fetch = async () => {
    const date = new Date().toDateString();
    await fetchAllAnnouncements(date).then((res) => {
      setAnnouncementList(res.rows._array);
    });
  };

  const add = async () => {
    const date = new Date().toDateString();
    const title = 'Fire safety exercise at 12:00';
    const content = 'We will conduct a fire safety exercise at 12:00.';
    await addAnnouncement(date, title, content);
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
      fetch();
      //   add();
    }
  });

  return (
    <Accordion
      headerStyle={homeScreen.header}
      dataArray={announcementList}
      expanded={0}
    />
  );
};

export default AnnouncementBox;
