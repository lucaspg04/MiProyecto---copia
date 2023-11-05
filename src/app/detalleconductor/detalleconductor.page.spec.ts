import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleconductorPage } from './detalleconductor.page';

describe('DetalleconductorPage', () => {
  let component: DetalleconductorPage;
  let fixture: ComponentFixture<DetalleconductorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleconductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
