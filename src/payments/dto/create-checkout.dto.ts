import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutDto {
  @ApiProperty({ 
    example: 'price_1SYiTLCkhbR4teIojlNTKUfl', 
    description: 'The Stripe Price ID' 
  })
  @IsString()
  @IsNotEmpty()
  priceId: string;

  @ApiProperty({ 
    enum: ['payment', 'subscription'], 
    default: 'subscription',
    description: 'Use "subscription" for recurring prices, "payment" for one-time'
  })
  @IsEnum(['payment', 'subscription'])
  @IsOptional()
  mode?: 'payment' | 'subscription';
}