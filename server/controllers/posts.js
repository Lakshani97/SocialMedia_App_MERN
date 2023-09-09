import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {}, 
        comments: [],
    })
    await newPost.save();
    //grab the saved post with all the post - (return all the post to frontend) 
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
//grap all the post from all users
export const getFeedPosts = async( req, res)=>{
    try{
        const post = await Post.find();
        res.status(200).json(post);
    }catch(err){
        res.status(404).json({ message: err.message });
    }
};

export const getUserPosts = async(req, res)=>{
    try{
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    }catch(err){
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const likePost = async(req, res)=>{
    try{
        const {id} = req.params; // grap the relevant post - comes from query string
        const {userId} = req.body; // it sending from frontend - comes from request body
        const post = await Post.findById(id);

        const isLiked = post.likes.get(userId);//check in the likes if the userId exist, if it exist that mean post has being like by particular particular
        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        //update the specific post
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true},
        );
        res.status(200).json(updatedPost);
    }catch(err){
        res.status(404).json({ message: err.message });
    }
};
