import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {WidgetBaseComponent} from '../../widget-base/widget-base.component';
import {MatInput} from "@angular/material/input";
import { CommunicationService, LLMToSpeechEvent } from '../../services/communication.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-robot-speech',
  templateUrl: './robot-speech.component.html',
  styleUrl: './robot-speech.component.css'
})
export class RobotSpeechComponent extends WidgetBaseComponent {

  @ViewChild('scrollContainer') private myScrollContainer: ElementRef;
  @ViewChild('messageInput', {read: MatInput}) messageInput: MatInput;

  readonly messageColors = {
    "CREATED": 'lightgray',
    "SENDING": '#FFF778FF',
    "SENT": 'lightgreen',
    "FAILED": 'indianred'
  }
  private subscriptions = new Subscription();
  messages: { text: string, status: string }[] = [];
  lastLLMToSpeechEvent: LLMToSpeechEvent | null = null;
  newMessage = ""
  inputDisabled = false;

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef, 
    private communicationService: CommunicationService) {
    super();
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.communicationService.pluginEvents$.subscribe(
        (event: LLMToSpeechEvent) => {
          const messageText = event.payload['content']
          console.log('robot speech recieved the message', messageText);
          this.lastLLMToSpeechEvent = event;
          if (!this.inputDisabled){
           this.newMessage = messageText;
          this.sendMessage()           
          }
        }
      )
    );

 
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribe all at once
  }
  onEnterPress() {
    if (this.inputDisabled) {
      return; // Do nothing if input is disabled
    }
    this.sendMessage()
  }

  sendMessage() {
    console.log("send message called with ", this.newMessage)
    if (this.newMessage.trim()) {
      this.inputDisabled = true;
      let messageObject = {
        text: this.newMessage,
        status: "CREATED"
      };
      this.newMessage = "";
      this.messages.push(messageObject);
      this.cdr.detectChanges()
      this.scrollToBottom()
      this.speechSayAsync(messageObject.text).subscribe({
        next: requestID => {
          const onRunningCallback = () => {
            messageObject.status = "SENDING";
          }
          const onDoneCallback = () => {
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
