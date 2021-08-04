import { Button, message, Popconfirm } from 'antd';
import { addClient, delClient, getClient } from 'api/request/client';
import CommonForm from 'components/CommonForm';
import CommonModal from 'components/CommonModal';
import CommonTable from 'components/CommonTable';
import useRequest from 'hooks/useRequest';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
interface refType {
  validate: Function;
  reset: Function;
}
interface Client {
  id: number;
  safeobjId: string;
  safeobjStatus: number;
  safeobjType: number;
  description: string;
}
const safeobjStatusArr = [
  { label: '未审批', val: -1 },
  { label: '审批不通过', val: 0 },
  // { label: '审批通过', val: 1 },
  { label: '下发失败', val: 2 },
  { label: '下发成功', val: 3 },
];
const safeobjTypeArr = [
  { label: '设备', val: 1 },
  { label: '用户', val: 2 },
  { label: '服务', val: 3 },
];
const client = memo(() => {
  // 公共逻辑
  const { data: clientData, isLoading, run } = useRequest<Client | null>();
  // 下面是form的交互逻辑
  const formItemList = useMemo(
    () => [
      { safeobjId: '安全对象ID' },
      {
        safeobjStatus: '安全对象状态',
        type: 'select',
        optionArr: safeobjStatusArr,
      },
      {
        safeobjType: '安全对象类型',
        type: 'select',
        optionArr: safeobjTypeArr,
      },
      // { createTime: "添加时间", type: "timeRange", isRequired: true },
    ],
    []
  );
  const ref = useRef<refType>(null);
  const [formData, setFormData] = useState({});
  const queryForm = useCallback((params) => {
    setFormData(params);
  }, []);
  const resetForm = useCallback(() => {
    setFormData({});
  }, []);
  const formSlot = useCallback(() => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: '5rem',
        }}
      >
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button htmlType="reset" onClick={resetForm}>
          重置
        </Button>
        <Button
          htmlType="reset"
          onClick={() => setAddFormVisable(!addFormVisable)}
        >
          添加
        </Button>
      </div>
    );
  }, []);
  // 下面是table的交互逻辑
  const delRow = (row: { id: any }) => {
    delClient(row).then((res) => {
      message.success('删除成功');
      run(getClient(formData));
    });
  };
  const columns = useMemo(
    () => [
      {
        title: '安全对象Id',
        dataIndex: 'safeobjId',
        render: (text: string) => <span>{text}</span>,
      },
      {
        title: '安全对象状态',
        dataIndex: 'safeobjStatus',
        render: (text: number) => (
          <span>
            {safeobjStatusArr.filter((item) => item.val === text)[0].label}
          </span>
        ),
      },
      {
        title: '安全对象类型',
        dataIndex: 'safeobjType',
        render: (text: number) => (
          <span>
            {safeobjTypeArr.filter((item) => item.val === text)[0].label}
          </span>
        ),
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '操作',
        render: (row: { id: any }) => {
          return (
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => {
                delRow(row);
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">删除</a>
            </Popconfirm>
          );
        },
      },
    ],
    []
  );
  const [row, setSelected] = useState({ keys: [], rows: [] });
  const delSelected = useCallback((val) => {
    setSelected(val);
  }, []);
  useEffect(() => {
    run(getClient(formData));
  }, [formData]);
  console.log(row, 5656);
  // 添加
  const [addFormVisable, setAddFormVisable] = useState(false);
  const addFormItemList = useMemo(
    () => [
      { safeobjId: '安全对象ID', isRequired: true },
      {
        safeobjStatus: '安全对象状态',
        type: 'select',
        optionArr: safeobjStatusArr,
        isRequired: true,
      },
      {
        safeobjType: '安全对象类型',
        type: 'select',
        isRequired: true,
        optionArr: safeobjTypeArr,
      },
      { description: '描述' },
    ],
    []
  );
  const handleOk = (val: object | undefined) => {
    addClient(val).then((res) => {
      message.success('添加成功');
    });
    run(getClient(formData));
    setAddFormVisable(!addFormVisable);
  };
  return (
    <div>
      <CommonForm
        formItemSpan={6}
        slotColSpan={6}
        ref={ref}
        queryForm={queryForm}
        formItemList={formItemList}
        formSlot={formSlot}
      />
      <CommonTable
        loading={isLoading}
        data={clientData || []}
        columns={columns}
        setSelected={delSelected}
      />
      <CommonModal
        visible={addFormVisable}
        formItemList={addFormItemList}
        handleOk={handleOk}
        handleCancel={() => {
          setAddFormVisable(!addFormVisable);
        }}
      />
    </div>
  );
});
export default client;
