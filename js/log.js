"use strict";

const loginId = document.getElementById('LOGIN_ID');
const loginPw = document.getElementById('LOGIN_PW');
const loginBtn = document.getElementById('LOGIN_BTN');

function color() {
    //id에 @가 포함된 이메일 형식의 문자가 입력했을 때 비밀번호 5자 이상 입력했을대 동시 충족 시 로그인 버튼이 활성화
    //if((loginId.value.length>0 && loginId.value.indexOf("@")!==-1) && loginPw.value.length>=5){
    if(loginId.value.length>=5 && loginPw.value.length>=5){
        loginBtn.style.backgroundColor = "#FFC81E";
        loginBtn.disabled = false;
    }else{
        //비활성화시
        loginBtn.style.backgroundColor = "#FFF97B";
        loginBtn.disabled = true;
    }
}

function moveToMain(){
    //로그인시 메인 홈페이지로 이동
    alert("로그인성공");
    location.replace("../main.html");
}

loginId.addEventListener('keyup', color);
loginPw.addEventListener('keyup', color);
loginBtn.addEventListener('click',moveToMain);