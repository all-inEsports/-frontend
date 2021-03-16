import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivematchesComponent } from './activematches.component';

describe('ActivematchesComponent', () => {
  let component: ActivematchesComponent;
  let fixture: ComponentFixture<ActivematchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivematchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivematchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
