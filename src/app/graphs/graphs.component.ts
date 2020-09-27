import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  runningData: object[] = [];

  constructor() { }

  ngOnInit() {
    this.runningData = [
      {
        "name": "5K",
        "series": [
          {
          "name": "monday",
          "value": 9000
          },
          {
            "name": "tuesday",
            "value": 6000
          },
          {
            "name": "wednsday",
            "value": 6500
          },
          {
            "name": "sunday",
            "value": 8000
          }
        ]
      },
      {
        "name": "10K",
        "series": [
          {
          "name": "monday",
          "value": 8000
          },
          {
            "name": "tuesday",
            "value": 6000
          },
          {
            "name": "wednsday",
            "value": 2000
          },
        ]
      }
    ];
    this.setLabelColors();  
  }
  setLabelColors(){
    setTimeout(() => {
      const labelCollection = document.getElementsByClassName('legend-label');
      for (let i = 0;i < labelCollection.length; i++) {
        labelCollection[i].setAttribute('style', 'color: #373737');
      }
    },0);
  }

}
