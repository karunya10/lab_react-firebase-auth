import { useState } from "react";
import usePosts from "../hooks/usePosts";
function PostList() {
  const { posts, loading, addPost, deletePost, user } = usePosts();
  const [content, setContent] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({
            msg: content,
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
          return (
            <div key={post.id}>
              {post.msg}
              {user.uid == post.uid && (
                <button onClick={() => deletePost(post.id)}>Delete</button>
              )}
            </div>
          );
        })}
    </>
  );
}
export default PostList;
