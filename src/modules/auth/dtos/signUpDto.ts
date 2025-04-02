import { ApiProperty } from "@nestjs/swagger";
import { Matches, Min, MinLength } from "class-validator";

export class SignUpDto {

    @ApiProperty({
        example:"ahmed"
    })
    @MinLength(3) 
    name: string;
    @ApiProperty({
        example:"ahmed@gmail.com"
    })
    @Matches(/^[a-zA-Z0-9]+@gmail.com$/)
    email:string;
    @ApiProperty({
        example:"Aa252002"
    })
    @MinLength(8)
    password:string;
    @ApiProperty({
        example:55000
    })
    salary: number;

    @ApiProperty({
        example:27
    })
    @Min(24)
    age: number;

}
