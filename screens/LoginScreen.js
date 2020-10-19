import React, { useState } from 'react';
import { Text } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';

import { loginScreen } from '../styles/ProjectStyles';

const LoginScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('BArko Obama');

  const userAuthorized = () => {
    if (isLoggedIn) {
      return (
        <Content>
          <Text style={loginScreen.title}>Welcome {user}</Text>
        </Content>
      );
    }

    return (
      <Content>
        <Text style={loginScreen.title}>Log in</Text>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
        </Form>
        <Button block info style={{ marginTop: 5 }}>
          <Text style={loginScreen.buttonTextStyle}>Log in</Text>
        </Button>
      </Content>
    );
  };

  return <Container>{userAuthorized()}</Container>;
};

export default LoginScreen;
