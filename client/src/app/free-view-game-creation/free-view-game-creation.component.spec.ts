import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeViewGameCreationComponent } from './free-view-game-creation.component';

describe('FreeViewGameCreationComponent', () => {
  let component: FreeViewGameCreationComponent;
  let fixture: ComponentFixture<FreeViewGameCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeViewGameCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeViewGameCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
