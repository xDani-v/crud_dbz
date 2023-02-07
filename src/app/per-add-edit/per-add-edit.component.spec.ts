import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerAddEditComponent } from './per-add-edit.component';

describe('PerAddEditComponent', () => {
  let component: PerAddEditComponent;
  let fixture: ComponentFixture<PerAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
