## **_Qterview_**
>ChatGPT를 이용한 면접질문 리스트를 만드는 프로젝트 입니다.<br/><br/>
>**[📎 노션](https://flawless-earwig-06e.notion.site/Qterview-769fac71b5ae4fa3b869c448e9679af2)**<br/><br/>
>**[📎 Frontend링크](https://github.com/Qterview/front-vue)**<br/><br/>
>**[📎 시연영상링크](https://youtu.be/rMbDAtmmTZk)**<br/><br/>

<br/>


<br/>


<br/>

## 🛠️ **_프로젝트 아키텍처_**
![Qterview아키텍처](https://user-images.githubusercontent.com/98438390/217975114-031c6f38-d0a4-441b-af29-b41f5301bc4b.jpg)

<br/>



## ⚙️ **_기술 스택_**

**Backend**<br /><br />
<img src="https://img.shields.io/badge/Nest.js-E0234E?style=for-the-badge&logo=NestJS&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
<img src="https://img.shields.io/badge/Mongoose-871618?style=for-the-badge&logo=MongoDB&logoColor=white">
<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white">
<br/>
<img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white">
<br/>
**Frontend**<br /><br />
<img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=Vue.js&logoColor=white">
<img src="https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=Nuxt.js&logoColor=white">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white">
<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">




<br/>

## ⚠️ **_트러블 슈팅_**
**<details><summary>질문 등록 요청시 응답 비동기 처리</summary>**

❗**문제**: 사용자가 질문 등록시 응답이 오래 걸리는 문제.<br/>
<br/>
❓**원인**: 질문 등록시 서버에서 ChatGPT에게 질문을 요청하고 받아온 데이터를 게시물로 등록하게 되어 있으나, 요청하는 질문과 API상황에 따라 ChatGPT에게서 부터 데이터를 받는 시간이  오래 소모됨.<br/>
<br/>
💡**문제 해결**: 사용자가 응답을 기다리는 동안 페이지를 이용할 수 없기 때문에 요청작업을 비동기 처리하고 사용자에게는 요청등록완료 메세지를 바로 리턴. 작업 처리가 완료되어 게시물이 등록 되었을때는 socket.io를 사용하여 사용자에게 게시물 등록 완료를 알림.
<br/>

</details>
<br/>
**<details><summary>EC2 인스턴스에 도커 이미지 누적 문제</summary>**

❗**문제**:인스턴스의 용량 부족 현상이 발생하여 자동배포에 실패하는 이슈 발생.<br/>
<br/>
❓**원인**: `docker system df`를 통해 도커 디스크 사용량을 확인해 보니 미사용 Docker이미지가 누적되어 발생한 현상임을 알게됨.<br/>
<br/>
💡**문제 해결**: 깃액션을 통한 자동배포시 스크립트를 이용해 미사용 이미지를 자동 삭제 하도록 처리 하여 공간을 확보.<br/>
<br/>


</details>


