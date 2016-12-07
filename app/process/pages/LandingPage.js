var React = require('react');
var browserHistory = require('react-router').browserHistory;


var ListComponent = React.createClass({
    render: function() {
    var toggleDisplay = {
			display: this.props.visible ? 'block' : 'none'
		}
    return (
        <div className="jumbotron text-center col-xs-12 col-md-6 col-md-offset-3">
            <h2><span className="fa fa-lock"></span> Duber Challenge</h2>
            <p> Created using Exress and MongDB as back-end, and jQuery and Bootstrap for front-end </p>
            <p>Perform user login/registration described <a href="https://gist.github.com/ogryzek/bd10df6d8e238e64dcde9d219e02d42e">here.</a> </p>
            <a onClick={(e) => browserHistory.push('login') } className="btn btn-default"><span className="fa fa-user"></span> Local Login</a>
            <a onClick={(e) => browserHistory.push('register') } className="btn btn-default"><span className="fa fa-user"></span> Local Signup</a>
        </div>
      )
    }
  });
  
module.exports = ListComponent;

