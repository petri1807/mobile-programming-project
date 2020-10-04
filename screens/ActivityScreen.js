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

const ActivityScreen = () => {
  const [activity, setActivity] = useState('');
  const [startedActivity, setStartedActivity] = useState('');
  const [stopModalVisible, setStopModalVisible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState('00:00');

  useEffect(() => {
    const tick = setInterval(() => timeTracker(), 1000);
    return () => clearInterval(tick);
  });

  const changeActivity = (value) => {
    setActivity(value);
  };

  const startActivity = () => {
    setActivity('');
    const time = new Date();
    setStartTime(time.getMilliseconds());
    setStartedActivity(activity);
  };

  const stopActivity = () => {
    setStartedActivity('');
    const time = new Date();
    setEndTime(time.getMilliseconds());
    setStopModalVisible(false);
  };

  const timeTracker = () => {
    const time = new Date();
    setEndTime(time.getMilliseconds());

    let startSeconds = startTime / 1000;
    let endSeconds = endTime / 1000;
    const startHours = parseInt(startSeconds / 3600);
    startSeconds %= 3600;
    const endHours = parseInt(endSeconds / 3600);
    endSeconds %= 3600;
    const startMinutes = parseInt(startSeconds / 60);
    const endMinutes = parseInt(endSeconds / 60);

    const hoursDiff = endHours - startHours;
    const minutesDiff = endMinutes - startMinutes;

    setElapsedTime(`${hoursDiff}:${minutesDiff}`);
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
