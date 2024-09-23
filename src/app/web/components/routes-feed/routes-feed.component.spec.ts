import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesFeedComponent } from './routes-feed.component';

describe('RoutesFeedComponent', () => {
  let component: RoutesFeedComponent;
  let fixture: ComponentFixture<RoutesFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
