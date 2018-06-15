import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTorneiosComponent } from './lista-torneios.component';

describe('ListaTorneiosComponent', () => {
  let component: ListaTorneiosComponent;
  let fixture: ComponentFixture<ListaTorneiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTorneiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTorneiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
