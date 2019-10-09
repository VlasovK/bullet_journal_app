import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';

class Header extends React.Component {
  buttons = [
    {text: 'projects', path: '/projects'},
    {text: 'logs', path: '/logs'},
    {text: 'notes', path: '/notes'},
    {text: 'lifestyle', path: '/lifestyle'}
  ];
  componentDidMount() {
    this.timerId = setInterval(()=> this.props.setCurrentTime(moment()), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  render() {
    let {pathname: path} = this.props.location;
    let currentTime = moment(this.props.commonState.currentTime)
      .format('MMMM Do YYYY dddd, h:mm:ss a');
    return (
      <div className="header animated fadeInDown">
        <h3 className="app-name"><b>J</b>b</h3>
        {this.buttons.map((button, index)=>(
          <Link key={index} to={button.path}
            className={`btn btn-outline-${
              path == button.path ? 'white' : 'grey'} Ripple-parent`}>
            {button.text}
          </Link>))}
        <h5 className="the-time">{currentTime}</h5>
      </div>
    );
  }
}
export default withRouter(Header);