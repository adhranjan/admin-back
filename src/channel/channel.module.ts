import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { Channel, ChannelSchema } from './channel.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }], "admin")
  ],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
