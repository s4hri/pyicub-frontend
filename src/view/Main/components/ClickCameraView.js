export function ClickCameraView (props) {
	return (
        <button 
            style={{
  	            /*border  : "3px solid red",*/
                opacity : 0.2,
                position: "absolute",
                top     : `${props.refY}px`,
                left    : `${props.refX}px`,
                width   : `${props.width}px`,
                height  : `${props.height}px`
            }} 
            type='submit' 
            disabled = {props.disabled} 
            onClick={props.onClick}
            className={`formCam click ${props.stateRendering}`}
        />
    )
}