'use strict';

const form = document.querySelector("#form__wrap"); //데이터를 전송하는 Form
const checkAll = document.querySelector(".terms__check__all input"); // 모두 동의 체크박스
const checkBoxes = document.querySelectorAll(".input__check input"); // 모드 동의를 제외한 3개의 체크박스
const submitButton = document.querySelector("button"); //확인 버튼


const agreements = {
  termsOfService: false, //첫번째 필수동의 체크박스
  privacyPolicy: false, //두번째 필수동의 체크박스
  allowPromotions: false, //이벤트 수신 동의 체크박스
};

form.addEventListener("submit", (e) => e.preventDefault()); //새로고침(summit)되는 것 막음

checkBoxes.forEach((item) => item.addEventListener("input", toggleCheckbox));

function toggleCheckbox(e) {
  const { checked, id } = e.target;
  agreements[id] = checked;
  this.parentNode.classList.toggle("active");
  checkAllStatus();
  toggleSubmitButton();
}

function checkAllStatus() {
  const { termsOfService, privacyPolicy, allowPromotions } = agreements;
  if (termsOfService && privacyPolicy && allowPromotions) {
    checkAll.checked = true;
  } else {
    checkAll.checked = false;
  }
}

function toggleSubmitButton() {
  const { termsOfService, privacyPolicy } = agreements;
  if (termsOfService && privacyPolicy) {
    submitButton.disabled = false; //버튼 활성화
  } else {
    submitButton.disabled = true; //버튼 비활성화
  }
}

checkAll.addEventListener("click", (e) => {
  const { checked } = e.target;
  if (checked) {
    checkBoxes.forEach((item) => {
      item.checked = true;
      agreements[item.id] = true;
      item.parentNode.classList.add("active");
    });
  } else {
    checkBoxes.forEach((item) => {
      item.checked = false;
      agreements[item.id] = false;
      item.parentNode.classList.remove("active");
    });
  }
  toggleSubmitButton();
});

function moveToSignUp(){
  //확인시 회원가입 입력 홈페이지로 이동
  location.replace("/view/signUp.html");
}

submitButton.addEventListener('click',moveToSignUp);