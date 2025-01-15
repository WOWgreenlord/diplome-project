import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MouserOrderService } from '../../services/mouser-order.service';
import { MouserCartService } from '../../services/mouser-cart.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  mouserOrder = inject(MouserOrderService);
  mouserCart = inject(MouserCartService);
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  cartData: any;
  orderFormGroup!: FormGroup;
  ngOnInit(): void {
    this.mouserCart.cart$.subscribe((data) => {
      this.cartData = data;
    });

    this.orderFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressOne: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      paymentMethod: ['', Validators.required],
    });
  }

  // Добавляем геттеры для всех полей формы
  get firstName() {
    return this.orderFormGroup.get('firstName')!;
  }

  get lastName() {
    return this.orderFormGroup.get('lastName')!;
  }

  get addressOne() {
    return this.orderFormGroup.get('addressOne')!;
  }

  get city() {
    return this.orderFormGroup.get('city')!;
  }

  get state() {
    return this.orderFormGroup.get('state')!;
  }

  get postalCode() {
    return this.orderFormGroup.get('postalCode')!;
  }

  get email() {
    return this.orderFormGroup.get('email')!;
  }

  get phone() {
    return this.orderFormGroup.get('phone')!;
  }

  onSubmit(): void {
    const requestData = {
      Order: {
        ShippingAddress: this.orderFormGroup.value,
        Payment: {
          Method: this.orderFormGroup.value.paymentMethod,
        },
        CartKey: '4f14c1fc-66a3-4e19-9511-c7ebbee14279',
        SubmitOrder: true,
      },
    };

    this.mouserOrder.createOrder(requestData).subscribe({
      next: (response) => {
        console.log('Заказ успешно оформлен:', response);
        alert('Заказ успешно оформлен!');

        // Сохраняем данные о заказе в AuthService
        this.auth.setLastOrder({
          orderDetails: response,
          cartItems: this.cartData,
        });

        this.router.navigate(['/profile']); // Перенаправляем на профиль
      },
      error: (error) => {
        console.error('Ошибка при оформлении заказа:', error);
        alert('Произошла ошибка при оформлении заказа.');
      },
    });
  }

  orderForm = {
    shippingAddress: {
      AddressLocationTypeID: 'Residential',
      CountryCode: 'US',
      FirstName: '',
      LastName: '',
      AddressOne: '',
      AddressTwo: '',
      City: '',
      StateOrProvince: '',
      PostalCode: '',
      PhoneNumber: '',
      EmailAddress: '',
    },
    payment: {
      Method: 0, // 0 — Credit card, 1 — PayPal (например)
    },
    cartKey: '4f14c1fc-66a3-4e19-9511-c7ebbee14279',
    currencyCode: 'USD',
    languageCode: 'RU',
  };
}
