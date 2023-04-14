import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifprofilComponent } from './modifprofil.component';

describe('ModifprofilComponent', () => {
  let component: ModifprofilComponent;
  let fixture: ComponentFixture<ModifprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifprofilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
