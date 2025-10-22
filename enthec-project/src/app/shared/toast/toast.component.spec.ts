import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ToastComponent } from "./toast.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ToastComponent", () => {

  let fixture: ComponentFixture<ToastComponent>;
  let component: ToastComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ToastComponent]
    });

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
