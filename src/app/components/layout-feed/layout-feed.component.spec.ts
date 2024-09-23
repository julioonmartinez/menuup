import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFeedComponent } from './layout-feed.component';

describe('LayoutFeedComponent', () => {
  let component: LayoutFeedComponent;
  let fixture: ComponentFixture<LayoutFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
