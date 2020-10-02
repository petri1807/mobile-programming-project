import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { Container, Content, Body, H1, Form, Picker, Icon, Card, CardItem, Left, Right } from 'native-base';

import { activityscreen } from '../styles/ProjectStyles.js';

const ActivityScreen = () => (
  <Container style={{ flex: 1 }}>
    <Content>
      <View style={activityscreen.topView}>
        <ImageBackground
          blurRadius={4}
          source={require('../assets/geneerinensetup.jpg')}
          style={activityscreen.image}
          imageStyle={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            opacity: 0.6,
          }}
        >
          <Body>
            <H1 style={activityscreen.topTitle}>Activity</H1>
          </Body>
        </ImageBackground>
      </View>
      <Form>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Select activity"
          style={activityscreen.picker}
        >
          <Picker.Item label="Work" value="key0" />
          <Picker.Item label="Meeting" value="key1" />
          <Picker.Item label="Workout" value="key2" />
          <Picker.Item label="Personal" value="key3" />
        </Picker>
      </Form>
      <Card>
        <CardItem style={activityscreen.card}>
          <Body style={activityscreen.cardbody}>
            <Left>
              <Text style={activityscreen.cardTextStyle}>Current activity:</Text>
            </Left>
            <Right>
              <Text>..Working..</Text>
            </Right>
          </Body>
        </CardItem>
        <CardItem style={activityscreen.card}>
          <Body style={activityscreen.cardbody}>
            <Left>
              <Text style={activityscreen.cardTextStyle}>Time on current activity:</Text>
            </Left>
            <Right>
              <Text>4.58h</Text>
            </Right>
          </Body>
        </CardItem>
      </Card>
      <Card>
        <CardItem header style={activityscreen.card}>
          <Text style={activityscreen.cardTextStyle}>Time spent on activities: </Text>
        </CardItem>
        <CardItem style={activityscreen.card}>
          <Body>
            <Text>//Your text here</Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  </Container>
);

export default ActivityScreen;
