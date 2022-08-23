//joinform_check 함수로 유효성 검사
function joinform_check() {
    //변수에 담아주기
    var name = document.getElementById("name");
    var userId = document.getElementById("userId");
    var userPassword = document.getElementById("userPassword");
    var repwd = document.getElementById("repwd");
    var phoneNumber = document.getElementById("phoneNumber");
    var userEmail = document.getElementById("userEmail");
    if (userId.value == "") { //해당 입력값이 없을 경우 같은말: if(!userId.value)
     // swal("성공","회원가입을 축하합니다","success");
      swal("에러","아이디를 입력하세요.","warning");//나란히 쓰면 뒤에게 실행댐
      userId.focus(); //focus(): 커서가 깜빡이는 현상, blur(): 커서가 사라지는 현상
      return false; //return: 반환하다 return false:  아무것도 반환하지 말아라 아래 코드부터 아무것도 진행하지 말것
    };
  
    if (userPassword.value == "") {
      swal("에러","비밀번호를 입력하세요.","warning");
      userPassword.focus();
      return false;
    };
  
    //비밀번호 영문자+숫자+특수조합(8~25자리 입력) 정규식
    var pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  
    if (!pwdCheck.test(userPassword.value)) {
      swal("에러","비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리 사용해야 합니다.","warning");
      userPassword.focus();
      return false;
    };
  
    if (repwd.value !== userPassword.value) {
      swal("틀림","비밀번호가 일치하지 않습니다..","error");
      repwd.focus();
      return false;
    };
  
    if (name.value == "") {
      swal("에러","이름을 입력하세요.","warning");
      name.focus();
      return false;
    };
  
    var reg = /^[0-9]+/g; //숫자만 입력하는 정규식
  
    if (!reg.test(phoneNumber.value)) {
      swal("에러","전화번호는 숫자만 입력할 수 있습니다.","warning");
      phoneNumber.focus();
      return false;
    };
  
    if (userEmail.value == "") {
      swal("에러","이메일 주소를 입력하세요.","warning");
      userEmail.focus();
      return false;
    } 
        
    alert("회원가입에 성공했습니다.");
    // 입력값 전송
    document.join_form.submit(); //유효성 검사의 포인트   
    
    
};

  

//아이디 중복체크 팝업창(현재 공백문서)
// function id_check() {
//   //window.open("팝업될 문서 경로", "팝업될 문서 이름", "옵션");
//   window.open("", "", "width=600, height=200, left=200, top=100");
// }
