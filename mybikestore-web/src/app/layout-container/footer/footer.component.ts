import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Joke, JokesApiService} from "../../shared/services/jokes-api.service";
import {MatTooltipModule} from "@angular/material/tooltip";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  joke: string;

  constructor(private jokesApiService: JokesApiService) {
  }

  ngOnInit(): void {
    this.getSingleJoke();
  }

  getSingleJoke(): void {
    this.jokesApiService.getRandomJokes(1).subscribe((jokes: Joke[]) => {
      this.joke = jokes[0].joke;
    });
  }
}
