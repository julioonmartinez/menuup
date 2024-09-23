import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingFeedComponent } from './trending-feed.component';

describe('TrendingFeedComponent', () => {
  let component: TrendingFeedComponent;
  let fixture: ComponentFixture<TrendingFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
