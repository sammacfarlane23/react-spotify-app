import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const InfoModal = ({ open, handleClose, children, className, ...rest }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={className}
      {...rest}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxWidth: "80%",
          bgcolor: "#000",
          border: "2px solid #000",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          outline: 0,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default InfoModal;
