import { ApiProperty } from "@nestjs/swagger";

export class SignInDto{
    @ApiProperty({
        example:"ahmed@gmail.com"
    })
    email:string;
    @ApiProperty({
        example:"Aa252002"
    })
    password:string;
}

