import React, { Component } from 'react';
import {Input,Message, Form, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';

class ShowNFT extends Component {
  state = {
    showNFTInput: ""
  }

  onShowNFT = async (event) => {
    event.preventDefault();
    this.props.changeSelectedNFT(this.state.showNFTInput);
    this.setState({showNFTInput: ""});
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onShowNFT}>
          <Form.Field>
            <Input 
              value={this.state.showNFTInput}
              onChange={event => this.setState({ showNFTInput: event.target.value })}
              label={<Button primary color="grey">Show</Button>}
              labelPosition='right'
              placeholder='Enter ID of NFT'
            />
          </Form.Field>
        </Form>
  
        <Message warning
          icon='warning sign'
          header='How to check the NFT?'
          content='Please input the NFT ID.'
        />
      </div>
    );
  }
};

// No need to subscribe to state
const mapStateToProps = state => {
  return {
  }
};

// Need to change the `selectedNFTID` state in store
const mapDispatchToProps = dispatch => {
  return {
    changeSelectedNFT: (newNFTID) => dispatch({type: 'changeSelectedNFT', newSelectedNFTID: newNFTID})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowNFT);