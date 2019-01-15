import React from 'react';
import TweetEmbed from 'react-tweet-embed';

import FlagMenu from './FlagMenu';
import TweetOptionsMenu from './TweetOptionsMenu';

import { Column, Row } from 'simple-flexbox';

import MasterTheme from './MaterialTheme';

import windowSize from 'react-window-size';

import { MuiThemeProvider } from '@material-ui/core/styles';

import {isMobile} from 'react-device-detect';

import Fade from '@material-ui/core/Fade';

class ColoredIcons extends React.Component {

  render() {
    return(
      <MuiThemeProvider theme={MasterTheme}>
        <TweetOptionsMenu></TweetOptionsMenu>
        <FlagMenu></FlagMenu>
      </MuiThemeProvider>
    )
  }
}
class TweetItem extends React.Component {

  render() {
    const winWidth = this.props.windowWidth;

    let tweetWidth = winWidth-4;
    let controls = (
      <div/>
    );
    if (!isMobile){
      tweetWidth = Math.min(winWidth-100,550);
      controls= (
        <ColoredIcons id={this.props.id}></ColoredIcons>
      );
    }
    if (this.props.media) {
      return (
        <Row>
          <Fade in={true} timeout={{enter: 2000, exit: 2000}}>
            <Column horizontal='center' vertical='center'>
            <TweetEmbed
              id={this.props.id}
              options={{theme: 'light',
                        linkColor: '#000000',
                        width:tweetWidth,
                      }}
            />
            </Column>
          </Fade>
          <Fade in={true} timeout={{enter: 8000, exit: 2000}}>
            <Column vertical='center'>
            {controls}
            </Column>
          </Fade>
        </Row>
      );
    } else {
      return (
        <Row>
        <Column horizontal='center' vertical='center' alignItems='center'>
          <TweetEmbed
            id={this.props.id}
            options={{theme: 'light',
                      linkColor: '#000000',
                      width:tweetWidth,
                      cards: 'hidden',
                    }}
          />
        </Column>
        <Column vertical='center'>
        {controls}
        </Column>
        </Row>

      );
    }
  }
}
export default windowSize(TweetItem)
