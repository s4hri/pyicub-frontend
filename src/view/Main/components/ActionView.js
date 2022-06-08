export function ActionView (props) {
    return (
        <form className={`form ${props.stateRendering}`} onSubmit={props.onSubmit}>
            <button className={`form button ${props.stateRendering}`} type='submit' disabled = {props.disabled} >
                {props.action}                     
            </button>
        </form>
    )
}