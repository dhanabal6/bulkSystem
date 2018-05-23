import React, { Component } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import LogIn from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';

import iphone from '../upload/iphone.png';
import flaticon1 from '../upload/pin.png';
import flaticon2 from '../upload/settings.png';
import flaticon3 from '../upload/easy.png';
import flaticon4 from '../upload/saturn.png';

import discovericon from '../upload/discover.png';
import icon1 from '../upload/ico1.png';
import icon2 from '../upload/ico2.png';
import icon3 from '../upload/ico3.png';
import icon4 from '../upload/ico4.png';
import icon5 from '../upload/ico5.png';
import screenIcon from '../upload/screen.png';

class HomePage extends Component {
  constructor(props) {
    super(props);
    const location = this.props.location.pathname;
    const currentUrl = location.split("/");
    const res = currentUrl[1];
    this.state = {
      isPopupOpen: false,
      index: -1,
      showMessage: true
    };
  }

  handleOpen = () => {
    this.setState({ isPopupOpen: true });
  };

  handleClose = () => {
    this.props.history.push("/");
  };

showMessage = () => {
   this.setState({showMessage: false});
  };

  render() {
    return (
      <div className="homePage">
    <div className="main">
     {this.state.showMessage && this.props.message && (
        <div className="container">
        <div className="msgalert">
         <span className="closebtn" onClick={this.showMessage}>X</span>
         <div className="successCtn">{this.props.message}</div>
        </div></div>)
        }

       {this.props.errorMessage && this.state.showMessage && (
        <div className="container">
        <div className="alert">
         <span className="closebtn" onClick={this.showMessage}>X</span>
         <div className="failureCtn">{this.props.errorMessage}</div>
        </div>
        </div>
        )
       }
        <header className="headerTemp">
            <div className="wrap">
                <img src={iphone} height="532" width="252" alt="" className="header-img" />
                <div className="header-wrapper">
                    <h1>Walk &amp; Ride <span>Template</span></h1>
                    <p>With a smartphone and the right app, you can find any spot on Earth. But the best navigation apps do a lot more. Look out for that speed trap.</p>
                    <p className="autor"><a href="#">Dan Rowinski</a></p>
                    <div className="buttons-wrapper">
                       <Link to="/login" className="button" onClick={this.handleOpen}>
                          Login
                        </Link>
                        <Link to="/register"  className="button button-stripe" onClick={this.handleOpen}>
                        Register
                        </Link>
                        <Link to="/forgotPassword" onClick={this.handleOpen}>forgotPassword</Link>
                    </div>
                </div>
            </div>
          <Route
          path="/login"
          render={() => (
            <LogIn
              handleClose={this.handleClose}
              onSubmit={this.loginFormSubmit}
            />
          )}
        />
         <Route
          path="/register"
          render={() => (
            <Register
              handleClose={this.handleClose}
              onSubmit={this.registerFormSubmit}
            />
          )}
        />
        <Route
          path="/forgotPassword"
          render={() => (
            <ForgotPassword
              handleClose={this.handleClose}
              onSubmit={this.forgotPasswordFormSubmit}
            />
          )}
        />
        <Route
          path="/resetPassword/:token"
          render={() => <ResetPassword 
            handleClose={this.handleClose}
            resetFormSubmit={this.resetPasswordFormSubmit} />}
        />
        </header>
        <div className="spanning">
            <div className="promo clearfix">
                <div className="wrap">
                    <div className="promo-wrapper clearfix">
                        <div className="promo-column">
                            <img src={flaticon1} height="32" width="24" alt="" />
                            <h5>Places</h5>
                            <p>Seamlessly empower fully researched growth strategies and interoperable internal sources.</p>
                        </div>
                        <div className="promo-column">
                            <img src={flaticon2} height="32" width="33" alt="" />
                            <h5>Settings</h5>
                            <p>Collaboratively administrate turnkey channels whereas virtual e-tailers an other media. </p>
                        </div>
                        <div className="promo-column">
                            <img src={flaticon3} height="32" width="34" alt="" />
                            <h5>Easy</h5>
                            <p>Interactively procrastinate high-payoff content without backward-compatible data. </p>
                        </div>
                        <div className="promo-column">
                            <img src={flaticon4} height="32" width="32" alt="" />
                            <h5>Global</h5>
                            <p>Credibly innovate granular internal or "organic" sources whereas high standards in web-readiness. </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="discover clearfix">
                <div className="wrap">
                    <div className="discover-content clearfix">
                        <h2>Discover</h2>
                        <p>Human rights momentum. World problem solving turmoil, change movements environmental pursue these aspirations initiative donation. Policy dialogue, underprivileged accessibility, asylum visionary, prevention beneficiaries carbon emissions reductions empower.</p>
                        <div className="discover-button clearfix">
                            <a href="#" className="button button-download">
                                <span className="button-download-title">Download for</span>
                                <span className="button-download-subtitle">Apple iOS</span>
                            </a>
                            <a href="#" className="button button-download android">
                                <span className="button-download-title">Download for</span>
                                <span className="button-download-subtitle">Android</span>
                            </a>
                        </div>
                    </div>
                    <div className="discover-img">
                        <div className="discover-img-inside"><img src={discovericon} height="486" width="634" alt="" /></div>
                    </div>
                </div>
            </div>
            <div className="video clearfix">
                <div className="wrap">
                    <div className="video-title">Explore. Walk &amp; Ride in action</div>
                    <div className="video-subtitle">Just try it for yourself</div>
                    <div className="video-block">
                       <iframe src="//player.vimeo.com/video/106575373?portrait=0" width="814" height="458" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                    <div className="video-share-wrapper clearfix">
                        <ul className="social-list clearfix">
                            <li className="video-share-title">Share it with your friends:</li>
                            <li><a href="#" className="social-twitter">via <strong>Twitter</strong></a></li>
                            <li><a href="#" className="social-facebook">via <strong>Facebook</strong></a></li>
                            <li><a href="#" className="social-google">via <strong>Google+</strong></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="simple clearfix">
                <div className="wrap">
                    <div className="simple-content">
                        <h3>The Simplest UI</h3>
                        <ul>
                            <li className="clearfix"><img src={icon1} height="32" width="32" alt="" /><span>Fastest navigation</span></li>
                            <li className="clearfix"><img src={icon2} height="32" width="32" alt="" /><span>Huge number of cities</span></li>
                            <li className="clearfix"><img src={icon3} height="32" width="32" alt="" /><span>Only the best routes</span></li>
                            <li className="clearfix"><img src={icon4} height="32" width="32" alt="" /><span>Beautiful locations</span></li>
                            <li className="clearfix"><img src={icon5} height="32" width="32" alt="" /><span>Cloud sync</span></li>
                        </ul>
                    </div>
                    <div className="simple-img">
                        <img src={screenIcon} height="508" width="587" alt="" />
                    </div>
                </div>
            </div>
            <div className="newsletter clearfix">
                <div className="wrap">
                    <div className="newsletter-title">our newsletter</div>
                    <div className="newsletter-form clearfix">
                        <form action="">
                            <input type="email" placeholder="john@doe.com" className="input-text" />
                            <input type="button" className="button" value="Subscribe" />
                        </form>
                    </div>
                    <p>If you want to recieve monthly updates from us just pop your email in the box. We think that spam is for jerks. And we are no jerks.</p>
                </div>
            </div>
        </div>
    </div>
    <footer>
        <div className="wrap">
            <p>&copy; 2014 <strong>Walk &amp; Ride</strong>, All Rights Reserved</p>
        </div>
    </footer>

      </div>
    );
  }
}

export default withRouter(HomePage);
