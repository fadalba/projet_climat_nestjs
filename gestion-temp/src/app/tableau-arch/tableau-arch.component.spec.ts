import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauArchComponent } from './tableau-arch.component';

describe('TableauArchComponent', () => {
  let component: TableauArchComponent;
  let fixture: ComponentFixture<TableauArchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauArchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauArchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
