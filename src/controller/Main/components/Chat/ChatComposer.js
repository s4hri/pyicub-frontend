import React, { Component } from "react";

export default class ChatComposer extends Component {
  	constructor(props) {
  	  	super(props);
  	  	this.state = {
  	  	  	new: ""
  	  	}
  	}

  	handleSubmit = (event) => {
  	  	event.preventDefault();
  	  	this.props.submitted(this.state.new);
  	  	this.setState({new: ""});
  	};

  	handleChange = (event) => {
  	  	this.setState({new: event.target.value});
  	};

  	render() {
  	  	return (
  	  	  <div className="chat composer">
  	  	    <form onSubmit={this.handleSubmit}>
  	  	      	<input
  	  	      	  	className="form-control"
  	  	      	  	placeholder="Type  hit enter"
  	  	      	  	onChange={this.handleChange}
  	  	      	  	value={this.state.new}
					disabled={this.props.disabled}
  	  	      	/>
  	  	    </form>
  	  	  </div>
  	  	);
  	}
}
