import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ConductortrackeoPage } from './conductortrackeo.page';

describe('ConductortrackeoPage', () => {
  let component: ConductortrackeoPage;
  let fixture: ComponentFixture<ConductortrackeoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConductortrackeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
