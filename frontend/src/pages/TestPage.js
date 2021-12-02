import { useDispatch } from 'react-redux';
import {
  addPost as apiAddPost,
  getAllPosts as apiGetAllPosts,
} from '../store/slices/postSlice';


function TestPage() {
  const dispatch = useDispatch();

  const addNewPost = (title, description, imageURL) => {
    dispatch(apiAddPost({ title, description, imageURL }));
  }

  const getAllPosts = () => {
    dispatch(apiGetAllPosts());
  }

  return (
    <div>
      <button onClick={() => getAllPosts()}>ADAUGA POSTARE NOUA</button>
    </div>
  );
}

export default TestPage;