import { API	} 		   from "../../../common/API"
import { ClickCameraView } from "../../../../view/Main/components/ClickCameraView"

export default class ClickCamera extends API {

	componentDidMount() {
		console.log("mounted", this.state.apiTarget)
  	}
	
	handleSubmit = (event) => {
        event.preventDefault()
		console.log(event.clientX, event.clientY)
        this.handleClick(event.clientX, event.clientY)
    }

	handleClick(x,y) {
		const refX = this.props.refX
		const refY = this.props.refY
		const request = {
				pixelX : x - refX,
				pixelY : y - refY
			}
		console.log("request", request)
		this.handleRequest(request)
	}

    async handleRequest(request) {
		this.props.callback(true)

		await this.POSTsync(request)
        //await this.POSTGET(request)
        this.props.callback(false)
    }


	render () {
		const stateRendering = this.state.status === 'RUNNING' ? 'run' : (this.props.busy ? 'disabled' : (this.state.status === 'DONE' ? 'done' :'ready'))
        const disabled = ((this.state.status === 'RUNNING') || (this.props.busy))
        const clickCameraView = 	<ClickCameraView 
										apiTarget={this.state.apiTarget} 
										stateRendering={stateRendering} 
										disabled={disabled} 
										refX={this.props.refX} 
										refY={this.props.refY} 
										width={this.props.width} 
										height={this.props.height} 
										onClick={this.handleSubmit}
									/>
		const view = this.props.refX ? clickCameraView : <div className="loading"></div>
		return (
			view
		)
  	}
}
