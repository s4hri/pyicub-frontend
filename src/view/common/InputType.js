export function InputBoolean (props) {
    return (
        <label className="label_input toggle">
            <input
                type="checkbox"
                checked={props.value}
                onChange={props.onChange}
            />
            <span className="slider round"></span>
        </label>
    )
}

export function InputNumber (props) {
    return (
        <input
            className = "label_input number"
            type="number"
            value={props.value}
            onChange={props.onChange}
        />
    )
}

export function InputString (props) {
    return (
        <input
            className = "label_input string"
            value={props.value}
            onChange={props.onChange}
        />
    )
}

export function InputTextArea (props) {
    return (
        <textarea
            className = "label_input textArea"
            value={props.value}
            onChange={props.onChange}
        />
    )
}

export function InputSelect (props) {
    const data = props.data;
    const optionsList = Object.keys(data).map((k) => {
        return (
            <option key={k} value={data[k]}>{data[k]}</option>
        )
    })
    return (
        <select
            className="label_input select"
            value={props.value}
            onChange={props.onChange}
        >
            {optionsList}
        </select>
    )
}