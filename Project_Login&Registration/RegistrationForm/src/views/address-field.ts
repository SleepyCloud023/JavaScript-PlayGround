import template from './address-field.template';
import { AnyObject, DaumAddress } from '../types';
import { InputField } from './field';
import { nextTick } from '../utils';

type Props = {
  id: string;
  label: string;
  require?: boolean;
}

const DefaultProps: Props = {
  id: '',
  label: 'label',
  require: false,
};

export default class AddressField extends InputField {
  private data: Props;

  private address1?: string;
  private zipcode?: string;

  constructor(container: string, parentContainer: string, data: Props) {
    super(template, container, parentContainer);
    this.data = { ...DefaultProps, ...data };

    nextTick(this.attachHandlerToSearchButton);
  }

  private attachHandlerToSearchButton = () => {
    const addressElement = document.querySelector(this.container);
    const searchButton = addressElement?.querySelector('#search-address');
    const upperAddress = addressElement?.querySelector('#address1') as HTMLInputElement;

    searchButton?.addEventListener('click', () => {
      new window.daum.Postcode({
        oncomplete: (data: DaumAddress) => {
          this.address1 = data.roadAddress;          
          this.zipcode = data.sigunguCode;
          
          upperAddress.value = `(${this.zipcode}) ${this.address1}`;
        }
      }).open();  
    });
  }
  
  protected buildData(): AnyObject {
      return this.data;
  }
  public get isValid(): boolean {
    return true;
  }

  public get name(): string {
    return this.data.id;
  }

  public get value(): string {
    const container = document.querySelector(this.container) as HTMLElement;
    const address2 = (container.querySelector('#address2') as HTMLInputElement)?.value;

    return `${this.zipcode}|${this.address1} ${address2 || ''}`;
  }
}
