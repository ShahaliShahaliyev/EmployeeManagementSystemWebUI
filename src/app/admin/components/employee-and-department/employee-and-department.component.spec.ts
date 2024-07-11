import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAndDepartmentComponent } from './employee-and-department.component';

describe('EmployeeAndDepartmentComponent', () => {
  let component: EmployeeAndDepartmentComponent;
  let fixture: ComponentFixture<EmployeeAndDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeAndDepartmentComponent]
    });
    fixture = TestBed.createComponent(EmployeeAndDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
