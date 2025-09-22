import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { BillsModule } from './bills/bills.module';
import { AiModule } from './ai/ai.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 👇 Load your .env from the database folder
    ConfigModule.forRoot({
      envFilePath: 'C:/Users/Admin/Desktop/Python/DueMinder/database/.env',
      isGlobal: true,
    }),
    PrismaModule,
    BillsModule,
    AiModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
