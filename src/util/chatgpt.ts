import { Module, Injectable } from '@nestjs/common';
import { ChatGPTAPIBrowser } from 'chatgpt';
import { resolve } from 'path';
import { Posts } from '../entities/posts.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from '../posts/posts.repository.js';
import { PostsService } from '../posts/posts.service.js';

export class MyGPT {
  GPTAPI: ChatGPTAPIBrowser;

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
