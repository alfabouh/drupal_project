import { action, observable } from "mobx";

export class PopupState {
    @observable
    public popupState: number = -1;
    @observable
    public isShown: boolean = false;

    public isWainig(): boolean {
        return this.popupState === -1;
    }

    @action
    public show(): void {
        this.isShown = true;
    }

    @action
    public hide(): void {
        this.isShown = false;
        this.popupState = -1;
    }

    @action
    public sending(): void {
        this.popupState = 0;
    }

    @action
    public waiting(): void {
        this.popupState = -1;
    }
}