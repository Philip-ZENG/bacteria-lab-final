// Header at the top of the gameWorld page, where players can see the infor mation of their current status

import React, { Component } from 'react';
import { Container, Grid, Statistic } from 'semantic-ui-react';
import BacteriaLabCore from '../eth/bacteriaLabCore';
import { connect } from 'react-redux';

class TileInfo extends Component {
  state = {
    selectedColonyID: this.props.selectedColonyID,
    ownerID: "",
    absorptionRate: "",
    defenseNutrition: "",
    occupyNutrition: "",
    isOwned: false
  }

  async componentDidMount() {
    this.getColonyInfo();
  }

  async getColonyInfo() {
    try {
      const colonyInfo = await BacteriaLabCore.methods.getColonyInfo(this.props.selectedColonyID).call();
      this.setState({ ownerID: colonyInfo[1], absorptionRate: colonyInfo[2], defenseNutrition: colonyInfo[3], occupyNutrition: colonyInfo[4], isOwned: colonyInfo[5] });
    } catch(err) {
      this.setState({ ownerID: "#", absorptionRate: "#", defenseNutrition: "#", occupyNutrition: "#", isOwned: false})
    }
  }

  render() {
    this.getColonyInfo();
    return (
      <Container>
      
        <Grid columns={2} divided verticalAlign='middle'>
          <Grid.Row centered stretched>
            <Grid.Column width={2}>
              <Statistic size='small'>
                <Statistic.Value>{'#'+this.props.selectedColonyID}</Statistic.Value>
                <Statistic.Label>Colony ID</Statistic.Label>
              </Statistic>
            </Grid.Column>

            <Grid.Column width={2}>
              <Statistic size='small'>
                <Statistic.Value>{String(this.state.isOwned) == 'false' ? 'None' : '#'+this.state.ownerID}</Statistic.Value>
                <Statistic.Label>Owner ID</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid columns={3} divided verticalAlign='middle'>
          <Grid.Row centered stretched>
            <Grid.Column width={5}>
              <Statistic>
                <Statistic.Value>{this.state.absorptionRate}</Statistic.Value>
                <Statistic.Label>Absorption Rate</Statistic.Label>
              </Statistic>
            </Grid.Column>

            <Grid.Column width={5}>
              <Statistic>
                <Statistic.Value>{this.state.defenseNutrition}</Statistic.Value>
                <Statistic.Label>Defense Nutrition</Statistic.Label>
              </Statistic>
            </Grid.Column>

            <Grid.Column width={5}>
              <Statistic>
                <Statistic.Value>{this.state.occupyNutrition}</Statistic.Value>
                <Statistic.Label>Occupy Nutrition</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
          
      </Container>
    );
  }
};

const mapStateToProps = state => {
  return {
    selectedColonyID: state.selectedColonyID
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedColony: (newColonyID) => dispatch({ type: 'changeSelectedColony', newSelectedColonyID: newColonyID })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TileInfo);
