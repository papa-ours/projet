import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListViewComponent } from './game-list-view.component';

describe('GameListViewComponent', () => {
  let component: GameListViewComponent;
  let fixture: ComponentFixture<GameListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
