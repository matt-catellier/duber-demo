var React = require('react');

var ListComponent = React.createClass({
    render: function() {
    var toggleDisplay = {
			display: this.props.visible ? 'block' : 'none'
		}
    return (
        <ul style={toggleDisplay} className="col-xs-12 list-group attempts-list">
          {this.props.list.map(function(user, index){
            return <li key={index} className="list-group-item">{ user.email } { user.password }  <br />
                  Attempts <div className="circle green">{user.valid}</div> <div className="circle red">{user.invalid}</div>
                </li>;
          })}
        </ul>
      )
    }
  });
  
module.exports = ListComponent;

