import { Module, Injectable } from '@nestjs/common';
import { ChatGPTAPIBrowser } from 'chatgpt';
import { resolve } from 'path';
import { Posts } from '../entities/posts.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from '../posts/posts.repository.js';

const contents = [];
export class MyGPT {
  GPTAPI: ChatGPTAPIBrowser;

  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository?: PostsRepository,
  ) {}

  async createAPI(
    email: string,
    password: string,
    nopechaKey?: string,
  ): Promise<void> {
    // 자동
    try {
      if (nopechaKey) {
        const api = new ChatGPTAPIBrowser({
          email: email,
          password: password,
          nopechaKey: nopechaKey,
        });

        await api.initSession();
        console.log('GPT API 연결 완료 !');

        global.GPTAPI = api;
      } else {
        // 수동
        const api = new ChatGPTAPIBrowser({
          email: email,
          password: password,
        });

        await api.initSession();
        console.log('GPT API 연결 완료 !');

        global.GPTAPI = api;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async send(api: ChatGPTAPIBrowser, question: string) {
    try {
      if (contents.length) {
        contents.push(question);
        return;
      }
      contents.push(question);

      // 미인증 상황에 요청이 들어오는 경우 배열에 저장만하고 리턴
      if (typeof global.GPTAPI === 'undefined') return;

      while (contents.length) {
        const result = await api.sendMessage(contents[0]);
        console.log(result.response);
        const post = new Posts();
        post.title = question;
        post.content = result.response;
        await this.postsRepository.save(post);
        contents.shift();
      }
    } catch (error) {
      console.log(error);
    }

    // 큐 + 스케줄러
    // return await api.sendMessage(content);
  }
}
