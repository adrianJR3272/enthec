import {
  Component,
  Input,
  signal,
  computed,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesService } from './repositories.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Repositories } from '../../interfaces/Repositories';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
  imports: [CommonModule, TranslateModule, FormsModule],
  standalone: true,
})
export class RepositoriesComponent implements OnChanges {
  @Input() userName!: string;

  repositories: Repositories[] = [];
  pageSize = 6;
  currentPage = signal(1);
  pageDirection = signal<'next' | 'prev' | null>(null);
  searchQueryValue: string = '';
  nameOrderValue: 'asc' | 'desc' = 'asc';
  starsOrderValue: 'asc' | 'desc' = 'asc';
  sortBy = signal<'name' | 'stars'>('name');
  order = signal<'asc' | 'desc'>('asc');
  languageFilterValue: 'all' | string = 'all';
  languages: string[] = [];
  animationClass: 'slide-next' | 'slide-prev' | '' = '';
  isAnimating = signal(false);
  private reposService = inject(RepositoriesService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userName'] && this.userName) {
      this.loadRepositories(this.userName);
    }
  }

  onSearchChange() {
    this.currentPage.set(1);
  }

  loadRepositories(username: string) {
    this.reposService.getUserRepos(username).subscribe({
      next: (repos) => {
        this.repositories = repos;
        this.extractLanguages();
        this.currentPage.set(1);
        this.pageDirection.set(null);
      },
      error: () => {
        this.repositories = [];
        this.languages = [];
      },
    });
  }

  extractLanguages() {
    const langs = this.repositories
      .map((r) => r.language)
      .filter(Boolean) as string[];
    this.languages = Array.from(new Set(langs));
  }

  filteredRepos() {
    let repos = [...this.repositories];

    if (this.searchQueryValue) {
      repos = repos.filter((r) =>
        r.name.toLowerCase().includes(this.searchQueryValue.toLowerCase()),
      );
    }

    if (this.languageFilterValue !== 'all') {
      repos = repos.filter((r) => r.language === this.languageFilterValue);
    }

    if (this.nameOrderValue) {
      repos.sort((a, b) =>
        this.nameOrderValue === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      );
    }

    if (this.starsOrderValue) {
      repos.sort((a, b) =>
        this.starsOrderValue === 'asc'
          ? a.stargazers_count - b.stargazers_count
          : b.stargazers_count - a.stargazers_count,
      );
    }

    return repos;
  }

  paginatedRepos() {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredRepos().slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.filteredRepos().length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages() && !this.isAnimating()) {
      this.triggerAnimation('next');
      this.currentPage.update((n) => n + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1 && !this.isAnimating()) {
      this.triggerAnimation('prev');
      this.currentPage.update((n) => n - 1);
    }
  }

  triggerAnimation(direction: 'next' | 'prev') {
    this.animationClass = direction === 'next' ? 'slide-next' : 'slide-prev';
    this.isAnimating.set(true);

    setTimeout(() => {
      this.animationClass = '';
      this.isAnimating.set(false);
    }, 500);
  }
}
