import { Component, Input, signal, computed, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesService } from './repositories.service';
import { Repositories } from '../../interfaces/repositories';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
  imports: [CommonModule,TranslateModule],
  standalone: true
})
export class RepositoriesComponent implements OnChanges {
  @Input() userName!: string; 

  repositories: Repositories[] = [];
  pageSize = 6;
  currentPage = signal(1);

  pageDirection = signal<'next' | 'prev' | null>(null);

  private reposService = inject(RepositoriesService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userName'] && this.userName) {
      this.loadRepositories(this.userName);
    }
  }

  loadRepositories(username: string) {
    this.reposService.getUserRepos(username).subscribe({
      next: (repos) => {
        this.repositories = repos;
        this.currentPage.set(1); 
        this.pageDirection.set(null);
      },
      error: () => {
        this.repositories = [];
      }
    });
  }

  paginatedRepos() {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.repositories.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.repositories.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.pageDirection.set('next');
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.pageDirection.set('prev');
      this.currentPage.set(this.currentPage() - 1);
    }
  }
}
