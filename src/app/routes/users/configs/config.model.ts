import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { UserModel } from '../user.model';

@Table({ modelName: 'UserConfigs', tableName: 'UserConfigs' })
export class UserConfigModel extends Model {
    @Column
    @ApiProperty()
    syncTime: number;

    @Column
    @ApiProperty()
    notifSms: boolean;

    @Column
    @ApiProperty()
    notifPush: boolean;

    @Column
    @ApiProperty()
    notifEmail: boolean;

    @ApiProperty()
    user_id: Number;

    @BelongsTo(() => UserModel, 'user_id')
    user: UserModel;
}