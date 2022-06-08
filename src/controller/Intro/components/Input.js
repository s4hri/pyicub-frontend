import React, { Component } from "react"
import { GetInputType }     from "../../common/GetInputType"
import {InputView}          from "../../../view/Intro/components/InputView"

export default class Input extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            name  : props.name,
            value : "",
            data  : props.data
        }
    }


    componentDidMount() {
        console.log("mounted", this.state.name)
    }


    componentDidUpdate() {
        console.log("updated", this.state.name, this.state.value)
    }


    handleChange = (event) => {
        const target  = event.target
        const value   = target.value
        const checked = target.checked
        
        if (typeof this.state.data === "boolean") {
            this.setState({ value : checked}, () => {
                this.props.callback(this.state.name, this.state.value)
            })
        }
        else {
            this.setState({ value : value }, () => {
                this.props.callback(this.state.name, this.state.value)
            })
        }
        
    }

    handleSubmit = (event) => {
      event.preventDefault()
    }


    render () {
        const InputType = GetInputType(typeof this.state.data)
        const input = <InputType value={this.state.value} data={this.state.data} onChange={this.handleChange}/>
        return (
            <InputView name={this.state.name} onSubmit={this.handleSubmit} input={input}/>
        )
    }
}