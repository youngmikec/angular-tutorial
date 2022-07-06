import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'test-app';
  description: string = 'Angular class taking place @pmt';
  isClassEnded: boolean = false;
  numberOfStudents: number = 7;
  userName: any = '';
  showMenu: boolean = false;
  dishes: string[] = [
    'Beans and plantain',
    'Draw soup',
    'Abacha',
    'Bread and coconut',
    'Fio fio and yam',
    'noodles and egg',
    'fried potato and plantain'
  ]

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
}
