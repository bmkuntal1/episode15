import { useState, useEffect } from 'react'
import { getDocs, collection, query, where, getDoc, doc, deleteDoc, startAt } from "firebase/firestore";
import { db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

export const Posts = () => {
  const navigate = useNavigate();
  const [postList, setpostList] = useState([])
  
  const getPosts = async (searchText: string="") => {
    const docRef = collection(db, "posts");
    const docQuery = query(docRef, where("title", "array-contains", searchText))
    const docShapes: any = !searchText || searchText === "" ? await getDocs(docRef) : await getDocs(docQuery);
    var data1 = docShapes.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
    setpostList(data1)
  }

  const removePosts = async (postId: string) => {
    console.log(postId);
    const docRef: any = doc(db, "posts", postId);
    const docShape: any = await getDoc(docRef);
    if (docShape.exists()) {
      console.log("Document: ", docShape.data());
      await deleteDoc(docRef);
      await getPosts();
    } else {      
      console.log("No such document!");
    }
  }

  useEffect(() => {getPosts() }, []);


  return (
    <div>
      <h1>Posts</h1>
      {/* <button onClick={getPosts}>Load Posts</button> */}
      <button onClick={() => navigate("/posts/create")}>Create New Post</button>
      <input type="text" onChange={(event:any) => getPosts(event.target.value)} />
      {postList?.map((post: any, key) => {
        return (<div key={key} style={{ padding: "10px", margin: "5px", border: "solid 1px black " }}>
          <h2>{post.title}</h2>
          <small>{post.user}</small>
          <h2>{post.description}</h2>
          <button onClick={() => navigate(`/posts/update/${post.id}`)}>Edit</button>
          <button onClick={() => removePosts(post.id)}>remove</button>
        </div>)
      })}
    </div >
  )
}
