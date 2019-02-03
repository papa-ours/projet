import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminViewComponent } from "./admin-view.component";

describe("AdminViewComponent", () => {
  let component: AdminViewComponent;
  let fixture: ComponentFixture<AdminViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewComponent ],
    })
    .compileComponents()
    .then()
    .catch((err: Error) => {
      console.error(err);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
