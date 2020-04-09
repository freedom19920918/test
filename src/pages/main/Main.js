import React, { Component } from 'react';
import { Button } from 'antd-mobile';//引用要用的UI组件

export default class Main extends Component {
    render() {
        return (
            <div>
                导航页 <Button type="primary">测试</Button>{/* 使用 */}
            </div>
        )
    }
}
