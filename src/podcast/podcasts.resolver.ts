import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import {
  DeleteEpisodeInput,
  DeleteEpisodeOutput,
} from './dtos/delete-episode.dto';
import {
  DeletePodcastInput,
  DeletePodcastOutput,
} from './dtos/delete-podcast.dto';
import { GetAllPodcastsOutput } from './dtos/get-all-podcasts.dto';
import { GetEpisodesInput, GetEpisodesOutput } from './dtos/get-episodes.dto';
import { GetPodcastInput, GetPodcastOutput } from './dtos/get-podcast.dto';
import {
  UpdateEpisodeInput,
  UpdateEpisodeOutput,
} from './dtos/update-episode.dto';
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver((of) => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query((returns) => GetAllPodcastsOutput)
  getAllPodcasts(): Promise<GetAllPodcastsOutput> {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation((returns) => CreatePodcastOutput)
  createPodcast(
    @Args('input') createPodcastInput: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Query((returns) => GetPodcastOutput)
  getPodcast(
    @Args('input') getPodcastInput: GetPodcastInput,
  ): Promise<GetPodcastOutput> {
    return this.podcastsService.getPodcast(getPodcastInput);
  }

  @Mutation((returns) => UpdatePodcastOutput)
  updatePodcast(
    @Args('input') updatePodcastInput: UpdatePodcastInput,
  ): Promise<UpdatePodcastOutput> {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }

  @Mutation((returns) => DeletePodcastOutput)
  deletePodcast(
    @Args('input') deletePodcastInput: DeletePodcastInput,
  ): Promise<DeletePodcastOutput> {
    return this.podcastsService.deletePodcast(deletePodcastInput);
  }
}

@Resolver((of) => Episode)
export class EpisodesResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query((returns) => GetEpisodesOutput)
  getEpisodes(
    @Args('input') getEpisodesInput: GetEpisodesInput,
  ): Promise<GetEpisodesOutput> {
    return this.podcastsService.getEpisodes(getEpisodesInput);
  }

  @Mutation((returns) => CreateEpisodeOutput)
  createEpisode(
    @Args('input') createEpisodeInput: CreateEpisodeInput,
  ): Promise<CreateEpisodeOutput> {
    return this.podcastsService.createEpisode(createEpisodeInput);
  }

  @Mutation((returns) => UpdateEpisodeOutput)
  updateEpisode(
    @Args('input') updateEpisodeInput: UpdateEpisodeInput,
  ): Promise<UpdateEpisodeOutput> {
    return this.podcastsService.updateEpisode(updateEpisodeInput);
  }

  @Mutation((returns) => DeleteEpisodeOutput)
  deleteEpisode(
    @Args('input') deleteEpisodeInput: DeleteEpisodeInput,
  ): Promise<DeleteEpisodeOutput> {
    return this.podcastsService.deleteEpisode(deleteEpisodeInput);
  }
}
