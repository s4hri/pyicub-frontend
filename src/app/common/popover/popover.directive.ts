import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appPopover]'
})

export class PopoverDirective {
  @Input() content:string;
  @Input() placement:string;
  @Input() delay:number;
  popover?: HTMLElement;
  offset=10;

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.popover) {
      this.show()
    }
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (this.popover) {
      this.hide()
    }
  }

  show(){
    this.creat()
    this.setPosition()
    this.popover?.classList.add('ng-popover-show')
  }

  hide(){

    window.setTimeout(() => {
      this.popover?.classList.remove('ng-popover-show')
      this.popover?.remove()
      this.popover = undefined;
    }, this.delay)
  }

  creat(){
    this.popover = document.createElement('span')
    this.popover.classList.add('ng-popover')
    console.log(this.content)
    this.popover.innerHTML = this.content
    document.body.appendChild(this.popover)
  }

  setPosition(){
    const elemRect = this.el.nativeElement.getBoundingClientRect()
    const popoverRect = this.popover.getBoundingClientRect()

    let left, top;

    switch (this.placement) {
  case 'top':
    top = elemRect.top - popoverRect.height - this.offset;
    left = elemRect.left ;
    break;
  case 'bottom':
    top = elemRect.bottom + this.offset;
    left = elemRect.left + elemRect.width / 2 ;
    break;
  case 'left':
    top = elemRect.top + elemRect.height / 2 - popoverRect.height / 2;
    left = elemRect.left - popoverRect.width - this.offset;
    break;
  case 'right':
    top = elemRect.top + elemRect.height / 2 - popoverRect.height / 2;
    left = elemRect.right + this.offset;
    break;
  default:
    top = elemRect.top - popoverRect.height - this.offset;
    left = elemRect.left ;
    break;
}

    if (this.popover) {
      this.popover.style.top = `${top}px`
      this.popover.style.left = `${left}px`
    }
  }
}
