import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface LLMToSpeechEvent{
  pluginId: string; 
  eventType: string; 
  payload?: any;    
}

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {

  private _llmEvents = new Subject<LLMToSpeechEvent>();
  pluginEvents$: Observable<LLMToSpeechEvent> = this._llmEvents.asObservable();

  constructor() { }

  /**
   * @param event The LLMToSpeechEvent object to publish.
   */
  publishLLMToSpeechEvent(event: LLMToSpeechEvent): void {
    console.log(`[CommunicationService] Publishing Plugin Event (${event.eventType}) from ${event.pluginId}`);
    this._llmEvents.next(event);
  }

}
