import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref as refDb, get, getDatabase } from "firebase/database";
import { ref as refStore, getDownloadURL, getStorage } from "firebase/storage";
import app from "../../firebase";
import { deepPurple } from "@mui/material/colors";
const AuthContext = createContext();
export const AuthProvider = (props) => {
  const auth = getAuth(app);
  const db = getDatabase();
  const store = getStorage();
  const [fetchedNotes, setFetchedNotes] = useState({
    notes: [],
    deletedNotes: [],
    archivedNotes: [],
  });
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        // const que = query(refDb(db, `/users/${user.uid}/notes`), orderByChild(`timestamp`))
        // We need to change the rules and specify the .indexOn for timestamp at the path /users/user.uid/notes
        // console.log(notes)
        await get(refDb(db, `/users/${user.uid}/notes`))
          .then(async (snapshot) => {
            const data = snapshot.val();

            await Promise.all(
              Object.values(data).map(async (note, idx) => {
                if (note.isTodo) {
                  if (!note.todo) note.todo = { undone: [], done: [] };
                  else {
                    if (!note.todo.done) note.todo.done = [];
                    if (!note.todo.undone) note.todo.undone = [];
                  }
                }
                try {
                  const url = await getDownloadURL(
                    refStore(store, `/users/${user.uid}/${note.id}`)
                  );
                  note.url = url;
                } catch (error) {
                  if (error.code === "storage/object-not-found") {
                    return Promise.resolve(false);
                  } else {
                    return Promise.reject(error);
                  }
                }
              })
            );

            return data;
          })
          .then((data) => {
            if (data != null) {
              setFetchedNotes((prevNotes) => ({
                ...prevNotes,
                notes: Object.values(data),
              }));
            }
          });

        await get(refDb(db, `/users/${user.uid}/deleted`))
          .then((snapshot) => {
            const data = snapshot.val();
            if (data != null) {
              Object.values(data).forEach(async (note, idx) => {
                if (note.isTodo) {
                  if (!note.todo) note.todo = { undone: [], done: [] };
                  else {
                    if (!note.todo.done) note.todo.done = [];
                    if (!note.todo.undone) note.todo.undone = [];
                  }
                }

                await getDownloadURL(
                  refStore(store, `/users/${user.uid}/${note.id}`)
                )
                  .then((url) => {
                    note.url = url;
                  })
                  .catch((er) => console.log(er));
              });
            }
          })
          .then((data) => {
            if (data != null) {
              setFetchedNotes((prevNotes) => ({
                ...prevNotes,
                deletedNotes: Object.values(data),
              }));
            }
          });

        await get(refDb(db, `/users/${user.uid}/archived`))
          .then((snapshot) => {
            const data = snapshot.val();
            if (data != null) {
              Object.values(data).forEach(async (note, idx) => {
                if (note.isTodo) {
                  if (!note.todo) note.todo = { undone: [], done: [] };
                  else {
                    if (!note.todo.done) note.todo.done = [];
                    if (!note.todo.undone) note.todo.undone = [];
                  }
                }

                await getDownloadURL(
                  refStore(store, `/users/${user.uid}/${note.id}`)
                )
                  .then((url) => {
                    note.url = url;
                  })
                  .catch((er) => console.log(er));
              });
            }
          })
          .then((data) => {
            if (data != null) {
              setFetchedNotes((prevNotes) => ({
                ...prevNotes,
                archivedNotes: Object.values(data),
              }));
            }
          });
      }
    });
    return unsubscribe;
  }, [auth]);
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };
  const logout = () => {
    setFetchedNotes({ notes: [], deletedNotes: [], archivedNotes: [] });
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, signup, login, logout, googleSignIn, fetchedNotes }}
    >
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
