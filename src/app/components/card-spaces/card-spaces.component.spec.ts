import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSpacesComponent } from './card-spaces.component';

describe('CardSpacesComponent', () => {
  let component: CardSpacesComponent;
  let fixture: ComponentFixture<CardSpacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSpacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
