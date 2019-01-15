import React from 'react';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const buttonStyle = {
  margin: "8px"
};

class TweetOptionsMenu extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleChoice = () => {
    this.setState({ anchorEl: null });
    this.setState({open: true})
  };

  handleClickAway = () => {
    this.setState({ anchorEl: null });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <IconButton onClick={this.handleClick} style={buttonStyle}>
          <MoreHorizIcon color='primary'>
          </MoreHorizIcon>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
        >
          <MenuItem onClick={this.handleChoice}>See more tweets like this</MenuItem>
        </Menu>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message="Updating Algorithm..."
          action={[
            <IconButton
              onClick={this.handleClose}
              key="close"
              aria-label="Close"
              color="primary"
            >
              <CloseIcon />
            </IconButton>,
          ]}

        />
      </ClickAwayListener>
      </div>
    );
  }
}

export default TweetOptionsMenu;
