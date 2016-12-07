var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var LandingPage = require('../pages/LandingPage');
var LoginPage = require('../pages/LoginPage');
var RegisterPage = require('../pages/RegisterPage');
var ListComponent = require('../pages/ListPage');

var MainComponent = React.createClass({
	getInitialState: function() {
		return {
			title: 'App Interface',
			authenticated: true,
			users: []
		} //return
	}, //getInitialState,
	handleLogin: function(formData) { // couldn't call within React.createFactory
		var tempUsers = this.state.users;
		if(tempUsers.length > 0) {
			tempUsers.forEach(function(user) {
				if (formData.email === user.email && formData.password === user.password) {
					user.valid += 1;	
				} else if (formData.email === user.email && formData.password !== user.password) {
					user.invalid += 1;		
				} else {
					tempUsers.push(formData);
				}	
				this.setState({
					users: tempUsers
				});	//setState
			}, this);		
		} else {
			tempUsers.push(formData);
			this.setState({
				users: tempUsers
			});	//setState
		}	
	}, // handleLogin
	toggleList: function() {
		this.setState({
			list: !this.state.list
		});
	}, // toggleList	
	loginWrapper: React.createFactory(
		React.createClass({
			render: function() { 
				var _this = this;
				return(
					<LoginPage 
						toggleList={this.toggleList}
					/>	
			)} //render
		}) //createClass
	), // loginWrapper
	render: function() {
		return(
			<Router className='app-interface' history={browserHistory}>
				<Route path="/" component={LandingPage}/>
				<Route path="/login" component={LoginPage}/>
				<Route path="/register" component={RegisterPage}/>
				<Route path="/list" component={this.listWrapper} />
				<Route path="/*" component={LandingPage}/>
			</Router>			
		) //return
	} //render
}); //MainComponent

module.exports = MainComponent;