import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Papa } from 'ngx-papaparse';
import * as moment from 'moment';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() time: number; // input runTime(in milliseconds)
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

  runModeVal;
  timeHours: number=0;
  timeMinutes: number=0;
  timeSeconds: number=0;
  nextFlag: boolean = true;
  totalTimeInMilliseconds: any;
  constructor(private papa: Papa, private route: ActivatedRoute) { }

  ngOnInit() {
    this.totalTimeInMilliseconds =+ this.route.snapshot.paramMap.get('time');
    this.runModeVal =+ this.route.snapshot.paramMap.get('mode');
    // calculate times with the input time
    this.calcGoals();

  }
  calcGoals() {    
    // console.log('time per 1 km:',this.printUtcGoalTime(totalTimeInMilliseconds));
    // console.log('time per 2 km:',this.printUtcGoalTime(totalTimeInMilliseconds*2));
    // console.log('time per 200m:',this.printUtcGoalTime(totalTimeInMilliseconds/5));
    this.goalResults[0].goalTime = this.printUtcGoalTime(Math.floor(this.totalTimeInMilliseconds*0.2));// 200m
    this.goalResults[1].goalTime = this.printUtcGoalTime(Math.floor(this.totalTimeInMilliseconds*0.3)); // 300m
    this.goalResults[2].goalTime = this.printUtcGoalTime(Math.floor(this.totalTimeInMilliseconds*0.4)); // 400m
    this.goalResults[3].goalTime = this.printUtcGoalTime(Math.floor(this.totalTimeInMilliseconds*0.5)); // 500m
    this.goalResults[4].goalTime = this.printUtcGoalTime(Math.floor(this.totalTimeInMilliseconds*0.6)); // 600m
    this.goalResults[5].goalTime = this.printUtcGoalTime(Math.floor(this.totalTimeInMilliseconds*0.7)); // 700m
    this.goalResults[6].goalTime = this.printUtcGoalTime(Math.floor(this.totalTimeInMilliseconds*0.8)); // 800m
    this.goalResults[7].goalTime = this.printUtcGoalTime(Math.floor(this.totalTimeInMilliseconds)); // 1k
    this.goalResults[8].goalTime = this.printUtcGoalTime(Math.floor(this.totalTimeInMilliseconds*2)); // 2k

       // console.log('goal seconds are ', totalTimeInSeconds);
    
    // calculate goals for each running type based on the typed run time
    // goals to calculate: 200m-1000m, and 2000m runs
  }

  
  printUtcGoalTime(duration) {
    return moment.utc(duration).format('HH:mm:ss');
  }
  exportResults() {
    const goalFields = this.goalResults.map(result => {
      return result.goalLength;
    })
    const goalResults = this.goalResults.map(result => {
      return result.goalTime;
    })
    // console.log('fields are ', goalFields);
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
