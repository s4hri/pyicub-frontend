import { API	} 		   from "../../../common/API"
// view
import { AiOutlineStop 		 }	from 'react-icons/ai'
import { IconContext 		 }	from 'react-icons'
import { IoEnter			 }	from 'react-icons/io5'
import { Link 				 }	from "react-router-dom"

export default class SetIntros extends API {

	handleClick = () => {
		const request = {
				intros : this.props.intros
			}
		console.log("intros"	, this.props.intros)
		this.handleRequest(request)
	}

    async handleRequest(request) {
        await this.POSTGET(request)
    }

	render () {
		const button = this.props.enabled  ? <IoEnter/> : <AiOutlineStop/>
		const path 	 = this.props.enabled  ? "/main"	: "/"
		return (
			<IconContext.Provider value={{ className: "button" + this.state.apiTarget }}>
				<Link to={path} onClick={this.handleClick} disabled={this.props.enabled}>
					{button}
				</Link>
			</IconContext.Provider>
		)
  	}
}
