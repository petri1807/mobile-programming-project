import React, { useState, useEffect } from 'react';
import { Accordion } from 'native-base';

import { homeScreen } from '../styles/ProjectStyles';
import {
  fetchAllAnnouncements,
  addAnnouncement,
} from '../connection/DBConnection';

// Accordion and it's data to own component
const dataArray = [
  {
    title: 'Prevent COVID-19',
    content:
      'Wear Batman masks. Use hand sanitizer. Trump contracted COVID-19, oops.',
  },
];

const AnnouncementBox = () => {
  const [loading, setLoading] = useState(true);
  const [announcementList, setAnnouncementList] = useState([
    {
      title: 'Default announcement',
      content: 'Nothing in database',
    },
  ]);

  const fetch = async () => {
    const date = new Date().toDateString();
    await fetchAllAnnouncements(date)
      .then((res) => {
        console.log(res);
        setAnnouncementList(res.rows._array);
      })
      .then(() => console.log(announcementList));
  };

  const add = async () => {
    const date = new Date().toDateString();
    const title = 'Fire safety exercise at 12:00';
    const content = 'We will conduct a fire safety exercise at 12:00.';
    await addAnnouncement(date, title, content).then((res) => console.log(res));
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
