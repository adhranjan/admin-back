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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelsService.findOne(id);
  }



  @Get()
  findAll() {
    return this.channelsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChannelDto) {
    return this.channelsService.update(id, dto);
  }
}
