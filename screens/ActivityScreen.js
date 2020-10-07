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

import { addActivity, fetchAllActivities } from '../connection/DBConnection';

const ActivityScreen = () => {
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState([]);
  const [startedActivity, setStartedActivity] = useState('');
  const [stopModalVisible, setStopModalVisible] = useState(false);
  const [elapsedTime, setElapsedTime] = useState('00:00');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

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

  const changeActivity = (value) => {
    setActivity(value);
  };

  const startActivity = () => {
    setStartTime(0);
    setElapsedTime(0);
    setActivity('');
    setStartTime(Date.now());
    setStartedActivity(activity);
  };

  const stopActivity = () => {
    setEndTime(elapsedTime - startTime);
    loadData();
    addActivityEventHandler();
    setStartedActivity('');
    setStopModalVisible(false);
  };

  const timeTracker = () => {
    // 🤮🤮🤮🤮
    const date = new Date();
    let difference = date.getTime() - startTime;

    const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    const minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    setElapsedTime(`${hoursDifference}:${minutesDifference}`);
  };

  const addActivityEventHandler = async () => {
    setLoading(!loading);
    const date = new Date().toISOString().split('T')[0];
    const timeSpent = endTime.toString();
    console.log(timeSpent);
    await addActivity(1, date, timeSpent, startedActivity);
  };

  const fetch = async () => {
    await fetchAllActivities()
      .then((res) => setActivities(res.rows._array))
      .then(() => {
        const obj = {};
        let keys = activities.map((item) => item.date);
        keys = [...new Set(keys)];
        keys.map((item) => (obj[item] = []));
        activities.map((item) =>
          obj[item.date].push({
            timespent: item.time,
            focus: item.activityType,
          })
        );
        console.log('KEYS');
        console.log(obj);
        setActivities(obj);
      });
  };

  const loadData = () => {
    fetch();
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
      hours: 28,
      color: '#FF8552',
      legendFontColor: '#FFFFFF',
      legendFontSize: 15,
    },
    {
      name: 'Meetings',
      hours: 5,
      color: '#297373',
      legendFontColor: '#FFFFFF',
      legendFontSize: 15,
    },
    {
      name: 'Workout',
      hours: 1,
      color: '#85FFC7',
      legendFontColor: '#FFFFFF',
      legendFontSize: 15,
    },
    {
      name: 'Personal',
      hours: 1,
      color: '#D64045',
      legendFontColor: '#FFFFFF',
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
                    {elapsedTime}
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
