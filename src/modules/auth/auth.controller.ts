import { Body, Controller, Patch, Post } from "@nestjs/common";
import { SignUpDto } from "./dtos/signUpDto";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dtos/signInDto";


@Controller("/auth")
export class AuthController{
    constructor(private readonly authService:AuthService){}

    @Post("/register")
        async signUp(@Body() data:SignUpDto){
            return await this.authService.signUp(data);
        }
    @Patch("/login")
    async signIn(@Body() info:SignInDto){
        return await this.authService.signIn(info);
    }

}