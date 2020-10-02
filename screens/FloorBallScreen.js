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

import { activityscreen } from '../styles/ProjectStyles.js';

const FloorBallScreen = () => (
  <Container style={{ flex: 1 }}>
    <Content>
      <View style={activityscreen.topView}>
        <ImageBackground
          blurRadius={4}
          source={require('../assets/floorball.jpg')}
          style={activityscreen.image}
          imageStyle={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            opacity: 0.6,
          }}
        >
          <Body>
            <H1 style={activityscreen.topTitle}>Floorball</H1>
          </Body>
        </ImageBackground>
      </View>
      <Card>
        <CardItem style={activityscreen.card}>
          <Body style={activityscreen.cardbody}>
            <Left>
              <Text style={activityscreen.cardTextStyle}>Games every Tuesday, sign up below!</Text>
            </Left>
          </Body>
        </CardItem>
        <CardItem style={activityscreen.card}>
          <Body style={activityscreen.cardbody}>
            <Left>
              <Text style={activityscreen.cardTextStyle}>Next game:</Text>
            </Left>
            <Right>
              <Text>6.10.2020 @20:00</Text>
            </Right>
          </Body>
        </CardItem>
        <Item rounded style={activityscreen.roundedtextbox}>
          <Input placeholder="Name" />
        </Item>
        <Body>
          <Button style={activityscreen.buttonsign}>
            <Text>SIGN UP</Text>
          </Button>
          <Button transparent style={activityscreen.buttonwho}>
            <Text>WHO'S COMING</Text>
          </Button>
        </Body>
      </Card>
    </Content>
  </Container>
);

export default FloorBallScreen;
