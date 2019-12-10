import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import * as moment from 'moment';
// papa

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
  nextFlag: boolean = true;
  prevFlag: boolean = false;
  

  goalResults  = [
    {
      'goalLength': '200m',
      'goalTime': '00:00:00'
    },
    {
      'goalLength': '300m',
      'goalTime': '00:00:00'
    },
    {
      'goalLength': '400m',
      'goalTime': '00:00:00'
    },
    {
      'goalLength': '500m',
      'goalTime': '00:00:00'
    },
    {
      'goalLength': '600m',
      'goalTime': '00:00:00'
    },
    {
      'goalLength': '700m',
      'goalTime': '00:00:00'
    },
    {
      'goalLength': '800m',
      'goalTime': '00:00:00'
    },
    {
      'goalLength': '1k',
      'goalTime': '00:00:00'
    },
    {
      'goalLength': '2k',
      'goalTime': '00:00:00'
    }
  ];

  constructor(private papa: Papa) { }

  ngOnInit() {    
  }
  // slider controls

  showNext():boolean {
    return (this.getGoalMilliseconds()!== 0) && this.nextFlag;
  }

  showPrev():boolean {
    return this.prevFlag;
  }

  onNext() {
    this.nextFlag = false;
    this.prevFlag = true;
  }

  onPrev() {
    this.nextFlag = true;
    this.prevFlag = false;
  }

  // slider controls     

  runningModeChanged(val) {
    this.runModeVal = val === '5k' ? 5 : 10;
    this.calcGoals();
  }

  getGoalMilliseconds() {
    const hourConst = 3600000; // 3600 * 1000
    const minuteConst = 60000; // 60 * 1000
    const secondConst = 1000; // seconds to milliseconds
    return (this.timeHours*hourConst+this.timeMinutes*minuteConst+this.timeSeconds*secondConst)/this.runModeVal;
  }
  printUtcGoalTime(duration) {
    return moment.utc(duration).format('HH:mm:ss');
  }
  calcGoals() {    
    let totalTimeInMilliseconds = this.getGoalMilliseconds();
    // console.log('time per 1 km:',this.printUtcGoalTime(totalTimeInMilliseconds));
    // console.log('time per 2 km:',this.printUtcGoalTime(totalTimeInMilliseconds*2));
    // console.log('time per 200m:',this.printUtcGoalTime(totalTimeInMilliseconds/5));
    this.goalResults[0].goalTime = this.printUtcGoalTime(Math.floor(totalTimeInMilliseconds*0.2));// 200m
    this.goalResults[1].goalTime = this.printUtcGoalTime(Math.floor(totalTimeInMilliseconds*0.3)); // 300m
    this.goalResults[2].goalTime = this.printUtcGoalTime(Math.floor(totalTimeInMilliseconds*0.4)); // 400m
    this.goalResults[3].goalTime = this.printUtcGoalTime(Math.floor(totalTimeInMilliseconds*0.5)); // 500m
    this.goalResults[4].goalTime = this.printUtcGoalTime(Math.floor(totalTimeInMilliseconds*0.6)); // 600m
    this.goalResults[5].goalTime = this.printUtcGoalTime(Math.floor(totalTimeInMilliseconds*0.7)); // 700m
    this.goalResults[6].goalTime = this.printUtcGoalTime(Math.floor(totalTimeInMilliseconds*0.8)); // 800m
    this.goalResults[7].goalTime = this.printUtcGoalTime(Math.floor(totalTimeInMilliseconds)); // 1k
    this.goalResults[8].goalTime = this.printUtcGoalTime(Math.floor(totalTimeInMilliseconds*2)); // 2k
    console.log('results so far', this.goalResults);

    

    // console.log('goal seconds are ', totalTimeInSeconds);
    
    // calculate goals for each running type based on the typed run time
    // goals to calculate: 200m-1000m, and 2000m runs
  }

  exportResults() {
    const goalFields = this.goalResults.map(result => {
      return result.goalLength;
    })
    const goalResults = this.goalResults.map(result => {
      return result.goalTime;
    })
    console.log('fields are ', goalFields);
    // to be added
    const csv = this.papa.unparse({
      fields: goalFields,
      data: [
        goalResults
      ]
    });
    console.log('csv is ', csv);
    var blob = new Blob([csv]);
    const fileName = moment().format('LLL') + ".csv";
if (window.navigator.msSaveOrOpenBlob) {  
    // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.asp    
    window.navigator.msSaveBlob(blob, fileName);
    } else {
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
    document.body.removeChild(a);
}
  }
}
