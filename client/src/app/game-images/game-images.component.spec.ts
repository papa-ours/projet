import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameImagesComponent } from './game-images.component';

describe('GameImagesComponent', () => {
  let component: GameImagesComponent;
  let fixture: ComponentFixture<GameImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
