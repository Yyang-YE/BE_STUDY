import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from '@nestjs/core';
import { Observable } from "rxjs";
import { JwtPayload } from "src/interfaces/jwt.payload";

@Injectable()
export class AccessGuard extends AuthGuard('access') {
    // constructor(private readonly reflector: Reflector) {
    //     super();
    // }

    // canActivate(
    //     context: ExecutionContext,
    // ): boolean | Promise<boolean> | Observable<boolean> {
    //     //요청 컨텍스트에서 권한을 가져옴
    //     const roles = this.reflector.get<string[]>('roles', context.getHandler());
    //     if (!roles) {
    //         //권한이 설정되지 않은 경우, 모든 요청을 허용
    //         return true;
    //     }
    //     //인증된 사용자의 정보를 추출
    //     const request = context.switchToHttp().getRequest();
    //     const user: JwtPayload = request.user;

    //     //사용자의 권한과 요청에 필요한 권한을 비교
    //     const hasPermission = () => roles.includes(user.role);
    //     return user && user.role && hasPermission();
        
    // }
}

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//     constructor(private reflector: Reflector) {
//         super();
//     }

//     canActivate(context: ExecutionContext): {
//         const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//             context.getHandler(),
//             context.getClass(),
//         ]);
//         if (isPublic) {
//             return true;
//         }
//         return super.canActivate(context);
//     }
// }