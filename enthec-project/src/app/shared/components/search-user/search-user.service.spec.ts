import { SearchUserService } from "./search-user.service";
import { TestBed } from "@angular/core/testing";

describe("SearchUserService", () => {

  let service: SearchUserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchUserService
      ]
    });
    service = TestBed.get(SearchUserService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
