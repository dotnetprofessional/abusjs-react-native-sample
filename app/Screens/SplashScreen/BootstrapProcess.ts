import { Bootstrap } from "../../Config/Store";
import { Host } from '../../Host';
import { WorkflowContext } from '../../Infrastructure/Workflow';

export class BootstrapProcess {
    public static Actions = {
        complete: "complete",
        error: "error"
    }
    public static processName = "BootstrapProcess";
    public context: WorkflowContext;

    //@handler(NavigationCommand.TYPE)
    async executeAsync(store: Bootstrap) {
        for (let p = 0; p < 10; p++) {
            await Host.sleep(100);
            store.percerntComplete += 10;
        }
        this.context.workflowResult(BootstrapProcess.Actions.complete);
    }
}