import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SearchUserComponent } from "./search-user.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SearchUserComponent", () => {

  let fixture: ComponentFixture<SearchUserComponent>;
  let component: SearchUserComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SearchUserComponent]
    });

    fixture = TestBed.createComponent(SearchUserComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
