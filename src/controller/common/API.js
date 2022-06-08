import React, { Component }	from "react"
import { GET, POST 		  }	from "../common/HTTPRequest"
import { APIView	 	  }	from "../../view/common/APIView"
import { delay 			  }	from "../common/HTTPRequest"
import { Loading 		  }	from "./Loading"

export class API extends Component {

	constructor(props) {
		super(props)
		this.myRef = React.createRef()
		this.state = {
			api		  : process.env.REACT_APP_API,
			appName   : props.appName			 ,
			apiTarget : props.apiTarget 		 ,
			request   : props.request			 ,
			response  : null		 			 ,
			status	  : null
		}
	}

	async componentDidMount() {
		console.log("mounted", this.state.apiTarget)
  	}

  	async componentDidUpdate() {
		console.log("updated", this.state.apiTarget)
  	}

	async POSTGET(request) {
		const resPOST = await POST(this.state.api, this.state.appName, this.state.apiTarget, request)
		var resGET = null
		do {
			resGET  = await GET(this.state.api, this.state.appName, this.state.apiTarget, resPOST)
			this.setState({
				response: resGET.retval,
				status	: resGET.status
			})
			await delay(500)
		} while (resGET.status === 'RUNNING')
	}

	async POSTsync (request) {

		const config = {
			method: 'POST',
			headers: { 'Contet-Type': 'application/json' },
			body: JSON.stringify(request)
		}
		const resPOST     = await fetch(`/${this.state.api}/${this.state.appName}/${this.state.apiTarget}?sync`, config);
		const resPOSTJSON = await resPOST.json()

		console.log(`POSTsync ${this.state.apiTarget}`, resPOSTJSON)

		this.setState({
			response : resPOSTJSON
		})
		return resPOSTJSON
	}



	ReturnView () {
		return null
	}


  	render () {
		const view = this.state.response ? this.ReturnView(): <Loading/>
  	  	return (
			<APIView appName={this.state.appName} apiTarget={this.state.apiTarget} view={view}/>
		)
  	}
}
