import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Tabs,
  Tab,
  Toolbar,
  ListItem,
  Avatar,
  MenuItem,
  IconMenu,
  IconButton
} from "material-ui";
import { connect } from "react-redux";
import Menu from "material-ui/svg-icons/navigation/menu";
import Settings from "material-ui/svg-icons/action/settings";
import EditProfile from "material-ui/svg-icons/social/person-outline";
import GetHelp from "material-ui/svg-icons/action/help-outline";
import SignOut from "material-ui/svg-icons/content/reply";

import { userInfo, logout } from "../../routines";

class Header extends Component {
  componentDidMount() {
    this.props.userInfo();
  }
  logout = () => {
    this.props.logout();
  };

  render() {
    const { userData } = this.props;
    return (
      <Toolbar className="toolbar">
        <header>
          <div className="nav-left">
            <div className="avatar">
              <Avatar />
            </div>
            <p className="logo-name">
              <Link className="logo-link" to="/">
                BULK SYSTEM
              </Link>
            </p>
          </div>
          <div className="nav-right">
            <MenuItem primaryText={userData.name} 
            style={{color: '#fff', textTransform: 'capitalize', fontWeight:'bold'}}/>
            <IconMenu
              iconButtonElement={
                <IconButton className="user-icon"
                  style={{ color: '#fff'}}
                >
                  <Settings color={"#fff"} />
                </IconButton>
              }
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              targetOrigin={{ horizontal: "right", vertical: "top" }}

            >
              <MenuItem 
              primaryText="Edit Profile" leftIcon={<EditProfile color = {'#fff'}/>}
              style={{color: '#fff', fontSize:'14px',backgroundColor: '#0009bc',fontWeight: 'bold',
              borderBottom: '1px solid rgba(204, 204, 204, 0.56)'}} 
              />
              <MenuItem leftIcon={<Settings color = {'#fff'}/>} primaryText="Account Settings" 
               style={{color: '#fff',fontSize:'14px',backgroundColor: '#0009bc',fontWeight: 'bold',borderBottom: '1px solid rgba(204, 204, 204, 0.56)'}} 
              />
              <MenuItem leftIcon={<GetHelp color = {'#fff'}/>} primaryText="Get Help" 
               style={{color: '#fff', fontSize:'14px',backgroundColor: '#0009bc',fontWeight: 'bold',borderBottom: '1px solid rgba(204, 204, 204, 0.56)'}} 
              />
              <MenuItem onClick={this.logout} primaryText="Sign Out" leftIcon={<SignOut color = {'#fff'}/>}
              style={{color: '#fff', fontSize:'14px',backgroundColor: '#0009bc',fontWeight: 'bold',borderBottom: '1px solid rgba(204, 204, 204, 0.56)'}} 
              />
            </IconMenu>
          </div>
        </header>
      </Toolbar>
    );
  }
}

export default connect(
  (state, props) => ({
    userData: state.user.data
  }),
  { userInfo, logout }
)(Header);
