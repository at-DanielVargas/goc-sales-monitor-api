import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MeliAuthService {
  private accessToken: string;
  private expiresAt: number;

  constructor(private httpService: HttpService) {}

  async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.expiresAt) {
      return this.accessToken;
    }

    const url = process.env.MELI_AUTH_URL;
    const response = await lastValueFrom(
      this.httpService.post(url, {
        grant_type: 'client_credentials',
        client_id: process.env.MELI_CLIENT_ID,
        client_secret: process.env.MELI_CLIENT_SECRET,
      }),
    );

    this.accessToken = response.data.access_token;
    this.expiresAt = Date.now() + response.data.expires_in * 1000 - 60000;
    return this.accessToken;
  }
}
