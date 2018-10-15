import React from 'react';
import {TrafficPolice, TrafficPoliceDetail} from '../main/index';
import {HashRouter as Router, Route, Link} from "react-router-dom";

import {fileHost} from '../../config/HostConfig';

import {connect} from 'react-redux';

const routes = [
    // 默认打开画面 - 暂定面板画面
    {
        path: "/",
        exact: true,
        component: TrafficPolice
    },
    // 交警管理
    {
        path: "/traffic_police",
        exact: true,
        component: TrafficPolice
    },
    // 交警管理 - 交警资料
    {
        path: '/traffic_police/:id',
        exact: true,
        component: TrafficPoliceDetail
    }
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
                        <li>
                            <div className="divider"/>
                        </li>

                        <li>
                            <Link to="/traffic_police" className="side-navigation">
                                <i className="mdi mdi-account-group"/>交警管理
                            </Link>
                        </li>
                        <li>
                            <div className="divider"/>
                        </li>

                        <li>
                            <ul className="collapsible collapsible-accordion">
                                <li>
                                    <a className="collapsible-header"><i className="mdi mdi-lock"/>设置</a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li><Link to="/city_setting"><i className="mdi mdi-chevron-right"/>城市</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/route_setting"><i className="mdi mdi-chevron-right"/>线路</Link></li>
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
