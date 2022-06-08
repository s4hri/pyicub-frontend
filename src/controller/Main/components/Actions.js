import { API   } from "../../common/API"
import  Action   from "./Action/Action"

export default class Actions extends API {

    async componentDidMount() {
		await this.POSTsync(this.state.request)
		console.log("mounted", this.state.apiTarget)
  	}
	
	
	SetBusy = (value) => {
		this.setState({ busy : value })
	}


	Actions() {
		const actions = this.state.response
		const names = Object.keys(actions)
		const list = names.map((k, index) => {
			const request = {
				action : actions[index]
			}
			return (
				<div key={k}>
					<Action appName={this.state.appName} apiTarget={"ExecuteAction"} request={request} busy={this.state.busy} callback={this.SetBusy}/> 
				</div>
			)
		})
		return list
	}
	
    ReturnView () {
		const actions = this.Actions()
		return actions
    }
}