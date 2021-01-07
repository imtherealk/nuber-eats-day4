import { CreatePodcastInput } from './create-podcast.dto';

export class CreateEpisodeDto extends CreatePodcastInput {}

import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { Episode } from '../entities/episode.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateEpisodeInput extends PickType(Episode, [
  'title',
  'category',
]) {
  @Field((type) => Number)
  podcastId: number;
}

@ObjectType()
export class CreateEpisodeOutput extends CoreOutput {
  @Field((type) => Number, { nullable: true })
  episodeId?: number;
}
