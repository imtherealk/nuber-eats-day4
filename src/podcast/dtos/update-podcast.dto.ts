import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Episode } from '../entities/episode.entity';
import { Podcast } from '../entities/podcast.entity';
import { UpdateEpisodeWithPodcastInput } from './update-episode.dto';

@InputType()
export class UpdatePodcastInput extends PartialType(
  PickType(Podcast, ['title', 'category', 'rating']),
) {
  @Field((type) => Number)
  id: number;

  @Field((type) => [UpdateEpisodeWithPodcastInput])
  episodes: Episode[];
}

@ObjectType()
export class UpdatePodcastOutput extends CoreOutput {}
