import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauUserComponent } from './tableau-user.component';

describe('TableauUserComponent', () => {
  let component: TableauUserComponent;
  let fixture: ComponentFixture<TableauUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
