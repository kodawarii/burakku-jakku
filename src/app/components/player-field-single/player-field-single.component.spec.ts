import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerFieldSingleComponent } from './player-field-single.component';

describe('PlayerFieldSingleComponent', () => {
  let component: PlayerFieldSingleComponent;
  let fixture: ComponentFixture<PlayerFieldSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerFieldSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerFieldSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
