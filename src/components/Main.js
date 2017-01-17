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
const princessImage = require('../images/princess-white.png');
const princeImage = require('../images/char_prince.png');
const cavImage = require('../images/char_cav.png');
const pipitoImage = require('../images/char_pipito.png');

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
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const duration = Math.ceil((date.getTime() - new Date(2015, 9, 6).getTime()) / (1000*60*60*24));
    const quoteToPick = Math.floor(this.map_range(day, 1, 31, 0, quotesList.quotes.length-1));
    const isSpecialDay = ((day === 18 && month === 0) || day === 6 ? true : false);

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

    const titleClass = cx(
      ['title'],
      { 'smaller': quotesList.quotes[quoteToPick].text.length > 150 }
    );

    const specialDay = cx(
        ['special'],
        {'special--anniversary': day === 6},
        {'special--birthday': day === 18 && month === 0},
        { 'hide': !isSpecialDay }
    );

      return (
          <section>
            <div className={specialDay}>
              <div className="ribbon">{day % 18 ? 'Anniversary' : 'Princess\' Birthday' }</div>
            </div>
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
                <img className="clouds-fg-img hidden" src={cloudsFgImage} />
                <img className="character-princess" src={princessImage} />
                <div className="character-princess--shadow"></div>
                <img className="character-prince" src={princeImage} />
                <div className="character-prince--shadow"></div>
                <img className="character-cav" src={cavImage} />
                <div className="character-cav--shadow"></div>
                <img className="character-pipito" src={pipitoImage} />
                <div className="character-pipito--shadow"></div>
              </div>
              <div className={titleClass}>
                <h1>Bonjour Princesse,</h1>
              </div>
              <div className="quote">
                <div className={quoteClass}>
                  {!isSpecialDay ? quotesList.quotes[quoteToPick].text
                   : (day % 18) ? quotesList.specials[1].text.replace(/\?/i, duration)
                  : quotesList.specials[0].text}
                </div>
              </div>
            </div>
          </section>
    );
  }
}

AppComponent.defaultProps = {
};
