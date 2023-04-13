// Shows the colony info when the colony is cliced

import React,  {Component} from 'react';
import { Menu, Header, Button } from 'semantic-ui-react';

class ColonyInfoWindow extends Component {
  render() {
    return (
      <Menu vertical>
        <Menu.Item>
          <Header as='h6'>Colony ID</Header>
          <p>{this.props.colonyData.id}</p>
        </Menu.Item>

        <Menu.Item>
          <Header as='h6'>Colony Owner ID</Header>
          <p>{this.props.colonyData.ownerID}</p>
        </Menu.Item>

        <Menu.Item>
          <Header as='h6'>Absorption Rate</Header>
          <p>{this.props.colonyData.absorptionRate}</p>
        </Menu.Item>

        <Menu.Item>
          <Header as='h6'>Defense Nutrition</Header>
          <p>{this.props.colonyData.defenseNutrition}</p>
        </Menu.Item>

        <Menu.Item>
          <Header as='h6'>Occupy Nutrition</Header>
          <p>{this.props.colonyData.occupyNutrition}</p>
        </Menu.Item>

        <Menu.Item>
          <Header as='h6'>Is Owned</Header>
          <p>{String(this.props.colonyData.isOwned)}</p>
        </Menu.Item>

        <Menu.Item>
          <Header as='h6'>Actions</Header>
          <Button color='red'>Attack</Button>
          <Button color='green'>Occupy</Button>
        </Menu.Item>
      </Menu>
    )
  }
};

export default ColonyInfoWindow;