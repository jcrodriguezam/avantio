import * as React from "react";
import Drawer from "@mui/material/Drawer";
import FeedData from "./FeedData";

export default function EditDrawer({ open, toggle }) {
  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          toggle(false);
        }}
      >
        <FeedData open={open} toggle={toggle} isEdit={true} />
      </Drawer>
    </div>
  );
}
