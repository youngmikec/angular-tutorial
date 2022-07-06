import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsUiComponent } from './sports-ui.component';

describe('SportsUiComponent', () => {
  let component: SportsUiComponent;
  let fixture: ComponentFixture<SportsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
