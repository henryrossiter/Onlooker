import React from 'react';

import TweetItem from './TweetItem';
import firebase from './fire';

import { Column } from 'simple-flexbox';

import Button from '@material-ui/core/Button';

import Fade from '@material-ui/core/Fade';

class MediaTweetContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: 10,
      ids: [],
      media: true,
    };
  }


  componentDidMount() {
    var feedName = 'feed'
    if (this.props.basketball) {
      feedName = 'basketball_'+feedName;
    }
    if (this.props.football){
      feedName = 'football_'+feedName;
    }
    if (this.props.hockey) {
      feedName = 'hockey_'+feedName;
    }
    console.log(feedName);
    const itemsRef = firebase.database().ref('hockey_football_basketball_feed');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      this.setState({
        ids: items
      });

    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hockey !== this.props.hockey || prevProps.football !== this.props.football || prevProps.basketball !== this.props.basketball) {
      let feedName = 'feed';
      if (this.props.basketball) {
        feedName = 'basketball_'+feedName;
      }
      if (this.props.football) {
        feedName = 'football_'+feedName;
      }
      if (this.props.hockey) {
        feedName = 'hockey_'+feedName;
      }
      const itemsRef = firebase.database().ref(feedName);
      itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        this.setState({
          ids: items,
        });
      });
    }
  }

  extendFeed = () => {
    this.setState({
      shown: this.state.shown+10
    })
  }
  render() {
    let listItems = this.state.ids.slice(0,this.state.shown).map((number) =>
    <TweetItem
      media={true}
      id={number}>
    </TweetItem>
    );
    return (

        <div style={{}}>
        <Column horizontal='center'>
          {listItems}
          <Fade in={true} timeout={{enter: 20000, exit: 2000}}>
            <Button variant='outlined' fullWidth={true} onClick={this.extendFeed}>Load More</Button>
          </Fade>
        </Column>
        </div>
    );
  }
}
export default MediaTweetContainer;
