import React from 'react';
import { Text } from 'react-native';
import { Card, CardItem, Body } from 'native-base';

import { homeScreen } from '../styles/ProjectStyles';

const EventCard = ({ timeStart, timeEnd, topic, message }) => (
  <Card style={homeScreen.card}>
    <CardItem header>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
        {timeStart} - {timeEnd}
      </Text>
    </CardItem>
    <CardItem>
      <Body>
        <Text>{topic}</Text>
        <Text>{message}</Text>
      </Body>
    </CardItem>
  </Card>
);

export default EventCard;
