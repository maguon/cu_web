import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'react-materialize';
import {UserManagerDetailActionType, CarQRCodeModalActionType} from '../../actionTypes';
import {CarQRCodeModal} from '../modules/index'

const userManagerDetailAction = require('../../actions/main/UserManagerDetailAction');
const carQRCodeModalAction = require('../../actions/modules/CarQRCodeModalAction');
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
            this.props.getCheckCarList();
        } else if (event.target.text === '交易记录') {
            this.props.setTabId('transaction');
        } else if (event.target.text === '收货地址') {
            this.props.setTabId('address');
        }
    };


    /**
     * 显示车辆二维码
     */
    showCarQRCode = (event, carId, plateNum) => {
        this.props.setUserId(this.props.match.params.id);
        this.props.setCarNo(carId);
        this.props.setPlateNum(plateNum);
        this.props.getQRCode();
        $('#carQRCodeModal').modal('open');
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

                    <Tab title="交易记录" tabWidth={2} active={userManagerDetailReducer.tabId === "transaction"}>
                        交易记录
                    </Tab>

                    <Tab title="收货地址" tabWidth={3} active={userManagerDetailReducer.tabId === "address"}>
                        收货地址
                    </Tab>

                </Tabs>

                <CarQRCodeModal/>
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
    getUserCarList: () => {
        dispatch(userManagerDetailAction.getUserCarList(ownProps.match.params.id))
    },
    getCheckCarList: () => {
        dispatch(userManagerDetailAction.getCheckCarList(ownProps.match.params.id))
    },
    setMsgStartNumber: (start) => {
        dispatch(UserManagerDetailActionType.setMsgStartNumber(start))
    },
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagerDetail)
