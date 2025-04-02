import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TeacherDocument = HydratedDocument<Teacher>

@Schema()
export class Teacher{
    @Prop()
    name:string;
    @Prop({
        unique:true
    })
    email:string;
    @Prop({
        minlength:8
    })
    password:string;
    @Prop()
    salary:number;
    @Prop()
    age:number;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);