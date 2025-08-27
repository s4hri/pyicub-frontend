import { Component, EventEmitter, Input, Output, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-autocompletion',
  templateUrl: './autocompletion.component.html',
  styleUrl: './autocompletion.component.css'
})
export class AutocompletionComponent  implements OnInit {
  @Input() newMessage: string = '';
  @Input() commonQuestionsPath: string = '';
  @Output() newMessageChange = new EventEmitter<string>();
  @Output() enterPressed = new EventEmitter<void>();
  @ViewChildren('item') suggestionItems!: QueryList<ElementRef>;
  constructor(private http: HttpClient) {}
  commonPhrases : string[] = [];
  suggestions: string[] = [];
  showSuggestions = false;
  highlightedIndex = -1;  // Tracks which suggestion is highlighted
 ngOnInit(): void {
    this.loadPhrases();
  }

  loadPhrases() {
    this.http.get(this.commonQuestionsPath, { responseType: 'text' }).subscribe({
      next: (data: string) => {
        this.commonPhrases = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        console.log('Loaded phrases:', this.commonPhrases);
      },
      error: (err) => {
        console.error('Failed to load phrases.txt:', err);
      }
    });
  }
  onKeyDown(event: KeyboardEvent) {
  if (this.showSuggestions) {
    if (event.key === 'Tab') {
      event.preventDefault();

      if (event.shiftKey) {
        this.highlightedIndex = (this.highlightedIndex <= 0) ? this.suggestions.length - 1 : this.highlightedIndex - 1;
      } else {
        this.highlightedIndex = (this.highlightedIndex + 1) % this.suggestions.length;
      }
      this.scrollToHighlighted();
    } else if (event.key === 'Enter' && this.highlightedIndex >= 0) {
      event.preventDefault();
      this.selectSuggestion(this.suggestions[this.highlightedIndex]);
      this.highlightedIndex = -1;
      this.showSuggestions = false;
    } else if (event.key === 'ArrowUp') {
      this.highlightedIndex = (this.highlightedIndex <= 0) ? this.suggestions.length - 1 : this.highlightedIndex - 1;
      this.scrollToHighlighted();
    } else if (event.key === 'ArrowDown') {
      this.highlightedIndex = (this.highlightedIndex + 1) % this.suggestions.length;
      this.scrollToHighlighted();
    }
  }


    // Also handle normal enter press (when no suggestion highlighted)
    if (event.key === 'Enter' && !event.shiftKey && this.highlightedIndex === -1) {
      event.preventDefault();
      this.enterPressed.emit();
      this.showSuggestions = false;
    }
  }
  scrollToHighlighted() {
  if (this.suggestionItems && this.highlightedIndex >= 0) {
    const item = this.suggestionItems.toArray()[this.highlightedIndex];
    item?.nativeElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }
}
  findChoices(searchText: string): string[] {
    return this.commonPhrases
      .filter(item => item.toLowerCase().startsWith(searchText.toLowerCase()))
      .slice(0, 5);
  }
  onInput(value: string) {
    this.newMessageChange.emit(value);
    if (value.length ==0){
      this.clearSuggestion()
      return
    }
    this.suggestions = this.findChoices(value)
    this.showSuggestions = this.suggestions.length > 0
  }
  selectSuggestion(suggestion: string) {
    const words = this.newMessage.trim().split(/\s+/);
    words.pop(); // Remove the last word (being autocompleted)
    words.push(suggestion); // Add selected suggestion
    this.newMessage = words.join(' ') + ' ';
    this.newMessageChange.emit(this.newMessage);
    this.clearSuggestion()
  }
  clearSuggestion(){
     this.suggestions = [];
    this.showSuggestions = false;
  }
}
