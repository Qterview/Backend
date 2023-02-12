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
❓**원인**: 질문 등록시 서버에서 ChatGPT에게 질문을 요청하고 받아온 데이터를 게시물로 등록하는데,ChatGPT에게서 부터 데이터를 받는 시간이 질문에 따라 오래 소모되기 때문.<br/>
<br/>
💡**문제 해결**: 사용자가 응답을 기다리는 동안 페이지를 이용할 수 없기 때문에 작업을 비동기 처리하고 사용자에게는 등록요청 정상처리 메세지를 바로 리턴. 작업 처리가 완료되어 게시물이 등록 되었을때는 socket.io를 사용하여 사용자에게 알림. 
<br/>

</details>


