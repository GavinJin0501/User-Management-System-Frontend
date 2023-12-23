import { searchUsers } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Image } from 'antd';
import { useRef } from 'react';

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: 'Account Name',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: 'Avatar',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image width={50} src={record.avatarUrl}/>
      </div>
    ),
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0: {text: 'male'},
      1: {text: 'female'}
    }
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: 'Status',
    dataIndex: 'userStatus',
  },
  {
    title: 'Planet Code',
    dataIndex: 'planetCode',
  },
  {
    title: 'Role',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {text: 'Normal', status: 'Default'},
      1: {text: 'Admin', status: 'Success'},
    }
  },
  {
    title: 'Created Time',
    dataIndex: 'createdTime',
    valueType: 'dateTime',
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers();
        return {
          data: userList
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};