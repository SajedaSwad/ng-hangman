import { Component,Input,Output } from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  templateUrl: './hangman-display.component.html',
  styleUrls: ['./hangman-display.component.scss']
})
export class HangmanDisplayComponent {
 @Input() guesses : string[]=[];
 @Input() question: string = '';
  MAX_MISTAKE= 7;
  mistakesRemaining;
  constructor(){
  this.mistakesRemaining=this.MAX_MISTAKE;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

}
