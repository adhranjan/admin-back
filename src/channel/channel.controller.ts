import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelService } from './channel.service';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelsService: ChannelService) {}

  @Post()
  create(@Body() dto: CreateChannelDto) {
    return this.channelsService.create(dto);
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.channelsService.findOne(code);
  }


  @Get()
  findAll() {
    return this.channelsService.findAll();
  }

  @Put(':code')
  update(@Param('code') code: string, @Body() dto: UpdateChannelDto) {
    return this.channelsService.update(code, dto);
  }
}
