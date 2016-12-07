var React = require('react');
var browserHistory = require('react-router').browserHistory;

const NavbarComponent = React.createClass({
  render() {
    var hamburger = {
        // make background url src="/img/hamburger.gif"
        display: 'inline-block',
        width: 60,
        height: 60,
        zIndex: 1
    }
    var hamburger2 = {
        display: this.props.showUserName ? 'block' : 'none',
        color:'#777',
        marginTop: 5
    }
    var displayUsername = {
        display: this.props.showUserName ? 'block' : 'none'
    }
    return (
       <nav role="navigation" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
                <div className="pull-left">
                    <button type="button" data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div className="pull-right">
                    <ul className="nav pull-right">
                        <li className="navbar-text pull-left" style={displayUsername}>User Name</li>
                        <li className="dropdown pull-right">
                            <a href="#" data-toggle="dropdown" style={hamburger2} className="dropdown-toggle"><span className="glyphicon glyphicon-user"></span><b className="caret"></b></a>
                            <ul className="dropdown-menu">
                                <li>
                                <a href="/users/id" title="Profile">Profile</a>
                                </li>
                                <li>
                                <a href="/logout" title="Logout"> Logout </a>
                                </li>
                            </ul>
                        </li>
                    </ul>     
                </div>
            </div>
            <div className="collapse navbar-collapse navbar-left">
                <ul className="nav navbar-nav pull-left">
                    <li><a onClick={(e) => browserHistory.push('/') }>Home</a>
                    </li>
                    <li><a onClick={(e) => browserHistory.push('login') }>Login</a>
                    </li>
                    <li><a onClick={(e) => browserHistory.push('register') }> Register </a>
                    </li>
                </ul>
            </div>
        </div>
        </nav>     
    ); //render
  } //NavbarComponent
});

module.exports = NavbarComponent;