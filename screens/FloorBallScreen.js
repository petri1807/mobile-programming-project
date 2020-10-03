import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import {
  Container,
  Content,
  Body,
  H1,
  Form,
  Picker,
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  Item,
  Input,
  Button,
} from 'native-base';

import { activityScreen } from '../styles/ProjectStyles.js';

const FloorBallScreen = () => (
  <Container style={{ flex: 1 }}>
    <Content>
      <View style={activityScreen.topView}>
        <ImageBackground
          blurRadius={4}
          source={require('../assets/floorball.jpg')}
          style={activityScreen.image}
          imageStyle={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            opacity: 0.6,
          }}
        >
          <Body>
            <H1 style={activityScreen.topTitle}>Floorball</H1>
          </Body>
        </ImageBackground>
      </View>
      <Card>
        <CardItem style={activityScreen.card}>
          <Body style={activityScreen.cardbody}>
            <Left>
              <Text style={activityScreen.cardTextStyle}>
                Games every Tuesday, sign up below!
              </Text>
            </Left>
          </Body>
        </CardItem>
        <CardItem style={activityScreen.card}>
          <Body style={activityScreen.cardbody}>
            <Left>
              <Text style={activityScreen.cardTextStyle}>Next game:</Text>
            </Left>
            <Right>
              <Text>6.10.2020 @20:00</Text>
            </Right>
          </Body>
        </CardItem>
        <Item rounded style={activityScreen.roundedtextbox}>
          <Input placeholder="Name" />
        </Item>
        <Body>
          <Button style={activityScreen.buttonsign}>
            <Text>SIGN UP</Text>
          </Button>
          <Button transparent style={activityScreen.buttonwho}>
            <Text>WHO'S COMING</Text>
          </Button>
        </Body>
      </Card>
    </Content>
  </Container>
);

export default FloorBallScreen;
