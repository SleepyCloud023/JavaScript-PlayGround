import { AnyObject, ValidateRule } from "../types";
import { Validator } from "../utils";

export abstract class CoreField {
    private template: (data: AnyObject) => string;
    protected container: string;
    protected parentContainer: string;
    private validator: Validator;

    constructor(template: (data: AnyObject) => string, container: string,
                parentContainer:string) {
        this.template = template;
        this.container = container;
        this.parentContainer = parentContainer;
        this.validator = new Validator();
    }

    public addValidateRule(rule: ValidateRule) {
        this.validator.addValidateRule(rule);
    }

    protected validate(targetText: string | undefined){
        return this.validator.validate(targetText);
    }

    public render = (append: boolean = false) => {
        const parentElement = document.querySelector(this.parentContainer) as HTMLElement;
        const htmlContent = this.makeHtml();
        
        if (append) {
            parentElement.insertAdjacentHTML('beforeend', htmlContent);
        } else {
            parentElement.innerHTML = htmlContent;
        }
    }
    
    protected makeHtml(): string {
        return this.template(this.buildData());
    }
    
    protected abstract buildData(): AnyObject;

    // 상속받은 클래스의 EventHandler 콜백 함수 내부에서
    // InputField에 해당하는 HTMLElement를 업데이트하는데 사용
    protected updateElement = () => {
        const targetElement = document.querySelector(this.container) as HTMLElement;
        targetElement.innerHTML = this.makeHtml();
    }
}