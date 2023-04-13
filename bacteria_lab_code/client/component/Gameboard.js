import _ from 'lodash'
import React,  {Component} from 'react';
import Tile from './Tile';

const mapWidth = 16;

function generateRow(startID) {
  const columns = _.times(mapWidth, (i) => (   
    <Tile colonyID={i+startID}/>
  ))
  return columns;
};
  
const map = _.times(mapWidth, (j) => (
  <div style={{height: '45px'}}>
    {generateRow(mapWidth*j)}
  </div> 
))


class Gameboard extends Component {
  render(){
    return (
      <div>
          {map}
      </div>
    );
  }
};

export default Gameboard;