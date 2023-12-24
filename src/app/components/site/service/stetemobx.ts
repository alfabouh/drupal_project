import { action, observable } from "mobx";

export class MobXStates {
    @observable
    public popupState: number = -1;
    @observable
    public isShown: boolean = false;
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