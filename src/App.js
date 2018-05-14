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
  constructor(props) {
    super(props);
    this.state = {
      showMessage: true
    };
  }

  componentWillMount() {
    this.props.userInfo();
  }

showMessage = () => {
   this.setState({showMessage: false});
  };
  render() {
    const { userId } = this.props;
    console.log(this.props.message);
    console.log(this.props.error);
    if (!userId) {
     return (
        <div>
         {this.state.showMessage && this.props.message && (
          <div className="container">
        <div className="serverMsg">
         <div className="clsCrApp" onClick={this.showMessage}>X</div>
         <div className="successCtn">{this.props.message}</div>
        </div></div>)
        }

       {this.props.error && this.state.showMessage && (
        <div className="container">
        <div className="serverErrorMsg">
         <div className="clsCrApp" onClick={this.showMessage}>X</div>
         <div className="failureCtn">{this.props.error}</div>
        </div>
        </div>
        )
       }
        <div className="fullLoading bouncing-loader">
          <div />
          <div />
          <div />
        </div>
        </div>
      );
    } else if (userId === "guest") {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter>
            <Route path="/" component={HomePage} />
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
    message: state.user.data.message,
    error: state.user.data.error
  }),
  { userInfo }
)(App);
