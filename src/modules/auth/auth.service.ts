import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { compareHash } from './utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async login(loginCredentials: LoginDto) {
    const { username, password } = loginCredentials;

    const user = this.userModel.findOne({ username });

    if (!user) {
      return new NotFoundException('User not found');
    }

    const foundUser = (await user).toObject();
    const passwordIsValid = await compareHash(password, foundUser.password);

    if (!passwordIsValid) {
      return new ForbiddenException('Not allowed');
    }

    const token = this.jwtService.sign({ id: foundUser._id });

    return { token };
  }
}
