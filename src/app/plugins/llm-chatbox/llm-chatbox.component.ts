import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {WidgetBaseComponent} from '../../widget-base/widget-base.component';
import {MatInput} from "@angular/material/input";
import { DomSanitizer } from '@angular/platform-browser';

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
  messages: { text: string, status: string,llm_response?: string;llm_response_safe?: any; }[] = [];
  newMessage = ""
  inputDisabled = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  onEnterPress() {
    if (this.inputDisabled) {
    return; // Do nothing if input is disabled
    }
    this.sendMessage()
  }
      // Modify typeWriterEffect to sanitize HTML
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
        // Sanitize the HTML content
        messageObject.llm_response_safe = this.sanitizer.bypassSecurityTrustHtml(messageObject.llm_response);
        this.cdr.detectChanges();
        this.scrollToBottom();
      } else {
        clearInterval(intervalId);
        messageObject.status = "SENT";
        this.inputDisabled = false;
        this.cdr.detectChanges();
      }
    }, 20);
  }



  sendMessage() {
    if (this.newMessage.trim()) {
      this.inputDisabled = true;
      let messageObject = {
        text: this.newMessage,
        status: "SENDING",
        llm_response: undefined
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


  scrollToBottom() {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

}
