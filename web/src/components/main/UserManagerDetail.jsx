import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Tabs,Tab} from 'react-materialize';
import {UserManagerDetailActionType} from '../../actionTypes';

const userManagerDetailAction = require('../../actions/main/UserManagerDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class UserManagerDetail extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        // 取得车辆信息
        this.props.getUserInfo();
        // 显示基本信息
        this.props.setTabId('base');
    }

    /**
     * 切换TAB
     */
    changeTab = (tabIndex, event) => {
        if (event.target.text === '基本信息') {
            this.props.setTabId('base');
        } else if (event.target.text === '消息记录') {
            this.props.setTabId('message');
            // 默认第一页
            this.props.setMsgStartNumber(0);
            this.props.getCheckCarList();
        }
    };

    /**
     * 上一页
     */
    msgPreBtn = () => {
        this.props.setMsgStartNumber(this.props.userManagerDetailReducer.start - (this.props.userManagerDetailReducer.size - 1));
        this.props.getCheckCarList();
    };

    /**
     * 下一页
     */
    msgNextBtn = () => {
        this.props.setMsgStartNumber(this.props.userManagerDetailReducer.start + (this.props.userManagerDetailReducer.size - 1));
        this.props.getCheckCarList();
    };

    render() {
        const {userManagerDetailReducer} = this.props;

        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/user', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">用户管理 - 用户详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体部分：基本信息 + 消息记录 */}
                <Tabs onChange={this.changeTab}>
                    <Tab title="基本信息" tabWidth={6} active={userManagerDetailReducer.tabId === "base"}>
                        {/* 基本信息：明细 */}
                        <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                            <div className="row detail-box-header vc-center">
                                {/* 基本信息：编号 */}
                                <div className="col s6">编号：{this.props.match.params.id}</div>

                                {/* 基本信息：绑定时间 绑定状态 */}
                                <div className="col s6 right-align">
                                    <span className="grey-text">授权时间：{formatUtil.getDateTime(userManagerDetailReducer.createdOn)}</span>
                                </div>
                            </div>

                            <div className="col s12 blue-font">
                                <div className="row margin-left10 margin-right10">
                                    {/* 基本信息：微信昵称 */}
                                    <div className="input-field col s6 grey-text">
                                        昵称：{userManagerDetailReducer.weChatName}
                                    </div>
                                    {/* 基本信息：关注状态 */}
                                    <div className="input-field col s6 right-align">
                                        {sysConst.WE_CHAT_STATUS[userManagerDetailReducer.weChatStatus].label}
                                    </div>
                                </div>
                                <div className="row divider margin-top20 margin-left10 margin-right10"/>

                                <div className="row margin-left10 margin-right10">
                                    <div className="input-field col s6">
                                    </div>
                                    {/* 基本信息：认证状态 */}
                                    <div className="input-field col s6 right-align">
                                        {sysConst.AUTH_STATUS[userManagerDetailReducer.authStatus].label}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Tab>

                    <Tab title="消息记录" tabWidth={6} active={userManagerDetailReducer.tabId === "message"}>
                        {/* 扫描记录：车辆信息 */}
                        <div className="row z-depth-1 detail-box margin-top10 margin-left50 margin-right50 blue-font">
                            <div className="row margin-left10 margin-right10 margin-top20">
                                {/* 车辆信息：车辆编号 */}
                                <div className="col s6">车辆编号：{this.props.match.params.id}</div>
                                {/* 车辆信息：绑定状态 */}
                                <div className="col s6 right-align">
                                </div>

                                {/* 车辆信息：车牌号码 */}
                                <div className="input-field col s6 fz20">
                                </div>
                                {/* 车辆信息：扫描记录 */}
                                <div className="input-field col s6 right-align grey-text">
                                    {/*扫描记录： <span className="blue-font fz20">{formatUtil.formatNumber(userManagerDetailReducer.messageArray.length)}</span> 条*/}
                                </div>
                            </div>
                        </div>

                        {/* 扫描记录：记录列表 */}
                        <div className="row z-depth-1 detail-box margin-top10 margin-left50 margin-right50 blue-font">
                            <table className="bordered">
                                <thead className="blue-grey lighten-5">
                                <tr className="grey-text text-darken-2">
                                    <th className="padding-left20">编号</th>
                                    <th>地址</th>
                                    <th>扫码交警</th>
                                    <th className="center">扫码时间</th>
                                    <th>状态</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    userManagerDetailReducer.messageArray.map(function (item) {
                                        return (
                                            <tr className="grey-text text-darken-1">
                                                <td className="padding-left20">{item.id}</td>
                                                <td>{item.address}</td>
                                                <td>{item.supervise_name}</td>
                                                <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                                <td>{sysConst.CHECK_CAR_STATUS[item.status].label}</td>
                                            </tr>
                                        )
                                    },this)
                                }
                                { userManagerDetailReducer.messageArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="5">暂无数据</td>
                                </tr>}
                                </tbody>
                            </table>
                        </div>

                        {/* 上下页按钮 */}
                        <div className="row margin-top10 margin-left50 margin-right50">
                            <div className="right">
                                {userManagerDetailReducer.msgStart > 0 &&
                                <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.msgPreBtn}>
                                    上一页
                                </a>}
                                {userManagerDetailReducer.msgDataSize >= userManagerDetailReducer.msgSize &&
                                <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.msgNextBtn}>
                                    下一页
                                </a>}
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userManagerDetailReducer: state.UserManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    setTabId: (tabId) => {
        dispatch(UserManagerDetailActionType.setTabId(tabId))
    },
    getUserInfo: () => {
        dispatch(userManagerDetailAction.getUserInfo(ownProps.match.params.id))
    },
    getCheckCarList: () => {
        dispatch(userManagerDetailAction.getCheckCarList(ownProps.match.params.id))
    },
    setMsgStartNumber: (start) => {
        dispatch(UserManagerDetailActionType.setMsgStartNumber(start))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagerDetail)
