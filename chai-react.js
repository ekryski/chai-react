(function (chaiReact) {
  // Module systems magic dance.
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = chaiReact;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(['react'], function (React) {
      return function (chai, utils) {
        return chaiReact(chai, utils, React);
      };
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(function (chai, utils) {
      return chaiReact(chai, utils, React);
    });
  }
}(function (chai, utils, React) {
  var inspect = utils.inspect,
      flag = utils.flag;

  window.chaiReact = React;

  var div = document.createElement('div'),
      sampleClass = React.createClass({
        render: function () {
          return React.DOM.div();
        }
      }),
      sampleComponent = React.renderComponent(sampleClass(), div);

  chai.Assertion.addMethod('state', function (name, value) {
    var component = flag(this, 'object'),
        state = component.state,
        actual = state[name];

    if (!flag(this, 'negate') || undefined === value) {
      this.assert(
        undefined !== actual,
        'expected #{this} to have state.' + name + ' #{exp}',
        'expected #{this} not to have state.' + name + ' #{exp}'
      );
    }

    if (undefined !== value) {
      this.assert(
        value === actual,
        'expected #{this} to have state.' + name + ' with the value #{exp}, but the value was #{act}',
        'expected #{this} not to have state.' + name + ' with the value #{act}'
      );
    }

    flag(this, 'object', actual);
  });
}));