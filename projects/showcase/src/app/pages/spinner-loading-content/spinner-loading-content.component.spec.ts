import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerLoadingContentComponent } from './spinner-loading-content.component';

describe('SpinnerLoadingContentComponent', () => {
  let component: SpinnerLoadingContentComponent;
  let fixture: ComponentFixture<SpinnerLoadingContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerLoadingContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerLoadingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
