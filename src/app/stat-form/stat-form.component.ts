import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.scss']
})
export class StatFormComponent implements OnInit {
  runModes:[string, string] = ['5k', '10k'];
  selectedMode: '5k'|'10k'='5k';
  runModeVal: 5|10 = 5;
  timeHours: number=0;
  timeMinutes: number=0;
  timeSeconds: number=0;
  hourConst: number = 3600000; // 3600 * 1000
  minuteConst: number = 60000; // 60 * 1000
  secondConst: number = 1000; // seconds to milliseconds

  constructor(private router: Router) { }

  ngOnInit() {    
  }  

  canCalc():boolean {
    return !(this.getGoalMilliseconds() === 0);
  }

  getGoalMilliseconds() {
    return (this.timeHours*this.hourConst+this.timeMinutes*this.minuteConst+this.timeSeconds*this.secondConst)/this.runModeVal;
  }

  runningModeChanged(val) {
    this.runModeVal = val === '5k' ? 5 : 10;
  }  
  resultNav() {
    const timeAsMilliseconds = this.getGoalMilliseconds();
    this.router.navigate(['/results', { mode: this.runModeVal, time: timeAsMilliseconds } ])
  }
}
