const express = require("express");
const bodyParser = require('body-parser');
const ejs = require("ejs");
const path = require("path");
const mysql = require("mysql2");
// 이렇게 폴더 경로까지만 잡으면 index 탐색 찾은 index파일을 기본으로 가져옴\
const { sequelize, User} = require("./model"); // 서버 객체 만들고
const app = express(); // express 설정1
// app.js가 있는 위치 __dirname views 폴더까지의 경로가 기본값 렌더링할 파일을 모아둔 폴더
// app.set express에 값을 저장가능 밑에 구문은 views키에 주소값 넣은부분
app.set('views' , path.join(__dirname,"view")); // path.join함수는매개변수를 받은 문자열들을 주소처럼 합쳐줌 path.join("a","b") = a/b 주소처럼 만들어줌
app.engine("html",ejs.renderFile); // engine("파일타입",ejs 그릴때 방식)
app.set("view engine", "html"); // 뷰 엔진 설정을 html을 랜더링 할때 사용 하겠다.
app.use(express.urlencoded({extended:false})); // body 객체 사용
app.use(express.static(__dirname)); // css경로
// app.use(userRouter); // 라우터
app.use(express.static(path.join(__dirname,'/public'))); // 정적 파일 설정 (미들웨어) 3
app.use(bodyParser.urlencoded({extended:false})); // 정제 (미들웨어) 5

// 시퀄라이즈 구성 해보자 연결 및 테이블 생성 여기가 처음 매핑// sync 함수는 데이터 베이스 동기화 하는데 사용 필요한 테이블을 생성해준다.
// 필요한 테이블들이 다 생기고 매핑된다. 절대 어긋날 일이 없다.// 테이블 내용이 다르면 오류를 밷어냄 // 여기서 CREATE TABLE 문이 여기서 실행된다는것
sequelize
.sync({force : false}) // force 강제로 초기화를 시킬것인지. (테이블 내용을 다 비워줄것인지)
.then(()=>{
    // 연결 성공
    console.log("DB연결 성공")
})
.catch((err)=>{
    // 연결실패
    console.log(err)
});

app.post("/create",(req,res)=>{
    // create이 함수를 사용하면 해당 테이블에 컬럼을 추가할 수 있다.
    const {  name , age , nickName, sex, address, phoneNumber, birthDate, userPassword, userId, userEmail }  = req.body;
    const create = User.create({  
        name : name,
        age : age,
        nickName : nickName,
        sex : sex,
        address : address,
        phoneNumber : phoneNumber,
        birthDate : birthDate,
        userPassword : userPassword,
        userId : userId,
        userEmail : userEmail
        // 위의 객체를 전달해서 컬럼을 추가할수있다.
    }).then((e)=>{ // 회원가입 성공 시
        res.send('<script>alert("회원가입을 축하합니다!"); document.location.href="/myPage";</script>');
    })
    .catch((err)=>{ // 회원 가입 실패 시 
        res.send(err);
    });
});

app.get("/", (req,res)=>{  // 현재까지 메인인 log.html
    res.render("log");
});

app.get("/agreement", (req,res)=>{ // 약관내용 페이지
    res.render("agreement");
});

app.get("/signUp", (req,res)=>{ // 회원가입페이지 
    res.render("signUp");
});

app.get("/myPage", (req,res)=>{
    res.render("myPage");
});
//------------------------------로그인--------------------------------------------
app.post('/log',(req,res)=>{    
    const userid = req.body.userId;
    const userpw = req.body.userPassword;
    User.findOne({
        where : {userId:userid,userPassword:userpw}
    }).then((e)=>{ // findOne을해서 담은 정보를 e에 넣음
        if(e === null){
            res.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/log";</script>');
        }else{
            res.send('<script type="text/javascript">alert("환영합니다!"); document.location.href="/myPage";</script>');        
        }
    });
});
//-------------------------------로그인------------------------------------------

// app.get('/view/:name',(req,res)=>{
//     // 해당 유저를 이름을 조회하고
//     User.findOne({
//         where : {
//             // 조건문 누구 찾을건지
//             // params로 전달받은 name 키값에 있는 벨류로 검색 이름을
//             name : req.params.name,
//         },
//         // 리턴값을 단일 객체로 변형해서 보여준다.
//         // raw : true,
//         // 관계형 모델 불러오기
//         // 관계를 맺어놓은 모델을 조회할수 있다.
//         // 여기서는 해당 검색된 유저와 맞는 모델
//         // user 모델의 id가 1번이면 post 모델의 user_id키가 같은 애들을 조회
//         include:[
//             {
//                 // Post 모델이 조회 되었으면 하니깐 Post 모델을 적어준다.
//                 model : Post,
//             },
//         ],
//     })
//     .then((e)=>{
//         // console.log(e);
//         e.dataValues.Post = e.dataValues.Posts.map((i)=> i.dataValues);
//         const Posts = e.dataValues;
//         console.log(Posts)
//         res.render('view',{data : Posts})
//     })
// });

// app.get("/del/:id", (req,res)=>{
//     // 삭제 쿼리문
//     // 검색 조건은 매개변수 객체
//     Post.destroy({
//         // 검색은 전달받ㅇ느, params의 안에 있는 id 키값
//         where: {id : req.params.id}
//     }).then(()=>{
//         // 잘 끝나면 유저 페이지로 이동
//         res.redirect("/user");
//     })
// })
// app.post("/view_update",(req,res)=>{
//     const {id, msg ,text}  = req.body;
//     // 수정 쿼리문 사용
//     // 객체가 들어가는데
//     // 첫번째 매개변수의 객체가 수정할 내용
//     // 두번째 매개변수의 객체가 검색 조건
//     // 밑에 검색 조건 내용은 아이디와 메세지 둘다 검색해서 맞는 애 탐색 
//     Post.update({msg : msg},{where : {id:id,msg:text} });
// })

// 서버 연결
app.listen(3000,()=>{
    console.log("서버가 열렸습니다.");
});