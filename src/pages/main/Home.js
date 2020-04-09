import React, { Component } from 'react';
import {Flex} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

class Home extends Component {
    goToSomeWhere = (url)=>{
        //路由跳转
        this.props.history.push(url);
    };
    render() {
        console.log('this.props',this.props)
        return (
            <div>
                {/* 头部 */}
                <Flex style={{height:50,background:'#29C775'}}>
                    <div style={{width:80,color:'#fff',paddingLeft:5}} onClick={()=>this.goToSomeWhere("/cityList")}>成都市  ▼ </div>
                    <Flex onClick={()=>this.goToSomeWhere("/search")}  align="center" style={{flex:1,background:'#fff',
                    height:40,borderRadius:20,paddingLeft:10}}>
                        <img style={{width:20,height:20,marginRight:5}} src={require('../../assets/imgs/search.png')} alt=""/>
                        <span style={{color:'#ccc'}}>找房子，到源码房产APP</span>
                    </Flex>
                    <div onClick={()=>this.goToSomeWhere("/map")} style={{width:50}}><img style={{width:40,height:40}} alt="" src={require('../../assets/imgs/map.png')}/></div>
                </Flex>
            </div>
        )
    }
}

/* 
高阶组件（了解）：一个函数，接受一个组件作为参数，然后返回一个新的组件，目的是对传入的组件做一些包装
withRouter是一个高阶组件，目的就是对传入的组件，以属性的方式传递三个路由对象（history,location ,match）给它，
然后，我们就可以在组件内部通过this.props访问传递进来的三个路由对象

*/

export default withRouter(Home);
