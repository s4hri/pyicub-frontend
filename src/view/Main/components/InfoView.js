export function InfoView (props) {
    return (
        <form className="form_info" >
              <label className = "label_info name" >
                    {props.name}
              </label>
              <label className = "label_info value" >
                    {props.value}
              </label>          
        </form>
    )
}