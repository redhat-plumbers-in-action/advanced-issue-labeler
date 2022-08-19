var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsArray, IsString, MinLength, ValidateIf } from 'class-validator';
export class Inputs {
    constructor(inputs) {
        this._template = inputs === null || inputs === void 0 ? void 0 : inputs.template;
        this._section = inputs === null || inputs === void 0 ? void 0 : inputs.section;
        this._blockList = inputs === null || inputs === void 0 ? void 0 : inputs.blockList;
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
__decorate([
    ValidateIf(instance => instance._template),
    IsString(),
    MinLength(1)
], Inputs.prototype, "_template", void 0);
__decorate([
    IsString(),
    MinLength(1)
], Inputs.prototype, "_section", void 0);
__decorate([
    ValidateIf(instance => instance._blockList),
    IsArray(),
    IsString({ each: true }),
    MinLength(1, { each: true })
], Inputs.prototype, "_blockList", void 0);
//# sourceMappingURL=inputs.js.map