import { LoginStrategy } from './login.guard';
import { UserStrategy } from './user.guard';

export const rootStrategies = [
    LoginStrategy,
    UserStrategy,
];

export default rootStrategies;