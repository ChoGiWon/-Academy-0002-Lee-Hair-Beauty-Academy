import { auth, onAuthStateChanged, signOut } from "./firebase-config.js";

// HTML 요소 가져오기
const guestMenu = document.getElementById("guest-menu");
const memberMenu = document.getElementById("member-menu");
const userEmailSpan = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");

// 1. 로그인 상태 변화 감지 (가장 중요!)
// 페이지가 열릴 때, 로그인이 되어있는지 Firebase가 알려줍니다.
onAuthStateChanged(auth, (user) => {
    if (user) {
        // --- 로그인 된 상태 ---
        console.log("현재 로그인 유저:", user.email);

        // 비회원 메뉴 숨기고, 회원 메뉴 보여주기
        guestMenu.style.display = "none";
        memberMenu.style.display = "inline";

        // 이메일 주소 표시 (user.email)
        userEmailSpan.textContent = user.email.split("@")[0]; // @앞부분만 표시

    } else {
        // --- 로그아웃 된 상태 ---
        // 회원 메뉴 숨기고, 비회원 메뉴 보여주기
        guestMenu.style.display = "inline";
        memberMenu.style.display = "none";
    }
});

// 2. 로그아웃 버튼 기능
if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault(); // 링크 이동 방지
        try {
            await signOut(auth);
            alert("로그아웃 되었습니다.");
            window.location.href = "index.html"; // 메인으로 튕기기
        } catch (error) {
            console.error("로그아웃 실패", error);
        }
    });
}