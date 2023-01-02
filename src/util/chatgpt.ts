import { Module, Injectable } from '@nestjs/common';
import { ChatGPTAPIBrowser } from 'chatgpt';
import { resolve } from 'path';
import { PostsService } from '../posts/posts.service.js';

const contents = [];
export class MyGPT {
  constructor(private postsService?: PostsService) {}

  GPTAPI: ChatGPTAPIBrowser;

  async createAPI(
    email: string,
    password: string,
    nopechaKey?: string,
  ): Promise<void> {
    // 자동
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
  }

  async searchGPT(api: ChatGPTAPIBrowser, content: string) {
    if (contents.length) {
      contents.push(content);
      return;
    }
    contents.push(content);

    while (contents.length) {
      const result = await api.sendMessage(contents[0]);
      contents.shift();
      const answer = result.response;
      await this.postsService.post(content, answer);
      if (!contents.length) console.log('작업이 비었습니다.');
    }
    return;
  }
}
