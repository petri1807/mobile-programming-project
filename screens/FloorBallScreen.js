import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, FlatList } from 'react-native';
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

import * as SQLite from 'expo-sqlite';
import {
  init,
  addPlayer,
  fetchAllPlayers,
} from '../connection/DBConnection.js';

import { floorBallScreen } from '../styles/ProjectStyles.js';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch((err) => {
    console.log(`Database IS NOT initialized! ${err}`);
  });

const FloorBallScreen = () => {
  const [isInserted, setIsInserted] = useState(false);
  const [playerList, setPlayerList] = useState([]);
  const [newPlayer, setNewPlayer] = useState('');

  const addPlayerHandler = () => {
    setPlayerList((playerList) => [...playerList, { player: newPlayer }]);
    savePlayer();
  };
  const playerInputHandler = (enteredText) => {
    setNewPlayer(enteredText);
  };
  async function savePlayer() {
    try {
      const dbResult = await addPlayer(newPlayer);
      console.log(dbResult);
    } catch (err) {
      console.log(err);
    } finally {
      setIsInserted(true);
    }
  }
  async function readAllPlayers() {
    try {
      const dbResult = await fetchAllPlayers(newPlayer);
      console.log('dbResult');

      // Take a look at the stucture of the dbResult printed below
      console.log(dbResult);
      // The structure tells that we have to use dbResult.rows._array
      setPlayerList(dbResult.rows._array);
    } catch (err) {
      console.log(err);
    } finally {
      console.log('Players are all here');
    }
  }

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
                <Text>6.10.2020 @20:00</Text>
              </Right>
            </Body>
          </CardItem>
          <Item rounded style={floorBallScreen.roundedtextbox}>
            <Input
              placeholder="Name"
              onChangeText={playerInputHandler}
              value={newPlayer}
            />
          </Item>
          <Body>
            <Button
              style={floorBallScreen.buttonsign}
              onPress={addPlayerHandler}
            >
              <Text>SIGN UP</Text>
            </Button>
            <Button
              transparent
              style={floorBallScreen.buttonwho}
              onPress={readAllPlayers}
            >
              <Text>WHO'S COMING</Text>
            </Button>
            <View style={floorBallScreen.flatliststyle}>
              <FlatList
                // keyExtractor={item=>item.id.toString()}
                keyExtractor={(item) => playerList.indexOf(item).toString()}
                data={playerList}
                renderItem={(itemData) => (
                  <View style={floorBallScreen.listItemStyle}>
                    <Text>
                      {itemData.item.id}) {itemData.item.player}
                    </Text>
                  </View>
                )}
              />
            </View>
          </Body>
        </Card>
      </Content>
    </Container>
  );
};

export default FloorBallScreen;
