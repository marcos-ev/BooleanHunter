import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translation {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = new BehaviorSubject<string>('pt');
  public currentLanguage$ = this.currentLanguage.asObservable();

  private translations: { [lang: string]: Translation } = {
    pt: {
      // Header
      'app.title': 'Boolean Hunter',
      'app.subtitle': 'Encontre o emprego dos seus sonhos com busca inteligente',

      // Form
      'form.title': 'Configure sua busca',
      'form.description': 'Preencha os campos abaixo para gerar uma busca booleana otimizada',
      'form.job.label': 'Cargo desejado',
      'form.job.placeholder': 'Ex: Desenvolvedor Frontend',
      'form.tech.label': 'Tecnologias/Linguagens',
      'form.tech.placeholder': 'Ex: React, TypeScript, Node.js',
      'form.model.label': 'Modelo de trabalho',
      'form.model.any': 'Qualquer modelo',
      'form.model.hybrid': 'Híbrido',
      'form.model.remote': 'Remoto',
      'form.model.onsite': 'Presencial',
      'form.seniority.label': 'Nível de senioridade',
      'form.seniority.any': 'Qualquer nível',
      'form.seniority.intern': 'Estágio',
      'form.seniority.junior': 'Júnior',
      'form.seniority.mid': 'Pleno',
      'form.seniority.senior': 'Sênior',
      'form.exclude.label': 'Excluir termos',
      'form.exclude.placeholder': 'Ex: Java, Senior, Presencial',
      'form.submit': 'Gerar Busca Booleana',
      'form.submit.loading': 'Gerando busca...',
      'form.fields_filled': 'campos preenchidos',

      // Quick Actions
      'quick.frontend': 'Frontend',
      'quick.backend': 'Backend',
      'quick.fullstack': 'Full Stack',
      'quick.data': 'Data Science',

      // Results
      'results.title': 'Sua busca gerada',
      'results.description': 'Copie a busca abaixo ou clique para pesquisar no LinkedIn',
      'results.stats': 'termos na busca',
      'results.copy': 'Copiar busca',
      'results.copied': 'Copiado!',
      'results.linkedin': 'Buscar no LinkedIn',
      'results.save': 'Salvar busca',
      'results.new': 'Nova busca',

      // Progress
      'progress.title': 'Gerando sua busca...',
      'progress.description': 'Analisando critérios e otimizando resultados',

      // Modal
      'modal.save.title': 'Salvar busca',
      'modal.save.description': 'Dê um nome para sua busca para encontrá-la facilmente depois:',
      'modal.save.name.label': 'Nome da busca',
      'modal.save.name.placeholder': 'Ex: Desenvolvedor Frontend - Pleno - Remote',
      'modal.save.preview': 'Preview da busca:',
      'modal.save.cancel': 'Cancelar',
      'modal.save.confirm': 'Salvar',

      // Saved Searches
      'saved.title': 'Suas buscas salvas',
      'saved.use': 'Usar esta busca',
      'saved.delete': 'Excluir busca',
      'saved.today': 'Hoje',
      'saved.yesterday': 'Ontem',
      'saved.days_ago': 'dias atrás',

      // Tips
      'tips.title': 'Dicas para uma busca eficiente',
      'tips.quotes.title': 'Use aspas',
      'tips.quotes.description': 'Coloque termos exatos entre aspas: "React Developer"',
      'tips.combine.title': 'Combine termos',
      'tips.combine.description': 'Use AND para incluir, OR para alternativas',
      'tips.exclude.title': 'Exclua termos',
      'tips.exclude.description': 'Use NOT para remover resultados indesejados',

      // Footer
      'footer.developed': 'Desenvolvido com ❤️ por',
      'footer.stats.searches': 'buscas geradas',
      'footer.stats.saved': 'favoritas',
      
      // Language
      'language.switch': 'Alterar idioma'
    },
    en: {
      // Header
      'app.title': 'Boolean Hunter',
      'app.subtitle': 'Find your dream job with intelligent search',

      // Form
      'form.title': 'Configure your search',
      'form.description': 'Fill in the fields below to generate an optimized boolean search',
      'form.job.label': 'Desired position',
      'form.job.placeholder': 'Ex: Frontend Developer',
      'form.tech.label': 'Technologies/Languages',
      'form.tech.placeholder': 'Ex: React, TypeScript, Node.js',
      'form.model.label': 'Work model',
      'form.model.any': 'Any model',
      'form.model.hybrid': 'Hybrid',
      'form.model.remote': 'Remote',
      'form.model.onsite': 'On-site',
      'form.seniority.label': 'Seniority level',
      'form.seniority.any': 'Any level',
      'form.seniority.intern': 'Intern',
      'form.seniority.junior': 'Junior',
      'form.seniority.mid': 'Mid-level',
      'form.seniority.senior': 'Senior',
      'form.exclude.label': 'Exclude terms',
      'form.exclude.placeholder': 'Ex: Java, Senior, On-site',
      'form.submit': 'Generate Boolean Search',
      'form.submit.loading': 'Generating search...',
      'form.fields_filled': 'fields filled',

      // Quick Actions
      'quick.frontend': 'Frontend',
      'quick.backend': 'Backend',
      'quick.fullstack': 'Full Stack',
      'quick.data': 'Data Science',

      // Results
      'results.title': 'Your generated search',
      'results.description': 'Copy the search below or click to search on LinkedIn',
      'results.stats': 'terms in search',
      'results.copy': 'Copy search',
      'results.copied': 'Copied!',
      'results.linkedin': 'Search on LinkedIn',
      'results.save': 'Save search',
      'results.new': 'New search',

      // Progress
      'progress.title': 'Generating your search...',
      'progress.description': 'Analyzing criteria and optimizing results',

      // Modal
      'modal.save.title': 'Save search',
      'modal.save.description': 'Give a name to your search to find it easily later:',
      'modal.save.name.label': 'Search name',
      'modal.save.name.placeholder': 'Ex: Frontend Developer - Mid-level - Remote',
      'modal.save.preview': 'Search preview:',
      'modal.save.cancel': 'Cancel',
      'modal.save.confirm': 'Save',

      // Saved Searches
      'saved.title': 'Your saved searches',
      'saved.use': 'Use this search',
      'saved.delete': 'Delete search',
      'saved.today': 'Today',
      'saved.yesterday': 'Yesterday',
      'saved.days_ago': 'days ago',

      // Tips
      'tips.title': 'Tips for an efficient search',
      'tips.quotes.title': 'Use quotes',
      'tips.quotes.description': 'Put exact terms in quotes: "React Developer"',
      'tips.combine.title': 'Combine terms',
      'tips.combine.description': 'Use AND to include, OR for alternatives',
      'tips.exclude.title': 'Exclude terms',
      'tips.exclude.description': 'Use NOT to remove unwanted results',

      // Footer
      'footer.developed': 'Developed with ❤️ by',
      'footer.stats.searches': 'searches generated',
      'footer.stats.saved': 'favorites',
      
      // Language
      'language.switch': 'Change language'
    }
  };

  constructor() {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('booleanHunterLanguage') || 'pt';
    this.setLanguage(savedLang);
  }

  getCurrentLanguage(): string {
    return this.currentLanguage.value;
  }

  setLanguage(lang: string): void {
    if (this.translations[lang]) {
      this.currentLanguage.next(lang);
      localStorage.setItem('booleanHunterLanguage', lang);
    }
  }

  translate(key: string): string {
    const currentLang = this.currentLanguage.value;
    return this.translations[currentLang]?.[key] || key;
  }

  getAvailableLanguages(): { code: string; name: string; flag: string }[] {
    return [
      { code: 'pt', name: 'Português', flag: '🇧🇷' },
      { code: 'en', name: 'English', flag: '🇺🇸' }
    ];
  }
}
