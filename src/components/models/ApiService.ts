import { IApi, IProduct, IOrderData, IOrderResult, IProductListResponse } from "../../types";
import { IEvents } from "../base/Events";

export class ApiService {
  constructor(
    private api: IApi,
    private events: IEvents // Оставляем, т.к. может использоваться в других методах
  ) {}

  async getProductList(): Promise<IProductListResponse> {
    try {
      const response = await this.api.get<IProductListResponse>('/product');
      return response;
    } catch (error) {
      // Сохраняем эмиссию ошибки — это важно для глобального обработчика
      this.events.emit('api:error', { error });
      throw error;
    }
  }

  async submitOrder(order: IOrderData): Promise<IOrderResult> {
    try {
      const result = await this.api.post<IOrderResult>('/order', order);
      return result;
    } catch (error) {
      // Сохраняем эмиссию ошибки — это важно для глобального обработчика
      this.events.emit('api:error', { error });
      throw error;
    }
  }
}
