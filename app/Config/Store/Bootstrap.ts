import {observable} from "mobx";

export class Bootstrap {
    constructor() {
        this.isInitialized = false;
        this.displayMessage = "";
        this.percerntComplete = 0;
    }
    @observable isInitialized: boolean;
    @observable displayMessage: string;
    @observable percerntComplete: number;
}