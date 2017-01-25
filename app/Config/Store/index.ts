import { Authentication } from './Authentication'
export { Authentication } from './Authentication'
import { Bootstrap } from './Bootstrap';
export { Bootstrap } from './Bootstrap';


export class Store {
    constructor() {
        this.authentication = new Authentication();
        this.bootStrap = new Bootstrap();
    }

    authentication: Authentication;
    bootStrap: Bootstrap;
}