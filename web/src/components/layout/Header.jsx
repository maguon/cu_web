import React from 'react';
import {connect} from 'react-redux';

const localUtil = require('../../util/LocalUtil');
const httpHeaders = require('../../util/HttpHeaders');
const headerAction = require('../../actions/layout/HeaderAction');
const sysConst = require('../../util/SysConst');

/**
 * UI组件：主画面头部。
 */
class Header extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     * @param props
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        const {getUserDetail} = this.props;
        const userId = localUtil.getLocalItem(sysConst.USER_ID);
        const userType = localUtil.getLocalItem(sysConst.USER_TYPE);
        const token = localUtil.getLocalItem(sysConst.AUTH_TOKEN);
        httpHeaders.set(sysConst.USER_ID, userId);
        httpHeaders.set(sysConst.USER_TYPE, userType);
        httpHeaders.set(sysConst.AUTH_TOKEN, token);
        if (userId == null || userType == null || token == null) {
            window.location.href = '/login.html';
        } else {
            getUserDetail(userId);
        }
        // $('select').formSelect();
        $("#sideNav").sideNav({closeOnClick: true});
        $('.collapsible').collapsible();
    }

    /**
     * 渲染(挂载)画面。
     */
    render() {
        //
        const {headerReducer, logout} = this.props;
        return (
            <div>
                <nav>
                    <div className="nav-wrapper z-depth-3 custom-blue">

                        <a href="#" id="sideNav" data-activates="slide-out" className="sidenav-trigger brand-logo"
                           style={{display: 'block',paddingLeft: '10px'}}>
                            <i className="mdi mdi-menu mdi-36px"/>
                        </a>

                        <span className="header-icon">icon位置</span>
                        <span className="header-font">连惠车后台管理系统</span>

                        <ul id="nav-mobile" className="right hide-on-med-and-down">

                            <li>
                                <a className="right-align">
                                    <i className="mdi mdi-account mdi-36px"/>
                                </a>
                            </li>
                            <li>
                                <a><i className="mdi mdi-exit-to-app mdi-36px" onClick={logout}/></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)
