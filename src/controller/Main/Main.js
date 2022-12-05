import Actions from './components/Actions'
import Camera  from './components/Camera'
import Chat    from './components/Chat'
import Infos   from './components/Infos'

// call the component you need
//import Logs         from '../components/Main/Logs';

//import {IconContext } from 'react-icons'
//import {FaFileCsv} from 'react-icons/fa'
//import {BsBootstrapReboot} from 'react-icons/bs'


//import { exportToCsvFile } from "../components/Main/utils";


export function Main(props) {
	
	return (
		<div className={"container main"}>
			<div className={"item1"}></div>
			<div className={"item2"}><Camera  robotName={props.robotName} appName={props.appName} apiTarget={"Camera"    } request={{}}/></div>
			<div className={"item3"}><Infos   robotName={props.robotName} appName={props.appName} apiTarget={"GetIntros" } request={{}}/></div>
			<div className={"item4"}><Actions robotName={props.robotName} appName={props.appName} apiTarget={"Actions"   } request={{}}/></div>
			<div className={"item5"}><Chat	  robotName={props.robotName} appName={props.appName} apiTarget={"ChatBox"   } request={{}}/></div>
			<div className={"item6"}></div>
		</div>
  	)
}