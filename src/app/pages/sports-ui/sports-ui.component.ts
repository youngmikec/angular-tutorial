import { Component, OnInit } from '@angular/core';
import { Sport } from '../../models';
import { Sports } from '../../providers/sports';

@Component({
  selector: 'app-sports-ui',
  templateUrl: './sports-ui.component.html',
  styleUrls: ['./sports-ui.component.scss']
})
export class SportsUiComponent implements OnInit {
  loading: boolean = false;
  sportRecords: Sport[] = [];

  constructor(private sports: Sports) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(){
    this.loading = true;
    this.sports.retrieveSportRecords('Canada').subscribe({
      next: (res: any) => {
        this.loading = false;
        this.sportRecords = res.football;
        console.log('response', res);
      },
      error: (error: any) => {
        this.loading = false;
        console.log('error', error);
      }
    })
  }

}
