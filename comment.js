
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    setDoc,
    doc,
    getDoc,
    serverTimestamp,
    query,
    orderBy
  } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDNCT34IkNLCPHfwIFz0cyr_0NQHy7YIGk",
    authDomain: "samogyan-60d68.firebaseapp.com",
    projectId: "samogyan-60d68",
    storageBucket: "samogyan-60d68.appspot.com",
    messagingSenderId: "241711635387",
    appId: "1:241711635387:web:2ac38235dc19e960db829e",
    measurementId: "G-ZP0ZB8M0V6"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  let visitorId = "";
  let savedUsername = "";
  const foulWords = [
    "fuck", "motherfucker", "shit", "mother fucker", "diddy", "bsdk", "rape", "tatti", "faltu",
    "bitch", "asshole", "dick", "pussy", "chutiya", "madarchod", "bhenchod", "f u", "f.u", "f.u.c.k",
    "admin-samogyan", "admin", "samogyan", "owner"
  ];

  function showPopup(message) {
    const alertBox = document.getElementById("customAlert");
    const alertText = document.getElementById("alertText");
    alertText.textContent = message;
    alertBox.classList.add("show");
    setTimeout(() => {
      alertBox.classList.remove("show");
    }, 2500);
  }

  async function loadFingerprint() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js';
      script.async = true;
      script.onload = () => resolve(window.FingerprintJS);
      script.onerror = () => reject(new Error("FingerprintJS failed to load"));
      document.head.appendChild(script);
    });
  }

  function containsFoulWord(text) {
    const cleaned = text.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    return foulWords.some(word => new RegExp(`\\b${word}\\b`, 'i').test(cleaned));
  }

  function getInitials(name) {
    return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
  }

  function formatDate(dateObj) {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
  }

  async function init() {
    const FingerprintJS = await loadFingerprint();
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    visitorId = result.visitorId;

    const userDocRef = doc(db, "users", visitorId);
    const userDoc = await getDoc(userDocRef);
    const nameInput = document.querySelector('input[name="name"]');

    if (userDoc.exists()) {
      savedUsername = userDoc.data().name;
      nameInput.value = savedUsername;
      nameInput.readOnly = true;
    } else {
      nameInput.readOnly = false;
      nameInput.value = "";
    }

    loadComments();

    const form = document.getElementById("commentForm");
    const alertMsg = document.getElementById("alertMsg");
    alertMsg.style.display = "none";

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const commentText = form.comment.value.trim();
      let nameText = savedUsername || form.name.value.trim();

      if (!nameText) {
        showPopup("Please enter your name.");
        return;
      }
      if (!commentText) {
        showPopup("Comment can't be empty.");
        return;
      }
      if (containsFoulWord(nameText) || containsFoulWord(commentText)) {
        showPopup("Please avoid using inappropriate language.");
        return;
      }

      if (!savedUsername) {
        await setDoc(doc(db, "users", visitorId), { name: nameText });
        savedUsername = nameText;
        form.name.readOnly = true;
      }

      await addDoc(collection(db, "comments"), {
        name: nameText,
        comment: commentText,
        createdAt: serverTimestamp(),
        visitorId: visitorId,
        pinned: false
      });

      form.comment.value = "";
      alertMsg.style.display = "block";
      setTimeout(() => (alertMsg.style.display = "none"), 2500);
      loadComments();
    });
  }

  async function loadComments() {
    const commentsContainer = document.getElementById("comments");
    commentsContainer.innerHTML = "Loading comments...";

    const commentsQuery = query(
      collection(db, "comments"),
      orderBy("pinned", "desc"),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(commentsQuery);
    commentsContainer.innerHTML = "";

    if (querySnapshot.empty) {
      commentsContainer.innerHTML = "<p>No comments yet. Be the first!</p>";
      return;
    }

    const pinnedComments = [];
    const normalComments = [];

    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      if (data.pinned) {
        pinnedComments.push(docSnap);
      } else {
        normalComments.push(docSnap);
      }
    });

    const renderComment = (docSnap, isPinned) => {
      const data = docSnap.data();
      const name = data.name || "Anonymous";
      const commentText = data.comment || "";
      let time = "Just now";

      if (data.createdAt) {
        const dateObj = data.createdAt.toDate();
        time = formatDate(dateObj);
      }

      const initials = getInitials(name);

      const commentEl = document.createElement("div");
      commentEl.className = "comment-box" + (isPinned ? " pinned-comment" : "");

      commentEl.innerHTML = `
        <div class="profile-circle">${initials}</div>
        <div class="comment-content">
          <div class="comment-header">
            <div class="header-left">
              <div class="comment-username">${name}</div>
              <div class="comment-time">${time}</div>
            </div>
            ${isPinned ? `<div class="pin-label">📌 Pinned</div>` : ""}
          </div>
          <div class="comment-text">${escapeHtml(commentText)}</div>
        </div>
      `;
      commentsContainer.appendChild(commentEl);
    };

    pinnedComments.forEach(doc => renderComment(doc, true));
    normalComments.forEach(doc => renderComment(doc, false));
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  window.onload = () => {
    init().catch(console.error);
  };

  const infoBtn = document.getElementById("infoBtn");
  const modal = document.getElementById("infoModal");
  const closeModal = document.getElementById("closeModal");

  if (infoBtn && modal && closeModal) {
    infoBtn.onclick = () => (modal.style.display = "block");
    closeModal.onclick = () => (modal.style.display = "none");
    window.onclick = (e) => {
      if (e.target == modal) modal.style.display = "none";
    };
  }
  
  
