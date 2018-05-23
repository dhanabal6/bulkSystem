import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import HomePage from "./containers/HomePage";
import MainBlock from "./containers/MainBlock";
import Header from "./components/Header/Header";
import MailForm from "./components/MailForm";
import WhatsAppForm from "./components/WhatsAppForm";
import SmsForm from './components/SmsForm';
import EditProfileForm from './components/EditProfileForm';

import { userInfo } from "./routines";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#0009bc",
    accent1Color: "#dc3545"
  }
});

class App extends Component {
  componentDidMount() {
    this.props.userInfo();
  }

  render() {
    const { userId } = this.props;
    if (!userId) {
     return (
        <div className="fullLoading bouncing-loader">
          <div />
          <div />
          <div />
        </div>
      );
    } else if (userId === "guest") {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter>
            <Route path="/" component={() => <HomePage errorMessage={this.props.errorMessage} message={this.props.message} />} />
          </BrowserRouter>
        </MuiThemeProvider>
      );
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Switch>
              <Route path="/sendemail" component={MailForm}/>
              <Route path="/sendwhatsapp" component={WhatsAppForm}/>
              <Route path="/sendsms" component={SmsForm}/>
              <Route path="/edit/:userId" component={EditProfileForm} />
             <Route path="/" component={MainBlock} />
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
export default connect(
  (state, props) => ({
    userId: state.user.data._id,
    errorMessage: state.user.errorMessage,
    message: state.user.message
  }),
  { userInfo }
)(App);
