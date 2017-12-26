import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleList from './ArticleList';
import { connect } from 'react-redux';
import { updateActive } from '../../actions/';

class Home extends Component {
  state = {
    url: '',
    data: [],
    title: '',
    error: '',
  }

  /*
    check if there was previously persisted data after page refresh, if so:
      - check if url path contains a valid id
      - find item associated with id
        - if found: fetch articles using items url
  */
  componentDidMount() {
    if (this.props.feed_history.list) {
      // substring gets rid of leading '/'
      // item id's are generated using uuidv4 which are of length 36
      if (this.props.location.pathname.substring(1).length === 36) {
        let foundItem = this.props.feed_history.list.filter((item) => {
          return item.id === this.props.location.pathname.substring(1);
        });

        if (foundItem.length) {
          this.loadUrlContent(foundItem[0].url, foundItem[0].keyword);
        }
      } else {
        // opened as a new window, so path will be /,
        // so let's push the id of the last selected item to the url

        let foundItem = this.props.feed_history.list.filter((item) => {
          return item.id === this.props.feed_history.active;
        });

        if (foundItem.length) {
          this.loadUrlContent(foundItem[0].url, foundItem[0].keyword);
        }

      }
    }
  }

  /*
    check if location changed, if so:
      - check if url path contains a valid id
      - find item associated with id
        - if not found: means id doesn't have an associated item, so re-set state
        - if found: update active item, and fetch articles
  */
  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      let foundItem = nextProps.feed_history.list.filter((item) => {
        return item.id === nextProps.location.pathname.substring(1);
      });

      if (foundItem.length) {
        this.props.updateActive(nextProps.location.pathname.substring(1));
        this.loadUrlContent(foundItem[0].url, foundItem[0].keyword);
      } else {
        this.setState({ data: [], title: '', url: '', error: '' });
      }
    } else {
      this.setState({ data: [], title: '', url: '', error: '' });
    }
  }

  loadUrlContent(url, keyword) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data.articles.map((article) => {
            return article;
          }),
          url: url,
          title: keyword,
          loading: false,
          error: ''
        });
      })
      .catch(error => this.setState({ error: 'Failed to load this page' }));
  }

  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <div>
          {this.state.title && (this.state.data.length < 1) ? (
            <p>No matches found...</p>
          ) : (
            <ArticleList articles={this.state.data} />
          ) }
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  feed_history: PropTypes.shape({
    list: PropTypes.array.isRequired,
    active: PropTypes.string.isRequired
  }).isRequired,
  updateActive: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    feed_history: state.history
  };
}

export default connect(mapStateToProps, { updateActive })(Home);
