import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { OrdersService } from './orders.service';
import { OrderType } from './entities/order.entity';

interface PayloadProps {
  assetId: string;
  walletId: string;
  type: OrderType;
  shares: number;
  price: number;
}
@WebSocketGateway({ cors: true })
export class OrdersGateway {
  constructor(private ordersService: OrdersService) {}
  @SubscribeMessage('orders/create')
  async handleMessage(client: any, payload: PayloadProps) {
    const order = await this.ordersService.create({
      assetId: payload.assetId,
      walletId: payload.walletId,
      type: payload.type,
      shares: payload.shares,
      price: payload.price,
    });
    return order;
  }
}
