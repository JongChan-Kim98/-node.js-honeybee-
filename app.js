// 모듈 사용할것
// express , ejs , path : path 기본 경로를 다룰 수 있게 도와주는 모듈 이다.
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mysql = require("mysql2");
// 이렇게 폴더 경로까지만 잡으면 index 탐색 찾은 index파일을 기본으로 가져옴\
const { sequelize, User} = require("./model")
// 서버 객체 만들고
const app = express();
// path.join함수는매개변수를 받은 문자열들을 주소처럼 합쳐줌
// path.join("a","b") = a/b 주소처럼 만들어줌
// app.js가 있는 위치 __dirname views 폴더까지의 경로가 기본값 렌더링할 파일을 모아둔 폴더
// app.set express에 값을 저장가능 밑에 구문은 views키에 주소값 넣은부분
app.set('views' , path.join(__dirname,"view"))
// 랜더링하는 기본 엔진을 ejs 처럼 사용한다고 알려주는것.
// engine("파일타입",ejs 그릴때 방식을)뷰 엔진이 그릴때
// app.get("/",(req,res)=>{
//     // fs 모듈로 파일을 가져왔다 치고
//     res.send(ejs.render(data,{e}))
// });
// html의 뷰 엔진을 ejs 랜더링 방식으로 바꾼다.
app.engine("html",ejs.renderFile)

// 뷰 엔진 설정을 html을 랜더링 할때 사용 하겠다.
app.set("view engine", "html")

// body 객체 사용
app.use(express.urlencoded({extended:false})) 

// 시퀄라이즈 구성 해보자 연결 및 테이블 생성 여기가 처음 매핑
// sync 함수는 데이터 베이스 동기화 하는데 사용 필요한 테이블을 생성해준다.
// 필요한 테이블들이 다 생기고 매핑된다. 절대 어긋날 일이 없다.
// 테이블 내용이 다르면 오류를 밷어냄
// 여기서 CREATE TABLE 문이 여기서 실행된다는것
// force 강제로 초기화를 시킬것인지. (테이블 내용을 다 비워줄것인지)
sequelize
.sync({force : false})
.then(()=>{
    // 연결 성공
    console.log("DB연결 성공")
})
.catch((err)=>{
    // 연결실패
    console.log(err)
});


app.get("/", (req,res)=>{
    res.render("log", { data : 1});
});

app.get("/agreement", (req,res)=>{
    res.render("agreement", { data : 1});
});

app.get("/signUp", (req,res)=>{
    res.render("signUp", { data : 1});
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
    })
    .then((result)=>{ // 회원가입 실패 시 
        res.send(result);
    })
    .catch((err)=>{ // 회원 가입 실패 시 
        res.send(err);
    });
});

// css경로
app.use(express.static(__dirname));

// app.get("/user",(req,res)=>{
//     // 여기서는 추가된 유저들을 봐야하니까
//     // 조회를 하는데 전체를 조회해야한다.
//     // findAll 전체를 찾는다.
//     // findAll은 매개변수로 검색할 옵션
//     User.findAll({}).then((e)=>{
//         res.render("page",{data : e})
//     })
//     .catch(()=>{
//         // 실패하면 에러 페이지를 보여주면 된다.
//         res.render("err")
//     })
// })

// app.post("/create_post",(req,res)=>{
//     const { name,text } = req.body;
//     // console.log(name , text)
//     // User테이블이랑 Post랑 연결되어 있는데
//     // User id 기본키로 되어있고 Post는 user_id
//     // 테이블에서 하나의 컬럼값 가져온다.
//     // findOne 하나를 검색할때 사용
//     User.findOne({
//         where : {name : name},
//     })
//     .then((e)=>{
//         Post.create({
//             // foreignKey user_id 이고 유저의 아이디와 연결한다고 정의를 해놓기 때문에
//             // 말해 놓았다 모델에 user.js와 posts.js
//             msg : text,
//             user_id : e.id,
//         });
//     })
// })


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
app.listen(4242,()=>{
    console.log("서버가 열렸습니다.");
});