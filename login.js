// 1. 설정 파일에서 '로그인' 기능(signInWithEmailAndPassword)을 가져옵니다.
import { auth, signInWithEmailAndPassword } from "./firebase-config.js";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // 새로고침 방지

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // 2. Firebase에 로그인 요청
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 3. 성공 시 메인 페이지로 이동
    alert("로그인되었습니다.");
    window.location.href = "index.html"; 

  } catch (error) {
    // 4. 에러 처리 (비밀번호 틀림, 없는 계정 등)
    const errorCode = error.code;
    const errorMessage = error.message;

    if (errorCode === 'auth/invalid-login-credentials') {
       // 보안상 아이디/비번 중 뭐가 틀렸는지 정확히 안 알려주는 게 요즘 트렌드입니다.
       alert("이메일이 없거나 비밀번호가 올바르지 않습니다.");
    } else if (errorCode === 'auth/user-not-found') {
      alert("가입되지 않은 이메일입니다.");
    } else if (errorCode === 'auth/wrong-password') {
      alert("비밀번호가 틀렸습니다.");
    } else {
      alert("로그인 실패: " + errorMessage);
    }
  }
});