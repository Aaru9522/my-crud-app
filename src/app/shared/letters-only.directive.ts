import { Directive } from '@angular/core';

@Directive({
  selector: '[appLettersOnly]',
  standalone: false
})
export class LettersOnlyDirective {

  constructor() { }

}
