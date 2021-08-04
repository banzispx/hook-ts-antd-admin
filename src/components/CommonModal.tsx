import React, { FC, memo, useRef, useState } from 'react';
import { Modal, Table } from 'antd';
import CommonForm from './CommonForm';

interface CommonModal {
  visible?: boolean;
  handleOk?: (x?: object, y?: React.MutableRefObject<null>) => void;
  handleCancel?: () => void;
  formItemList?: any[];
  labelCol?: number;
  wrapperCol?: number;
}
const CommonModal: FC<CommonModal> = memo(
  ({ visible, handleOk, handleCancel, formItemList, labelCol, wrapperCol }) => {
    const delHandleOk = () => {
      formItemList &&
        formRef.current.validate().then((res: object) => {
          handleOk && handleOk(res, formRef);
          formRef?.current.reset();
        });
    };
    const delHandleCancel = () => {
      formItemList && formRef?.current.reset();
      handleCancel && handleCancel();
    };
    const formRef = useRef<any>(null);
    return (
      <Modal
        title="添加客户端"
        visible={visible}
        onOk={delHandleOk}
        onCancel={delHandleCancel}
      >
        {formItemList && (
          <CommonForm
            ref={formRef}
            formItemSpan={24}
            slotColSpan={24}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            formItemList={formItemList}
          />
        )}
      </Modal>
    );
  }
);
CommonModal.defaultProps = {
  visible: false,
  labelCol: 6,
  wrapperCol: 18,
};
export default CommonModal;
