import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPdfViewComponent } from './user-pdf-view.component';

describe('UserPdfViewComponent', () => {
  let component: UserPdfViewComponent;
  let fixture: ComponentFixture<UserPdfViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPdfViewComponent]
    });
    fixture = TestBed.createComponent(UserPdfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
