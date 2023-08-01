import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Link } from "react-router-dom";
import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";
import { fetchRemovePost } from "../../redux/slices/posts";
import { useInView } from "react-intersection-observer";
import noimage from "../../img/noimage.jpg";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "./Post.module.scss";

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });

  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  const createdAtMod = `${new Date(createdAt).getDate()}.${new Date(
    createdAt
  ).getMonth()}.${new Date(createdAt).getFullYear()}`;

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить статью?")) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div
      ref={ref}
      className={clsx(styles.root, { [styles.rootFull]: isFullPost })}
    >
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <ReactMarkdown />

      {inView ? (
        <>
          {imageUrl ? (
            <img
              className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
              src={imageUrl}
              alt={title}
            />
          ) : (
            <img style={{ width: "100%" }} src={noimage} alt="нет картинки" />
          )}
          <div className={styles.wrapper}>
            <UserInfo {...user} additionalText={createdAtMod} />
            <div className={styles.indention}>
              <h2
                className={clsx(styles.title, {
                  [styles.titleFull]: isFullPost,
                })}
              >
                {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
              </h2>
              <ul className={styles.tags}>
                {tags.map((name) => (
                  <li key={name}>
                    #{name}
                    {/*  <Link to={`/tag/${name}`}>#{name}</Link>*/}
                  </li>
                ))}
              </ul>
              {children && <div className={styles.content}>{children}</div>}
              <ul className={styles.postDetails}>
                <li>
                  <EyeIcon />
                  <span>{viewsCount}</span>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{ width: "100%", height: "333px", background: "#C0C0C0" }}
        ></div>
      )}
    </div>
  );
};
