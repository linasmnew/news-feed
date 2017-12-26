import React from 'react';
import HistoryItem from './HistoryItem';

class History extends React.Component {
  render() {
    return (
      <div>
        {this.props.historyItems.map((item) => (
          <HistoryItem
            key={item.id}
            item={item}
            active={this.props.active === item.id ? true : false}
            remove={this.props.remove(item.id)}
            updateActive={this.props.updateActive(item.id)}
          />
        ))}
      </div>
    );
  }
}

export default History;
