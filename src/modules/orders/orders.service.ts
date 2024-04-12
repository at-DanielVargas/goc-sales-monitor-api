import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { HttpService } from '@nestjs/axios';
import { MeliAuthService } from '../auth/meli-auth.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly meliAuthService: MeliAuthService,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll() {
    const token = await this.meliAuthService.getAccessToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const urlParams = new URLSearchParams({
      seller: '210292439',
      'order.date_created.from': '2024-04-01T00:00:00Z',
      'order.date_created.to': '2024-04-01T23:59:59Z',
    });
    const url = `https://api.mercadolibre.com/orders/search?${urlParams.toString()}`;

    const response = await this.httpService.get(url, config).toPromise(); // Convert Observable to Promise
    return response.data.results;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
