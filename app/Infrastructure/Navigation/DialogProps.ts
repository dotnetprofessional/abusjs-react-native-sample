import {DialogContext} from './DialogContext';

export class DialogProps<S> {
    context: DialogContext;
    data?: any;
    store: S;
}