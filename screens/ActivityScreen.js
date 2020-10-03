import React, { useState } from 'react';
import { ImageBackground, Text, View, Modal, Alert } from 'react-native';
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
  Button,
} from 'native-base';
import Dialog from 'react-native-dialog';

import { activityScreen } from '../styles/ProjectStyles.js';

const ActivityScreen = () => {
  const [activity, setActivity] = useState('');
  const [stopModalVisible, setStopModalVisible] = useState(false);

  const changeActivity = (value) => {
    setActivity(value);
  };

  const stopActivity = () => {
    setActivity('');
    setStopModalVisible(false);
  };

  return (
    <Container style={{ flex: 1 }}>
      <Content>
        <View style={activityScreen.topView}>
          <ImageBackground
            blurRadius={4}
            source={require('../assets/geneerinensetup.jpg')}
            transition={false}
            style={activityScreen.image}
            imageStyle={{
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              opacity: 0.6,
            }}
          >
            <Body>
              <H1 style={activityScreen.topTitle}>Activity</H1>
            </Body>
          </ImageBackground>
        </View>
        <Form style={activityScreen.form}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Select activity"
            style={activityScreen.picker}
            selectedValue={activity}
            onValueChange={(value) => changeActivity(value)}
          >
            <Picker.Item label="Work" value="Work" />
            <Picker.Item label="Meeting" value="Meeting" />
            <Picker.Item label="Workout" value="Workout" />
            <Picker.Item label="Personal" value="Personal" />
          </Picker>
          {activity ? (
            <Button
              block
              danger
              style={{ marginTop: 5 }}
              onPress={() => setStopModalVisible(true)}
            >
              <Text style={activityScreen.buttonTextStyle}>Stop activity</Text>
            </Button>
          ) : (
            <Button block info>
              <Text style={activityScreen.buttonTextStyle}>Start activity</Text>
            </Button>
          )}
          <Dialog.Container
            animationType="slide"
            transparent
            visible={stopModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <Dialog.Title>Stop activity?</Dialog.Title>
            <Dialog.Button
              label="Cancel"
              onPress={() => setStopModalVisible(false)}
            />
            <Dialog.Button label="Stop" onPress={() => stopActivity()} />
          </Dialog.Container>
        </Form>
        <Card>
          <CardItem style={activityScreen.card}>
            <Body style={activityScreen.cardbody}>
              <Left>
                <Text style={activityScreen.cardTextStyle}>
                  Current activity:
                </Text>
              </Left>
              <Right>
                <Text>{activity}</Text>
              </Right>
            </Body>
          </CardItem>
          <CardItem style={activityScreen.card}>
            <Body style={activityScreen.cardbody}>
              <Left>
                <Text style={activityScreen.cardTextStyle}>
                  Time on current activity:
                </Text>
              </Left>
              <Right>
                <Text>4.58h</Text>
              </Right>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header style={activityScreen.card}>
            <Text style={activityScreen.cardTextStyle}>
              Time spent on activities
            </Text>
          </CardItem>
          <CardItem style={activityScreen.card}>
            <Body>
              <Text>//Your text here</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default ActivityScreen;
