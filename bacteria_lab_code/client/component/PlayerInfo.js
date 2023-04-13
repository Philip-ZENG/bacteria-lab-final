// Header at the top of the gameWorld page, where players can see the infor mation of their current status

import React,  {Component} from 'react';
import { Container, Image, Grid, Segment,Statistic } from 'semantic-ui-react';
import web3 from '../eth/web3';
import BacteriaLabCore from '../eth/bacteriaLabCore';

class PlayerInfo extends Component {
  state = {
    playerID:"",
    playerAddress:"",
    nutrition:"",
    absorptionRate:""
  }

  async componentDidMount() {
    this.getPlayerInfo();
  }

  async getPlayerInfo() {
    const accounts = await web3.eth.getAccounts();
    const playerID = await BacteriaLabCore.methods.getPlayerID(accounts[0]).call();
    const playerInfo = await BacteriaLabCore.methods.getPlayerInfo(playerID).call();
    this.setState({playerID: playerID, playerAddress: accounts[0], nutrition: playerInfo[2], absorptionRate: playerInfo[3]});
  }

  render(){
    this.getPlayerInfo();
    return (
      <Container>
        <Grid columns={4} divided verticalAlign='middle'>
          <Grid.Row stretched>
            <Grid.Column width={3}>
              <Segment>
                <Container fluid>
                  <Image fluid src='/icon.png' />
                </Container>
              </Segment>
            </Grid.Column>
            <Grid.Column width={7}>
              <Segment>
                Player ID: {this.state.playerID}
              </Segment>
              <Segment>      
                Player Address: {this.state.playerAddress}
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
              <Statistic>
                <Statistic.Value>{this.state.nutrition}</Statistic.Value>
                <Statistic.Label>Nutrition</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column width={3}>
              <Statistic>
                <Statistic.Value>{this.state.absorptionRate}</Statistic.Value>
                <Statistic.Label>Absorption Rate</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
};

export default PlayerInfo;
