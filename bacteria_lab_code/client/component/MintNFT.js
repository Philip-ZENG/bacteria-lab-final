import React, { Component } from 'react';
import {Container,Message,Card,Button} from 'semantic-ui-react';
import web3 from '../eth/web3';
import BacteriaLabCore from '../eth/bacteriaLabCore';

class MintNFT extends Component {
  state = {
    mintSuccess: false,
    mintMessageHidden: true,
    mintMessageContent:"",
    mintLoading: false
  }

  // Triggered when "Mint NFT" button is clicked
  onMintNFT = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ mintLoading: true, mintMessageContent: '',  mintMessageHidden:true });
    try {
      await BacteriaLabCore.methods.createNFT(accounts[0]).send({
        from: accounts[0]
      });
      const nftID = await BacteriaLabCore.methods.getLatestGeneratedNFTID().call();
      this.setState({ mintMessageHidden: false, mintSuccess:true, mintMessageContent: `Successfuly mint a new NFT. The NFT ID is: ${nftID}.`});
    } catch(err) {
      this.setState({ mintMessageHidden: false, mintSuccess:false, mintMessageContent: err.message});
    }
    this.setState({mintLoading: false});
  }


  render() {
    return(
      <div>
        <Container textAlign='center'>
          <Card fluid>
            <Card.Content>
              <Card.Header>Click to Mint New NFT</Card.Header>
              <Card.Description>
                Click the Mint NFT button below to mint a new NFT, which is the 'Snap Shot' of the bacteria land at the moment of 
                NFT creation. A unique NFT id will be returned to you and you can use it to view your NFT in the 'Show NFT' section.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button primary onClick={this.onMintNFT} loading={this.state.mintLoading}>Mint NFT</Button>
            </Card.Content>
          </Card>
        </Container>

        <Message error={!this.state.mintSuccess} positive={this.state.mintSuccess} 
        hidden={this.state.mintMessageHidden} content={this.state.mintMessageContent}/>
      </div>
    );
  }
};

export default MintNFT;