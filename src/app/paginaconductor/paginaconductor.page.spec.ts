import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaconductorPage } from './paginaconductor.page';

describe('PaginaconductorPage', () => {
  let component: PaginaconductorPage;
  let fixture: ComponentFixture<PaginaconductorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaginaconductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
