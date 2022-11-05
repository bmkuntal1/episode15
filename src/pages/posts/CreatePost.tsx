import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, doc, getDoc, query, updateDoc } from "firebase/firestore";
import { auth, db } from '../../config/firebase';
import { useNavigate, useParams } from 'react-router-dom';

interface PostModel {
  title: string,
  description: string
}

export const CreatePost = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  //Form
  const schema = yup.object().shape({
    title: yup.string().max(30).required(),
    description: yup.string().max(100).required()
  })

  const { register, setValue, handleSubmit, formState: { errors }, } = useForm<PostModel>({
    resolver: yupResolver(schema)
  })
  //End Form

  const getPost = async (postId: string) => {
    const docRef: any = doc(db, "posts", postId);
    const docShape: any = await getDoc(docRef);
    if (docShape.exists()) {
      const { title, description } = docShape.data();

      setValue("title", title);
      setValue("description", description);

    } else {      
      console.log("No such document!");
    }
  }

  useEffect(() => { id && getPost(id) }, []);

  const onsubmitForm = async (data: PostModel) => {
    if (id) {
      const docRef: any = doc(db, "posts", id);      
      await updateDoc(docRef, { ...data})
    } else {
      const docRef = collection(db, "posts");
      await addDoc(docRef, { ...data, userId: user?.uid, user: user?.displayName });
    }
    navigate("/posts");
  }
  return (
    <div>
      <h1>Create new post</h1>
      <form onSubmit={handleSubmit(onsubmitForm)}>
        <div><input type="text" placeholder="Title..." {...register("title")} /><p style={{ color: "red" }}>{errors.title?.message}</p></div>
        <div><textarea placeholder="Description..." {...register("description")} /><p style={{ color: "red" }}>{errors.description?.message}</p></div>
        <div><button type="submit">Save Post</button><button onClick={() => navigate("/posts")} type="button">Cancel</button></div>
      </form>
    </div>
  )
}
