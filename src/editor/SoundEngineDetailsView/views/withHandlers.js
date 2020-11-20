import React, { Component } from 'react';

function withHandlers(WrappedComponent) {
  return class extends Component {
    static randomizationKeys = WrappedComponent.randomizationKeys;

    handleChange = event => {
      this.props.onChange(event.target.name, event.target.value, event.target.id);
    }

    handleCheckedChange = event => {
      this.props.onChange(event.target.name, event.target.checked, event.target.id);
    }

    render() {
      return <WrappedComponent onInputChange={this.handleChange} onCheckedChange={this.handleCheckedChange} {...this.props}/>
    }
  }
}

export default withHandlers;