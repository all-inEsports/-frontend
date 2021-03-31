import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploregamesComponent } from './exploregames.component';

describe('ExploregamesComponent', () => {
  let component: ExploregamesComponent;
  let fixture: ComponentFixture<ExploregamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploregamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploregamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
