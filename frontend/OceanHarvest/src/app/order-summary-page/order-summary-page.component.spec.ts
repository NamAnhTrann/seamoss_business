import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryPageComponent } from './order-summary-page.component';

describe('OrderSummaryPageComponent', () => {
  let component: OrderSummaryPageComponent;
  let fixture: ComponentFixture<OrderSummaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSummaryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
