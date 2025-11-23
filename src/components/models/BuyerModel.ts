import { IBuyer, TPayment, ValidationErrors } from "../../types";


/**
 * Модель для работы с данными покупателя
 * Обеспечивает хранение, установку, получение и валидацию данных покупателя
 */
export class BuyerModel {
  private data: IBuyer;

  /**
   * Создаёт экземпляр модели покупателя
   * Изначально способ оплаты не выбран (`not_selected`)
   */
  constructor() {
    this.data = {
      payment: 'not_selected',
      email: '',
      phone: '',
      address: ''
    };
  }

  /**
   * Устанавливает данные покупателя
   * @param data - полный объект IBuyer с заполненными полями
   * @throws {Error} Если data не является объектом или отсутствуют обязательные поля
   */
  setData(data: IBuyer): void {
    if (!data || typeof data !== "object") {
      throw new Error("Не объект");
    }

    // Проверяем обязательные строковые поля
    if (!data.email) {
      throw new Error("Email обязателен для заполнения");
    }
    if (!data.phone) {
      throw new Error("Телефон обязателен для заполнения");
    }
    if (!data.address) {
      throw new Error("Адрес обязателен для заполнения");
    }

    // payment должен быть одним из допустимых значений TPayment
    if (!['cash', 'card', 'not_selected'].includes(data.payment)) {
      throw new Error("Недопустимое значение payment");
    }

    this.data = data;
  }

  /**
   * Возвращает текущие данные покупателя
   * @returns {IBuyer} Полный объект с данными покупателя
   */
  getData(): IBuyer {
    return this.data;
  }

  /**
   * Валидирует данные покупателя
   * @returns {ValidationErrors} Объект с сообщениями об ошибках (пустой, если всё валидно)
   */
  validate(): ValidationErrors {
    const errors: ValidationErrors = {};

    if (this.data.payment === 'not_selected') {
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

  /**
   * Очищает все данные покупателя
   * Устанавливает payment в 'not_selected', остальные поля — в пустые строки
   */
  clear(): void {
    this.data = {
      payment: 'not_selected',
      email: '',
      phone: '',
      address: ''
    };
  }
}
