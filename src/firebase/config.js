
import { initializeApp } from "firebase/app";
import { getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";
const firebaseConfig = {
  apiKey: "AIzaSyAsqg9VAzZn4GjQr5gnVdUoH9D0gVNzLWg",
  authDomain: "documents-database.firebaseapp.com",
  projectId: "documents-database",
  storageBucket: "documents-database.appspot.com",
  messagingSenderId: "1029889633406",
  appId: "1:1029889633406:web:bba3f16d6559dfccffbc2f",
  measurementId: "G-QK2YRXL3EE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile (file){
const storageRef=ref(storage,v4())
 await uploadBytes(storageRef,file)
const url=await getDownloadURL(storageRef)
return url
}

