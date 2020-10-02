import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Container,
  Content,
  Accordion,
  Card,
  CardItem,
  Body,
} from 'native-base';

import { homeScreen } from '../styles/ProjectStyles';

const dataArray = [
  {
    title: 'Prevent COVID-19',
    content: 'Wear masks. Use hand sanitizer. Trump contracted COVID-19, oops.',
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
      {/* Move the card into it's own component and use a FlatList to render them */}
      <Card>
        <CardItem header>
          <Text>9:30</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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
    </Content>
  </Container>
);

export default HomeScreen;
