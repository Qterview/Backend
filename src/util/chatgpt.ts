import { Module, Injectable } from '@nestjs/common';
import { ChatGPTAPIBrowser } from 'chatgpt';
import { resolve } from 'path';
import { Posts } from '../entities/posts.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from '../posts/posts.repository.js';
import { PostsService } from '../posts/posts.service.js';

const contents: string[] = [];
let connect = false;
let API: ChatGPTAPIBrowser;

export class MyGPT {
  GPTAPI: ChatGPTAPIBrowser;

  constructor(
    @InjectRepository(PostsRepository)
    public postsRepository?: PostsRepository,
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
        connect = true;
        API = api;
        // if (contents.length) this.work();
      } else {
        // 수동
        const api = new ChatGPTAPIBrowser({
          email: email,
          password: password,
        });

        await api.initSession();
        console.log('GPT API 연결 완료 !');
        connect = true;
        API = api;

        // if (contents.length) this.work();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async send(question: string) {
    try {
      // 미인증 상황에 요청이 들어오거나 작업 처리중 상태 이면 배열에 저장만하고 리턴
      if (!connect) {
        return 'API준비중 입니다. 잠시후 다시 시도해 주세요';
      }
      if (contents.length || !connect) {
        contents.push(question);
        return '질문 등록 요청 성공';
      }
      contents.push(question);
      console.log('되나?');
      while (contents.length) {
        const question = contents[0];
        const result = await API.sendMessage(question);
        console.log(result.response);
        const content = result.response;
        const post = new Posts();
        post.title = question;
        post.content = content;
        await this.postsRepository.save(post);
        contents.shift();
        console.log(
          `messageId:${result.messageId},conversationId:${result.conversationId}`,
        );
      }
    } catch (error) {
      console.log(error);
    }

    // 큐 + 스케줄러방식
    // return await api.sendMessage(content);
  }

  //chatGPT작업
  // async work() {
  //   console.log('되나?2');
  //   while (contents.length) {
  //     const question = contents[0];
  //     console.log(question);
  //     console.log('this');
  //     console.log(this);
  //     const result = await API.sendMessage(question);
  //     console.log(result.response);
  //     const content = result.response;
  //     await this.postsService.savePost(question, content);
  //     contents.shift();
  //     console.log(
  //       `messageId:${result.messageId},conversationId:${result.conversationId}`,
  //     );
  //   }
  // }
}
