import {API} from "../../common/API"
import Info  from "./Info/Info"

export default class Infos extends API {
	
	async componentDidMount() {
		await this.POSTsync(this.state.request)
		console.log("mounted", this.state.apiTarget)
  	}

	Infos = () => {
		const data = this.state.response
		console.log("data", data)
		var infos = []
		data.forEach((obj, indexs) => {
			const names = Object.keys(obj)
			const info = names.map((k, index) => {
				console.log(names[index], obj[k] )
				return (
					<div key={k}>
						<Info name={names[index]} value={obj[k]} /> 
					</div>
				)
			})
			infos[indexs] = info
		})
		return infos
	}

	ReturnView () {
		const view	 = this.Infos()
		return (
			view	
		)
	}
}
