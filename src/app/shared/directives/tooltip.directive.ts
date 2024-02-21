import { Directive, HostListener, Input, ElementRef, HostBinding, Version } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective  {
  @Input() appTooltip;

  @HostListener('mouseover')
  onHover() {
    /*this.$tooltip = document.createElement('span');
    this.$tooltip.textContent = this.tooltip;
    this.$tooltip.className = 'tooltip-text'
    this.el.nativeElement.appendChild(this.$tooltip);*/
    //if(this.appTooltip.popUpMessage != "" && this.appTooltip.popUpMessage != null) {
      this.appTooltip.isPopUp = true;
    //} 
    // console.log('onHover')
  }

  @HostListener('mouseleave')
  onLeave() {
    // this.el.nativeElement.removeChild(this.$tooltip);
    this.appTooltip.isPopUp = false;
    // console.log('onLeave')
  }

  constructor(private el: ElementRef) { }

}