import { Component, OnInit } from '@angular/core';
import { HangmanService } from 'src/app/services/hangman.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss'],
})
export class HangmanComponent implements OnInit {
  question: string = '';
  questions: string[] = [];
  guesses: string[] = [];
  category: string = '';
  constructor(private hangmanService: HangmanService) {}
  ngOnInit(): void {
    this.hangmanService.getQuestion().subscribe((response) => {
      this.questions = response.items;
      this.category = response.category;
      this.pickNewQuestion();
    });
  }

  guess(letter : string ){
    if(!letter || this.guesses.includes(letter)){
      return;
    }
    this.guesses.push(letter)
  }

  dummyClick(){
    const key = prompt('Enter the key')||'';
    this.guess(key)
  }
  reset(){
    this.guesses=[];
    this.pickNewQuestion();
  }
pickNewQuestion(){
const randomIndex = Math.floor(Math.random()*this.questions.length);
this.question = this.questions[randomIndex];  
console.log(this.question);

}

}
