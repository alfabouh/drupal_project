import { action, observable } from "mobx";

export class PopupState {
    @observable
    public popupState: number = -1;
    @observable
    public isShown: boolean = false;

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
    public failure(): void {
        this.popupState = 1;
    }

    @action
    public success(): void {
        this.popupState = 2;
    }
}