import React,  {Component} from 'react';
import { Button } from 'semantic-ui-react';
import BacteriaLabCore from '../eth/bacteriaLabCore';
import { connect } from 'react-redux';

// Define how player id maps to its color
const colorMapping = ["grey", "yellow", "red", "green", "violet", "purple", "pink" , "blue"];
const defaultColor = "grey";

class NFTTile extends Component {

  state = {
    nftTileID: this.props.nftTileID,
    color: "grey",
  }

  async componentDidMount(){
    this.getTileInfo();
  }

  async getTileInfo() {
    var tileColorID = 255;
    try {
      tileColorID = await BacteriaLabCore.methods.getNftTileInfo(this.props.selectedNFTID, this.state.nftTileID).call();
    } catch(err) {
    }
    
    let tileColor = defaultColor;
    if(tileColorID != 255){
      tileColor = colorMapping[tileColorID];
    }
    this.setState({color: tileColor});
  }

  render() {
    this.getTileInfo();
    return(
        <Button icon color={this.state.color} size='massive'/>
    );
  }
};

const mapStateToProps = state => {
  return {
    selectedNFTID: state.selectedNFTID
  }
};

// No need to change store state here
const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NFTTile);