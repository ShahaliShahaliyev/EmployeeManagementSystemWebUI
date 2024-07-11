import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeUserDialogComponent } from './authorize-user-dialog.component';

describe('AuthorizeUserDialogComponent', () => {
  let component: AuthorizeUserDialogComponent;
  let fixture: ComponentFixture<AuthorizeUserDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizeUserDialogComponent]
    });
    fixture = TestBed.createComponent(AuthorizeUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
