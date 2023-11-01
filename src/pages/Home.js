import React, { useState, useEffect } from 'react'
import {getDocs, query, orderBy} from "firebase/firestore"
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import { auth,db} from "../firebase-config"


function Home({isAuth}) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db,"posts");
  const q = query(postsCollectionRef, orderBy('createdAt',"desc"));
  const [comment,setComment] = useState("");

  const deletePost = async (id) => {
    const postDoc = doc(db,"posts",id);
    await deleteDoc(postDoc);
  };

  const postComment = async (id) => {
    await addDoc(collection(db,"posts",id,"comments"), {
      text: comment,
      username: auth.currentUser.displayName

    });
  setComment("");

  };



  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(q,postsCollectionRef);
      setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    getPosts();
  },[deletePost]);


  return (
  <div className="homePage">
  {postLists.map((post) => {
    return (
    <div className="post">
      <div className="postHeader">
        <div className="title">
          <h1>{post.title}</h1>
        </div>
        <div className="deletePost">
          {isAuth && post.author.id === auth.currentUser.uid && (<button onClick={() => {deletePost(post.id)}}>X</button>)}
        </div>
      </div>
      <div className="postTextContainer"> {post.postText} </div>
      <h3>@{post.author.name} </h3>
     
      { isAuth && 
      <h4><input
      type="text"
      placeholder="comment"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      />
      <button className="uploadComment" onClick={postComment(post.id)}>post</button>
      </h4>
  }
    </div>
    );
  })}
  </div>
  );
}

export default Home;