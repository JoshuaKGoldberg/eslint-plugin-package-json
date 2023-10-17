'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_properties_1 = __importDefault(require("./rules/order-properties"));
const sort_collections_1 = __importDefault(require("./rules/sort-collections"));
const valid_local_dependency_1 = __importDefault(require("./rules/valid-local-dependency"));
const valid_package_def_1 = __importDefault(require("./rules/valid-package-def"));
module.exports = {
    configs: {
        recommended: {
            rules: {
                'order-properties': order_properties_1.default,
                'sort-collections': sort_collections_1.default,
                'valid-local-dependency': valid_local_dependency_1.default,
                'valid-package-def': valid_package_def_1.default
            }
        }
    }
};
