import { useState } from "react";
import usePosts from "../hooks/usePosts";
function PostList() {
  const { posts, loading, addPost, deletePost, editPost, user } = usePosts();
  const [content, setContent] = useState("");
  const [editPostId, setEditPostId] = useState("");
  const [editPostMsg, setEditPostMsg] = useState("");

  const handleEdit = (post) => {
    setEditPostId(post.id);
    setEditPostMsg(post.msg);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({
            msg: content,
            uid: user.uid,
          });
          setContent("");
        }}
      >
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Post</button>
      </form>

      {!loading &&
        posts.map((post) => {
          return post.id === editPostId ? (
            <form onSubmit={() => editPost({ msg: editPostMsg,uid:user.uid }, editPostId)}>
              <input
                type="text"
                value={editPostMsg}
                onChange={(e) => setEditPostMsg(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <div key={post.id}>
              {post.msg}
              {user.uid == post.uid && (
                <button onClick={() => deletePost(post.id)}>Delete</button>
              )}
              {user.uid == post.uid && (
                <button onClick={() => handleEdit(post)}>Edit</button>
              )}
            </div>
          );
        })}
    </>
  );
}
export default PostList;
