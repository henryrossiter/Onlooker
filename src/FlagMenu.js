import React from 'react';

import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import FlagIcon from '@material-ui/icons/Flag';

const buttonStyle = {
  margin: "8px"
};

class FlagMenu extends React.Component {
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
        <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" aria-label='more-options' onClick={this.handleClick} style={buttonStyle}>
          <FlagIcon color='primary'>
          </FlagIcon>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
        >
          <MenuItem onClick={this.handleChoice}>Off Topic</MenuItem>
          <MenuItem onClick={this.handleChoice}>Uninformative</MenuItem>
          <MenuItem onClick={this.handleChoice}>Outdated</MenuItem>
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
          message="Tweet Flagged. Updating Algorithm..."
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

export default FlagMenu;
