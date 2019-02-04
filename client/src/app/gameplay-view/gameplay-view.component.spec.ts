import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GameplayViewComponent } from "./gameplay-view.component";

describe("GameplayViewComponent", () => {
  let component: GameplayViewComponent;
  let fixture: ComponentFixture<GameplayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameplayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameplayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
