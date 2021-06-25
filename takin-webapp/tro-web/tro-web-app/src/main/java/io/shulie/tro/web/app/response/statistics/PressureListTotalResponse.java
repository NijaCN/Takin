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

package io.shulie.tro.web.app.response.statistics;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author 无涯
 * @Package io.shulie.tro.web.app.response.statistics
 * @date 2020/11/30 9:23 下午
 */
@Data
public class PressureListTotalResponse {
    @ApiModelProperty(value = "id")
    private Long id;
    @ApiModelProperty(value = "name")
    private String name;
    @ApiModelProperty(value = "label")
    private String label;
    @ApiModelProperty(value = "gmtCreate")
    private String gmtCreate;
    @ApiModelProperty(value = "createName")
    private String createName;
    @ApiModelProperty(value = "count")
    private Integer count;
    @ApiModelProperty(value = "success")
    private Integer success;
    @ApiModelProperty(value = "fail")
    private Integer fail;
}