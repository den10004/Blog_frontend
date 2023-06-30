import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPosts,
  fetchTags,
  reversePosts,
  popularPosts,
} from "../redux/slices/posts";
import "./style.css";

export const Home = () => {
  const dispatch = useDispatch();
  const [select, setSelect] = React.useState(1);
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  const renderTags = posts.items.map((u) => u.tags);
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

  const handleSelect = (event) => {
    setSelect(event.target.value);
    if (event.target.value === 1) {
      dispatch(fetchPosts());
    }
    if (event.target.value === 2) {
      dispatch(reversePosts());
    }
    if (event.target.value === 3) {
      dispatch(popularPosts());
    } else return;
  };

  return (
    <>
      <Box sx={{ width: 300, marginBottom: "10px" }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={select}
            label=""
            onChange={handleSelect}
          >
            <MenuItem value={1} sx={{ background: "#f5f5f5" }}>
              Старые статьи
            </MenuItem>
            <MenuItem value={2} sx={{ background: "#f5f5f5" }}>
              Новые статьи
            </MenuItem>
            <MenuItem value={3} sx={{ background: "#f5f5f5" }}>
              По популярности
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className="homeWrapper">
        <div className="homeBlock">
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                key={index}
                imageUrl={
                  obj.imageUrl
                    ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` /*`http://localhost:4444${obj.imageUrl}`*/
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
      </div>{" "}
    </>
  );
};
