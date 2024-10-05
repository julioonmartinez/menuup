import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalAdminComponent } from './temporal-admin.component';

describe('TemporalAdminComponent', () => {
  let component: TemporalAdminComponent;
  let fixture: ComponentFixture<TemporalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemporalAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemporalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
