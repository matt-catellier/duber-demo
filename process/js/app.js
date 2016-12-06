var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var NavbarComponent = require('./NavBarComponent');
var MainComponent = require('./MainComponent');
var FooterComponent = require('./FooterComponent');

ReactDOM.render(
  <NavbarComponent 
    showUserName={false} />,
    document.getElementById('navComponent')
); 
ReactDOM.render(
  <MainComponent className="clearfix" />,
  document.getElementById('mainComponent')
); //render
ReactDOM.render(
  <FooterComponent />,
  document.getElementById('footerComponent')
); 