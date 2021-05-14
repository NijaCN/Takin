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

package io.shulie.tro.web.app.request.scenemanage;

import java.io.Serializable;
import java.util.List;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @Author: mubai
 * @Date: 2020-11-30 15:51
 * @Description:
 */

@Data
@ApiModel(value = "场景标签关联模型")
public class SceneTagRefCreateRequest implements Serializable {

    private static final long serialVersionUID = -8628119887637215236L;

    /**
     * 脚本发布实例id
     */

    @JsonProperty("sceneId")
    @NotNull(message = "场景id不能为空")
    @ApiModelProperty(value = "sceneId")
    private Long sceneId;

    /**
     * 标签ids
     */
    @NotNull(message = "标签id不能为空")
    @ApiModelProperty(value = "tagNames")
    private List<String> tagNames;
}