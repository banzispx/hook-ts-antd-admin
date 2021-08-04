import React, { FC, memo, useState } from 'react';
import { Table } from 'antd';

interface TableProps {
  data: any[];
  columns: any[];
  total?: number;
  showQuickJumper?: boolean;
  pageSizeOptions?: string[];
  showSizeChanger?: boolean;
  setSelected?: Function;
  rowKey?: string;
  loading?: boolean;
}
const pageSizeChange = (page: number, pageSize?: number) => {
  console.log(page, pageSize);
};
const CommonTable: FC<TableProps> = memo(
  ({
    data,
    total,
    showQuickJumper,
    pageSizeOptions,
    showSizeChanger,
    columns,
    setSelected,
    rowKey,
    loading,
  }) => {
    console.log('CommonTable render');
    const rowSelection = {
      onChange: (keys: React.Key[], rows: any[]) => {
        setSelected && setSelected({ keys, rows });
      },
    };
    return (
      <Table
        loading={loading}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        rowKey={rowKey}
        columns={columns}
        dataSource={data}
        pagination={{
          total,
          showQuickJumper,
          pageSizeOptions,
          showSizeChanger,
          onChange: pageSizeChange,
          showTotal: (total) => `共${total}条`,
        }}
      />
    );
  }
);
CommonTable.defaultProps = {
  data: [],
  total: 0,
  showQuickJumper: true,
  pageSizeOptions: ['10', '20', '50', '100'],
  showSizeChanger: true,
  columns: [],
  rowKey: 'id',
  loading: false,
};
export default CommonTable;
