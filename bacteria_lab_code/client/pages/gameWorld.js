// This page is used to the game world

import React, {Component} from 'react';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Provider } from 'react-redux';
import store from '../store/index';

import PlayerInfo from '../component/PlayerInfo';
import Gameboard from '../component/Gameboard';
import TileInfo from '../component/TileInfo';
import Actionboard from '../component/Actionboard';
import NavbarTop from '../component/NavbarTop';
import NavbarBottom from '../component/NavbarBottom';

import {
  Container,
  Divider,
  Grid,
  Header,
  Icon
} from 'semantic-ui-react'

class GameWorld extends Component {
  state = {
    colonyIDonSelection: 3
  }

  render() {
    return (
      <div>
        <Head>
          <title>GameWorld</title>
          <meta name="description" content="GameWorld" />
          <link rel="icon" href="/icon.png" />
        </Head>
        
        <NavbarTop />
        
          <Grid columns={2} divided>
            <Grid.Row>

              <Grid.Column width={7}>
                <div style={{height: '25px'}}>
                </div>
                <Container textAlign='center'>

                  <Provider store={store}>
                    <Gameboard />
                  </Provider>
                
                </Container>
              </Grid.Column>

              <Grid.Column width={9}>
                <Divider horizontal>
                  <Header as='h3'>
                    <Icon name='user secret' />
                    Player Info
                  </Header>
                </Divider>

                <PlayerInfo />
                
                <Divider horizontal>
                  <Header as='h3'>
                    <Icon name='tag' />
                    Tile Info
                  </Header>
                </Divider>

                <Provider store={store}>
                  <TileInfo colonyID={this.state.colonyIDonSelection}/>
                </Provider>

                <Divider horizontal>
                  <Header as='h3'>
                    <Icon name='american sign language interpreting' />
                    Acrion Board
                  </Header>
                </Divider>
                
                <Provider store={store}>
                  <Actionboard colonyID={this.state.colonyIDonSelection}/>
                </Provider>

              </Grid.Column>
            </Grid.Row>
          </Grid>

        <NavbarBottom />       
      </div>
    );
  };
}

export default GameWorld


