import React, { useEffect, useState } from 'react';
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
  Button,
} from 'native-base';
import Dialog from 'react-native-dialog';
import { PieChart } from 'react-native-chart-kit';

import { activityScreen } from '../styles/ProjectStyles.js';

import {
  addActivity,
  fetchAllActivities,
  fetchActivityTypeSum,
} from '../connection/DBConnection';

const ActivityScreen = () => {
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState([]);
  const [startedActivity, setStartedActivity] = useState('');
  const [stopModalVisible, setStopModalVisible] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [elapsedForCard, setElapsedForCard] = useState('00:00');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  // Might be a smarter way but nvm for now..
  const [workHours, setWorkHours] = useState(0);
  const [meetingHours, setMeetingHours] = useState(0);
  const [workoutHours, setWorkoutHours] = useState(0);
  const [personalHours, setPersonalHours] = useState(0);

  useEffect(() => {
    if (loading) {
      setLoading(!loading);
      loadData();
    }
    if (startedActivity) {
      const tick = setInterval(() => timeTracker(), 1000);
      return () => clearInterval(tick);
    }
  });

  const formatTime = (format, value) => {
    let timeToFormat = value;
    if (format === 'days') {
      const daysDifference = Math.floor(timeToFormat / 1000 / 60 / 60 / 24);
      timeToFormat -= daysDifference * 1000 * 60 * 60 * 24;
      return daysDifference;
    }
    if (format === 'hours') {
      const hoursDifference = Math.floor(timeToFormat / 1000 / 60 / 60);
      timeToFormat -= hoursDifference * 1000 * 60 * 60;
      return hoursDifference;
    }
    if (format === 'minutes') {
      const minutesDifference = Math.floor(timeToFormat / 1000 / 60);
      timeToFormat -= minutesDifference * 1000 * 60;
      return minutesDifference;
    }
  };

  const changeActivity = (value) => {
    setActivity(value);
  };

  const startActivity = () => {
    setStartTime(0);
    setElapsedTime('00:00');
    setActivity('');
    setStartTime(Date.now());
    setStartedActivity(activity);
  };

  const stopActivity = () => {
    loadData();
    addActivityEventHandler();
    setStartedActivity('');
    setStopModalVisible(false);
  };

  const timeTracker = () => {
    const date = new Date();
    setEndTime(date.getTime());
    setElapsedTime(endTime - startTime);

    setElapsedForCard(
      `${formatTime('hours', elapsedTime)}:${formatTime(
        'minutes',
        elapsedTime
      )}`
    );
  };

  const addActivityEventHandler = async () => {
    setLoading(!loading);
    const date = new Date().toISOString().split('T')[0];
    const timeSpent = endTime - startTime;
    await addActivity(1, date, startTime, endTime, 5700000, startedActivity);
  };

  const fetchType = async (type) => {
    await fetchActivityTypeSum(1, type).then((res) => {
      if (res && res.rows && res.rows._array) {
        const obj = res.rows._array[0];
        for (const property in obj) {
          if (obj[property] >= 3600000) {
            if (type === 'Work') {
              setWorkHours(formatTime('hours', obj[property]));
            }
            if (type === 'Meeting') {
              setMeetingHours(formatTime('hours', obj[property]));
            }
            if (type === 'Workout') {
              setWorkoutHours(formatTime('hours', obj[property]));
            }
            if (type === 'Personal') {
              setPersonalHours(formatTime('hours', obj[property]));
            }
          }
        }
      }
    });
  };

  const loadData = () => {
    fetchType(startedActivity);
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  // data for chart
  const data = [
    {
      name: 'Work',
      hours: workHours,
      color: '#FF8552',
      legendFontColor: '#333333',
      legendFontSize: 15,
    },
    {
      name: 'Meetings',
      hours: meetingHours,
      color: '#297373',
      legendFontColor: '#333333',
      legendFontSize: 15,
    },
    {
      name: 'Workout',
      hours: workoutHours,
      color: '#85FFC7',
      legendFontColor: '#333333',
      legendFontSize: 15,
    },
    {
      name: 'Personal',
      hours: personalHours,
      color: '#D64045',
      legendFontColor: '#333333',
      legendFontSize: 15,
    },
  ];

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
          {startedActivity ? null : (
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
          )}

          {startedActivity ? (
            <Button
              block
              danger
              style={{ marginTop: 5 }}
              onPress={() => setStopModalVisible(true)}
            >
              <Text style={activityScreen.buttonTextStyle}>Stop activity</Text>
            </Button>
          ) : (
            <Button
              block
              info
              style={{ marginTop: 5 }}
              onPress={() => startActivity()}
            >
              <Text style={activityScreen.buttonTextStyle}>Start activity</Text>
            </Button>
          )}
          <Dialog.Container visible={stopModalVisible}>
            <Dialog.Title>Stop activity?</Dialog.Title>
            <Dialog.Button
              label="Cancel"
              onPress={() => setStopModalVisible(false)}
            />
            <Dialog.Button label="Stop" onPress={() => stopActivity()} />
          </Dialog.Container>
        </Form>
        {startedActivity ? (
          <Card>
            <CardItem style={activityScreen.card}>
              <Body style={activityScreen.cardbody}>
                <Left>
                  <Text style={activityScreen.cardTextStyle}>
                    Current activity:
                  </Text>
                </Left>
                <Right>
                  <Text style={activityScreen.cardVariableTextStyle}>
                    {startedActivity}
                  </Text>
                </Right>
              </Body>
              <Body style={activityScreen.cardbody}>
                <Left>
                  <Text style={activityScreen.cardTextStyle}>
                    Time on current activity:
                  </Text>
                </Left>
                <Right>
                  <Text style={activityScreen.cardVariableTextStyle}>
                    {elapsedForCard}
                  </Text>
                </Right>
              </Body>
            </CardItem>
          </Card>
        ) : null}
        <Card>
          <CardItem header style={activityScreen.card}>
            <Text style={activityScreen.cardTextStyle}>
              Time spent on activities
            </Text>
          </CardItem>
          <CardItem style={activityScreen.card}>
            <Body>
              <PieChart
                data={data}
                width={400}
                height={200}
                chartConfig={chartConfig}
                accessor="hours"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default ActivityScreen;
