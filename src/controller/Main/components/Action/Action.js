import { ActionView } from "../../../../view/Main/components/ActionView";
import { API        } from "../../../common/API";

export default class Action extends API {


    async componentDidMount() {
        console.log("mounted", this.state.apiTarget, this.state.request.action)
    }

    async componentDidUpdate() {
        console.log("updated", this.state.apiTarget, this.state.request.action)
    }

    async handleRequest(request) {
		this.props.callback(true)
        await this.POSTGET(request)
        this.props.callback(false)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.handleRequest(this.state.request)
    }


    render() {
        const stateRendering = this.state.status === 'RUNNING' ? 'run' : (this.props.busy ? 'disabled' : (this.state.status === 'DONE' ? 'done' :'ready'))
        const disabled = ((this.state.status === 'RUNNING') || (this.props.busy))
        return (
            <ActionView action={this.state.request.action} apiTarget={this.state.apiTarget} stateRendering={stateRendering} disabled={disabled} onSubmit={this.handleSubmit}/>       
        )
    }
}
