<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Submit entry
window.enterGiveaway = async function(setName) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) return alert("Fill all fields");

  await addDoc(collection(db, "entries"), {
    name,
    email,
    set: setName,
    time: Date.now()
  });

  alert("Entry submitted!");
}

// Live counter
window.listenCounter = function(setName, elementId) {
  onSnapshot(collection(db, "entries"), (snap) => {
    let count = 0;

    snap.forEach(doc => {
      if (doc.data().set === setName) count++;
    });

    document.getElementById(elementId).innerText = count;
  });
}
</script>
