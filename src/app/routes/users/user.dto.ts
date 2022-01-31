import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { UserConfigModel } from './configs/config.model';
import { UserModel } from './user.model';

export class EditUSerDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(45)
    @ApiProperty({ minLength: 4, maxLength: 45 })
    name: string;
}

export class UserConfigDTO {
    @IsNumber()
    @IsIn([15, 30, 60, 120])
    @ApiProperty({ enum: [15, 30, 60, 120] })
    syncTime: number;

    @IsBoolean()
    @ApiProperty()
    notifSms: boolean;

    @IsBoolean()
    @ApiProperty()
    notifPush: boolean;

    @IsBoolean()
    @ApiProperty()
    notifEmail: boolean;
}

export class UserDTO {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    config?: UserConfigDTO;

    fromDb(user: UserModel): UserDTO {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        return this;
    }

    withConfig(config: UserConfigModel): UserDTO {
        this.config = new UserConfigDTO();
        this.config.syncTime = config.syncTime;
        this.config.notifSms = config.notifSms;
        this.config.notifPush = config.notifPush;
        this.config.notifEmail = config.notifEmail;
        return this;
    }
}