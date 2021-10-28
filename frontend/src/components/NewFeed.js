import * as React from "react";
import Drawer from "@mui/material/Drawer";
import FeedData from "./FeedData";

export default function NewFeedDrawer({ open, toggle }) {
  return (
    <div>
      <Drawer
        anchor="top"
        open={open}
        onClose={() => {
          toggle(false);
        }}
      >
        <FeedData open={open} toggle={toggle} />
      </Drawer>
    </div>
  );
}
