import React, { Component } from 'react';

function withHandlers(WrappedComponent) {
  class WithHandlers extends Component {
    static randomizationKeys = WrappedComponent.randomizationKeys;

    changeRefProperty(name, value) {
      const { forwardedRef, onChange } = this.props;

      forwardedRef.current[name] = value;
      onChange(forwardedRef.current.toPlainObject());
    }

    handleChange = event => {
      this.changeRefProperty(event.target.name, event.target.value);
    }

    handleCheckedChange = event => {
      this.changeRefProperty(event.target.name, event.target.checked);
    }

    render() {
      return <WrappedComponent onInputChange={this.handleChange} onCheckedChange={this.handleCheckedChange} {...this.props}/>
    }
  }

  return React.forwardRef((props, ref) => <WithHandlers forwardedRef={ref} {...props} />);
}

export default withHandlers;