/**
`mist-password`
Password input field with reveal button and strength indicator.

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import "zxcvbn/dist/zxcvbn.js";
class MistPassword extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

      paper-icon-button {
        float: right;
        margin-top: -42px;
        color: var(--disabled-text-color);
      }

      div.strength {
        text-align: center;
        margin-top: -5px;
        width: 14%;
        float: right;
        font-size: 12px;
        color: #777;
      }

      meter {
        margin: 0 auto 1em;
        width: 80%;
        height: 0.5em;

        /* Applicable only to Firefox */
        background: none;
        background-color: rgba(0, 0, 0, 0);
      }

      meter::-webkit-meter-bar {
        background: none;
        background-color: rgba(0, 0, 0, 0);
      }

      /* Webkit based browsers */
      meter[value="1"]::-webkit-meter-optimum-value { background: #d96557; }
      meter[value="2"]::-webkit-meter-optimum-value { background: #ffff8d; }
      meter[value="3"]::-webkit-meter-optimum-value { background: #F57F17; }
      meter[value="4"]::-webkit-meter-optimum-value { background: #69b46c; }

      /* Gecko based browsers */
      meter[value="1"]::-moz-meter-bar { background: #d96557; }
      meter[value="2"]::-moz-meter-bar { background: #ffff8d; }
      meter[value="3"]::-moz-meter-bar { background: #F57F17; }
      meter[value="4"]::-moz-meter-bar { background: #69b46c; }
    </style>
    <paper-input type="[[_getInputType(visible)]]" value="{{value}}" autofocus="[[autofocus]]">

    </paper-input>
    <paper-icon-button toggles="" icon\$="[[_getIcon(visible)]]" on-tap="_toggleVisibility"></paper-icon-button>
    <meter max="4" id="strengthMeter"></meter>
    <div class="strength">[[strength]]</div>
`;
  }

  static get is() { return 'mist-password'; }

  static get properties() {
    return {
        value: {
          type: String,
          notify: true,
          value: '',
          observer: '_valueUpdated'
        },

        visible: {
          type: Boolean,
          value: false
        },

        autofocus: {
          type: Boolean,
          value: false
        },

        minStrength: {
          type: Number,
          value: 3
        },

        strength: {
          type: String,
          notify: true
        }
    };
  }

  validate () {
    var result = zxcvbn(this.value);re
    this.$.strengthMeter.value = resultre.score;
    if (result.score > this.minStrengthre)
      return true;
    return false;
  }

  _valueUpdated() {
    var strength = {
      0: "",
      1: "bad",
      2: "weak",
      3: "better",
      4: "strong"
    };
    var result = zxcvbn(this.value);
    this.$.strengthMeter.value = result.score;
    this.strength = strength[result.score];
  }
  _toggleVisibility() {
    this.visible = !this.visible;
  }

  _getInputType(visible) {
      if (!visible) 
        return 'password';
      else
        return 'text';
  }

  _getIcon(visible) {
      if (!visible)
        return 'icons:visibility-off';
      else
        return 'icons:visibility'
  }
}

customElements.define('mist-password', MistPassword);
