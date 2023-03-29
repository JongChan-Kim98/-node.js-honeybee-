# Node.js 팀프로젝트 - 실시간 채팅과 게시판을 중심으로 한 커뮤니티 사이트


<br />


## 📌 팀원 소개 및 담당
- 김종찬 : 로그인/회원가입, 마이페이지
- 손윤미 : 게시판
- 김한결 : 실시간 채팅



<br />


## 📌 개발기간
2022-08-22~ 2022-09-05


<br />


## 📌 주요기능
1. webSocket으로 채팅 기능 구현
2. 게시판 및 댓글 기능 구현
3. 유저 페이지 - 로그인, 회원가입, 마이페이지


<br />


## 📌 개발환경
| client | server |
| :----: | :----: |
| <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/> | <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/><img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/><img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat-square&logo=Sequelize&logoColor=white"/><img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/> |


<br />


## 📌 홈페이지 화면
1. 인트로 화면 : 타이핑 애니메이션, 애니메이션이 그려지는 동안 다른 동작이 불가능 함, 종료 후 아무키나 눌러서 메인으로 이동
<img width="1281" alt="image" src="https://user-images.githubusercontent.com/107897885/222964993-bf444bdb-12b1-40d7-b586-2e949a2ccbd2.png">


<br />


2. 로그인/회원가입 페이지
<img width="1281" alt="image" src="https://user-images.githubusercontent.com/107897885/222965029-eeb37098-16a9-4987-ad33-0f06896b892d.png">
<img width="1281" alt="image" src="https://user-images.githubusercontent.com/107897885/222965058-c72635a5-505b-4193-ba8c-653e75a71bf2.png">


<br />


3. 유저 랜딩페이지 : 마이페이지, 게시판, 채팅방, 로그아웃 기능 이동 가능
<img width="1281" alt="image" src="https://user-images.githubusercontent.com/107897885/222965207-f3aab59c-36b4-4abc-9cc5-dbf9b9a08924.png">


<br />


4. 프로필 사진 및 닉네임 변경 기능
<img width="1281" alt="image" src="https://user-images.githubusercontent.com/107897885/222965248-1d31a40f-e083-4a90-81e4-389ff802439b.png">


<br />


5. 게시판 : 글 작성, 조회, 수정, 삭제 가능
<img width="1281" alt="image" src="https://user-images.githubusercontent.com/107897885/222965374-1d394b63-c891-4ea5-a9d4-9cab7ea96914.png">


- 본인이 작성한 글만 수정/삭제 가능
- 본인이 작성한 댓글만 삭제 가능
<img width="1281" alt="image" src="https://user-images.githubusercontent.com/107897885/222965527-a60dac99-a3b4-419a-9332-32b424e915d9.png">


<br />


6. 실시간 채팅방 기능 : socket.io를 활용하여 실시간 채팅 가능
- 접속한 유저
- 귓속말
- 경고 및 강퇴 기능
<img width="1261" alt="image" src="https://user-images.githubusercontent.com/107897885/222965628-1e4edd0f-0331-47ce-bf29-2cf556f02135.png">


<br />


## 📌 이슈 기록


- sequelize 오류(errno: 3780)
```
errno: 3780,
sqlState: 'HY000',
sqlMessage: "Referencing column 'complaintUser' and referenced column 'nickName' in foreign key constraint 'complaints_ibfk_1' are incompatible.",
sql: 'CREATE TABLE IF NOT EXISTS complaints (id INTEGER NOT NULL auto_increment , complaintUser VARCHAR(20) NOT NULL UNIQUE, complaintedUser VARCHAR(255) NOT NULL, complaintContents TEXT NOT NULL, createdAt DATETIME NOT NULL, updatedAt DATETIME NOT NULL, PRIMARY KEY (id), FOREIGN KEY (complaintUser) REFERENCES users (nickName) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;',
parameters: undefined
},
original: Error: Referencing column 'complaintUser' and referenced column 'nickName' in foreign key constraint 'complaints_ibfk_1' are incompatible.
```

팀원이 각자 작성한 DB를 합치는 과정에서 발생한 오류이다<br /> 
각 테이블의 hasMany, belongsTo / sourceKey, targetKey 정상적으로 설정했는데도 오류가 발생했다<br />
sequelize 설정을 모두 같게 만들어주면 해결된다
