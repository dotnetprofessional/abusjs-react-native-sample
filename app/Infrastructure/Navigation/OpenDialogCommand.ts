import { IMessage } from "abus";
import { NavigationRequest } from "./NavigationRequest";

export class OpenDialogCommand implements IMessage<NavigationRequest> {
    static TYPE = "OpenDialogCommand";

    constructor(name: string, data?: any) {
        this.message = new NavigationRequest();
        this.message.name = name;
        this.message.data = data;
    }
    type = OpenDialogCommand.TYPE;
    message: NavigationRequest;
}