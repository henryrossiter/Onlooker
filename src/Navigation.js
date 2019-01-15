import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import TweetContainer from "./TweetContainer";
import MediaTweetContainer from "./MediaTweetContainer";
import HelpScreen from "./HelpScreen"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';

import MasterTheme from './MaterialTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';

const styles = (theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
  },
  button: {
    background: '#1DA1F2',
    borderRadius: 3,
    border: 0,
    height: 48,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  HelpButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbar: theme.mixins.toolbar,
});

class TemporaryDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpOpen: false,
      optionsOpen: false,
      leftDrawerOpen: false,
      mediaOption: true,
      football: true,
      basketball: true,
      hockey: true,
    };
  }

  componentWillMount() {
      localStorage.setItem('hasVisitedOnlooker', 'true');
    }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  toggleHelp = () => {
    this.setState({helpOpen: !this.state.helpOpen})
  };

  toggleOptions = () => {
      this.setState({optionsOpen: !this.state.optionsOpen})
  };

  toggleMedia = () => {
    this.setState({mediaOption: !this.state.mediaOption});
    this.toggleOptions();
  };

  toggleFootball = () => {
    this.setState({football: !this.state.football});
  };

  toggleBasketball = () => {
    this.setState({basketball: !this.state.basketball});
  }
  togglehockey = () => {
    this.setState({hockey: !this.state.hockey});
  };

  render() {
    const { classes } = this.props;

    const fullList = (
      <div className={classes.fullList}>
        <List component="div" disablePadding>

        <ListItem button className={classes.nested}>
          <ListItemIcon>
            <FormControlLabel
              control={
                <MuiThemeProvider theme={MasterTheme}>
                <Checkbox
                  color='primary'
                  checked={this.state.hockey}
                  onChange={this.togglehockey}
                  value="checkedA"
                />
                </MuiThemeProvider>
              }
              label="hockey"
            />
          </ListItemIcon>
        </ListItem>

        <ListItem button className={classes.nested}>
          <ListItemIcon>
            <FormControlLabel
              control={
                <MuiThemeProvider theme={MasterTheme}>
                <Checkbox
                  color='primary'
                  checked={this.state.football}
                  onChange={this.toggleFootball}
                  value="checkedA"
                />
                </MuiThemeProvider>
              }
              label="Football"
            />
          </ListItemIcon>
        </ListItem>

        <ListItem button className={classes.nested}>
          <ListItemIcon>
            <FormControlLabel
              control={
                <MuiThemeProvider theme={MasterTheme}>
                <Checkbox
                  color='primary'
                  checked={this.state.basketball}
                  onChange={this.toggleBasketball}
                  value="checkedA"
                />
                </MuiThemeProvider>
              }
              label="Basketball"
            />
          </ListItemIcon>
        </ListItem>

        <Divider></Divider>
        <ListItem button className={classes.nested}>
          <ListItemIcon>
            <FormControlLabel
              control={
                <MuiThemeProvider theme={MasterTheme}>
                <Checkbox
                  color='primary'
                  checked={this.state.mediaOption}
                  onChange={this.toggleMedia}
                  value="checkedA"
                />
                </MuiThemeProvider>
              }
              label="Show Media"
            />
          </ListItemIcon>
        </ListItem>



        </List>
      </div>
    );

    let headerPosition = "fixed";

    const drawerAndHeader = (
      <div>
      <AppBar color="inherit" position={headerPosition}>
        <Toolbar>
          <IconButton onClick={this.toggleDrawer('leftDrawerOpen', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" align="left" className={classes.grow}>
            Onlooker
          </Typography>
          <IconButton onClick={this.toggleHelp} className={classes.helpButton} color="inherit" aria-label="Help">
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={this.state.leftDrawerOpen} onClose={this.toggleDrawer('leftDrawerOpen', false)}>
        <div
          tabIndex={0}
          role="button"
        >
          {fullList}
        </div>
      </Drawer>
      </div>
    )

    if (!this.state.football && !this.state.basketball && !this.state.hockey){
      this.setState({ football: true,
                      basketball: true,
                      hockey: true,
                    });
    }

    if (this.state.helpOpen) {
      return (
        <div style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute', padding: 8}}>
          {drawerAndHeader}
          <div className={classes.toolbar} />
          <HelpScreen>
          </HelpScreen>
        </div>

      )
    }
    else if (this.state.mediaOption) {
      return (
        <div style={{margin: 8}}>
          {drawerAndHeader}
          <div className={classes.toolbar} />
          <MediaTweetContainer media={true} hockey={this.state.hockey} football={this.state.football} basketball={this.state.basketball}></MediaTweetContainer>
        </div>
      );
    } else {
      return (
        <div style={{margin: 8}}>
          {drawerAndHeader}
          <div className={classes.toolbar} />
          <TweetContainer media={false} hockey={this.state.hockey} football={this.state.football} basketball={this.state.basketball}></TweetContainer>
        </div>
      );
    }

  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
