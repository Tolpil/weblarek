import { IBuyer, ValidationErrors } from "../../types";
/**
 * Модель для работы с данными покупателя
 */
export class BuyerModel {
  private data: Partial<IBuyer> = {};

  /**
   * Создает экземпляр модели покупателя
   * @param initialData - данные покупателя
   * Передать часть полей
   * @example
   * new CustomerModel({ email: 'test@mail.ru', phone: '+79999999999' })
   */
  constructor(initialData?: Partial<IBuyer>) {
    if (initialData) {
      this.data = { ...initialData };
    }
  }

  setData(data: Partial<IBuyer>): void {
    if (!data || typeof data !== "object") {
      throw new Error("Не объект");
    }
    this.data = { ...this.data, ...data };
  }

  getData(): Partial<IBuyer> {
    return { ...this.data };
  }

  /**
   * Валидирует данные покупателя
   * @returns ошибками валидации
   * Если поле валидно, оно отсутствует в объекте
   */
  validate(): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!this.data.payment) {
      errors.payment = "Не выбран вид оплаты";
    }

    if (!this.data.address) {
      errors.address = "Укажите адрес";
    }

    if (!this.data.phone) {
      errors.phone = "Укажите телефон";
    }

    if (!this.data.email) {
      errors.email = "Укажите email";
    }

    return errors;
  }
  
  clear(): void {
    this.data = {};
  }
}
