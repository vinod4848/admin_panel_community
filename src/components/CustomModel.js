import React from "react";
import { Modal } from "antd";
function CustomModel(props) {
  const { open, hideModal, PerformAction, title } = props;
  return (
    <div>
      <Modal
        className="ms-20  bg-transparent border-0"
        title={title.slice(37)}
        open={open}
        onOk={PerformAction}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>{title}</p>
      </Modal>
    </div>
  );
}

export default CustomModel;
