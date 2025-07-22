import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {WidgetBaseComponent} from '../../widget-base/widget-base.component';
import {MatInput} from "@angular/material/input";
import { CommunicationService, LLMToSpeechEvent} from '../../services/communication.service';

@Component({
  selector: 'app-llm-chatbox',
  templateUrl: './llm-chatbox.component.html',
  styleUrls: ['./llm-chatbox.component.css']
})
export class LlmChatboxComponent extends WidgetBaseComponent {
  @ViewChild('scrollContainer') private myScrollContainer: ElementRef;
  @ViewChild('messageInput', {read: MatInput}) messageInput: MatInput;

  readonly messageColors = {
    "CREATED": 'lightgray',
    "SENDING": '#FFF778FF',
    "SENT": 'lightgreen',
    "FAILED": 'indianred'
  }
  messages: { text: string, status: string,llm_response?: string; is_editing:any; finished:any}[] = [];
  newMessage = ""
  inputDisabled = false;
  

  constructor(
    private cdr: ChangeDetectorRef,
    private communicationService: CommunicationService
  ) {
    super();
  }

  sendMessageToRobotSpeech(message_text){
    console.log("seding message to the chatbox")
    console.log(message_text)
    const LLMToSpeechEvent_obj: LLMToSpeechEvent = {
      pluginId: 'LLM_Chatbox',
      eventType: 'newLLMResponse',
      payload: { content: message_text }
    };
    this.communicationService.publishLLMToSpeechEvent(LLMToSpeechEvent_obj);
  }

  onEnterPress() {
    if (this.inputDisabled) {
    return; // Do nothing if input is disabled
    }
    this.sendMessage()
  }
  private typeWriterEffect(messageObject: any, fullText: string) {
    let currentIndex = 0;
    messageObject.llm_response = '';

    const intervalId = setInterval(() => {
      if (currentIndex < fullText.length) {
        if (fullText[currentIndex] === '<') {
          const closingIndex = fullText.indexOf('>', currentIndex);
          if (closingIndex !== -1) {
            messageObject.llm_response += fullText.substring(currentIndex, closingIndex + 1);
            currentIndex = closingIndex + 1;
          } else {
            messageObject.llm_response += fullText[currentIndex];
            currentIndex++;
          }
        } else {
          messageObject.llm_response += fullText[currentIndex];
          currentIndex++;
        }
        this.cdr.detectChanges();
      } else {
        clearInterval(intervalId);
        messageObject.status = "SENT";
        this.inputDisabled = false;
        this.cdr.detectChanges();
        messageObject.finished = true;
      }
      
    }, 20);
    
  }

enableEditingAtCursor(event: MouseEvent, message: any, spanEl: HTMLElement) {
  message.is_editing = true;
  message.finished = false;

  setTimeout(() => {
    spanEl.focus();

    const range = document.caretRangeFromPoint
      ? document.caretRangeFromPoint(event.clientX, event.clientY)
      : (event as any).rangeParent
        ? (() => {
            const range = document.createRange();
            range.setStart((event as any).rangeParent, (event as any).rangeOffset);
            return range;
          })()
        : null;

    if (range) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, 0);
}

saveEditing(event: any, message: any, fromEnter = false) {
  if (fromEnter) {
    event.preventDefault(); 
  }
  console.log("finished editing")
  message.llm_response = event.target.innerText;
  console.log(this.messages)
  message.is_editing = false;
  message.finished = true;
}

  sendMessage() {
    if (this.newMessage.trim()) {
      this.inputDisabled = true;
      let messageObject = {
        text: this.newMessage,
        status: "SENDING",
        llm_response: undefined,
        is_editing:false,
        finished:false,
      };
      const inputMessage = this.newMessage;
      this.newMessage = "";
      this.messages.push(messageObject);
      this.cdr.detectChanges();
      this.scrollToBottom();



      this.llmQueryAsync(messageObject.text).subscribe({
        next: requestID => {
          const onRunningCallback = () => {
            messageObject.status = "SENDING";
          }
          const onDoneCallback = (responseContent) => {
            console.log(responseContent)
            messageObject.llm_response = responseContent;
            this.typeWriterEffect(messageObject, JSON.parse(responseContent));
            messageObject.status = "SENT";
            this.inputDisabled = false;
          }

          const onFailedCallback = () => {
            messageObject.status = "FAILED";

            this.inputDisabled = false;
          }

          this.checkAsyncRequestStatus(requestID, () => {
          }, onRunningCallback, onDoneCallback, onFailedCallback)

        },
        error: err => {
          messageObject.status = "FAILED";
          this.inputDisabled = false;
        }
      })
    }
  }

  send_to_speech(message){
    this.sendMessageToRobotSpeech(message.llm_response)
  }


  scrollToBottom() {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

}
