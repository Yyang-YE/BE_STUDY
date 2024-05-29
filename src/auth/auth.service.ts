import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInRequestDto, SingUpRequestDto } from './dtos/sign.request.dto';
import { TokenResponseDto } from './dtos/token.response.dto';
import { JwtPayload } from 'src/interfaces/jwt.payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(signUpDto: SingUpRequestDto) {
        const newUser = await this.userService.addUser(signUpDto);
        if (!newUser) {
            return false;
        }
        return true;
    }

    async signIn(signInDto: SignInRequestDto): Promise<TokenResponseDto> {
        const { email, password } = signInDto;
        const user = await this.userService.findByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException();
        }

        const payload: JwtPayload = { id: user.id };
        const access_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '1h',
        });
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
        await this.userService.updateToken(email, refresh_token);

        return { access_token, refresh_token };
    }
}
