var React = require('react');

var LoginForm = React.createClass({	
	handleSubmit: function() {
		var formData = {
			email: this.refs.inputEmail.value,
			password: this.refs.inputPassword.value,
			valid: 0,
			invalid: 0
		}
		// console.log(formData);
		this.props.handleLogin(formData);
	},
	render: function() {
		var padding10 = {
			padding: 10
		}
		var toggleDisplay = {
			display: this.props.visible ? 'block' : 'none'
		}
		return(
			<div style={this.toggleDisplay} className="col-xs-12">
				<h2> Login </h2>	
				<div className="form-horizontal">
					<div className="form-group col-xs-12 col-sm-12">
						<div className="form-group">
							<input type="text" className="form-control" ref="inputEmail" placeholder="email@gmail.com" />
						</div>
						<div className="form-group">
							<input type="password" className="form-control" ref="inputPassword" placeholder="123456" />
						</div>
						<div className="form-group">
							<div className="btn btn-primary" onClick={ this.handleSubmit }> Log in </div>
							<a href="#" style={padding10} onClick={this.props.toggleList}> Show login attempts? </a>
						</div>
					</div>
				</div>
			</div>		
		)
	}
});

module.exports = LoginForm;

