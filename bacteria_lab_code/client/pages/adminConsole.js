// This page is used to the game world

import React, {Component} from 'react';
import web3 from '../eth/web3';
import bacteriaLabCore from '../eth/bacteriaLabCore';
import {Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import NavbarTop from '../component/NavbarTop';
import NavbarBottom from '../component/NavbarBottom';

class AdminConsole extends Component {
  
  state = {
    gameManager: {
      adminAddress: "",
      isEnd: false,
      isInit: false,
      isStart: false,
      mapLength: 0,
      mapWidth: 0,
      playerCount: 0,
      totalColonyCount: 0
    },
    colony: {
      id: 0,
      ownerID: 0,
      absorptionRate: 0,
      defenseNutrition: 0,
      occupyNutrition: 0,
      isOwned: false
    },
    player: {
      id: 0,
      playerAddress: "",
      nutrition: "",
      absorptionRate: 0,
      color: 0,
      colonyCount: 0
    },
    message: "",
    colonyIDforQuery: "",
    playerIDforQuery: ""
  }
  
  // Next specific lifecycle function, called when component starts to render in the Next server
  // Used to fetch data for page rendering
  static async getInitialProps() {
    return {};
  }

  // React specific lifecycle function, called when the component starts to render in the browser
  // rendering in browser happens after the rendering in Next server
  async componentDidMount() {
    this.getGameManager();
  }
  
  getGameManager = async (event) => {
    const gameManagerInfo = await bacteriaLabCore.methods.gameManager().call();
    console.log(gameManagerInfo);
    var gameManagerState = {
      adminAddress: gameManagerInfo.adminAddress,
      isEnd: gameManagerInfo.isEnd,
      isInit: gameManagerInfo.isInit,
      isStart: gameManagerInfo.isStart,
      mapLength: gameManagerInfo.mapLength,
      mapWidth: gameManagerInfo.mapWidth,
      playerCount: gameManagerInfo.playerCount,
      totalColonyCount: gameManagerInfo.totalColonyCount
    };
    this.setState({gameManager: gameManagerState});
  }

  onGetColony = async (event) => {

    event.preventDefault();
    const colonyInfo = await bacteriaLabCore.methods.getColonyInfo(this.state.colonyIDforQuery).call();

    console.log(colonyInfo);
    var colonyState = {
      id: colonyInfo[0],
      ownerID: colonyInfo[1],
      absorptionRate: colonyInfo[2],
      defenseNutrition: colonyInfo[3],
      occupyNutrition: colonyInfo[4],
      isOwned: colonyInfo[5]
    };
    this.setState({colony: colonyState});
  }

  onGetPlayer = async (event) => {
    event.preventDefault();
    this.setState({ message: "Waiting on transaction success...(Around 15~30 seconds)" });
    const playerInfo = await bacteriaLabCore.methods.getPlayerInfo(this.state.playerIDforQuery).call();
    this.setState({ message: 'Player info query succeed!' });

    console.log(playerInfo);
    var playerState = {
      id: playerInfo[0],
      playerAddress: playerInfo[1],
      nutrition: playerInfo[2],
      absorptionRate: playerInfo[3],
      color: playerInfo[4],
      colonyCount: playerInfo[5]
    };
    this.setState({player: playerState});
  }

  onNutritionUpdate = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Waiting on transaction success...(Around 15~30 seconds)" });
    await bacteriaLabCore.methods.updateState().send({
      from: accounts[0]
    })
    this.setState({ message: 'Nutrition update succeed!' });
  };

  render() {
    return (
      <div>
        <NavbarTop />
          <h1>Welcome to Admin Console</h1>
          <p>-------------------------------------------------------</p>
          <p>Game Manager Info is Shown Below:</p>
          <ul>
            <li>Admin Address: {this.state.gameManager.adminAddress}</li>
            <li>Game is Init: {String(this.state.gameManager.isInit)}</li>
            <li>Game is Start: {String(this.state.gameManager.isStart)}</li>
            <li>Game is End: {String(this.state.gameManager.isEnd)}</li>
            <li>Map Lenth: {this.state.gameManager.mapLength}</li>
            <li>Map Width: {this.state.gameManager.mapWidth}</li>
            <li>Player Count: {this.state.gameManager.playerCount}</li>
            <li>Total Colony Count: {this.state.gameManager.totalColonyCount}</li>
          </ul>
          <Button onClick={this.getGameManager} primary>Update</Button>

          <p>-------------------------------------------------------</p>
          <p>Inspect Colony Info</p>
          <ul>
            <li>Colony ID: {this.state.colony.id}</li>
            <li>Colony ownerID: {this.state.colony.ownerID}</li>
            <li>Absorption Rate: {this.state.colony.absorptionRate}</li>
            <li>Defense Nutrition: {this.state.colony.defenseNutrition}</li>
            <li>Occupy Nutrition: {this.state.colony.occupyNutrition}</li>
            <li>Colony is Owned: {String(this.state.colony.isOwned)}</li>
          </ul>

          <form onSubmit={this.onGetColony}>
            <div>
              <label>Enter Colony ID </label>
              <input 
                value={this.state.colonyIDforQuery}
                onChange={event => this.setState({ colonyIDforQuery: event.target.value })}
              />
            </div>
            <Button primary>Query Colony Info</Button>
          </form>

          <p>-------------------------------------------------------</p>
          <p>Inspect Player Info</p>
          <ul>
            <li>Player ID: {this.state.player.id}</li>
            <li>Player Address: {this.state.player.playerAddress}</li>
            <li>Nutrition: {this.state.player.nutrition}</li>
            <li>Absorption Rate: {this.state.player.absorptionRate}</li>
            <li>Color: {this.state.player.color}</li>
            <li>Colony Count: {this.state.player.colonyCount}</li>
          </ul>
          <form onSubmit={this.onGetPlayer}>
            <div>
              <label>Enter Player ID </label>
              <input 
                value={this.state.playerIDforQuery}
                onChange={event => this.setState({ playerIDforQuery: event.target.value })}
              />
            </div>
            <Button primary>Query Player Info</Button>
          </form>


          <p>-------------------------------------------------------</p>
          <p>Update Nutrition Periodically</p>
          <Button onClick={this.onNutritionUpdate} primary>Update</Button>

          <p>-------------------------------------------------------</p>
          <p>Log</p>
          <p> &gt;&gt;&gt; {this.state.message}</p>
        <NavbarBottom />
      </div>
    );
  };
}

export default AdminConsole