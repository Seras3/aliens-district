import { useDispatch } from 'react-redux';
import {
  addPost as apiAddPost,
  getAllPosts as apiGetAllPosts,
  editPost as apiEditPost,
  deletePost as apiDeletePost,
} from '../store/slices/postSlice';


function TestPage() {
  const dispatch = useDispatch();

  const addNewPost = (title, description, imageURL) => {
    dispatch(apiAddPost({ title, description, imageURL }));
  }

  const getAllPosts = () => {
    dispatch(apiGetAllPosts());
  }

  const editPost = ({ title, description, imageURL }) => {
    dispatch(apiEditPost({ postId: 'mYANI9vtrgiiBZr7JLTo', title, description, imageURL }));
  }

  const deletePost = () => {
    dispatch(apiDeletePost({ postId: 'mYANI9vtrgiiBZr7JLTo' }));
  }

  return (
    <div>
      { // GET ALL POSTS

        //<button onClick={() => getAllPosts()}>GET ALL POSTS</button>
      }

      { // EDIT POST

        <button onClick={() => editPost({
          title: "XX123XX",
          description: "dWa"
        })}>EDIT POST</button>

      }

      { // ADD NEW POST
        <button onClick={() => addNewPost("Titlu", "Descriere", "#url")}>ADD POST</button>
      }

      { // DELETE POST

        <button onClick={() => deletePost()}>DELETE POST</button>

      }
    </div>
  );
}

export default TestPage;