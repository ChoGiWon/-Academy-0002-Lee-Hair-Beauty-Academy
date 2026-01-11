import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "./firebase-config.js";

// 1. DOM 요소 가져오기
const signupForm = document.getElementById("signup-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const usernameInput = document.getElementById("username");
const phoneInput = document.getElementById("phone");

const pwMsg = document.getElementById('pw-msg');
const confirmMsg = document.getElementById('confirm-msg');

console.log("signup.js 로드 완료");

// 2. 유효성 검사 함수들 (시각적 피드백)

// 비밀번호 길이 체크
function checkLength() {
  const pw = passwordInput.value;
  if (pw.length < 6 && pw.length > 0) {
    passwordInput.classList.add('error');
    passwordInput.classList.remove('success');
    pwMsg.textContent = '비밀번호는 6자리 이상이어야 합니다.';
    pwMsg.className = 'message text-danger';
    return false;
  } else if (pw.length >= 6) {
    passwordInput.classList.remove('error');
    passwordInput.classList.add('success');
    pwMsg.textContent = '사용 가능한 비밀번호입니다.';
    pwMsg.className = 'message text-success';
    return true;
  } else {
    passwordInput.classList.remove('error', 'success');
    pwMsg.textContent = '';
    return false;
  }
}

// 비밀번호 일치 체크
function checkMatch() {
  const pw = passwordInput.value;
  const confirmPw = confirmPasswordInput.value;

  if (confirmPw === '') {
    confirmPasswordInput.classList.remove('error', 'success');
    confirmMsg.textContent = '';
    return false;
  }

  if (pw === confirmPw) {
    confirmPasswordInput.classList.remove('error');
    confirmPasswordInput.classList.add('success');
    confirmMsg.textContent = '비밀번호가 일치합니다.';
    confirmMsg.className = 'message text-success';
    return true;
  } else {
    confirmPasswordInput.classList.add('error');
    confirmPasswordInput.classList.remove('success');
    confirmMsg.textContent = '비밀번호가 일치하지 않습니다.';
    confirmMsg.className = 'message text-danger';
    return false;
  }
}

// 3. 실시간 감지 이벤트 리스너 등록
if (passwordInput && confirmPasswordInput) {
  passwordInput.addEventListener('input', () => {
    checkLength();
    checkMatch();
  });
  confirmPasswordInput.addEventListener('input', checkMatch);
}

// 4. 가입하기 버튼 클릭(Form Submit) 처리
if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // 새로고침 방지
    console.log("가입 버튼 클릭됨");

    // 최종 유효성 검사
    const isLengthOk = checkLength();
    const isMatchOk = checkMatch();

    if (!isLengthOk) {
      alert("비밀번호 조건을 확인해주세요 (6자리 이상).");
      passwordInput.focus();
      return;
    }

    if (!isMatchOk) {
      alert("비밀번호가 일치하지 않습니다.");
      confirmPasswordInput.focus();
      return;
    }

    // 빈칸 검사 (혹시 required가 안 먹혔을 경우 대비)
    if (!usernameInput.value || !emailInput.value || !phoneInput.value) {
        alert("모든 정보를 입력해주세요.");
        return;
    }

    // --- Firebase 가입 요청 시작 ---
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
      const user = userCredential.user;

      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        username: usernameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        role: "user",
        createdAt: new Date()
      });

      alert("회원가입 성공!");
      window.location.href = "login.html"; // 로그인 페이지로 이동

    } catch (error) {
      console.error("에러 발생:", error);
      
      // 사용자에게 친절한 에러 메시지 보여주기
      if (error.code === 'auth/email-already-in-use') {
        alert("이미 가입된 이메일입니다.");
      } else if (error.code === 'auth/invalid-email') {
        alert("이메일 형식이 올바르지 않습니다.");
      } else {
        alert("가입 실패: " + error.message);
      }
    }
  });
} else {
  console.error("HTML에서 id='signup-form'을 찾을 수 없습니다!");
}