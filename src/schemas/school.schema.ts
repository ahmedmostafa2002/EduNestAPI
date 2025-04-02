import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SchoolDocumnet = HydratedDocument<School>;

@Schema()
export class School {
    @Prop()
    name:string;
    @Prop()
    description:string;
    @Prop()
    teachers:string[];
}

export const SchoolSchema = SchemaFactory.createForClass(School);