import { Module } from '@nestjs/common';

import { AuthModule } from '@Module/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
})
export class AppModule {}
