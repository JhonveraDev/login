import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  dataPoints:any = [];
  chart:any;

  chartOptions = {
    theme: "light2",
    zoomEnabled: true,
    exportEnabled: true,
    title: {
      text:"Bitcoin Closing Price"
    },
    subtitles: [{
      text: "Loading Data...",
      fontSize: 24,
      horizontalAlign: "center",
      verticalAlign: "center",
      dockInsidePlotArea: true
    }],
    axisY: {
      title: "Closing Price (in USD)",
      prefix: "$"
    },
    data: [{
      type: "line",
      name: "Closing Price",
      yValueFormatString: "$#,###.00",
      xValueType: "dateTime",
      dataPoints: this.dataPoints
    }]
  }

  constructor(private http : HttpClient) {
  }

  ngAfterViewInit() {
    this.http.get('https://canvasjs.com/data/gallery/angular/btcusd2021.json', { responseType: 'json' }).subscribe((response: any) => {
      let data = response;
      for(let i = 0; i < data.length; i++){
        this.dataPoints.push({x: new Date(data[i].date), y: Number(data[i].close) });
      }
      this.chart.subtitles[0].remove();
    });
  }

  getChartInstance(chart: object) {
    this.chart = chart;
  }
}
