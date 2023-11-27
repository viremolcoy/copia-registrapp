import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroHorarioPage } from './registro-horario.page';

describe('RegistroHorarioPage', () => {
  let component: RegistroHorarioPage;
  let fixture: ComponentFixture<RegistroHorarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroHorarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
