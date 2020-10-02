import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Container, Content, Accordion } from 'native-base';

import EventCard from '../components/EventCard';
import { homeScreen } from '../styles/ProjectStyles';

const dataArray = [
  {
    title: 'Prevent COVID-19',
    content:
      'Wear Batman masks. Use hand sanitizer. Trump contracted COVID-19, oops.',
  },
];

const HomeScreen = () => (
  <Container>
    <Content style={homeScreen.pageLayout}>
      <Accordion
        headerStyle={homeScreen.header}
        dataArray={dataArray}
        expanded={0}
      />
      <Text style={homeScreen.title}>Today's events</Text>
      <EventCard />
    </Content>
  </Container>
);

export default HomeScreen;
