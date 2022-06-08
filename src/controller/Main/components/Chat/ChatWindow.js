import React, { Component } from "react";

export default class ChatWindow extends Component {

	componentDidUpdate = (prevProps, prevState) => {

		if (this.props.messagesList !== prevProps.messagesList) {
			this.messageListEnd.scrollIntoView({ alignToTop: false})
  	  	}
  	}

  	render() {
  	  	const { messagesList } = this.props;
		console.log("height chat", this.props.height)
  	  	return (
  	  	  	<div className={`chat window ${this.props.stateRendering}`} style={{height: `${this.props.height}px`}}>
  	  	  	  	<div className="chat box">
  	  	  	  	  	{Array.isArray(messagesList) && messagesList.map((oneMessage, index) => (
  	  	  	  	  	    <p key={index} className="chat inner message">
  	  	  	  	  	      	{oneMessage.text}
  	  	  	  	  	    </p>
  	  	  	  	  	))}
  	  	  	  	  	<div
  	  	  	  	  	  	className="chat reference"
  	  	  	  	  	  	ref={node => (this.messageListEnd = node)}
  	  	  	  	  	/>
  	  	  	  	</div>
  	  	  	</div>
  	  	)
  	}
}
