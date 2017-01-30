import { IMessage, MessageHandlerContext, IMessageTask } from 'abus'

class Node {
    message: IMessage<any>;
    nodes: Node[];
}

export class Tracking {
    private static __history: any = {}
    private static __keyLookup: any = {}

    static track(message: IMessage<any>) {
        let h = this.__history;
        let metatData = message.metaData;

        let node: Node = { message, nodes: [] };

        let conversation = h[metatData.conversationId] as Node;
        if (!conversation) {
            // First message for this conversation so add it to the root
            conversation = node;
            // Record the root message node against its conversation
            h[metatData.conversationId] = node;
        } else {
            // This is a message that's part of an existing conversation
            // Lookup the parent message to associate this message with
            let parent = this.__keyLookup[message.metaData.correlationId] as Node;
            // Add this message as child of the parent
            parent.nodes.push(node);
        }

        // Record each message so that its easy to find it later
        this.__keyLookup[message.metaData.messageId] = node;

    }

    static clear() {
        Tracking.__history = [];
    }

    static display() {
        debugger;
        for (let property in this.__history) {
            if (this.__history.hasOwnProperty(property)) {
                let writer = new TextWriter();
                Tracking.printNode(this.__history[property], "", false, writer);
                console.log(writer.display());
            }
        }
    }

    private static printNode(node: Node, indent: string, last: boolean, writer: TextWriter) {

        writer.write(indent);
        if (last) {
            writer.write("\\-");
            indent += "  ";
        }
        else {
            writer.write("|-");
            indent += "| ";
        }
        writer.write(node.message.type);
        let message: any = node.message.message;
        switch(node.message.type) {
            case "NavigationCommand":
            case "OpenDialogCommand":
                writer.writeLine(` (${message.name})`);
                break;
            case "WorkflowResultCommand":
                writer.writeLine(` (${message.process}:${message.action})`);
                break;

        }
        for (let i = 0; i < node.nodes.length; i++)
            Tracking.printNode(node.nodes[i], indent, i == node.nodes.length - 1, writer);
    }
}

class TextWriter {
    private lines:string[] = [];

    write(text: string) {
        this.lines.push(text);
    }

    writeLine(text:string) {
        this.lines.push(text + "\r\n");
    }

    display() {
        return this.lines.join("");
    }
}
export class TrackMessagesTask implements IMessageTask {
    async invokeAsync(message: IMessage<any>, context: MessageHandlerContext, next: any) {

        Tracking.track(message);
        await next();
    }
}
