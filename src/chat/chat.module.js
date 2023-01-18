"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatModule = void 0;
var common_1 = require("@nestjs/common");
var chat_gateway_1 = require("./chat.gateway");
var chat_service_1 = require("./chat.service");
var typeorm_1 = require("@nestjs/typeorm");
var chat_message_entity_1 = require("./chat-message.entity");
var chat_controller_1 = require("./chat.controller");
var ChatModule = /** @class */ (function () {
    function ChatModule() {
    }
    ChatModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([chat_message_entity_1.ChatMessageEntity])],
            providers: [chat_gateway_1.ChatGateway, chat_service_1.ChatService],
            controllers: [chat_controller_1.ChatController]
        })
    ], ChatModule);
    return ChatModule;
}());
exports.ChatModule = ChatModule;
