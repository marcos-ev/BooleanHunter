import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SearchFormComponent implements OnInit {
  searchForm!: FormGroup;
  searchSyntax: string = '';
  isGenerating: boolean = false;
  copySuccess: boolean = false;
  progressValue: number = 0;
  totalSearches: number = 0;
  savedSearches: number = 0;
  savedSearchesList: any[] = [];
  showSaveDialog: boolean = false;
  searchName: string = '';

  // Templates pré-definidos
  private templates = {
    frontend: {
      cargo: 'Desenvolvedor Frontend',
      linguagens: 'React, TypeScript, JavaScript, HTML, CSS',
      modelo: 'Remote',
      senioridade: 'Pleno',
      escolhanegativa: 'Java, PHP'
    },
    backend: {
      cargo: 'Desenvolvedor Backend',
      linguagens: 'Node.js, Python, Java, C#, Go',
      modelo: 'Hibrido',
      senioridade: 'Senior',
      escolhanegativa: 'Frontend, Mobile'
    },
    fullstack: {
      cargo: 'Desenvolvedor Full Stack',
      linguagens: 'React, Node.js, TypeScript, Python, SQL',
      modelo: 'Remote',
      senioridade: 'Pleno',
      escolhanegativa: 'Mobile, DevOps'
    },
    data: {
      cargo: 'Cientista de Dados',
      linguagens: 'Python, R, SQL, Machine Learning',
      modelo: 'Presencial',
      senioridade: 'Senior',
      escolhanegativa: 'Frontend, Mobile'
    }
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadSavedData();
  }

  private initializeForm(): void {
    this.searchForm = this.fb.group({
      cargo: ['', [Validators.minLength(2)]],
      linguagens: [''],
      modelo: [''],
      senioridade: [''],
      escolhanegativa: ['']
    });
  }

  showSearchSyntax(): void {
    if (this.searchForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isGenerating = true;
    this.simulateProgress();

    // Simular delay para melhor UX
    setTimeout(() => {
      const { cargo, linguagens, modelo, senioridade, escolhanegativa } = this.searchForm.value;
      let searchTerms = [];

      if (cargo && cargo.trim()) {
        searchTerms.push(`"${cargo.trim()}"`);
      }

      if (linguagens && linguagens.trim()) {
        const linguagensArray = linguagens.split(',')
          .map((l: string) => l.trim())
          .filter((l: string) => l.length > 0)
          .map((l: string) => `"${l}"`);

        if (linguagensArray.length > 1) {
          searchTerms.push(`(${linguagensArray.join(' OR ')})`);
        } else if (linguagensArray.length === 1) {
          searchTerms.push(linguagensArray[0]);
        }
      }

      if (modelo && modelo !== 'Hibrido' && modelo !== 'Remote') {
        searchTerms.push(`"${modelo}"`);
      }

      if (senioridade && senioridade.trim()) {
        searchTerms.push(`"${senioridade}"`);
      }

      if (escolhanegativa && escolhanegativa.trim()) {
        const escolhaNegativaArray = escolhanegativa.split(',')
          .map((e: string) => e.trim())
          .filter((e: string) => e.length > 0)
          .map((e: string) => `"${e}"`);

        if (escolhaNegativaArray.length > 1) {
          searchTerms.push(`NOT (${escolhaNegativaArray.join(' OR ')})`);
        } else if (escolhaNegativaArray.length === 1) {
          searchTerms.push(`NOT ${escolhaNegativaArray[0]}`);
        }
      }

      this.searchSyntax = searchTerms.length > 0 ? searchTerms.join(' AND ') : '';
      this.isGenerating = false;

      // Incrementar contador de buscas
      if (this.searchSyntax) {
        this.totalSearches++;
        this.saveData();
      }
    }, 500);
  }

  generateLinkedInSearch(): void {
    if (!this.searchSyntax) return;

    let linkedInUrl = 'https://www.linkedin.com/jobs/search/?';

    const modelo = this.searchForm.value.modelo;
    if (modelo === 'Hibrido') {
      linkedInUrl += 'f_WT=3&';
    } else if (modelo === 'Remote') {
      linkedInUrl += 'f_WT=2&';
    }

    linkedInUrl += `keywords=${encodeURIComponent(this.searchSyntax)}&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&originalSubdomain=br&refresh=true`;

    window.open(linkedInUrl, '_blank');
  }

  copyToClipboard(): void {
    if (!this.searchSyntax) return;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(this.searchSyntax).then(() => {
        this.showCopySuccess();
      }).catch(() => {
        this.fallbackCopyToClipboard();
      });
    } else {
      this.fallbackCopyToClipboard();
    }
  }

  private fallbackCopyToClipboard(): void {
    const textArea = document.createElement('textarea');
    textArea.value = this.searchSyntax;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      this.showCopySuccess();
    } catch (err) {
      console.error('Falha ao copiar texto: ', err);
    }

    document.body.removeChild(textArea);
  }

  private showCopySuccess(): void {
    this.copySuccess = true;
    setTimeout(() => {
      this.copySuccess = false;
    }, 2000);
  }

  clearForm(): void {
    this.searchForm.reset();
    this.searchSyntax = '';
    this.copySuccess = false;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.searchForm.controls).forEach(key => {
      const control = this.searchForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.searchForm.get(fieldName);
    if (field?.hasError('minlength')) {
      return `Mínimo de ${field.errors?.['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.searchForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Novos métodos para funcionalidades dinâmicas
  loadTemplate(templateType: string): void {
    const template = this.templates[templateType as keyof typeof this.templates];
    if (template) {
      this.searchForm.patchValue(template);
      this.totalSearches++;
    }
  }

  getFilledFieldsCount(): number {
    const values = this.searchForm.value;
    return Object.values(values).filter(value => value && value.toString().trim() !== '').length;
  }

  getSearchStats(): string {
    const terms = this.searchSyntax.split(' AND ').length;
    return `${terms} termo${terms !== 1 ? 's' : ''} na busca`;
  }

  // Simular progresso durante geração
  private simulateProgress(): void {
    this.progressValue = 0;
    const interval = setInterval(() => {
      this.progressValue += Math.random() * 15;
      if (this.progressValue >= 100) {
        this.progressValue = 100;
        clearInterval(interval);
      }
    }, 100);
  }

  // Gerenciamento de dados salvos
  private loadSavedData(): void {
    const savedData = localStorage.getItem('booleanHunterData');
    if (savedData) {
      const data = JSON.parse(savedData);
      this.totalSearches = data.totalSearches || 0;
      this.savedSearchesList = data.savedSearches || [];
      this.savedSearches = this.savedSearchesList.length;
    }
  }

  private saveData(): void {
    const data = {
      totalSearches: this.totalSearches,
      savedSearches: this.savedSearchesList
    };
    localStorage.setItem('booleanHunterData', JSON.stringify(data));
  }

  saveSearch(): void {
    if (!this.searchSyntax) return;

    this.showSaveDialog = true;
    this.searchName = this.generateSearchName();
  }

  confirmSaveSearch(): void {
    if (!this.searchName.trim()) return;

    const searchData = {
      id: Date.now(),
      name: this.searchName.trim(),
      syntax: this.searchSyntax,
      formData: this.searchForm.value,
      createdAt: new Date().toISOString(),
      usedCount: 0
    };

    this.savedSearchesList.unshift(searchData);
    this.savedSearches = this.savedSearchesList.length;
    this.saveData();

    this.showSaveDialog = false;
    this.searchName = '';
  }

  cancelSaveSearch(): void {
    this.showSaveDialog = false;
    this.searchName = '';
  }

  loadSavedSearch(search: any): void {
    this.searchForm.patchValue(search.formData);
    this.searchSyntax = search.syntax;
    search.usedCount++;
    this.saveData();
  }

  deleteSavedSearch(searchId: number): void {
    this.savedSearchesList = this.savedSearchesList.filter(s => s.id !== searchId);
    this.savedSearches = this.savedSearchesList.length;
    this.saveData();
  }

  private generateSearchName(): string {
    const formData = this.searchForm.value;
    const parts = [];

    if (formData.cargo) parts.push(formData.cargo);
    if (formData.senioridade) parts.push(formData.senioridade);
    if (formData.modelo) parts.push(formData.modelo);

    return parts.length > 0 ? parts.join(' - ') : 'Busca Personalizada';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hoje';
    if (diffDays === 2) return 'Ontem';
    if (diffDays <= 7) return `${diffDays - 1} dias atrás`;

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  }
}
