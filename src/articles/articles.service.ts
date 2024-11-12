import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}
  async create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto });
  }

  async findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  async findAll() {
    return this.prisma.article.findMany({ where: { published: true } });
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
    if (!article) {
      throw new NotFoundException(`Article with ${id} does not exist.`);
    }
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with ${id} does not exist.`);
    }
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: string) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with ${id} does not exist.`);
    }
    return this.prisma.article.delete({ where: { id } });
  }
}
