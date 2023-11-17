import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

import { TInputs } from './types.d';

export class Inputs {
  @IsOptional()
  @IsString()
  @MinLength(1)
  private _template?: string | undefined;

  @IsString()
  @MinLength(1)
  private _section?: string | undefined;

  @IsOptional()
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

  set template(template: string | undefined) {
    this._template = template;
  }

  get section() {
    return this._section;
  }

  set section(section: string | undefined) {
    this._section = section;
  }

  get blockList() {
    return this._blockList;
  }

  set blockList(blockList: string[] | undefined) {
    this._blockList = blockList;
  }
}
