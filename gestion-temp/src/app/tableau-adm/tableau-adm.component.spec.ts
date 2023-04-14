import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauAdmComponent } from './tableau-adm.component';

describe('TableauAdmComponent', () => {
  let component: TableauAdmComponent;
  let fixture: ComponentFixture<TableauAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauAdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
