import { IsArray, IsString, MinLength, ValidateIf } from 'class-validator';

import { TInputs } from './types.d';

export class Inputs {
  @ValidateIf(instance => instance._template)
  @IsString()
  @MinLength(1)
  private _template?: string | undefined;

  @IsString()
  @MinLength(1)
  private _section?: string | undefined;

  @ValidateIf(instance => instance._blockList)
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  private _blockList?: string[] | undefined;

  constructor(inputs: TInputs) {
    this._template = inputs?.template;
    this._section = inputs?.section;
    this._blockList = inputs?.blockList;
  }

  get template() {
    return this._template;
  }

  get section() {
    return this._section;
  }

  get blockList() {
    return this._blockList;
  }
}
