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

import React, { useEffect, useState } from 'react';
import SearchTable from 'src/components/search-table';
import getColumns from './components/AppManageTable';
import getFormData from './components/AppManageSearch';
import { useStateReducer } from 'racc';
import TableAction from './components/TableAction';
import TableWarning from './components/TableWarning';
import AppManageService from './service';

interface AppManageProps {
  isReload?: boolean;
  searchParams: {
    current: string | number;
    pageSize: string | number;
  };
  location?: any;
}

export interface AppManageState {
  switchStatus: string;
  isReload?: boolean;
  searchParams: {
    current: string | number;
    pageSize: string | number;
  };
  searchParamss?: any;
}

const AppManage: React.FC<AppManageProps> = props => {
  const [state, setState] = useStateReducer<AppManageState>({
    isReload: false,
    switchStatus: null,
    searchParams: {
      current: 0,
      pageSize: 10
    },
    searchParamss: props.location.query
  });

  useEffect(() => {
    querySwitchStatus();
  }, []);

  /**
   * @name 获取压测开关状态
   */
  const querySwitchStatus = async () => {
    const {
      data: { data, success }
    } = await AppManageService.querySwitchStatus({});
    if (success) {
      setState({
        switchStatus: data.switchStatus
      });
    }
  };

  return (
    <SearchTable
      commonTableProps={{
        columns: getColumns(state, setState)
      }}
      commonFormProps={{ formData: getFormData(), rowNum: 6 }}
      ajaxProps={{ url: '/application/center/list', method: 'GET' }}
      searchParams={state.searchParamss}
      toggleRoload={state.isReload}
      tableAction={<TableAction state={state} setState={setState} />}
      tableWarning={
        state.switchStatus !== 'OPENED' && (
          <TableWarning state={state} setState={setState} />
        )
      }
    />
  );
};
export default AppManage;