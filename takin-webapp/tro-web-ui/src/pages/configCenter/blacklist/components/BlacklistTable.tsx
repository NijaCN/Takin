/*
 * Copyright 2021 Shulie Technology, Co.Ltd
 * Email: shulie@shulie.io
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @name
 * @author chuxu
 */
import React, { Fragment } from 'react';
import { ColumnProps } from 'antd/lib/table';
import _ from 'lodash';
import { customColumnProps } from 'src/components/custom-table/utils';
import Link from 'umi/link';
import { Button, Divider, Badge, message } from 'antd';
import CustomPopconfirm from 'src/components/custom-popconfirm/CustomPopconfirm';
import BlacklistService from '../service';
import AddAndEditBlacklistDrawer from './AddAndEditBlacklistDrawer';
import AuthorityBtn from 'src/common/authority-btn/AuthorityBtn';
import { router } from 'umi';

const BlacklistTable = (state, setState): ColumnProps<any>[] => {
  const btnAuthority: any =
    localStorage.getItem('trowebBtnResource') &&
    JSON.parse(localStorage.getItem('trowebBtnResource'));
  /**
   * @name 确认是否禁用、启用
   */
  const handleConfirm = async (id, status) => {
    const {
      data: { data, success }
    } = await BlacklistService.openAndCloseBlacklist({
      blistId: id,
      useYn: status
    });
    if (success) {
      const txt = status === '1' ? '启用' : '禁用';
      message.success(`${txt}成功`);
      setState({
        isReload: !state.isReload
      });
    }
  };
  /**
   * @name 删除黑名单
   */
  const handleDeleteBlacklist = async id => {
    const {
      data: { data, success }
    } = await BlacklistService.deleteBlacklist({
      blistIds: [id]
    });
    if (success) {
      message.success(`删除成功`);
      setState({
        isReload: !state.isReload
      });
    }
  };
  return [
    {
      ...customColumnProps,
      title: 'redis key',
      dataIndex: 'redisKey'
    },
    {
      ...customColumnProps,
      title: '最近修改时间',
      dataIndex: 'updateTime'
    },
    {
      ...customColumnProps,
      title: '状态',
      dataIndex: 'useYn',
      render: text => {
        return (
          <Badge
            color={text === '1' ? '#11BBD5' : '#FE7D61'}
            text={text === '1' ? '启用' : '禁用'}
          />
        );
      }
    },
    {
      ...customColumnProps,
      title: '操作',
      dataIndex: 'action',
      align: 'right',
      render: (text, row) => {
        const btnTxt = row.useYn === '0' ? '启用' : '禁用';
        const txt = row.useYn === '0' ? '是否确定启用' : '是否确认禁用';
        return (
          <Fragment>
            <AuthorityBtn
              isShow={
                btnAuthority &&
                btnAuthority.configCenter_blacklist_6_enable_disable &&
                row.canEnableDisable
              }
            >
              <CustomPopconfirm
                title={txt}
                okColor="#FE7D61"
                okText={`确定${btnTxt}`}
                onConfirm={() =>
                  handleConfirm(row.blistId, row.useYn === '1' ? '0' : '1')
                }
              >
                <Button type="link" style={{ marginRight: 8 }}>
                  {btnTxt}
                </Button>
              </CustomPopconfirm>
            </AuthorityBtn>
            <AuthorityBtn
              isShow={
                btnAuthority &&
                btnAuthority.configCenter_blacklist_3_update &&
                row.canEdit
              }
            >
              <AddAndEditBlacklistDrawer
                action="edit"
                titles="编辑"
                id={row.blistId}
                onSccuess={() => {
                  setState({
                    isReload: !state.isReload,
                    searchParams: {
                      current: 0
                    }
                  });
                }}
              />
            </AuthorityBtn>
            <AuthorityBtn
              isShow={
                btnAuthority &&
                btnAuthority.configCenter_blacklist_4_delete &&
                row.canRemove
              }
            >
              <CustomPopconfirm
                title="是否确定删除？"
                okColor="#FE7D61"
                onConfirm={() => handleDeleteBlacklist(row.blistId)}
              >
                <Button type="link" style={{ marginLeft: 8 }}>
                  删除
                </Button>
              </CustomPopconfirm>
            </AuthorityBtn>
          </Fragment>
        );
      }
    }
  ];
};

export default BlacklistTable;