import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

interface Toast {
  message: string;
  type: 'success' | 'error' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class SearchUserService {
  private http = inject(HttpClient);
  private translate = inject(TranslateService);
  private apiUrl = 'https://api.github.com/users';

  toast = signal<Toast | null>(null);

  constructor() {}

  getUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${username}`).pipe(
      tap(() => {
        this.showToast(this.translate.instant('SEARCH.SEARCH_SUCCESS'), 'success');
      }),
      catchError((error) => {
        if (error.status === 404) {
          this.showToast(this.translate.instant('SEARCH.USER_NOT_FOUND'), 'error');
        } else {
          this.showToast(this.translate.instant('SEARCH.ERROR'), 'error');
        }
        return throwError(() => error);
      })
    );
  }

  private showToast(message: string, type: 'success' | 'error' | 'warning') {
    this.toast.set({ message, type });
    setTimeout(() => this.toast.set(null), 3000);
  }
}
