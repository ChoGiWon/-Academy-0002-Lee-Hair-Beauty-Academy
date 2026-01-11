// 1. Firebase SDK 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Firebase 설정 (Key)
const firebaseConfig = {
    apiKey: "AIzaSyCu8Ph-JkgbuxL8vxBD4WMYLV6fy9h67FM",
    authDomain: "leehairbeautyacademy.firebaseapp.com",
    projectId: "leehairbeautyacademy",
    storageBucket: "leehairbeautyacademy.firebasestorage.app",
    messagingSenderId: "320962688968",
    appId: "1:320962688968:web:0f9879b0ee52da980ff2fd"
};

// 3. Firebase 시작 (초기화)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 4. 내보내기 (한 번에 모아서 내보내야 에러가 안 납니다)
export { 
    auth, 
    db,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    doc, 
    setDoc, 
    getDoc, 
    updateDoc 
};