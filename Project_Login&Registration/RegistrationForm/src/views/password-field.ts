import { nextTick, Validator } from '../utils';
import { ValidateRule } from '../types';
import template from './password-field.template';
import { RequireRule } from '../constant';
import { CoreField } from './core-field';

enum StrongLevel {
  None = 0,
  Light,
  Medium,
  Havey,
}

type Props = {
  id: string;
  label: string;
  text?: string;
  require?: boolean;
  placeholder?: string;
  strong?: StrongLevel;
}

const StrongMessage: [string, string, string, string] = [
  '금지된 수준',
  '심각한 수준',
  '보통 수준',
  '강력한 암호',
];

const DefaultProps: Props = {
  id: '',
  label: 'label',
  text: '',
  require: true,
  placeholder: '',
  strong: StrongLevel.None,
};

export default class PasswordField extends CoreField {
  private data: Props;
  private updated: boolean = false;

  constructor(container: string, parentContainer: string, data: Props) {
    super(template, container , parentContainer);
    this.data = { ...DefaultProps, ...data };

    if (this.data.require) {
      this.addValidateRule(RequireRule);
    }

    nextTick(this.attachEventHandler);
  }
  
  private attachEventHandler = () => {
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
    const strongLevel = this.getStrongLevel();
    
    return {
      ...this.data, 
      updated: this.updated,
      valid: this.updated ? !isInvalid : true,
      strongMessage: strongLevel < 0 ? '' : StrongMessage[strongLevel],
      strongLevel0: strongLevel >= 1,
      strongLevel1: strongLevel >= 2,
      strongLevel2: strongLevel >= 3,
      strongLevel3: strongLevel >= 4,
    };
  }

  private getStrongLevel = () => {
    let strongLevel = -1;

    if (this.data.text!.length > 0)   strongLevel++;
    if (this.data.text!.length > 12)  strongLevel++;
    if (/[!@#$%^&*()]/.test(this.data.text!)) strongLevel++;
    if (/\d/.test(this.data.text!))   strongLevel++;
    return strongLevel;
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
