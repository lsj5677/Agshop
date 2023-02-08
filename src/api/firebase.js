import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

export function googleLogin() {
  signInWithPopup(auth, provider).catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // const email = error.customData.email;
  });
}

export function googleLogout() {
  if (window.confirm("Are you sure you want to Logout?")) {
    signOut(auth).catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
    });
  }
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(db, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);

      return { ...user, isAdmin };
    }

    return user;
  });
}

export async function addProduct(product, image) {
  const id = uuid();
  return set(ref(db, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(","),
  });
}

export async function updateProduct(product, image) {
  console.debug(`SUJIN:: ~ updateProduct ~ product`, product);
  // return set(ref(db, `products/${product.id}`), {
  //   ...product,
  //   price: parseInt(product.price),
  //   image,
  //   options: product.options.split(","),
  // });
}

export async function removeProduct(product) {
  return remove(ref(db, `products/${product.id}`));
}

export async function getProducts() {
  return get(ref(db, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }

    return [];
  });
}

export async function getCart(userId) {
  return get(ref(db, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(db, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(db, `carts/${userId}/${productId}`));
}
