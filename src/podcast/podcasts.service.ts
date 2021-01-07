import { Injectable } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { CoreOutput } from '../common/dtos/output.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllPodcastsOutput } from './dtos/get-all-podcasts.dto';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { GetPodcastInput, GetPodcastOutput } from './dtos/get-podcast.dto';
import {
  DeletePodcastInput,
  DeletePodcastOutput,
} from './dtos/delete-podcast.dto';
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from './dtos/update-podcast.dto';
import { GetEpisodesInput, GetEpisodesOutput } from './dtos/get-episodes.dto';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import {
  DeleteEpisodeInput,
  DeleteEpisodeOutput,
} from './dtos/delete-episode.dto';
import {
  UpdateEpisodeInput,
  UpdateEpisodeOutput,
} from './dtos/update-episode.dto';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast) private readonly podcasts: Repository<Podcast>,
    @InjectRepository(Episode)
    private readonly episodes: Repository<Episode>,
  ) {}

  async getAllPodcasts(): Promise<GetAllPodcastsOutput> {
    try {
      const podcasts = await this.podcasts.find();
      return { ok: true, podcasts };
    } catch {
      return { ok: false, error: 'Failed to load podcasts' };
    }
  }

  async createPodcast({
    title,
    category,
  }: CreatePodcastInput): Promise<CreatePodcastOutput> {
    try {
      await this.podcasts.save(this.podcasts.create({ title, category }));
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Fail to create a podcast' };
    }
  }

  async getPodcast({ id }: GetPodcastInput): Promise<GetPodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne(id, {
        relations: ['episodes'],
      });
      if (!podcast) {
        return { ok: false, error: `Podcast not found` };
      }
      return {
        ok: true,
        podcast,
      };
    } catch {
      return { ok: false, error: 'Failed to load the podcast' };
    }
  }

  async updatePodcast({
    id: podcastId,
    episodes,
    ...restData
  }: UpdatePodcastInput): Promise<UpdatePodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne(podcastId, {
        relations: ['episodes'],
      });
      if (!podcast) {
        return { ok: false, error: `Podcast not found` };
      }
      const newEpisodes: Episode[] = [];
      if (episodes) {
        for (const episode of episodes) {
          const { id: episodeId, ...episodeData } = episode;
          const [oldEpisode] = podcast.episodes.filter(
            (ep) => ep.id === episodeId,
          );
          if (!oldEpisode) {
            return {
              ok: false,
              error: `Episode ${episodeId} not found in this podcast`,
            };
          }
          newEpisodes.push({ ...oldEpisode, ...episodeData });
        }
        await this.episodes.save([...newEpisodes]);
      }
      await this.podcasts.save({
        id: podcastId,
        ...restData,
      });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Failed to update the podcast' };
    }
  }

  async deletePodcast({
    id,
  }: DeletePodcastInput): Promise<DeletePodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne(id);
      if (!podcast) {
        return { ok: false, error: `Podcast not found` };
      }
      await this.podcasts.delete(id);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Failed to delete the podcast' };
    }
  }

  async getEpisodes({
    podcastId,
  }: GetEpisodesInput): Promise<GetEpisodesOutput> {
    try {
      const podcast = await this.podcasts.findOne(podcastId, {
        relations: ['episodes'],
      });
      if (!podcast) {
        return { ok: false, error: 'Podcast not found' };
      }
      return { ok: true, episodes: podcast.episodes };
    } catch {
      return { ok: false, error: 'Failed to load episodes' };
    }
  }

  async createEpisode({
    podcastId,
    ...episodeData
  }: CreateEpisodeInput): Promise<CreateEpisodeOutput> {
    try {
      const podcast = await this.podcasts.findOne(podcastId);
      if (!podcast) {
        return { ok: false, error: 'Podcast not found' };
      }
      await this.episodes.save(
        this.episodes.create({ podcast, ...episodeData }),
      );
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Fail to create an episode' };
    }
  }

  async updateEpisode({
    podcastId,
    episodeId,
    ...updateData
  }: UpdateEpisodeInput): Promise<UpdateEpisodeOutput> {
    try {
      const podcast = await this.podcasts.findOne(podcastId);
      if (!podcast) {
        return { ok: false, error: 'Podcast not found' };
      }
      console.log(podcast);
      const [oldEpisode] = await this.episodes.find({
        where: {
          id: episodeId,
          podcast,
        },
      });
      console.log(oldEpisode);
      if (!oldEpisode) {
        return {
          ok: false,
          error: `Episode ${episodeId} not found in this podcast`,
        };
      }
      await this.episodes.save({ ...oldEpisode, ...updateData });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Failed to update the episodes' };
    }
  }

  async deleteEpisode({
    podcastId,
    episodeId,
  }: DeleteEpisodeInput): Promise<DeleteEpisodeOutput> {
    try {
      const podcast = await this.podcasts.findOne(podcastId);
      if (!podcast) {
        return { ok: false, error: 'Podcast not found' };
      }
      const [episode] = await this.episodes.find({
        where: {
          id: episodeId,
          podcast,
        },
      });
      if (!episode) {
        return {
          ok: false,
          error: `Episode ${episodeId} not found in this podcast`,
        };
      }
      await this.episodes.delete(episodeId);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Failed to update the episodes' };
    }
  }
}
