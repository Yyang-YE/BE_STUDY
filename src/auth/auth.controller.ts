import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto, SingUpRequestDto } from './dtos/sign.request.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body() signUpDto: SingUpRequestDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post('/signin')
    async signIn(@Body() signInDto: SignInRequestDto) {
        return this.authService.signIn(signInDto);
    }    
}
