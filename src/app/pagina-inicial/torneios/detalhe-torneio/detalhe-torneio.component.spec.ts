import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheTorneioComponent } from './detalhe-torneio.component';

describe('DetalheTorneioComponent', () => {
  let component: DetalheTorneioComponent;
  let fixture: ComponentFixture<DetalheTorneioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheTorneioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheTorneioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
