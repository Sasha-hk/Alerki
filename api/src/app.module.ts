import { Module } from '@nestjs/common';

import { AuthModule } from 'src/module/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
})
export class AppModule {}
