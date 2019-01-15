import React from 'react';

import TweetEmbed from 'react-tweet-embed';
import windowSize from 'react-window-size';
import { Column } from 'simple-flexbox';
import {isMobile} from 'react-device-detect';

import Fade from '@material-ui/core/Fade';
import { MuiThemeProvider } from '@material-ui/core/styles';

import MasterTheme from './MaterialTheme';
import TextWrapper from './TextWrapper';

class HelpScreen extends React.Component {

  render() {
    const winWidth = this.props.windowWidth;

    let tweetWidth = winWidth-4;
    if (!isMobile){
      tweetWidth = Math.min(winWidth-100,500);
    }

    let desktopInfo = null;
    if (!isMobile){
      desktopInfo = (
        <Column horizontal='center' vertical='center'>
        <TweetEmbed
          id={'1083020568952221697'}
          options={{theme: 'light',
                    linkColor: '#000000',
                    width:tweetWidth,
                  }}
        />
        <TextWrapper text='Icons located next to each Tweet allow desktop users to influence future content selection.'>
        </TextWrapper>
        </Column>
      )
    }
    return (
      <MuiThemeProvider theme={MasterTheme}>
        <Fade in={true} timeout={{enter: 2000, exit: 2000}}>
          <Column horizontal='center' vertical='center'>
            <TweetEmbed
              id={'1083379111895154688'}
              options={{theme: 'light',
                        linkColor: '#000000',
                        width:tweetWidth,
                      }}
            />
            <TextWrapper text='Onlooker scans millions of new Tweets every day. Only the most influential, informative content is displayed.'>
            </TextWrapper>
            {desktopInfo}
            <TweetEmbed
              id={'1083021299990040577'}
              options={{theme: 'light',
                        linkColor: '#000000',
                        width:tweetWidth,
                      }}
            />
            <TextWrapper text='Questions, suggestions, or ideas? Email contact@onlooker.us for more info.'>
            </TextWrapper>
            <div style={{height: '8px'}}></div>
          </Column>
        </Fade>
      </MuiThemeProvider>
    );
}
}

export default windowSize(HelpScreen);
