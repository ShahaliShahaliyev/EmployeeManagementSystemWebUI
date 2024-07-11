import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDepartmentDialogComponent } from './employee-department-dialog.component';

describe('EmployeeDepartmentDialogComponent', () => {
  let component: EmployeeDepartmentDialogComponent;
  let fixture: ComponentFixture<EmployeeDepartmentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDepartmentDialogComponent]
    });
    fixture = TestBed.createComponent(EmployeeDepartmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
