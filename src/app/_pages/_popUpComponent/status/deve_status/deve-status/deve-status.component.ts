import { Component } from '@angular/core';

@Component({
  selector: 'app-deve-status',
  templateUrl: './deve-status.component.html',
  styleUrls: ['./deve-status.component.css']
})
export class DeveStatusComponent {


  steps: any[] = [
    { name: 'Ticket Created', status: 'active', color: 'green' },
    { name: 'Clarification', status: 'pending', color: 'green' },
    { name: 'Release Awaited', status: 'pending', color: 'green' },
    { name: 'Resolved', status: 'pending', color: 'green' },
    { name: 'Testing', status: 'pending', color: 'green' }
  ];
}
