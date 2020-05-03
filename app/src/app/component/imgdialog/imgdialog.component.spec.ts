import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgdialogComponent } from './imgdialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('ImgdialogComponent', () => {
  let component: ImgdialogComponent;
  let fixture: ComponentFixture<ImgdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        HttpClientTestingModule,

    ],
      declarations: [ ImgdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
