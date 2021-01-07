import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Episode } from '../entities/episode.entity';

@InputType()
export class UpdateEpisodeInput extends PartialType(
  PickType(Episode, ['title', 'category']),
) {
  @Field((type) => Number)
  podcastId: number;

  @Field((type) => Number)
  episodeId: number;
}

@InputType()
export class UpdateEpisodeWithPodcastInput extends PartialType(
  PickType(Episode, ['id', 'title', 'category']),
) {}

@ObjectType()
export class UpdateEpisodeOutput extends CoreOutput {}
