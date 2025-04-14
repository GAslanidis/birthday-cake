import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BirthdayCakeComponent } from './birthday-cake/birthday-cake.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, BirthdayCakeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'birthdaycake-app';
}
