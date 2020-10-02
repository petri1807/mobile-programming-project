import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { homeScreen } from '../styles/ProjectStyles';

const EventCard = () => (
  <Card>
    <CardItem header>
      <Text>9:30</Text>
    </CardItem>
    <CardItem>
      <Body>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </Body>
    </CardItem>
    <CardItem footer style={homeScreen.cardIconBox}>
      <Icon.Button
        style={homeScreen.cardIcon}
        name="instagram"
        size={30}
        backgroundColor="#E1306C"
      >
        <Text style={homeScreen.cardIconFont}>Placeholder</Text>
      </Icon.Button>
      <Icon.Button
        style={homeScreen.cardIcon}
        name="twitter"
        size={30}
        backgroundColor="#1DA1F2"
      >
        <Text style={homeScreen.cardIconFont}>Placeholder</Text>
      </Icon.Button>
    </CardItem>
  </Card>
);

export default EventCard;
