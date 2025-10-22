import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RepositoriesService {
  private http = inject(HttpClient);

  getUserRepos(username: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.github.com/users/${username}/repos`);
  }

  
}
