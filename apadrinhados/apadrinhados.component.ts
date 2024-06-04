import { Component, OnInit } from '@angular/core';
import { IApadrinhamento } from './model/IApadrinhamento';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApadrinhamentoService } from './apadrinhados.service';

@Component({
  selector: 'app-apadrinhados',
  templateUrl: './apadrinhados.component.html',
  styleUrls: ['./apadrinhados.component.scss'],
  providers: [MessageService]
})
export class ApadrinhadosComponent implements OnInit {

  apadrinhamentoDialog: boolean = false;
  deleteApadrinhamentoDialog: boolean = false;
  deleteApadrinhamentosDialog: boolean = false;
  apadrinhamentos: IApadrinhamento[] = [];
  apadrinhamento: IApadrinhamento = {};
  selectedApadrinhamentos: IApadrinhamento[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(private apadrinhamentoService: ApadrinhamentoService, private messageService: MessageService) { }

  ngOnInit() {
    this.apadrinhamentoService.getActiveIApadrinhamentos().subscribe(
      data => this.apadrinhamentos = data,
      error => console.error(error)
    );

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'InitialDate', header: 'Data de inicio' },
      { field: 'endDateg', header: 'data de termino' },
      { field: 'sponsorshipValue', header: 'Valor do patrocinio' },
      { field: 'sponsorshipType', header: 'Tipo do patrocinio' },
      { field: 'animal.name', header: 'Nome do Animal' } // Adicionar esta linha
    ];

    this.statuses = [
      { label: 'ATIVO', value: 'ativo' },
      { label: 'INATIVO', value: 'inativo' },
      { label: 'PENDENTE', value: 'pendente' }
    ];
  }

  openNew() {
    this.apadrinhamento = {};
    this.submitted = false;
    this.apadrinhamentoDialog = true;
  }

  deleteSelectedApadrinhamentos() {
    this.deleteApadrinhamentosDialog = true;
  }

  editApadrinhamento(apadrinhamento: IApadrinhamento) {
    this.apadrinhamento = { ...apadrinhamento };
    this.apadrinhamentoDialog = true;
  }

  deleteApadrinhamento(apadrinhamento: IApadrinhamento) {
    this.deleteApadrinhamentoDialog = true;
    this.apadrinhamento = { ...apadrinhamento };
  }



  hideDialog() {
    this.apadrinhamentoDialog = false;
    this.submitted = false;
  }

  saveApadrinhamento() {
    this.submitted = true;

 
    if (this.apadrinhamento.id) {
      this.apadrinhamento.initialDate = this.apadrinhamento.initialDate ? this.apadrinhamento.initialDate : '';
      this.apadrinhamentos[this.findIndexById(this.apadrinhamento.id)] = this.apadrinhamento;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Apadrinhamento Atualizado', life: 3000 });
  } else {
      this.apadrinhamento.id = this.createId();
      this.apadrinhamento.initialDate = this.apadrinhamento.initialDate ? this.apadrinhamento.initialDate : '';
      this.apadrinhamentos.push(this.apadrinhamento);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Apadrinhamento Criado', life: 3000 });
  }
  
  this.apadrinhamentos = [...this.apadrinhamentos];
  this.apadrinhamentoDialog = false;
  this.apadrinhamento = {};
  

      this.apadrinhamentos = [...this.apadrinhamentos];
      this.apadrinhamentoDialog = false;
      this.apadrinhamento = {};
    }
  

  findIndexById(id: number) {
    let index = -1;
    for (let i = 0; i < this.apadrinhamentos.length; i++) {
      if (this.apadrinhamentos[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): number {
    let id = '';
    const chars = '0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return parseInt(id, 10);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
