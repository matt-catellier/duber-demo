var React = require('react');
var browserHistory = require('react-router').browserHistory;

var RegisterPage = React.createClass({	
	handleSubmit: function() {
		var formData = {
			email: this.refs.inputEmail.value,
			password: this.refs.inputPassword.value,
			valid: 0,
			invalid: 0
		}
		console.log(formData);
		// this.props.handleRegister(formData);
	},
	render: function() {
		var padding10 = {
			padding: 10
		}
		return(
			<div className="col-xs-12">
				<h2> Register </h2>	
				<div className="form-horizontal">
					<div className="form-group col-xs-12 col-sm-12">
						<div className="form-group">
							<label> Email </label>
							<input type="text" className="form-control" ref="inputEmail" placeholder="email@gmail.com" />
							 <span id="validEmail" className="valid-status"></span>
						</div>
						<div className="form-group">
							<label> Password </label>
							<input type="password" className="form-control" ref="inputPassword" placeholder="123456" />
							<span id="validPassword" className="valid-status"></span>
						</div>
                        <div className="form-group">
							<label> Password </label>
							<input type="password" className="form-control" ref="inputPasswordConfirm" placeholder="" />
							<span id="validConfirmPassword" className="valid-status"></span>
						</div>
						<div className="form-group">
							<div className="btn btn-primary" onClick={ this.handleSubmit }>  Register </div>
						</div>
						 <div className="error">
							<p className="errorMsg red"></p>
						</div>
					</div>
				</div>
				<p>
					Already have an account?
					<a onClick={(e) => browserHistory.push('/login') }> Login</a>
				</p>
            	<p>Or go <a onClick={(e) => browserHistory.push('/') }>home</a>.</p>
			</div>	

		)
	}
});

module.exports = RegisterPage;

