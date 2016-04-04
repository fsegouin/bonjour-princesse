require('normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

// Data
import quotesList from '../data/quotes.json';

const castleImage = require('../images/castle.png');
const castleShadowImage = require('../images/castle-shadow.png');
const castleGrassImage = require('../images/castle-grass.png');
const cloudsFgImage = require('../images/clouds-fg.png');
const cloudsBgImage = require('../images/clouds-bg.png');

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
    var passwordInput = ReactDOM.findDOMNode(this.refs.passwordInput);
    var crypto = require('crypto');
    var hash = crypto.createHash('sha256').update(event.target.value).digest('base64');

    if (hash === 'UF6geY+vsYzJQH8TZTt2i+ve660ppmcEdbczPY85jqY=') {
      this.setState({showPage: false});
      passwordInput.blur();
    }
  }

  render() {
    const day = new Date().getDate();
    const quoteToPick = Math.floor(this.map_range(day, 1, 31, 0, quotesList.quotes.length-1));

    const startClass = cx(
      ['start'],
      { 'hide': this.state.showPage }
    );

    const passwordClass = cx(
      ['password'],
      { 'hide': !this.state.showPage }
    );

    const quoteClass = cx(
      ['quote__text'],
      { 'smaller': quotesList.quotes[quoteToPick].text.length > 150 }
    );

    return (
      <section>
        <div className={passwordClass}>
          <h1>What's the magic word?</h1>
          <input type="password" name="psw" autoFocus onChange={this.checkPassword.bind(this)}
            ref="passwordInput"/>
        </div>
        <div className={startClass}>
          <div className="castle">
            <img className="clouds-bg-img" src={cloudsBgImage} />
            <img className="castle-grass-img" src={castleGrassImage} />
            <img className="castle-img" src={castleImage} />
            <img className="castle-shadow-img" src={castleShadowImage} />
            <img className="clouds-fg-img" src={cloudsFgImage} />
          </div>
          <div className="title">
            <h1>Bonjour Princesse,</h1>
          </div>
          <div className="quote">
            <div className={quoteClass}>
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
