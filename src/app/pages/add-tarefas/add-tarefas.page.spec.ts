import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTarefasPage } from './add-tarefas.page';

describe('AddTarefasPage', () => {
  let component: AddTarefasPage;
  let fixture: ComponentFixture<AddTarefasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTarefasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
