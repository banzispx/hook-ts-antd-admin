import { Col, Form, Input, Row, Select, DatePicker, FormInstance } from 'antd';
import React, { FC, forwardRef, memo, useImperativeHandle } from 'react';
const { RangePicker } = DatePicker;
const { Option } = Select;
type LayoutType = Parameters<typeof Form>[0]['layout'];
interface FormProps {
  formItemList: any[];
  formLayout?: LayoutType;
  formItemSpan?: number;
  queryForm?: Function;
  labelCol?: number;
  wrapperCol?: number;
  slotColSpan?: number;
  formSlot?: any;
  ref?: any;
}

const CommonForm: FC<FormProps> = memo(
  forwardRef((props, ref) => {
    const {
      formLayout,
      formItemList,
      formItemSpan,
      queryForm,
      labelCol,
      wrapperCol,
      slotColSpan,
    } = props;
    console.log('CommonForm render');

    const [form] = Form.useForm();
    const onFinish = (values: any) => {
      queryForm && queryForm(values);
    };
    const getRules = (formItem: any) => {
      let itemName = Object.values(formItem)[0];
      let message = '';
      if (formItem.type === 'select' || formItem.type === 'timeRange') {
        message = `请选择${itemName}`;
      } else if (formItem.type === 'file') {
        message = `请上传${itemName}`;
      } else {
        message = `请输入${itemName}`;
      }
      return [
        {
          required: true,
          message: message,
        },
      ];
    };
    const getItemByType = (type: string, formItem: any) => {
      if (type === 'select') {
        return (
          <Select placeholder={formItem.placeholder}>
            {formItem.optionArr.map((option: { val: any; label: string }) => (
              <Option key={option.val} value={option.val}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      } else if (type === 'timeRange') {
        return <RangePicker format="YYYY-MM-DD" />;
      } else {
        return <Input placeholder={formItem.placeholder} />;
      }
    };
    const delFormItemList = formItemList.map((item) => {
      item.label = item.label || Object.values(item)[0];
      item.name = item.name || Object.keys(item)[0];
      item.rules = item.rules || (item.isRequired && getRules(item)) || [];
      item.placeholder =
        item.placeholder || item.rules[0]?.message || getRules(item)[0].message;
      return item;
    });
    // 通过ref暴露给父组件的方法
    useImperativeHandle(ref, () => ({
      validate: form.validateFields,
      reset: form.resetFields,
    }));
    return (
      <Form
        form={form}
        layout={formLayout}
        labelCol={{ span: labelCol }}
        wrapperCol={{ span: wrapperCol }}
        onFinish={onFinish}
      >
        <Row>
          {delFormItemList.map((item, index) => (
            <Col span={formItemSpan} key={index}>
              <Form.Item label={item.label} name={item.name} rules={item.rules}>
                {item.render ? item.render() : getItemByType(item.type, item)}
              </Form.Item>
            </Col>
          ))}
          <Col span={slotColSpan}>{props.formSlot && props.formSlot()}</Col>
        </Row>
      </Form>
    );
  })
);
CommonForm.defaultProps = {
  formItemList: [],
  formLayout: 'horizontal',
  formItemSpan: 8,
  labelCol: 8,
  wrapperCol: 16,
  slotColSpan: 8,
};
export default CommonForm;
