import { createSlice } from "@reduxjs/toolkit";

//setting up all the state in here(global states)
const initialState = {
  mode: "light",
  user: null, //user start with null
  token: null, //auth information
  posts: [], //include all the post that we need
};

export const authSlice = createSlice({
  name: "auth", //represent the auth
  initialState,
  reducers: {
    //this is our action - (that mean functions involve the modify the global states)
    setMode: (state) => {
      //set mode changing to ligh mode to dark
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      //set the friends in to our local state bcz we need keep this information
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatePosts = state.posts.map((post) => {
        //grab the list of post and map through eachone
        if (post._id === action.payload.post._id) return action.payload.post; //if post._id is equal to current post_id that were sending into this function, it return post
        return post;
      });
      state.posts = updatePosts;
    },
  },
});

//reduc toolkit
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
