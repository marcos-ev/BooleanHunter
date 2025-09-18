import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-language-switcher',
  template: `
    <div class="language-switcher">
      <button 
        mat-icon-button 
        [matMenuTriggerFor]="languageMenu"
        class="language-button"
        matTooltip="{{ 'language.switch' | translate }}">
        <span class="current-language">{{ currentLanguage === 'pt' ? 'PT-BR' : 'EN' }}</span>
      </button>
      
      <mat-menu #languageMenu="matMenu" class="language-menu">
         <button 
           mat-menu-item 
           *ngFor="let lang of availableLanguages"
           (click)="changeLanguage(lang.code)"
           [class.active]="currentLanguage === lang.code"
           class="language-option">
           <span class="language-code">{{ lang.code === 'pt' ? 'PT-BR' : 'EN' }}</span>
           <span class="material-icons check" *ngIf="currentLanguage === lang.code">check</span>
         </button>
      </mat-menu>
    </div>
  `,
  styles: [`
     .language-switcher {
       position: relative;
     }
    
     .language-button {
       color: var(--text-white);
       transition: all 0.3s ease;
       border-radius: 6px;
       width: auto;
       height: 32px;
       display: flex;
       align-items: center;
       justify-content: center;
       padding: 6px 12px;
       min-width: auto;
       
       &:hover {
         background: rgba(255, 255, 255, 0.15);
         transform: scale(1.05);
         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
       }
       
       .current-language {
         font-weight: 600;
         font-size: 11px;
         color: var(--text-white);
         text-transform: uppercase;
         letter-spacing: 0.5px;
       }
     }
    
     .language-menu {
       min-width: 100px;
       border-radius: 8px;
       box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
       backdrop-filter: blur(10px);
       border: 1px solid rgba(255, 255, 255, 0.2);
       overflow: hidden;
       
       .language-option {
         display: flex;
         align-items: center;
         justify-content: space-between;
         padding: 8px 12px;
         transition: all 0.3s ease;
         
         .language-code {
           font-weight: 600;
           font-size: 12px;
           color: var(--text-primary);
           text-transform: uppercase;
           letter-spacing: 0.5px;
         }
         
         .check {
           color: var(--success-color);
           font-size: 16px;
           opacity: 0;
           transform: scale(0.8);
           transition: all 0.3s ease;
         }
         
         &.active {
           background: rgba(99, 102, 241, 0.1);
           color: var(--primary-color);
           
           .check {
             opacity: 1;
             transform: scale(1);
           }
           
           .language-code {
             color: var(--primary-color);
           }
         }
         
         &:hover:not(.active) {
           background: rgba(99, 102, 241, 0.05);
         }
       }
     }
  `]
})
export class LanguageSwitcherComponent implements OnInit {
  currentLanguage: string = 'pt';
  availableLanguages: { code: string; name: string; flag: string }[] = [];

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.availableLanguages = this.translationService.getAvailableLanguages();

    this.translationService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  changeLanguage(langCode: string): void {
    this.translationService.setLanguage(langCode);
  }
}
