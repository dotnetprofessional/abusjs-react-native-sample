import {IMessage} from "abus";
import {NavigationRequest} from './NavigationRequest';

export class NavigationCommand implements IMessage<NavigationRequest> {
    static TYPE = "NavigationCommand";

    constructor(screen: string) {
        this.message = new NavigationRequest();
        this.message.screen = screen;
    }
    type = NavigationCommand.TYPE;
    message: NavigationRequest;
}