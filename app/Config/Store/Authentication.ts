import {observable} from "mobx";

export class Authentication {
    username: string;
    isAuthenticated: boolean;
    @observable displayMessage: string;
}