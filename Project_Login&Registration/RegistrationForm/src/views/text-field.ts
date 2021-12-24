import { nextTick } from '../utils';
import { ValidateRule } from '../types';
import template from './text-field.template';
import { RequireRule } from '../constant';
import {CoreField} from './core-field'
import {Validator} from '../utils';

type Props = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number';
  placeholder?: string;
  text?: string;
  require: boolean;
}

const DefaultProps: Props = {
  id: '',
  text: '',
  label: 'label',
  type: 'text',
  placeholder: '',
  require: false,
};

export default class TextField extends CoreField{
  private data: Props;
  private updated: boolean = false;
  
  constructor(Container: string, parentContainer: string, data: Props) {
    super(template, Container, parentContainer);
    this.data = { ...DefaultProps, ...data };

    if (this.data.require) {
      this.addValidateRule(RequireRule);
    }

    nextTick(this.attachHandlerToParent);
  }

  private attachHandlerToParent = () => {
    document.querySelector(this.parentContainer)?.addEventListener('change', this.onChange);
  }

  private onChange = (e: Event) => {
    const { value, id } = e.target as HTMLInputElement;
  
    if (id === this.data.id) {
      this.updated = true;
      this.data.text = value; 
      this.updateElement();
    }
  }

  protected buildData = () => {
    const targetText = this.data.text;
    const isInvalid: ValidateRule | null = this.validate(targetText);

    if (this.updated) {
      return {
        ...this.data, 
        updated: this.updated,
        valid: !isInvalid,
        validateMessage: !!isInvalid ? isInvalid.message : ''
      }
    } else {
      return {
        ...this.data, 
        updated: this.updated,
        valid: true,
        validateMessage: ''
      }
    }
  }

  public get name(): string {
    return this.data.id;
  }

  public get value(): string {
    return this.data.text || '';
  }

  public get isValid(): boolean {
    const targetText = this.data.text;
    return !this.validate(targetText);
  }
}
