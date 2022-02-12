import AuthModule from './auth/auth.module';
import DeliveryModule from './deliveries/delivery.module';
import OrderModule from './orders/order.module';
import UserModule from './users/user.module';

export const routeModules = [
    AuthModule,
    DeliveryModule,
    OrderModule,
    UserModule,
];

export default routeModules;