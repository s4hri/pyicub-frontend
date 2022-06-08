import React, { Component } from "react";
import { InfoView } from "../../../../view/Main/components/InfoView";

export default class Info extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name  : props.name,
            value : props.value
        }
    }

    componentDidMount() {
        console.log("mounted", this.state.name, this.state.value)
    }

    componentDidUpdate() {
        console.log("updated", this.state.name, this.state.value)
    }

    render () {
      	return (
            <InfoView name={this.state.name} value={this.state.value}/>
      	)
    }
  }
