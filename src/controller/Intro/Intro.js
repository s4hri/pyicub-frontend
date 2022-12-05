import {API} 	 from "../common/API"
import Input	 from "./components/Input"
import SetIntros from "./components/SetIntro/SetIntros"

export default class Intro extends API {

	async componentDidMount() {
		const res = await this.POSTsync(this.state.request)
		const listNull = this.CreateListNull(res.intro)
		this.setState({ 
			intros : listNull,
			response: res
		})

		console.log("mounted", this.state.apiTarget)
  	}

	CreateListNull(data) {
		var list = {}
		data.forEach((obj => {
			Object.keys(obj).forEach(key => {
				list[key] = typeof data[key] === "boolean" ? false : null
			})
		}))
		return list
	}

	
	UpdateIntros = (inputName, value) => {
		
		var intros  = this.state.intros
		var check = true
		Object.keys(intros).forEach(intro => {
			// update value
			if (inputName === intro) {
				intros[intro] = value
			}
			// check if empty
			if ((!intros[intro]) && (typeof intros[intro] !== "boolean")) {
				check = false
			}
		})
		this.setState({ 
			intros 	: intros,
			enabled : check
		})
		console.log("intros", intros)
	}
	
	Inputs() {
		const data = this.state.response.intro
		console.log("data", typeof data, data)
		var inputs = []
		data.forEach((obj, indexs) => {
			const names = Object.keys(obj)
			const input = names.map((k, index) => {
				return (
					<div key={k}>
						<Input name={names[index]} data={obj[k]} callback={this.UpdateIntros}  /> 
					</div>
				)
			})
			inputs[indexs] = input
		})
		return inputs
	}

	ReturnView () {
		const view	 = this.Inputs()
		return (
			<>
				{view}
				<SetIntros robotName={this.state.robotName} appName={this.state.appName} apiTarget={"SetIntros"} enabled={this.state.enabled} intros={this.state.intros}/>
			</>
		)
	}
}
