import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { OrderPresenter } from './order.presenter';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(@Query('walletId') walletId: string) {
    const orders = await this.ordersService.findAll({
      walletId,
    });
    return orders.map((order) => new OrderPresenter(order));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
