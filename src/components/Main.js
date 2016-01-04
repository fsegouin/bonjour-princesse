require('normalize.css');
require('styles/App.scss');

import React from 'react';
import cx from 'classnames';

// Data
import quotesList from '../data/quotes.json';

let castleImage = require('../images/castle.jpg');

export default class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      showPage: true
    };
  }

  map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

  checkPassword(event) {
    // Overkill since I only hide in CSS, and I like it.
    var crypto = require('crypto');
    var hash = crypto.createHash('sha256').update(event.target.value).digest('base64');
    console.log(hash);
    if (hash === 'UF6geY+vsYzJQH8TZTt2i+ve660ppmcEdbczPY85jqY=') {
      this.setState({showPage: false});
    }
  }

  render() {
    const day = new Date().getDate();
    const quoteToPick = Math.floor(this.map_range(day, 1, 31, 0, quotesList.quotes.length));

    const startClass = cx(
      ['start'],
      { 'hide': this.state.showPage }
    );

    const passwordClass = cx(
      ['password animated pulse'],
      { 'hide': !this.state.showPage }
    );

    return (
      <section>
        <div className={passwordClass}>
          <h1>What's the magic word?</h1>
          <input type="password" name="psw" onChange={this.checkPassword.bind(this)}/>
        </div>
        <div className={startClass}>
          <div className="title">
            <img src={castleImage} />
            <h1>Bonjour Princesse,</h1>
          </div>
          <div className="quote">
            <div className="quote__text">
              {quotesList.quotes[quoteToPick].text}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};
