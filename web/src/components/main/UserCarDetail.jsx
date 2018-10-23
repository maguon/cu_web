import React from 'react';
import {connect} from 'react-redux';
import {UserCarDetailActionType} from '../../actionTypes';
import {Link} from "react-router-dom";
import {Tabs,Tab} from 'react-materialize';

const userCarDetailAction = require('../../actions/main/UserCarDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class UserCarDetail extends React.Component {

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
        $('.modal').modal();
        // 取得车辆信息
        this.props.getUserCarInfo();
        // 显示基本信息
        this.props.setTabId('base');
    }

    /**
     * 切换TAB
     */
    changeTab = (tabIndex, event) => {
        if (event.target.text === '基本信息') {
            this.props.setTabId('base');
        } else if (event.target.text === '扫描记录') {
            this.props.setTabId('scan');
            // 默认第一页
            this.props.setStartNumber(0);
            this.props.getMessageList();
        }
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.userCarDetailReducer.start - (this.props.userCarDetailReducer.size - 1));
        this.props.getMessageList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.userCarDetailReducer.start + (this.props.userCarDetailReducer.size - 1));
        this.props.getMessageList();
    };

    /**
     * 显示 消息详情
     */
    showMessageInfo = (messageId) => {
        $('#messageModal').modal('open');
        this.props.getMessageInfo(messageId);
    };

    render() {
        const {userCarDetailReducer, closeModal} = this.props;

        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/user_car', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">绑定车辆管理 - 车辆信息</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体部分：基本信息 + 扫描记录 */}
                <Tabs onChange={this.changeTab}>
                    <Tab title="基本信息" tabWidth={6} active={userCarDetailReducer.tabId === "base"}>
                        {/* 车辆信息：明细 */}
                        <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                            <div className="row detail-box-header vc-center">
                                {/* 车辆信息：车辆编号 */}
                                <div className="col s6">车辆编号：{this.props.match.params.id}</div>

                                {/* 车辆信息：绑定时间 绑定状态 */}
                                <div className="col s6 right-align">
                                    <span className="grey-text">绑定时间：{formatUtil.getDateTime(userCarDetailReducer.createdOn)}</span>
                                    <span className="margin-left50">{sysConst.BIND_STATUS[userCarDetailReducer.status].label}</span>
                                </div>
                            </div>

                            <div className="col s12 grey-text">
                                <div className="row margin-left10 margin-right10">
                                    {/* 车辆信息：车牌号码 */}
                                    <div className="input-field col s4 blue-font fz20">
                                        <i className="mdi mdi-car fz20 margin-right20"/>{userCarDetailReducer.plateNum}
                                    </div>
                                    {/* 车辆信息：联系电话 */}
                                    <div className="input-field col s4">
                                        <i className="mdi mdi-cellphone fz20 margin-right10"/>{userCarDetailReducer.phone}
                                    </div>
                                    {/* 车辆信息：绑定用户 */}
                                    <div className="input-field col s4 right-align">
                                        <i className="mdi mdi-account-outline fz20 margin-right10"/>{userCarDetailReducer.bindUser}
                                    </div>
                                </div>

                                <div className="row divider custom-divider margin-top20 margin-left10 margin-right10"/>

                                <div className="row margin-left10 margin-right10">
                                    <div className="input-field col s6">
                                        车辆识别码：{userCarDetailReducer.vin}
                                    </div>
                                    <div className="input-field col s6 right-align">
                                        发动机号码：{userCarDetailReducer.engineNum}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>

                    <Tab title="扫描记录" tabWidth={6} active={userCarDetailReducer.tabId === "scan"}>
                        {/* 扫描记录：车辆信息 */}
                        <div className="row z-depth-1 detail-box margin-top10 margin-left50 margin-right50 blue-font">
                            <div className="row margin-left10 margin-right10 margin-top20">
                                {/* 车辆信息：车辆编号 */}
                                <div className="col s6">车辆编号：{this.props.match.params.id}</div>
                                {/* 车辆信息：绑定状态 */}
                                <div className="col s6 right-align">
                                    <span>{sysConst.BIND_STATUS[userCarDetailReducer.status].label}</span>
                                </div>

                                {/* 车辆信息：车牌号码 */}
                                <div className="input-field col s6 fz20">
                                    <i className="mdi mdi-car fz20 margin-right10"/>{userCarDetailReducer.plateNum}
                                </div>
                                {/* 车辆信息：绑定用户 */}
                                <div className="input-field col s6 right-align grey-text">
                                    共接收消息 <span className="blue-font fz20">{formatUtil.formatNumber(userCarDetailReducer.messageArray.length)}</span> 条
                                </div>
                            </div>
                        </div>

                        {/* 扫描记录：记录列表 */}
                        <div className="row z-depth-1 detail-box margin-top10 margin-left50 margin-right50 blue-font">
                            <table className="bordered fixed-table">
                                <thead className="blue-grey lighten-5">
                                <tr className="grey-text text-darken-2">
                                    <th className="padding-left20">消息编号</th>
                                    <th>消息名称</th>
                                    <th className="message-td context-ellipsis">消息内容</th>
                                    <th>接收时间</th>
                                    <th>扫描交警</th>
                                    <th>是否成功</th>
                                    <th className="center">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    userCarDetailReducer.messageArray.map(function (item) {
                                        return (
                                            <tr className="grey-text text-darken-1">
                                                <td className="padding-left20">{item.id}</td>
                                                <td>{item.message_name}</td>
                                                <td className="message-td context-ellipsis">{item.message_order}</td>
                                                <td>{formatUtil.getDateTime(item.created_on)}</td>
                                                <td>{item.superviseName}</td>
                                                <td>{sysConst.SUCCESS_STATUS[item.status].label}</td>
                                                <td className="operation center">
                                                    <i className="mdi mdi-table-search cyan-text lighten-1 pointer" onClick={() => {this.showMessageInfo(item.id)}}/>
                                                </td>
                                            </tr>
                                        )
                                    },this)
                                }
                                { userCarDetailReducer.messageArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="9">暂无数据</td>
                                </tr>
                                }
                                </tbody>
                            </table>
                        </div>

                        {/* 上下页按钮 */}
                        <div className="row margin-top10 margin-left50 margin-right50">
                            <div className="right">
                                {userCarDetailReducer.start > 0 &&
                                <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                    上一页
                                </a>}
                                {userCarDetailReducer.dataSize >= userCarDetailReducer.size &&
                                <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                    下一页
                                </a>}
                            </div>
                        </div>
                    </Tab>
                </Tabs>

                <div id="messageModal" className="modal modal-fixed-footer row">

                    {/** Modal头部：Title */}
                    <div className="modal-title center-align white-text">消息详情</div>

                    {/** Modal主体 */}
                    <div className="modal-content white grey-text">

                        {/** 消息编号 消息名称 */}
                        <div className="row">
                            <div className="col s12 fz14">消息编号：{userCarDetailReducer.messageId}</div>
                            <div className="col s12 center blue-font fz18">{userCarDetailReducer.messageName}</div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 消息时间 */}
                        <div className="row">
                            <div className="col s12 right-align fz14">{formatUtil.getDateTime(userCarDetailReducer.messageCreateOn)}</div>
                        </div>

                        {/** 消息内容 */}
                        <div className="row">
                            <div className="col s-percent-4"><i className="mdi mdi-comment-processing-outline blue-text text-lighten-1 fz20"/></div>
                            <div className="col s-percent-96 word-wrap margin-top3">{userCarDetailReducer.messageContent}</div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 地址 */}
                        <div className="row">
                            <div className="col s-percent-4"><i className="mdi mdi-map-marker-outline orange-text text-lighten-1 fz20"/></div>
                            <div className="col s-percent-96 word-wrap margin-top3">{userCarDetailReducer.messageAddress}</div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 图片显示 */}
                        <div className="row">
                            <div className="col s12">TODO IMG LIST</div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 发送人 */}
                        <div className="row">
                            <div className="col s12 right-align blue-font">发送人：{userCarDetailReducer.messageSuperviseName}</div>
                        </div>
                    </div>

                    {/** Modal固定底部：确定按钮 */}
                    <div className="modal-footer">
                        <button type="button" className="btn confirm-btn" onClick={closeModal}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userCarDetailReducer: state.UserCarDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    setTabId: (tabId) => {
        dispatch(UserCarDetailActionType.setTabId(tabId))
    },
    getUserCarInfo: () => {
        dispatch(userCarDetailAction.getUserCarInfo(ownProps.match.params.id))
    },
    getMessageList: () => {
        dispatch(userCarDetailAction.getMessageList(ownProps.match.params.id))
    },
    setStartNumber: (start) => {
        dispatch(UserCarDetailActionType.setStartNumber(start))
    },
    getMessageInfo: (messageId) => {
        dispatch(userCarDetailAction.getMessageInfo(messageId))
    },
    closeModal: () => {
        $('#messageModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCarDetail)
