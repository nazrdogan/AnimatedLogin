/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Image,
  Easing
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, Text, Container, Header, Card, CardItem, Body, Content, Form, Item, Input, Label } from 'native-base';


const { width, height } = Dimensions.get("window");

const scaleValue = 1.1;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      bouncing: true,
      openFromBottom: false,

    }
    this.animatedSign = new Animated.Value(1);
    this.bounceAnimation = new Animated.Value(0);
    this.bottomValue = new Animated.Value(0);
  }


  closeModal() {
    Animated.timing(this.animatedSign, {
      duration: 800,
      easing: Easing.back(),
      toValue: 1,
    }).start();
  }
  openModal() {
    Animated.timing(this.animatedSign, {
      duration: 800,
      easing: Easing.back(),
      toValue: 0,
    }).start(() => {
      console.log("Finished");

    });
  }

  openBottom() {
    Animated.timing(this.bottomValue, {
      duration: 500,
      toValue: 1,
    }).start(() => {
      console.log("Open Bottom");
    });
  }
  renderLogin() {
    const animatedStyleSign = {
      transform: [
        {
          scaleY: this.animatedSign.interpolate({
            inputRange: [0, 1],
            outputRange: [scaleValue, 1],
          })
        },
        {
          scaleX: this.animatedSign.interpolate({
            inputRange: [0, 1],
            outputRange: [scaleValue, 1],
          })
        }
      ],
      zIndex: this.animatedSign.interpolate({
        inputRange: [0, 1],
        outputRange: [5, 0],
      }),
      elevation: this.animatedSign.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 0],
      }),
      top: this.animatedSign.interpolate({
        inputRange: [0, 1],
        outputRange: [80, 150],
      }),
    };
    const animatedStyleLogin = {
      transform: [{
        scaleY: this.animatedSign.interpolate({
          inputRange: [0, 1],
          outputRange: [1, scaleValue],
        })
      },
      {
        scaleX: this.animatedSign.interpolate({
          inputRange: [0, 1],
          outputRange: [1, scaleValue],
        })
      }
      ],
      zIndex: this.animatedSign.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 5],
      }),
      elevation: this.animatedSign.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 10],
      }),
      top: this.animatedSign.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 80],
      }),
    };
    return (
      <View style={styles.container} >
        <Animated.View style={[styles.sign, animatedStyleSign]}>
          <Grid>
            <Row>
              <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>
                <Form>
                  <Item stackedLabel>
                    <Label>Username</Label>
                    <Input />
                  </Item>
                  <Item stackedLabel>
                    <Label>Password</Label>
                    <Input />
                  </Item>
                  <Item stackedLabel>
                    <Label>Re-Enter Password</Label>
                    <Input />
                  </Item>
                </Form>
              </View>
            </Row>
            <Row style={{ height: 40 }}>
              <View style={{ flex: 1 }} >
                <Button style={{ alignSelf: "center" }} primary transparent onPress={() => this.openModal()}><Text>Create New</Text></Button>
              </View>
            </Row>
          </Grid>

        </Animated.View>
        <Animated.View style={[styles.login, animatedStyleLogin]}>
          <Grid>
            <Row>
              <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>
                <Form>
                  <Item stackedLabel>
                    <Label>Username</Label>
                    <Input />
                  </Item>
                  <Item stackedLabel>
                    <Label>Password</Label>
                    <Input />
                  </Item>
                </Form>

              </View>

            </Row>
            <Row style={{ height: 40 }}>
              <View style={{ flex: 1 }} >
                <Button style={{ alignSelf: "center" }} onPress={() => this.passToBounce()} transparent primary ><Text>Close</Text></Button>
              </View>
              <View style={{ flex: 1 }} >
                <Button style={{ alignSelf: "center" }} onPress={() => this.closeModal()} transparent primary ><Text>Login</Text></Button>
              </View>
            </Row>
          </Grid>

        </Animated.View>
      </View>
    )

  }

  makeBounce() {
    //Animated.loop(
    Animated.sequence([
      Animated.spring(this.bounceAnimation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 1,
        tension: 100,
      }),
      Animated.spring(this.bounceAnimation, {
        toValue: 0,
        useNativeDriver: true,
        friction: 1,
        tension: 100,

      }),
    ]).start(() => {
      this.passToBottom();
      /*
      if (this.state.bouncing) {
        this.makeBounce();
      }
      else {
        this.passToBottom();
      }
      */
    });
    /*
     {
       //iterations: 40
     }
   ).start()
   */

  }

  passToBounce() {
    this.setState({ login: false });
    this.makeBounce();
  }
  stopBounce() {
    this.setState({ bouncing: false });

  }
  renderBouncing() {
    const bounceAnimate = {
      transform: [
        {
          scaleY: this.bounceAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 0.5],
          })
        },
        {
          scaleX: this.bounceAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 0.5],
          })
        }
      ]
    };

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View style={[styles.circle, bounceAnimate]} >
        </Animated.View>
      </View>
    )
  }
  passToBottom() {
    this.setState({ openFromBottom: true });
    this.openBottom();
  }

  renderBottom() {
    const bottomAnimate = {
      bottom: this.bottomValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-height, 0],
      })
    };
    return (<Animated.View style={[styles.bottom, bottomAnimate]}>
      <Container>
        <Content style={{ marginTop: 30 }} >
          <Card>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  This component adds a box-shadow by default.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text> This component adds a box-shadow by default.</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  This component adds a box-shadow by default.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text> This component adds a box-shadow by default.</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  This component adds a box-shadow by default.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text> This component adds a box-shadow by default.</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  This component adds a box-shadow by default.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text> This component adds a box-shadow by default.</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  This component adds a box-shadow by default.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text> This component adds a box-shadow by default.</Text>
            </CardItem>
          </Card>


        </Content>
      </Container>

    </Animated.View>)
  }

  render() {
    return (
      <React.Fragment>
        {
          !this.state.openFromBottom &&
          <React.Fragment>
            {
              this.state.login ? this.renderLogin() : this.renderBouncing()
            }
          </React.Fragment>
        }

        {this.state.openFromBottom ? this.renderBottom() : null}
      </React.Fragment>)

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F44336',
  },
  sign: {
    position: "absolute",
    flex: 1,
    shadowColor: '#424242',
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 3,
    shadowRadius: 12,
    shadowOpacity: 1.0,
    height: 350,
    width: width * 0.8,
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
  },
  login: {
    position: "absolute",
    shadowColor: '#424242',
    borderRadius: 5,
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 3,
    shadowRadius: 12,
    shadowOpacity: 1.0,
    marginTop: 0,
    height: 350,
    width: width * 0.8,
    transform: [
      { scaleX: 1.04 }
    ],
    backgroundColor: "#FAFAFA"
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#F44336'
  },
  bottom: {
    width: width,
    height: height,
    backgroundColor: '#F44336',
    position: 'absolute',
  }
});
