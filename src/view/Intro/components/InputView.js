export function InputView (props) {
    return (
        <form className="form_input" onSubmit={props.onSubmit}>
            <label className = "label_input id" >
                {props.name}
            </label>
            {props.input}
        </form>
    )
}