import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePrices } from './live-prices';

describe('LivePrices', () => {
  let component: LivePrices;
  let fixture: ComponentFixture<LivePrices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivePrices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivePrices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
