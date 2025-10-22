import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UserDetailComponent } from "./user-detail.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("UserDetailComponent", () => {

  let fixture: ComponentFixture<UserDetailComponent>;
  let component: UserDetailComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UserDetailComponent]
    });

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
