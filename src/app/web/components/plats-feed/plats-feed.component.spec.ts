import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatsFeedComponent } from './plats-feed.component';

describe('PlatsFeedComponent', () => {
  let component: PlatsFeedComponent;
  let fixture: ComponentFixture<PlatsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatsFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
