import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTorneiosComponent } from './form-torneios.component';

describe('FormTorneiosComponent', () => {
  let component: FormTorneiosComponent;
  let fixture: ComponentFixture<FormTorneiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTorneiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTorneiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
