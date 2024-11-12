import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  //This means that the partial object can contain any subset of the properties defined in the UserEntity class.
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;
  /* The @ApiProperty decorator is used to make properties visible to Swagger. Notice that you did not add the @ApiProperty decorator to the password field. This is because this field is sensitive, and you do not want to expose it in your API. */
}
