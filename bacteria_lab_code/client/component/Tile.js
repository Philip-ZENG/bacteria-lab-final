import React,  {Component} from 'react';
import { Button } from 'semantic-ui-react';
import BacteriaLabCore from '../eth/bacteriaLabCore';
import { connect } from 'react-redux';

// Define how player id maps to its color
const colorMapping = ["blue", "yellow", "red", "green", "violet", "purple", "pink"];
const defaultColor = "grey";

class Tile extends Component {

  state = {
    colonyID: this.props.colonyID,
    color: "grey",
    selectedColonyID: ""
  }

  async componentDidMount(){
    this.getTileInfo();
  }

  async getTileInfo() {
    const colonyInfo = await BacteriaLabCore.methods.getColonyInfo(this.state.colonyID).call();
    // If the colony has owner, the color is set to its owner's color
    if(colonyInfo[5]) {
      const colonyColor = colorMapping[colonyInfo[1]];
      this.setState({color: colonyColor});
    // If the colony has no owner, the color is set to the default color
    } else {
      this.setState({color: defaultColor});
    }
  }

  onTrigger = async () => {
    this.props.changeSelectedColony(this.props.colonyID);
  };

  render() {
    this.getTileInfo();
    return(
        <Button icon color={this.state.color} size='massive' onClick={this.onTrigger.bind(this)}/>
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
    changeSelectedColony: (newColonyID) => dispatch({type: 'changeSelectedColony', newSelectedColonyID: newColonyID})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tile);