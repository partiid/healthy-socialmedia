import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PostModule } from './post.module';
import { PostCommentEvent } from 'apps/common/events/post/postComment.event';
describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
      imports: [PostModule, PostCommentEvent]
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
