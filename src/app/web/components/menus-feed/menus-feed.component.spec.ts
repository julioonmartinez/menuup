import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusFeedComponent } from './menus-feed.component';

describe('MenusFeedComponent', () => {
  let component: MenusFeedComponent;
  let fixture: ComponentFixture<MenusFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenusFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenusFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
