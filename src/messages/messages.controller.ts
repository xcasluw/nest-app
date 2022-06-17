import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message-dto'

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    console.log('get')
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    const { content } = body
    console.log(content)
  }

  @Get('/:id')
  getMessage(@Param() id: String) {
    console.log(id)
  }
}
