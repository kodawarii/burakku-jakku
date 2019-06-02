import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadsUpDisplayComponent } from './heads-up-display.component';

describe('HeadsUpDisplayComponent', () => {
  let component: HeadsUpDisplayComponent;
  let fixture: ComponentFixture<HeadsUpDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadsUpDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadsUpDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
