import React from 'react';
import uuidv4 from 'uuid/v4';
import ArticleItem from './ArticleItem';

class Article extends React.Component {
  render() {
    return (
      <div>
        {this.props.articles.map((article) => (
          <ArticleItem
            key={uuidv4()}
            article={article}
          />
        ))}
      </div>
    );
  }
}
export default Article;
