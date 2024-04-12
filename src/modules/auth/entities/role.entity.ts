import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Role {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  permissions: string[];
}
