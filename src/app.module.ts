require('dotenv').config();
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { FaqModule } from './modules/faq/faq.module';
import { CommonCodeModule } from './modules/common-code/common-code.module';
import { getMetadataArgsStorage } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ProformaConsultResultV3Module } from './modules/proforma-consult-result-v3/proforma-consult-result-v3.module';
import { ConsultResultV3Module } from './modules/consult-result-v3/consult-result-v3.module';
const env = process.env;
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // schema.gql will automatically be created
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    // platform db
    TypeOrmModule.forRoot({
      name: 'platform',
      type: 'mysql' as 'mysql',
      host: env.PLATFORM_DB_HOST,
      port: Number(env.PLATFORM_DB_PORT),
      username: env.PLATFORM_DB_USERNAME,
      password: env.PLATFORM_DB_PASSWORD,
      database: env.PLATFORM_DB_DATABASE,
      // won't need to keep alive
      //   keepConnectionAlive: true,
      bigNumberStrings: false,
      supportBigNumbers: false,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),

      // migrations: [],
      // cli: {},
      // subscribers: [],
      //   Do not turn to true!!!!
      synchronize: false,
    }),
    AuthModule,
    FaqModule,
    CommonCodeModule,
    ConsultResultV3Module,
    ProformaConsultResultV3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
