import { TmplAstRecursiveVisitor } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  templateUrl: './hangman-display.component.html',
  styleUrls: ['./hangman-display.component.scss'],
})
export class HangmanDisplayComponent {
  @Input() guesses: string[] = [];
  @Input() question: string = '';
  @Output() gameFinished = new EventEmitter<boolean>();
  SimpleChanges: any;
  MAX_MISTAKE = 7;
  mistakesRemaining;
  success: boolean = false;
  constructor() {
    this.mistakesRemaining = this.MAX_MISTAKE;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    if (
      changes?.['question']?.currentValue &&
      changes?.['question'].currentValue !== changes?.['question'].previousValue
    ) {
      this.mistakesRemaining = this.MAX_MISTAKE;
      this.success = false;
    }

    const guessesCurrentValue = changes?.['guesses']?.currentValue;
    if (
      guessesCurrentValue && //its mean that its not null and its not the first time for running
      guessesCurrentValue.length &&
      guessesCurrentValue != changes['guesses'].previousValue
    ) {
      const char = [...guessesCurrentValue].pop();
      this.cheakGusses(
        char //last letter you enterd
      );
    }
  }
  cheakGusses(letter: string) {
    let didWin = true;
    this.mistakesRemaining -= this.wasGuessAMistak(letter);
    for (let i = 0; i < this.question.length; i++) {
      if (
        !this.guesses.find(
          (guess) => guess.toLowerCase() === this.question[i].toLowerCase()
        )
      ) {
        didWin = false;
        break;
      }
    }
    this.success = didWin;

    if (this.success || this.mistakesRemaining === 0) {
      this.gameFinished.emit(this.success);
    }
  }
  wasGuessAMistak(letter: string) {
    for (let i = 0; i < this.question.length; i++) {
      if (this.question[i].toLowerCase() === letter.toLowerCase()) {
        return 0;
      }
    }
    return 1;
  }
}
