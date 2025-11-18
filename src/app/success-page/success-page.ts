import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.html',
  imports: [CommonModule, RouterLink],
  styleUrl: 'success-page.css'
})
export class SuccessPageComponent{
}
