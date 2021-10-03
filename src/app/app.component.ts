import { Component } from '@angular/core';
import { WidgetComponent } from './widget-component/widget.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Timesheet widget';
}
