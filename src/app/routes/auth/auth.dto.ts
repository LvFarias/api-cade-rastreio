import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Match } from 'src/app/decorators/match.decorator';

const tokenDigits = parseInt(process.env.TOKEN_DIGITS);

export class RegisterDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(45)
    @ApiProperty({ minLength: 4, maxLength: 45 })
    name: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(45)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/, { message: 'password too weak' })
    @ApiProperty({ minLength: 6, maxLength: 45 })
    password: string;

    @IsString()
    @MinLength(6)
    @MaxLength(45)
    @Match(RegisterDTO, (r) => r.password)
    @ApiProperty({ minLength: 6, maxLength: 45 })
    repassword: string;
}

export class ForgotPasswordDTO extends PartialType(
    PickType(RegisterDTO, ['email'] as const),
) { }

export class ChangePasswordDTO extends PartialType(
    PickType(RegisterDTO, ['email', 'password', 'repassword'] as const),
) {
    @IsString()
    @ApiProperty()
    token: string;
}

export class LoginDTO extends PartialType(
    PickType(RegisterDTO, ['email', 'password'] as const),
) { }

export class AuthUserDTO {
    id: number;
    name: string;
    email: string;
    jwt: string;

    fromUser(user: any): AuthUserDTO {
        this.id = user.id;
        this.jwt = user.jwt;
        this.name = user.name;
        this.email = user.email;
        return this;
    }
}