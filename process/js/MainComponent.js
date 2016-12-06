var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var LoginComponent = require('./LoginComponent');
var ListComponent = require('./ListComponent');

var MainComponent = React.createClass({
	getInitialState: function() {
		return {
			title: 'App Interface',
			authenticated: true,
			users: []
		} //return
	}, //getInitialState,
	toggleLogin: function() {
		this.setState({
			login: !this.state.login
		}); //setState
	}, //toggleLoginForm
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
			render: function() { return(
					<LoginComponent 
						handleLogin={this.handleLogin}
						toggleList={this.toggleList}
						handleLogin={ function() {
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
						}}
					/>	
			)} //render
		}) //createClass
	), // createFactory
	render: function() {
		return(
			<Router className='app-interface' history={browserHistory}>
				<Route path="/" component={this.loginWrapper}/>
				<Route path="/login" component={this.loginWrapper}/>
				<Route path="/list" component={this.listWrapper} />
				<Route path="/*" component={this.loginWrapper}/>
			</Router>			
		) //return
	} //render
}); //MainComponent

module.exports = MainComponent;