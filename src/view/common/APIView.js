export function APIView (props) {
  	return (
		<div className={"container " + props.apiTarget}>
	  		<div className="header">{props.appName} - {props.apiTarget} </div>
	  		{props.view}
		</div>
  	)
}