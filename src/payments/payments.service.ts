import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);

  constructor() {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
        this.logger.error("❌ STRIPE_SECRET_KEY is missing from .env!");
    }
    this.stripe = new Stripe(apiKey || '', {
      apiVersion: '2025-11-17.clover',
    });
  }

  // Updated signature to accept mode
  async createCheckoutSession(priceId: string, mode: 'payment' | 'subscription' = 'payment') {
    this.logger.log(`Creating ${mode} session for Price ID: ${priceId}`);
    
    if (!priceId) throw new Error("Price ID missing");

    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: mode,
      success_url: 'http://localhost:3000/api/v1/payments/success',
      cancel_url: 'http://localhost:3000/api/v1/payments/cancel',
    });
  }
}