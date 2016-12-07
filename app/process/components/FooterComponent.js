var React = require('react');

const FooterComponent = React.createClass({
  handleCollapse: function() {
      
  },
  render() {
    var hamburger = {
        display: 'inline-block',
        width: 60,
        height: 60,
        zIndex: 1
    }
    return (  
    <footer>
        <div className="content container-fluid">
        <div className="row">
            <div className="col-sm-6">
                <p>Matt Catellier 2016</p>
            </div>
            <div className="col-sm-6">
                <nav className="navbar navbar-default" role="navigation">
                    <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Link 1</a></li>
                    <li><a href="#">Link 2</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        </div>
    </footer>
    );
  }
});

module.exports = FooterComponent;

