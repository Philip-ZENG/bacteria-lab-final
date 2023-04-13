// This page is used to invite players to join the game

import React, {Component} from 'react';
import Head from 'next/head';
import Router from 'next/router';
import web3 from '../eth/web3';
import BacteriaLabCore from '../eth/bacteriaLabCore';
import 'semantic-ui-css/semantic.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {Message} from 'semantic-ui-react';

import {
  Container,
  Grid,
  Image,
  Button,
  Icon
} from 'semantic-ui-react'

import NavbarTop from '../component/NavbarTop';
import NavbarBottom from '../component/NavbarBottom';

class InvitePlayer extends Component {

  state = {
    errorMessage: '',
    loading: false,
    messageHidden: true
  }

  // Triggered when `enter game` buttom is clicked
  onEnterGame = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ loading: true, errorMessage: '', messageHidden:true });
    try {
      await BacteriaLabCore.methods.enterGame().send({
        from: accounts[0]
      });
      Router.push('/gameWorld');
    } catch(err) {
      this.setState({ messageHidden: false });
      this.setState({ errorMessage: err.message });
    }
    this.setState({loading: false});
  };


  render() {
    console.log(web3.version);
    web3.eth.getAccounts().then(console.log);

    return (
      <div>
        <Head>
          <title>Welcome to Bacteria Land</title>
          <meta name="description" content="Welcome to Bacteria Land!" />
          <link rel="icon" href="/icon.png" />
        </Head>
        
        <NavbarTop />


        <Grid columns={4} divided>
          <style>
            {`
            html, body {background-color: #252839 !important;}
            
            `}
            
          </style>
          
          <Grid.Row>
            <Grid.Column width={1}>
              
            </Grid.Column>

            <Grid.Column width={7}>
              <Container textAlign='center'>
              <div style={{height: '72px'}}>
              </div>
                <Image size='big' src='/icon.png' verticalAlign='middle'/>
              <div style={{height: '73px'}}>
              </div>
              </Container>
            </Grid.Column>

            <Grid.Column width={7}>
              <div style={{height:'125px'}}></div>
              <Container textAlign='left'>
              <div>
              <h1 style={{color:'#ffffff'}}>Welcome to Bacteria Land!</h1>
              <div style={{height:'25px'}}></div>

              <h4 style={{color:'#ffffff'}}>We are bacteria. We are ubiquitous, mostly free-living organisms. </h4>
              <div style={{height:'5px'}}></div>
              <h4 style={{color:'#ffffff'}}>We are creating artwork that constantly changes over our short lifetimes. </h4>
              <div style={{height:'20px'}}></div>

              <h4 style={{color:'#ffffff'}}>But even if the impact (or drawings) of some communities may not go the </h4>
              <div style={{height:'5px'}}></div>
              <h4 style={{color:'#ffffff'}}>distance, the history depicting the ongoing mutation of the canvas</h4>
              <div style={{height:'5px'}}></div>
              <h4 style={{color:'#ffffff'}}>has become a key part of our world! </h4>
              <div style={{height:'20px'}}></div>

              <h4 style={{color:'#ffffff'}}>All contributions play a vital part in the lifecycle of Bacteria Land!</h4>
              <div style={{height:'60px'}}></div>
              </div>
              
              <Button animated='vertical' primary onClick={this.onEnterGame} loading={this.state.loading}>
                <Button.Content visible><h4>Go to Bacteria Land!</h4></Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>

              <Message error floating hidden={this.state.messageHidden} header="Your transaction failed!" content={this.state.errorMessage}/>

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

export default InvitePlayer