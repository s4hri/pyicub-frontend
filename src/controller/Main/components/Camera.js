import { API	}  from "../../common/API"
import Iframe      from 'react-iframe'
import ClickCamera from "./Camera/ClickCamera"

export default class Camera extends API {

	async componentDidMount() {
		const res = await this.POSTsync(this.state.request)
		console.log("mounted", this.state.apiTarget)
		this.setState({
			portNum		 : res[0]	,
			widthCamera  : res[1]+4 ,
			heightCamera : res[2]+4
		})
		window.addEventListener('resize', this.Size)
  	}

	componentDidUpdate(){
		if (this.myRef.current.offsetLeft !== this.state.refX) {
			this.setState({
				refX	: this.myRef.current.offsetLeft,
				refY	: this.myRef.current.offsetTop
			})
		}
		console.log("update", this.state.apiTarget)
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.Size)
	}

	Size=()=>{
		this.setState({
			refX		 : this.myRef.current.offsetLeft,
			refY		 : this.myRef.current.offsetTop
		})
	}

  	SetBusy = (value) => {
		this.setState({ busy : value })
	}

	ReturnView () {
		const view = 
			<center>
				<div ref={this.myRef} className="refFrame" >
					<Iframe url={'http://localhost:'+this.state.portNum+'/?action=stream'} width={this.state.widthCamera} height={this.state.heightCamera}/>
				</div>
				<ClickCamera appName={this.state.appName} apiTarget={"ClickCamera"} busy={this.state.busy} callback={this.SetBusy} refX={this.state.refX} refY={this.state.refY} width={this.state.widthCamera} height={this.state.heightCamera}/>
			</center>
		return view
	}
}