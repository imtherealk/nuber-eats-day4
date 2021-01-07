import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Episode } from '../entities/episode.entity';

@InputType()
export class GetEpisodeInput {
  @Field((type) => Number)
  podcastId: number;

  @Field((type) => Number)
  episodeId: number;
}

@ObjectType()
export class GetEpisodeOutput extends CoreOutput {
  @Field((type) => Episode, { nullable: true })
  episode?: Episode;
}
