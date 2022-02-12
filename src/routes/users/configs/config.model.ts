import { ApiProperty } from '@nestjs/swagger';
import UserModel from '@routes/users/user.model';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'UserConfigs', tableName: 'UserConfigs' })
export default class UserConfigModel extends Model {
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