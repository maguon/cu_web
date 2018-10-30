import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input, Tabs, Tab} from 'react-materialize';
import {UserManagerDetailActionType, CarQRCodeModalActionType} from '../../actionTypes';
import {CarQRCodeModal, MessageInfoModal} from '../modules/index'

const userManagerDetailAction = require('../../actions/main/UserManagerDetailAction');
const carQRCodeModalAction = require('../../actions/modules/CarQRCodeModalAction');
const messageDetailAction = require('../../actions/main/MessageDetailAction');
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
        // 点击不同的TAB，进行相应处理
        if (event.target.text === '基本信息') {
            this.props.setTabId('base');
        } else if (event.target.text === '绑定车辆') {
            this.props.setTabId('bindCar');
            this.props.getUserCarList();
        } else if (event.target.text === '消息记录') {
            this.props.setTabId('message');
            // 默认第一页
            this.props.setMsgStartNumber(0);
            // 清空检索条件
            this.props.changeMsgConditionType(null);
            this.props.setMsgConditionStartDate('');
            this.props.setMsgConditionEndDate('');
            // 检索消息记录列表
            this.props.getMessageList();
        } else if (event.target.text === '交易记录') {
            this.props.setTabId('transaction');
        } else if (event.target.text === '收货地址') {
            this.props.setTabId('address');
        }
    };

    /**
     * 绑定车辆TAB：显示车辆二维码
     */
    showCarQRCode = (event, carId, plateNum) => {
        this.props.setUserId(this.props.match.params.id);
        this.props.setCarNo(carId);
        this.props.setPlateNum(plateNum);
        this.props.getQRCode();
        $('#carQRCodeModal').modal('open');
    };

    /**
     * 消息记录TAB：更新 检索条件：发送时间(始)
     */
    changeMsgConditionStartDate = (event, value) => {
        this.props.setMsgConditionStartDate(value);
    };

    /**
     * 消息记录TAB：更新 检索条件：发送时间(始)
     */
    changeMsgConditionEndDate = (event, value) => {
        this.props.setMsgConditionEndDate(value);
    };

    /**
     * 消息记录TAB：查询消息记录列表
     */
    queryMessageList = () => {
        // 默认第一页
        this.props.setMsgStartNumber(0);
        this.props.getMessageList();
    };

    /**
     * 消息记录TAB：上一页
     */
    msgPreBtn = () => {
        this.props.setMsgStartNumber(this.props.userManagerDetailReducer.msgStart - (this.props.userManagerDetailReducer.msgSize - 1));
        this.props.getMessageList();
    };

    /**
     * 消息记录TAB：下一页
     */
    msgNextBtn = () => {
        this.props.setMsgStartNumber(this.props.userManagerDetailReducer.msgStart + (this.props.userManagerDetailReducer.msgSize - 1));
        this.props.getMessageList();
    };

    /**
     * 消息记录TAB：显示消息详细内容
     */
    showMessageModal = (messageId) => {
        this.props.getMessageInfo(messageId);
        $('#messageModal').modal('open');
    };

    render() {
        const {userManagerDetailReducer, changeMsgConditionType} = this.props;
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

                {/* 主体部分：基本信息 + 绑定车辆 + 消息记录 + 交易记录 + 收货地址 */}
                <Tabs onChange={this.changeTab}>
                    <Tab title="基本信息" tabWidth={3} active={userManagerDetailReducer.tabId === "base"}>
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

                            <div className="col s12 grey-text">
                                <div className="row margin-left10 margin-right10">
                                    {/* 基本信息：微信昵称 */}
                                    <div className="input-field col s6">
                                        昵称：{userManagerDetailReducer.weChatName}
                                    </div>
                                    {/* 基本信息：关注状态 */}
                                    <div className="input-field col s6 right-align blue-font">
                                        {sysConst.WE_CHAT_STATUS[userManagerDetailReducer.weChatStatus].label}
                                    </div>
                                </div>
                                <div className="row divider margin-top20 margin-left10 margin-right10"/>

                                <div className="row margin-left10 margin-right10">
                                    <div className="input-field col s6">
                                        {userManagerDetailReducer.authStatus === sysConst.AUTH_STATUS[1].value && <span>手机：{userManagerDetailReducer.phone}</span>}
                                    </div>
                                    {/* 基本信息：认证状态 */}
                                    <div className="input-field col s6 right-align blue-font">
                                        {sysConst.AUTH_STATUS[userManagerDetailReducer.authStatus].label}
                                    </div>
                                </div>
                                <div className="row divider margin-top20 margin-left10 margin-right10"/>

                                {userManagerDetailReducer.authStatus === sysConst.AUTH_STATUS[1].value &&
                                <div className="row margin-left10 margin-right10">
                                    <div className="input-field col s4 margin-top3">
                                        姓名：{userManagerDetailReducer.userName}
                                        {userManagerDetailReducer.gender === sysConst.GENDER[0].value ?
                                            <i className="mdi mdi-human-male margin-left20 blue-font fz24"/> :
                                            <i className="mdi mdi-human-female margin-left20 pink-text text-lighten-2 fz24"/>}
                                    </div>
                                    <div className="input-field col s3">
                                        出生年月日：{formatUtil.getDate(userManagerDetailReducer.birth)}
                                    </div>

                                    {/* 基本信息：认证时间 */}
                                    <div className="input-field col s5 right-align">
                                        认证时间：{formatUtil.getDateTime(userManagerDetailReducer.authTime)}
                                    </div>
                                </div>}
                                {userManagerDetailReducer.authStatus === sysConst.AUTH_STATUS[1].value && <div className="row divider margin-top20 margin-left10 margin-right10"/>}
                            </div>
                        </div>
                    </Tab>

                    <Tab title="绑定车辆" tabWidth={2} active={userManagerDetailReducer.tabId === "bindCar"}>
                        {userManagerDetailReducer.userCarArray.length === 0 &&
                        <div className="row center grey-text margin-top40">
                            该用户暂未绑定车辆
                        </div>}
                        {userManagerDetailReducer.userCarArray.map(function (item) {
                            return (
                                <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                                    <div className="row detail-box-header vc-center">
                                        {/* 绑定车辆：车辆编号 */}
                                        <div className="col s12">车辆编号：{item.id}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col s10 grey-text">
                                            <div className="row margin-left10 margin-right10">
                                                {/* 绑定车辆：车牌号 */}
                                                <div className="input-field col s6">
                                                    {item.license_plate}
                                                </div>
                                                {/* 绑定车辆：绑定时间 */}
                                                <div className="input-field col s6 right-align">
                                                    绑定时间：{formatUtil.getDateTime(item.created_on)}
                                                </div>
                                            </div>
                                            <div className="dotted-line"/>

                                            <div className="row margin-left10 margin-right10">
                                                {/* 绑定车辆：车辆识别码 */}
                                                <div className="input-field col s6">
                                                    车辆识别码：{item.vin}
                                                </div>
                                                {/* 绑定车辆：发动机号码 */}
                                                <div className="input-field col s6 right-align">
                                                    发动机号码：{item.engine_num}
                                                </div>
                                            </div>
                                            <div className="dotted-line"/>
                                        </div>

                                        <div className="col s2 center grey-text">
                                            <i className="mdi mdi-qrcode fz50"/>
                                            <div><a className="qr-link" onClick={() => {this.showCarQRCode(event, item.id, item.license_plate)}}>查看二维码</a></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }, this)}
                    </Tab>

                    <Tab title="消息记录" tabWidth={2} active={userManagerDetailReducer.tabId === "message"}>
                        {/* 扫描记录：车辆信息 */}
                        <div className="row z-depth-1 detail-box margin-top10 margin-left50 margin-right50 blue-font">
                            <div className="col s11 search-condition-box margin-top20">
                                {/* 查询条件：消息类型 */}
                                <div className="input-field col s4">
                                    <Select
                                        options={sysConst.MESSAGE_TYPE}
                                        onChange={changeMsgConditionType}
                                        value={userManagerDetailReducer.msgConditionType}
                                        isSearchable={false}
                                        placeholder={"请选择"}
                                        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                        isClearable={true}
                                    />
                                    <label className="active">消息类型</label>
                                </div>

                                {/* 查询条件：发送时间(始) */}
                                <div className="input-field col s4 custom-input-field">
                                    <Input s={12} label="发送时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                           value={userManagerDetailReducer.msgConditionStartDate} onChange={this.changeMsgConditionStartDate} />
                                    <span className="mdi data-icon mdi-table-large"/>
                                </div>

                                {/* 查询条件：发送时间(终) */}
                                <div className="input-field col s4 custom-input-field">
                                    <Input s={12} label="发送时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                           value={userManagerDetailReducer.msgConditionEndDate} onChange={this.changeMsgConditionEndDate} />
                                    <span className="mdi data-icon mdi-table-large"/>
                                </div>
                            </div>
                            {/* 查询按钮 */}
                            <div className="col s1">
                                <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 query-btn" onClick={this.queryMessageList}>
                                    <i className="mdi mdi-magnify"/>
                                </a>
                            </div>
                        </div>

                        {/* 扫描记录：记录列表 */}
                        <div className="row z-depth-1 detail-box margin-top10 margin-left50 margin-right50 blue-font">
                            <table className="fixed-table bordered">
                                <thead className="blue-grey lighten-5">
                                <tr className="grey-text text-darken-2">
                                    <th className="padding-left20">消息类型</th>
                                    <th className="message-td context-ellipsis">消息内容</th>
                                    <th className="center">发送时间</th>
                                    <th className="center">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    userManagerDetailReducer.messageArray.map(function (item) {
                                        return (
                                            <tr className="grey-text text-darken-1">
                                                <td className="padding-left20">{sysConst.MESSAGE_TYPE[item.type-1].label}</td>
                                                <td className="message-td context-ellipsis">{item.content}</td>
                                                <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                                <td className="operation center">
                                                    <i className="mdi mdi-table-search cyan-text lighten-1 pointer" onClick={() => {this.showMessageModal(item.id)}}/>
                                                </td>
                                            </tr>
                                        )
                                    },this)
                                }
                                {userManagerDetailReducer.messageArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="4">暂无数据</td>
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

                    <Tab title="交易记录" tabWidth={2} active={userManagerDetailReducer.tabId === "transaction"}>
                        交易记录
                    </Tab>

                    <Tab title="收货地址" tabWidth={3} active={userManagerDetailReducer.tabId === "address"}>
                        收货地址
                    </Tab>

                </Tabs>

                <CarQRCodeModal/>
                <MessageInfoModal/>
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
    // 设定显示TAB
    setTabId: (tabId) => {
        dispatch(UserManagerDetailActionType.setTabId(tabId))
    },

    // TAB1：基本信息
    getUserInfo: () => {
        dispatch(userManagerDetailAction.getUserInfo(ownProps.match.params.id))
    },

    // TAB2：绑定车辆
    getUserCarList: () => {
        dispatch(userManagerDetailAction.getUserCarList(ownProps.match.params.id))
    },
    // TAB2：车辆二维码 Modal
    setUserId: (value) => {
        dispatch(CarQRCodeModalActionType.setUserId(value))
    },
    setCarNo: (value) => {
        dispatch(CarQRCodeModalActionType.setCarNo(value))
    },
    setPlateNum: (value) => {
        dispatch(CarQRCodeModalActionType.setPlateNum(value))
    },
    getQRCode: () => {
        dispatch(carQRCodeModalAction.getQRCode())
    },

    // TAB3：消息记录
    setMsgStartNumber: (start) => {
        dispatch(UserManagerDetailActionType.setMsgStartNumber(start))
    },
    changeMsgConditionType: (type) => {
        dispatch(UserManagerDetailActionType.setMsgConditionType(type))
    },
    setMsgConditionStartDate: (time) => {
        dispatch(UserManagerDetailActionType.setMsgConditionStartDate(time))
    },
    setMsgConditionEndDate: (time) => {
        dispatch(UserManagerDetailActionType.setMsgConditionEndDate(time))
    },
    getMessageList: () => {
        dispatch(userManagerDetailAction.getMessageList(ownProps.match.params.id))
    },
    getMessageInfo: (messageId) => {
        dispatch(messageDetailAction.getMessageInfo(messageId))
    },


});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagerDetail)
