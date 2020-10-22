import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, FlatList } from 'react-native';
import {
  Container,
  Content,
  Body,
  H1,
  Card,
  CardItem,
  Left,
  Right,
  Item,
  Input,
  Button,
} from 'native-base';

import Dialog from 'react-native-dialog';

import { fetchAllPlayers, addPlayer } from '../connection/CloudConnection';

import { floorBallScreen } from '../styles/ProjectStyles.js';
/*
init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch((err) => {
    console.log(`Database IS NOT initialized! ${err}`);
  });
*/
const FloorBallScreen = () => {
  const [loading, setLoading] = useState(true);
  const [playerList, setPlayerList] = useState([]);
  const [player, setNewPlayer] = useState('');
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const playerInputHandler = (enteredText) => {
    setNewPlayer(enteredText);
  };
  const fetch = async () => {
    await fetchAllPlayers().then((res) => {
      setPlayerList(res);
    });
    setLoading(!loading);
    showDialog();
  };
  useEffect(() => {
    if (loading) {
      fetch();
    }
  });
  return (
    <Container style={{ flex: 1 }}>
      <Content>
        <View style={floorBallScreen.topView}>
          <ImageBackground
            blurRadius={4}
            source={require('../assets/floorball.jpg')}
            style={floorBallScreen.image}
            imageStyle={{
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              opacity: 0.6,
            }}
          >
            <Body>
              <H1 style={floorBallScreen.topTitle}>Floorball</H1>
            </Body>
          </ImageBackground>
        </View>
        <Card>
          <CardItem style={floorBallScreen.card}>
            <Body style={floorBallScreen.cardbody}>
              <Left>
                <Text style={floorBallScreen.cardTextStyle}>
                  Games every Tuesday, sign up below!
                </Text>
              </Left>
            </Body>
          </CardItem>
          <CardItem style={floorBallScreen.card}>
            <Body style={floorBallScreen.cardbody}>
              <Left>
                <Text style={floorBallScreen.cardTextStyle}>Next game:</Text>
              </Left>
              <Right>
                <Text>27.10.2020 @20:00</Text>
              </Right>
            </Body>
          </CardItem>
          <Item rounded style={floorBallScreen.roundedtextbox}>
            <Input
              placeholder="Name"
              onChangeText={playerInputHandler}
              value={player}
            />
          </Item>
          <Body>
            <Button
              style={floorBallScreen.buttonsign}
              onPress={() => addPlayer(player)}
            >
              <Text>SIGN UP</Text>
            </Button>
            <Button
              transparent
              style={floorBallScreen.buttonwho}
              onPress={fetch}
            >
              <Text>WHO'S COMING</Text>
            </Button>
            <View style={floorBallScreen.dialogStyle}>
              <Dialog.Container visible={visible}>
                <Dialog.Title>Who's coming?</Dialog.Title>
                <Dialog.Description>
                  <View>
                    <FlatList
                      data={playerList}
                      // data={movies.movies}
                      renderItem={(itemdata) => (
                        <View style={floorBallScreen.listItemStyle}>
                          <Text>
                            {itemdata.item.id}) {itemdata.item.player}
                          </Text>
                        </View>
                      )}
                      keyExtractor={(item) => item.id.toString()}
                    />
                  </View>
                </Dialog.Description>
                <Dialog.Button label="Got it!" onPress={handleCancel} />
              </Dialog.Container>
            </View>
          </Body>
        </Card>
      </Content>
    </Container>
  );
};

export default FloorBallScreen;
