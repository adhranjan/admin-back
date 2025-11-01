import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ChannelModule } from './channel/channel.module';
import { VisibilityModule } from './visibility/visibility.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available globally
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/your_db_name', {
      connectionName:'admin'
    }),
    ProductsModule,
    CategoryModule,
    ChannelModule,
    VisibilityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
