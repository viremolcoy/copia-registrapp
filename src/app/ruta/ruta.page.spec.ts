import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RutaPage } from './ruta.page';

describe('RutaPage', () => {
  let component: RutaPage;
  let fixture: ComponentFixture<RutaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
