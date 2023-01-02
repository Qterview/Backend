import { Module, Injectable } from '@nestjs/common';
import { ChatGPTAPIBrowser } from 'chatgpt';
import { resolve } from 'path';

const contents = [];

@Injectable()
export class MyGPT {
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
    try {
      
      if (contents.length) {
        contents.push(content);
        return;
      }
      contents.push(content);

      // 미인증 상황에 요청이 들어오는 경우 배열에 저장만하고 리턴
      if(typeof global.GPTAPI === 'undefined') return

      while (contents.length) {
        const result = await api.sendMessage(contents[0]);
        console.log(result.response);
        contents.shift();
      }  

    } catch (error) {
      console.log(error)
    } 

    // 큐 + 스케줄러 
    // return await api.sendMessage(content);
  }
}
