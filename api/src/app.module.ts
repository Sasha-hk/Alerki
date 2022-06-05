import { Module } from '@nestjs/common';
import { AuthModule } from '@Module/auth/auth.module';
import { UserModule } from '@Module/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
})
export class AppModule {}
