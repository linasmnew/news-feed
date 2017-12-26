import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToHistory, removeFromHistory, updateActive } from '../../actions/';
import History from './History';
import apiKey from './apiKey';

function formattedTodaysDate() {
  // Get todays date in the following format: yyyy-mm-dd
  return new Date().toISOString().substring(0, 10);
}

function generateApiUrl(query) {
  return 'https://newsapi.org/v2/everything?' +
            'q='+query+'&' +
            'from='+formattedTodaysDate()+'&' +
            'sortBy=popularity&' +
            'apiKey='+apiKey;
}

class SideBar extends React.Component {
  state = {
    keyword: '',
  }

  handleInput = (e) => {
    this.setState({ keyword: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.keyword.length > 0) {
      let item_id = this.props.addToHistory(this.state.keyword, generateApiUrl(this.state.keyword));
      this.props.history.push('/'+item_id);
    }
  }

  remove = (id) => () => {
    this.props.removeFromHistory(id);
    this.props.history.replace('/');
  }

  updateActive = (id) => () => {
    this.props.updateActive(id);
    this.props.history.push('/'+id);
  }

  render() {
    return (
      <div className={this.props.className}>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input className="form-control" type="text" placeholder="input keyword" value={this.state.keyword} onChange={this.handleInput} />
            <span className="input-group-btn">
              <button className="btn btn-secondary"><span role="img" aria-label="search icon">&#128270;</span></button>
            </span>
          </div>
        </form>

        <div className="formBottomDivider">
        </div>

        <History
          historyItems={this.props.feed_history}
          remove={this.remove}
          updateActive={this.updateActive}
          active={this.props.active}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feed_history: state.history.list,
    active: state.history.active
  };
}

export default connect(mapStateToProps, { addToHistory, removeFromHistory, updateActive })(withRouter(SideBar));
