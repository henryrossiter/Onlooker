import React from 'react';

import windowSize from 'react-window-size';
import {isMobile} from 'react-device-detect';

import Typography from '@material-ui/core/Typography';



class TextWrapper extends React.Component {

  render() {
  const winWidth = this.props.windowWidth;

  let tweetWidth = winWidth-4;
  if (!isMobile){
    tweetWidth = Math.min(winWidth-100,500);
  }
    return (
            <div style={{width:tweetWidth, borderWidth:'1px', borderStyle:'solid', borderRadius:'6px', borderColor:'#E1E8ED', paddingTop:'8px', paddingBottom:'8px'}}>
            <Typography style={{color:'#000000', fontSize:16, fontWeight:500, width:tweetWidth}}>
                {this.props.text}
            </Typography>
            </div>
    );
}
}

export default windowSize(TextWrapper);
