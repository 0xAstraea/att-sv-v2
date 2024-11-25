import { Controller, Post, Body, UseGuards, Headers, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { PcdsService } from './pcds.service';
import { PrivyGuard } from 'src/privy/privy.guard';

@Controller('pcds')
export class PcdsController {
  constructor(private readonly pcdsService: PcdsService) {}

  @Post()
  @UseGuards(PrivyGuard)
  async handlePost(
    @Body() body: { pcds: any; user: any },
    @Headers('x-privy-app-id') appId: string
  ) {
    try {
      const response = await this.pcdsService.validatePCDs(body);
      return response;
    } catch (error) {
      if (error instanceof HttpException) {
        // If it's our custom InternalServerErrorException with responses
        if (error instanceof InternalServerErrorException && Array.isArray(error.getResponse())) {
          return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            responses: error.getResponse()
          };
        }
        throw error;
      } else {
        console.error('Unexpected error:', error);
        throw new HttpException('An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
