import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuhrPage } from './menuhr.page';

describe('MenuhrPage', () => {
  let component: MenuhrPage;
  let fixture: ComponentFixture<MenuhrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuhrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
