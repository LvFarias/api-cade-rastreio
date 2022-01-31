import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export class Hash {
    static async generateKey(value: string): Promise<string> {
        return crypto.createHash('md5').update(value).digest("hex");
    }
    
    static createCode(digits: number = parseInt(process.env.TOKEN_DIGITS)): string {
        return (Math.random() + 1).toString(36).substring(digits);
    }

    static async encryptPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    static async comparePassword(password: string, pwdFromDb: string): Promise<boolean> {
        return bcrypt.compare(password, pwdFromDb);
    }
}