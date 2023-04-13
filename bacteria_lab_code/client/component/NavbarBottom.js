import React,  {Component} from 'react';
import Router from 'next/router';
import {Image, Segment, Container, Grid, Header, List } from 'semantic-ui-react';

class NavbarBottom extends Component {

  render(){
    return (
      <Segment inverted vertical style={{ margin: '2em 0em 0em', padding: '1.5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Xuanyang Xu' />
            <List link inverted>
              <List.Item as='a'>119010361</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Zhuoru Zeng' />
            <List link inverted>
              <List.Item as='a'>119010417</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Yan Zhuang' />
            <List link inverted>
              <List.Item as='a'>120090303</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as='h4' content='FTE4312 Project: Bacteria Land' />
            <List link inverted>
              <List.Item as='a' href='https://github.com/Philip-ZENG/bacteria-lab'>Link to Github</List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Container>
      </Segment>
    );
  }
};

export default NavbarBottom;