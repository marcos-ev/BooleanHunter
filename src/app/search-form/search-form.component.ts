import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Analytics } from "@vercel/analytics/react"


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  searchForm!: FormGroup;
  searchSyntax: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      cargo: [''],
      linguagens: [''],
      modelo: [''],
      senioridade: [''],
      escolhanegativa: ['']
    });
  }

  showSearchSyntax(): void {
    const { cargo, linguagens, modelo, senioridade, escolhanegativa } = this.searchForm.value;
    let searchTerms = [];

    if (cargo) searchTerms.push(`"${cargo}"`);

    if (linguagens) {
      const linguagensArray = linguagens.split(',').map((l: string) => `"${l.trim()}"`);
      if (linguagensArray.length > 1) {
        searchTerms.push(`(${linguagensArray.join(' OR ')})`);
      } else {
        searchTerms.push(linguagensArray[0]);
      }
    }

    if (modelo && modelo !== 'Hibrido' && modelo !== 'Remote') {
      searchTerms.push(`"${modelo}"`);
    }

    if (senioridade) searchTerms.push(`"${senioridade}"`);

    if (escolhanegativa) {
      const escolhaNegativaArray = escolhanegativa.split(',').map((e: string) => `"${e.trim()}"`);
      if (escolhaNegativaArray.length > 1) {
        searchTerms.push(`NOT (${escolhaNegativaArray.join(' OR ')})`);
      } else {
        searchTerms.push(`NOT ${escolhaNegativaArray[0]}`);
      }
    }

    this.searchSyntax = searchTerms.join(' AND ');
  }

  generateLinkedInSearch(): void {
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
}
