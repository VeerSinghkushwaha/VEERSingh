import { Component } from '@angular/core';
import { environment } from 'src/_environment/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    console.log(environment.production,'environment.production')
  }
  title = 'app';
}
