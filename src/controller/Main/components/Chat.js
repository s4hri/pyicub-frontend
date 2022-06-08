import { API }      from "../../common/API";
import ChatWindow   from "./Chat/ChatWindow";
import ChatComposer from "./Chat/ChatComposer";


export default class Chat extends API {
  

    componentDidMount() {
		console.log("mounted", this.state.apiTarget)
        this.setState({ 
            messages: []
        })
    }
    
	componentDidUpdate(){
		if (!this.state.clientHeight) {
			this.setState({
				clientHeight : this.myRef.current.clientHeight,
			})
		} 
		console.log("update", this.state.apiTarget)
	}

    async handleReq(getNewMessage) {
        var request = {
            msg : getNewMessage
        }
	    await this.POSTGET(request)    
    }

    submitted = (getNewMessage) => {
        if (getNewMessage !== "") {
            this.handleReq(getNewMessage)
            const newMessage = { text: getNewMessage }
            let updatedMessages = [...this.state.messages, newMessage]
            console.log("msg: ", this.state.messages)
            this.setState({
                messages: updatedMessages
            })
            localStorage.setItem(`messages_${this.state.api_target}`, JSON.stringify(updatedMessages))
        }
    }

	Size=()=>{
        console.log("size height", this.myRef.current.clientHeight)
		this.setState({
            clientHeight: this.myRef.current.clientHeight
		})
	}
    
    render() {
        const stateRendering = this.state.status === 'RUNNING' ? 'run' : (this.state.status === 'DONE' ? 'done' :'ready')
        const disabled = (this.state.status === 'RUNNING')
        
        return (
            <div ref={this.myRef} className="container chat">
                <div className="header">{this.state.appName} - {this.state.apiTarget} </div>
                <div className="chat body">
                    <ChatWindow messagesList={this.state.messages} stateRendering={stateRendering} height={this.state.clientHeight}/>
                    <ChatComposer submitted={this.submitted} disabled={disabled}/>
                </div>
            </div>
        );
    }
}