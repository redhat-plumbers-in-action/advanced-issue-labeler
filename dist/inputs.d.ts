import { TInputs } from './types.d';
export declare class Inputs {
    private _template?;
    private _section?;
    private _blockList?;
    constructor(inputs: TInputs);
    get template(): string | undefined;
    set template(template: string | undefined);
    get section(): string | undefined;
    set section(section: string | undefined);
    get blockList(): string[] | undefined;
    set blockList(blockList: string[] | undefined);
}
