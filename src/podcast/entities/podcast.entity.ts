import { Episode } from './episode.entity';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@InputType('PodcastInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast extends CommonEntity {
  @Field((_) => String)
  @Column()
  @IsString()
  title: string;

  @Field((_) => String)
  @Column()
  @IsString()
  category: string;

  @Field((_) => Number, { nullable: true })
  @Column({ default: 0 })
  @IsNumber()
  rating: number;

  @Field((_) => [Episode], { nullable: true })
  @OneToMany((type) => Episode, (episode) => episode.podcast)
  episodes: Episode[];
}
