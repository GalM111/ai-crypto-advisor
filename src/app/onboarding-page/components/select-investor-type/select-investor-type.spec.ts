import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInvestorType } from './select-investor-type';

describe('SelectInvestorType', () => {
  let component: SelectInvestorType;
  let fixture: ComponentFixture<SelectInvestorType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectInvestorType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectInvestorType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
