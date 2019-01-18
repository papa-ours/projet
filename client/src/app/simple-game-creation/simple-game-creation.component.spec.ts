import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleGameCreationComponent } from './simple-game-creation.component';

describe('SimpleGameCreationComponent', () => {
  let component: SimpleGameCreationComponent;
  let fixture: ComponentFixture<SimpleGameCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleGameCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleGameCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
