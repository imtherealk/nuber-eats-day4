import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class CreatePodcastInput extends PickType(Podcast, [
  'title',
  'category',
]) {}

@ObjectType()
export class CreatePodcastOutput extends CoreOutput {
  @Field((type) => Number, { nullable: true })
  id?: number;
}
