import React, { Component } from 'react';
import { Flex, Carousel, Grid } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import { getHouseListApi } from '../../apis/apis';

/* 
Array.from作用：把伪数组转化为真正的数组
*/
// console.log(Array.from(new Array(9)))
// const data = Array.from(new Array(9)).map((_val, i) => ({
//     icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//     text: `name${i}`,
//   }));
// console.log(data)
/* const data = [
    {
        icon: require('../../assets/imgs/icon_1.png'),
        text: '新房'
    },
    {
        icon: require('../../assets/imgs/icon_2.png'),
        text: '新房'
    },
    {
        icon: require('../../assets/imgs/icon_3.png'),
        text: '新房'
    },
    {
        icon: require('../../assets/imgs/icon_4.png'),
        text: '新房'
    },
    {
        icon: require('../../assets/imgs/icon_5.png'),
        text: '新房'
    },
    {
        icon: require('../../assets/imgs/icon_6.png'),
        text: '新房'
    },
    {
        icon: require('../../assets/imgs/icon_7.png'),
        text: '新房'
    },
    {
        icon: require('../../assets/imgs/icon_1.png'),
        text: '新房'
    },
    {
        icon: require('../../assets/imgs/icon_2.png'),
        text: '新房'
    },
]
 */
/* 推荐用这种方式来存数据，方便维护 */
const data = [
    {
        icon: "icon_1",
        text: '新房'
    },
    {
        icon: "icon_2",
        text: '新房'
    },
    {
        icon: "icon_3",
        text: '新房'
    },
    {
        icon: "icon_3",
        text: '新房'
    },
    {
        icon: "icon_4",
        text: '新房'
    },
    {
        icon: "icon_5",
        text: '新房'
    },
    {
        icon: "icon_6",
        text: '新房'
    },
    {
        icon: "icon_7",
        text: '新房'
    },
    {
        icon: "icon_2",
        text: '新房'
    },
].map((item) => ({
    icon: require(`../../assets/imgs/${item.icon}.png`),
    text: item.text,
}))

class Home extends Component {
    state = {
        city: '定位中...',
        data: ['carousel_1', 'carousel_2', 'carousel_3'],
        imgHeight: 176,
        houseList: []
    }
    goToSomeWhere = (url) => {
        //路由跳转
        this.props.history.push(url);
    };
    componentDidMount() {
        console.log('widnow', window)
        /* 
        注意：
            1.由于react作用域的原因，访问window下面的属性，必须在前面加上window.，否则会报错（找不到该变量）
            2. this指向要注意
        */
        window.AMap.plugin('AMap.CitySearch', () => {
            var citySearch = new window.AMap.CitySearch()
            citySearch.getLocalCity((status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                    // 查询成功，result即为当前所在城市信息
                    console.log('result', result);
                    const city = result.city;
                    this.setState({ city });
                }
            })
        });
        //获取房产列表
        this.getHouseListHandler();
    }

    getHouseListHandler = () => {
        getHouseListApi()
            .then((res) => {
                console.log('res', res);
                this.setState({ houseList: res.data });
            })
            .catch((err) => {
                console.log('err', err)
            })
    }

    render() {
        console.log('this.props', this.props)
        const { city, houseList } = this.state
        return (
            <div>
                {/* 头部 */}
                <Flex style={{ height: 50, background: '#29C775' }}>
                    <div style={{ width: 80, color: '#fff', paddingLeft: 5 }}
                        onClick={() => this.goToSomeWhere("/cityList")}>{city}  ▼ </div>
                    <Flex onClick={() => this.goToSomeWhere("/search")} align="center" style={{
                        flex: 1, background: '#fff',
                        height: 40, borderRadius: 20, paddingLeft: 10
                    }}>
                        <img style={{ width: 20, height: 20, marginRight: 5 }} src={require('../../assets/imgs/search.png')} alt="" />
                        <span style={{ color: '#ccc' }}>找房子，到源码房产APP</span>
                    </Flex>
                    <div onClick={() => this.goToSomeWhere("/map")} style={{ width: 50 }}><img style={{ width: 40, height: 40 }} alt="" src={require('../../assets/imgs/map.png')} /></div>
                </Flex>
                {/* 轮播图 */}
                <Carousel infinite>
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={require(`../../assets/imgs/${val}.jpg`)}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}

                            />
                        </a>
                    ))}
                </Carousel>
                {/* 宫格组件 */}
                <Grid data={data} isCarousel />
                {/* 列表 */}
                <div>
                    {
                        houseList.map((item) => {
                            return (
                                <Flex style={{ backgroundColor: '#fff', padding: 3 }} key={item.id}>
                                    <img
                                        src={item.pic}
                                        style={{ width: 100, height: 100, marginRight: 10 }} alt="" />
                                    <div style={{ flex: 1 }}>
                                        <Flex justify="between">
                                            <span>{item.name}</span>
                                            <span style={{ color: 'red' }}>{item.price}/平</span>
                                        </Flex>
                                        <div>{item.address}</div>
                                        <div>4室二厅</div>
                                    </div>
                                </Flex>
                            )
                        })
                    }

                </div>
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
