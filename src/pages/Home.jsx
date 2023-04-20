import React from "react";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";

import { useDispatch, useSelector } from "react-redux";

import { fetchPosts, fetchTags } from "../redux/slices/posts";
import "./style.css";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  let postsArr = posts.items;
  let postReverse = [...postsArr].reverse();

  const renderTags = postsArr.map((u) => u.tags);
  let tagsForRender = [];
  renderTags.forEach((array) => {
    tagsForRender = tagsForRender.concat(array);
  });
  let uniqueTags = tagsForRender.filter(
    (item, i, ar) => ar.indexOf(item) === i
  );

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <div className="homeWrapper">
      <div className="homeBlock">
        {(isPostsLoading ? [...Array(5)] : postReverse).map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              key={index}
              imageUrl={
                obj.imageUrl
                  ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` /* `http://localhost:4444${obj.imageUrl}`*/
                  : ""
              }
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          )
        )}
      </div>
      <Grid xs={4} item>
        <TagsBlock items={uniqueTags} isLoading={isTagsLoading} />
      </Grid>
    </div>
  );
};
