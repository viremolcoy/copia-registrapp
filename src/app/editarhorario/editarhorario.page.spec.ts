import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarhorarioPage } from './editarhorario.page';

describe('EditarhorarioPage', () => {
  let component: EditarhorarioPage;
  let fixture: ComponentFixture<EditarhorarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarhorarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
