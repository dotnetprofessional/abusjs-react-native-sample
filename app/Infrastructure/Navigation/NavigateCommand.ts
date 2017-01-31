import {IMessage} from "abus";
import {NavigationRequest} from './NavigationRequest';

export class NavigationCommand implements IMessage<NavigationRequest> {
    static TYPE = "NavigationCommand";

    constructor(name: string, data?:any) {
        this.message = new NavigationRequest();
        this.message.name = name;
        this.message.data = data;
    }
    type = NavigationCommand.TYPE;
    message: NavigationRequest;
}

