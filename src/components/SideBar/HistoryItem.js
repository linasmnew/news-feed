import React from 'react';

class HistoryItem extends React.Component {
  remove = (e) => {
    // stopping event propagation prevents this history item from triggering updateActive
    // and unecessarily updating itself to active state
    e.stopPropagation();
    this.props.remove();
  }

  render() {
    return (
      <div className={this.props.active ? 'active HistoryItem card' : 'HistoryItem card'} onClick={this.props.updateActive}>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-8'>
              <p>{this.props.item.keyword}</p>
            </div>

            <div className='col-md-4'>
              <button type="button" className="close" aria-label="Close" onClick={this.remove}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HistoryItem;