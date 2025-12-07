import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";
import { IEvents } from "../base/Events";
import { CDN_URL } from "../../utils/constants";
import { categoryMap } from "../../utils/constants";

interface ICardCatalogData {
  image: string;
  category: string;
  title: string;
  price: number | null;
}

interface ICardCatalogActions {
  onClick: (event: MouseEvent) => void;
}

export class CardCatalog extends Card<ICardCatalogData> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected button: HTMLButtonElement;

  // Поле для хранения ID (вместо data-атрибута)
  private _id: string = '';

  constructor(container: HTMLElement, actions?: ICardCatalogActions) {
    super(container, actions);

    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );
    this.button = this.container as HTMLButtonElement;
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      const shouldHaveClass = key === value;
      this.categoryElement.classList.toggle(
        categoryMap[key as keyof typeof categoryMap],
        shouldHaveClass
      );
    }
  }

  set image(value: string) {
    const fullImagePath = CDN_URL + value;
    this.setImage(this.imageElement, fullImagePath, this.title);
  }

  /**
   * Устанавливает ID товара, сохраняя его во внутреннем свойстве класса.
   * @param {string} value - ID товара.
   */
  set id(value: string) {
    this._id = value;
  }

  /**
   * Возвращает ID товара из внутреннего свойства класса.
   * @returns {string} ID товара.
   */
  get id(): string {
    return this._id;
  }
}
