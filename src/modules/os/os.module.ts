
    import { Module } from '@nestjs/common';
    import { OsService } from './os.service';
    import { OsController } from './os.controller';
    
    @Module({
      providers: [OsService],
      controllers: [OsController]
    })
    export class OsModule {}
    