import React from "react";
import TagIcon from "@mui/icons-material/Tag";
import Skeleton from "@mui/material/Skeleton";
import "../index.scss";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <div>
      Теги
      <div className="wrapTags">
        {(isLoading ? [...Array(10)] : items).map((name, i) => (
          <ul key={i}>
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <li>
                <div className="tags__block">
                  <TagIcon /> {name}
                </div>
              </li>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
};
