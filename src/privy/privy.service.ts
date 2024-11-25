import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrivyClient } from '@privy-io/server-auth';

@Injectable()
export class PrivyService {
  private readonly clients: Record<string, PrivyClient> = {};

  constructor(private configService: ConfigService) {
    const appConfigs = [
      { id: 'stamp', appId: 'PRIVY_APP_ID_STAMP', appSecret: 'PRIVY_APP_SECRET_STAMP' },
      { id: 'agora', appId: 'PRIVY_APP_ID_AGORA', appSecret: 'PRIVY_APP_SECRET_AGORA' },
    ];

    appConfigs.forEach(config => {
      const appId = this.configService.get<string>(config.appId);
      const appSecret = this.configService.get<string>(config.appSecret);

      if (!appId || !appSecret) {
        throw new Error(`Privy environment variables for app ${config.id} are not set.`);
      }

      this.clients[config.id] = new PrivyClient(appId, appSecret);
    });
  }

  getPrivyClient(appId: string): PrivyClient {
    const client = this.clients[appId];
    if (!client) {
      throw new Error(`PrivyClient for app ${appId} not found.`);
    }
    return client;
  }
}