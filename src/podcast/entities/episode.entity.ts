import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Podcast } from './podcast.entity';

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode extends CommonEntity {
  @Field((_) => String)
  @Column()
  title: string;

  @Field((_) => String)
  @Column()
  category: string;

  @Field((_) => Podcast)
  @ManyToOne((_) => Podcast, (podcast) => podcast.episodes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  podcast: Podcast;

  @RelationId((episode: Episode) => episode.podcast)
  podcastId: number;
}
