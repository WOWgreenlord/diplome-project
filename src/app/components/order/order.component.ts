import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MouserOrderService } from '../../services/mouser-order.service';
import { MouserCartService } from '../../services/mouser-cart.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  mouserOrder = inject(MouserOrderService);
  mouserCart = inject(MouserCartService);
  fb = inject(FormBuilder);
  orderForm?: FormGroup;
  cartData: any;
  ngOnInit(): void {
    this.mouserCart.cart$.subscribe(data => {
      // console.log(data);
      this.cartData = data;
    })
    // Создание формы с полями, которые пользователь будет заполнять
    this.orderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressOne: ['', Validators.required],
      addressTwo: [''],
      city: ['', Validators.required],
      stateOrProvince: ['', Validators.required],
      postalCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
    });
  }
  submitOrder(): void {
    if (this.orderForm?.valid) {
      const orderData = {
        Order: {
          ShippingAddress: {
            AddressLocationTypeID: 'Residential',
            CountryCode: 'US',
            FirstName: this.orderForm.value.firstName,
            LastName: this.orderForm.value.lastName,
            AttentionLine: '',
            Company: '',
            AddressOne: this.orderForm.value.addressOne,
            AddressTwo: this.orderForm.value.addressTwo,
            City: this.orderForm.value.city,
            StateOrProvince: this.orderForm.value.stateOrProvince,
            PostalCode: this.orderForm.value.postalCode,
            PhoneNumber: this.orderForm.value.phoneNumber,
            PhoneExtension: '',
            EmailAddress: this.orderForm.value.emailAddress,
          },
          OrderType: 'Unspecified',
          PrimaryShipping: { Code: 0 },
          SecondaryShipping: { Code: 0 },
          Payment: { Method: 0 },
          CurrencyCode: 'USD',
          CartKey: '4f14c1fc-66a3-4e19-9511-c7ebbee14279',
          LanguageCode: 'ru',
          SubmitOrder: true,
        },
      };

      this.mouserOrder.submitOrder(orderData).subscribe(
        (response) => {
          console.log('Order submitted successfully:', response);
        },
        (error) => {
          console.error('Error submitting order:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
