import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RepositoriesComponent } from "./repositories.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("RepositoriesComponent", () => {

  let fixture: ComponentFixture<RepositoriesComponent>;
  let component: RepositoriesComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [RepositoriesComponent]
    });

    fixture = TestBed.createComponent(RepositoriesComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
