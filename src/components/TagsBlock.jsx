import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import styles from "./Tags.module.scss";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <div>
      <SideBlock title="Тэги">
        <List>
          {(isLoading ? [...Array(5)] : items).map((name, i) => (
            <div key={i} style={{ textDecoration: "none", color: "black" }}>
              <ListItem key={i} disablePadding>
                <>
                  <ListItemIcon>
                    <TagIcon />
                  </ListItemIcon>
                  {isLoading ? (
                    <Skeleton width={100} />
                  ) : (
                    <ListItemText primary={name} />
                  )}
                </>
              </ListItem>
            </div>
          ))}
        </List>
      </SideBlock>
    </div>
  );
};
