import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSheetComponent } from './game-sheet.component';

describe('GameSheetComponent', () => {
  let component: GameSheetComponent;
  let fixture: ComponentFixture<GameSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
