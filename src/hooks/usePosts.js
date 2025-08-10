import { ref, push, set, onValue, remove, off } from "firebase/database";
import { db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { auth } from "../config/firebase";

function usePosts() {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsRef = ref(db, "posts");
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newArr = Object.keys(data).map((key) => {
          return { id: key, ...data[key] };
        });
        setPosts(newArr);
      } else {
        setPosts([]);
      }
      setLoading(false);
    });
    return () => {
      off(postsRef);
    };
  }, []);
  const addPost = async (post) => {
    const newPostRef = push(ref(db, "posts"));
    await set(newPostRef, { ...post, uid: user.uid });

  };

  const editPost = async (post, postId) => {
    const editRef = ref(db, `posts/${postId}`);
    await set(editRef, { ...post, uid: user.uid });
  };
  const deletePost = async (postId) => {
    const deleteRef = ref(db, `posts/${postId}`);
    await remove(deleteRef);
  };

  return { posts, loading, addPost, deletePost, editPost, user };
}

export default usePosts;
