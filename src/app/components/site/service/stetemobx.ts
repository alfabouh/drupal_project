import { action, observable } from "mobx";

export class MobXStates {
    @observable
    public popupState: number = -1;
    @observable
    public isShownPopup: boolean = false;
    @observable
    public mobileMenuOpened: boolean = false;

    public isWainig(): boolean {
        return this.popupState === -1;
    }

    @action
    public openMobileMenu(): void {
        this.mobileMenuOpened = true;
    }

    @action
    public closeMobileMenu(): void {
        this.mobileMenuOpened = false;
    }

    public isMobileMenuOpened(): boolean {
        return this.mobileMenuOpened;
    }

    public isPopupShown(): boolean {
        return this.isShownPopup;
    }

    @action
    public show(): void {
        this.isShownPopup = true;
    }

    @action
    public hide(): void {
        this.isShownPopup = false;
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