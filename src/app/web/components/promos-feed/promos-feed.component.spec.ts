import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromosFeedComponent } from './promos-feed.component';

describe('PromosFeedComponent', () => {
  let component: PromosFeedComponent;
  let fixture: ComponentFixture<PromosFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromosFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromosFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
