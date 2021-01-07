import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Podcast } from '../entities/podcast.entity';

@ObjectType()
export class GetAllPodcastsOutput extends CoreOutput {
  @Field((type) => [Podcast], { nullable: true })
  podcasts?: Podcast[];
}
