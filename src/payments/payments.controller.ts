import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express'; // Need express types for redirect
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout')
  @ApiOperation({ summary: 'Create Stripe Checkout Session' })
  async createCheckout(@Body() body: CreateCheckoutDto) {
    const session = await this.paymentsService.createCheckoutSession(body.priceId, body.mode);
    return { url: session.url };
  }

  @Get('success')
  @ApiOperation({ summary: 'Payment Success Callback' })
  handleSuccess() {
    return {
      message: 'Payment Successful!',
      status: 'paid',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('cancel')
  @ApiOperation({ summary: 'Payment Cancel Callback' })
  handleCancel() {
    return {
      message: 'Payment Cancelled by User',
      status: 'cancelled',
      timestamp: new Date().toISOString(),
    };
  }
}