import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    //make multiple API calls to database, so we use Promise.all()
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    //make sure that we can format this in a proper way for the frontend (formatted friends detail)
    const fromattedFriends = friends.map(
      //pass and setup all the information that we need to set in forntend
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(fromattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    //grab user info
    const user = await User.findById(id);
    //grab friend info
    const friend = await User.findById(friendId);

    // we gonna see if the friendId is included in the main user's friendId and we wanna make sure they are removed
    /*If friendId is found in the user's list of friends, it means they are already friends. 
            The code inside the if block removes friendId from the user's list of friends using the filter method.
             It creates a new array of friends that do not match the friendId, effectively removing it */
    if (user.friends.includes(friendId)) {
      //if the friendId is already part of the main user friends list we remove it
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    //then we want to formatted friends list
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const fromattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(fromattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
