import React from 'react';
import {HashRouter as Router, Route, Link} from "react-router-dom";
import {connect} from 'react-redux';
import {fileHost} from '../../config/HostConfig';
import {
    TrafficPolice,
    TrafficPoliceDetail,
    CheckCar,
    CheckCarDetail,

    UserManager,
    UserManagerDetail,
    UserCar,
    UserCarDetail,
    Message,
    MessageDetail,
    UserAddressDetail,
    UserAddress,

    Order,
    OrderDetail,
    Payment,
    PaymentDetail,
    FeedBack,
    FeedBackDetail,
    Log,
    LogDetail,
} from '../main/index';

const routes = [
    // 默认打开画面 - 暂定：用户收货地址
    {
        path: "/",
        exact: true,
        component: UserAddress
    },

    // 交警管理
    {
        path: "/traffic_police",
        exact: true,
        component: TrafficPolice
    },
    // 交警管理 - 详情
    {
        path: '/traffic_police/:id',
        exact: true,
        component: TrafficPoliceDetail
    },
    // 违停扫码管理
    {
        path: "/check_car",
        exact: true,
        component: CheckCar
    },
    // 违停扫码管理 - 详情
    {
        path: '/check_car/:id',
        exact: true,
        component: CheckCarDetail
    },

    // 用户管理
    {
        path: "/user",
        exact: true,
        component: UserManager
    },
    // 用户管理 - 详情
    {
        path: '/user/:id',
        exact: true,
        component: UserManagerDetail
    },
    // 用户车辆
    {
        path: "/user_car",
        exact: true,
        component: UserCar
    },
    // 用户车辆 - 详情
    {
        path: '/user_car/:id',
        exact: true,
        component: UserCarDetail
    },
    // 消息记录
    {
        path: "/message",
        exact: true,
        component: Message
    },
    // 消息记录 - 详情
    {
        path: '/message/:id',
        exact: true,
        component: MessageDetail
    },
    // 订单管理
    {
        path: "/order",
        exact: true,
        component: Order
    },
    // 订单管理 - 详情
    {
        path: '/order/:id',
        exact: true,
        component: OrderDetail
    },
    // 用户收货地址
    {
        path: "/user_address",
        exact: true,
        component: UserAddress
    },
    // 用户收货地址 - 详情
    {
        path: '/user_address/:id',
        exact: true,
        component: UserAddressDetail
    },


    // 售后管理
    {
        path: "/feed_back",
        exact: true,
        component: FeedBack
    },
    // 售后管理 - 详情
    {
        path: '/feed_back/:id',
        exact: true,
        component: FeedBackDetail
    },
    // 发货管理
    {
        path: "/log",
        exact: true,
        component: Log
    },
    // 发货管理 - 详情
    {
        path: '/log/:id',
        exact: true,
        component: LogDetail
    },
    // 支付管理
    {
        path: "/payment",
        exact: true,
        component: Payment
    },
    // 支付管理 - 详情
    {
        path: '/payment/:id',
        exact: true,
        component: PaymentDetail
    },
];

class Container extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {headerReducer} = this.props;
        console.log(headerReducer.userInfo);
        let avatarUrl = "";
        if (headerReducer.userInfo && headerReducer.userInfo.avatar_image) {
            avatarUrl = "http://" + fileHost + "/api/image/" + headerReducer.userInfo.avatar_image;
        } else {
            avatarUrl = "/assets/images/avatar.png"
        }
        return (
            <Router hashType={"hashbang"}>
                <div className="main-body">
                    <ul id="slide-out" className="side-nav">
                        <li>
                            <div className="user-view blue-grey">
                                <img className="circle" src={avatarUrl}/>
                                <span className="white-text name">Name:{headerReducer.userInfo.real_name}</span>
                                <span className="white-text email">Phone:{headerReducer.userInfo.phone}</span>
                            </div>
                        </li>

                        <li>
                            <Link to="/panel" className="side-navigation">
                                <i className="mdi mdi-cards-variant"/>面板
                            </Link>
                        </li>
                        <li><div className="divider"/></li>

                        <li>
                            <Link to="/message" className="side-navigation">
                                <i className="mdi mdi-comment-text-multiple"/>消息记录
                            </Link>
                        </li>
                        <li><div className="divider"/></li>

                        <li>
                            <ul className="collapsible collapsible-accordion">
                                <li>
                                    <a className="collapsible-header"><i className="mdi mdi-settings"/>交警管理</a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li><Link to="/traffic_police"><i className="mdi mdi-chevron-right"/>交警管理</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/check_car"><i className="mdi mdi-chevron-right"/>扫码管理</Link></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li><div className="divider"/></li>

                        <li>
                            <ul className="collapsible collapsible-accordion">
                                <li>
                                    <a className="collapsible-header"><i className="mdi mdi-account-group"/>用户信息</a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li><Link to="/user"><i className="mdi mdi-chevron-right"/>用户管理</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/user_car"><i className="mdi mdi-chevron-right"/>用户车辆管理</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/message"><i className="mdi mdi-chevron-right"/>消息记录</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/order"><i className="mdi mdi-chevron-right"/>订单管理</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/user_address"><i className="mdi mdi-chevron-right"/>收货地址</Link></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li><div className="divider"/></li>

                        <li>
                            <ul className="collapsible collapsible-accordion">
                                <li>
                                    <a className="collapsible-header"><i className="mdi mdi-cart-outline"/>商品管理</a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li><Link to="/order"><i className="mdi mdi-chevron-right"/>订单管理</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/feed_back"><i className="mdi mdi-chevron-right"/>售后管理</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/log"><i className="mdi mdi-chevron-right"/>发货管理</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/payment"><i className="mdi mdi-chevron-right"/>支付管理</Link></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    {routes.map((route, index) => (
                        // Render more <Route>s with the same paths as
                        // above, but different components this time.
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                    ))}
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        headerReducer: state.HeaderReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUserDetail: (userId) => {
        dispatch(headerAction.getUserDetail({userId: userId}))
    },
    logout: () => {
        dispatch(headerAction.logout())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container)
