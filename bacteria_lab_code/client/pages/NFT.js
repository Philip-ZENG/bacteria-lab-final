// This page is used to the game world

import React, { Component } from 'react';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';

import { Provider } from 'react-redux';
import store from '../store/index';

import NFTboard from '../component/NFTboard';
import NavbarTop from '../component/NavbarTop';
import NavbarBottom from '../component/NavbarBottom';
import MintNFT from '../component/MintNFT';
import ShowNFT from '../component/ShowNFT';

import {
    Container,
    Divider,
    Grid,
    Header,
    Message,
    Icon
} from 'semantic-ui-react'

class NFT extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>NFT: Bacteria Land</title>
          <meta name="description" content="Bacteria Land NFT" />
          <link rel="icon" href="/icon.png" />
        </Head>

        <NavbarTop />

        <Grid columns={4} divided>
          <Grid.Row>

            <Grid.Column width={1}>
            </Grid.Column>

            <Grid.Column width={6}>
              {/* <div style={{height:'100px'}}></div> */}

              <Divider horizontal>
                <Header as='h3'>
                  <Icon name='dna' />
                  Bacteria Land NFT
                </Header>
              </Divider>

              <Message
                icon='image'
                header='What is the NFTs of Bacteria Land?'
                content='The NFT is the history of Bacteria Land. All contributions play a vital part in the lifecycle of Bacteria Land!'
              />
              <Message
                icon='history'
                header='The Carol of Bacteria Land History'
                content='Her story is not written, she walks this earth making history one step at a time. She whispers to the waves and they carry her song to the whales. One day a fisherman will find her story washed ashore, laying sodden and sandy on a rock and around the fire, her tale will be told.'
              />

              {/* <div style={{height:'25px'}}></div> */}

              <Divider horizontal>
                <Header as='h3'>
                  <Icon name='save' />
                  Mint NFT
                </Header>
              </Divider>

              <MintNFT />

              <Divider horizontal>
                <Header as='h3'>
                  <Icon name='search' />
                  Show NFT
                </Header>
              </Divider>

              <Provider store={store}>
                <ShowNFT />
              </Provider>

            </Grid.Column>

              <Grid.Column width={8}>
                <div style={{ height: '25px' }}>
                </div>
                <Container textAlign='center'>
                  <Provider store={store}>
                    <NFTboard />
                  </Provider>
                </Container>
              </Grid.Column>

              <Grid.Column width={1}>
              </Grid.Column>

          </Grid.Row>
        </Grid>

        <NavbarBottom />
      </div>
    );
  };
}

export default NFT


