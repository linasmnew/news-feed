import React from 'react';
import { Link } from 'react-router-dom';

class ArticleItem extends React.Component {
  /*
   Changing date from newsapi returned format to our own...
   received format: 2017-12-11T14:00:00Z
   updated format: 11/12/2017
  */
  handleDateFormat(d) {
    let year = d.substring(0, 4);
    let month = d.substring(5, 7);
    let day = d.substring(8, 10);
    return  day + '/' + month + '/' + year;
  }

  render() {
    return (
      <div className="card">
        <div className="card-body article_body">
          <div className='row'>
            <Link to={this.props.article.url} target="_blank" className="card-title article-title">{this.props.article.title+ ' - ' + this.handleDateFormat(this.props.article.publishedAt)}</Link>
            <p className="card-text">{this.props.article.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleItem;
