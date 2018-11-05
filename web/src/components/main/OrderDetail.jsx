import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {OrderDetailActionType} from '../../actionTypes';

const orderDetailAction = require('../../actions/main/OrderDetailAction');
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
        // 取得车辆信息
        this.props.getOrderInfo();
        $('ul.tabs').tabs();
    }

    /**
     * 扫描记录TAB：点击事件
     */
    onClickScanTab = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getCheckCarList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.userCarDetailReducer.start - (this.props.userCarDetailReducer.size - 1));
        this.props.getCheckCarList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.userCarDetailReducer.start + (this.props.userCarDetailReducer.size - 1));
        this.props.getCheckCarList();
    };

    render() {
        const {userCarDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/order', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">订单管理 - 订单详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>


                <div className="row">
                    {/* TAB 头部 */}
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s6"><a className="active" href="#tab-base">基本信息</a></li>
                            <li className="tab col s6"><a href="#tab-scan" onClick={this.onClickScanTab}>扫描记录</a></li>
                        </ul>
                    </div>

                    {/* TAB 1 : 基本信息TAB */}
                    <div id="tab-base" className="col s12">
                        {/* 车辆信息：明细 */}
                        {userCarDetailReducer.userCarInfo.length > 0 &&
                        <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                            <div className="row detail-box-header vc-center">
                                {/* 车辆信息：车辆编号 */}
                                <div className="col s6">车辆编号：{this.props.match.params.id}</div>

                                {/* 车辆信息：绑定时间 绑定状态 */}
                                <div className="col s6 right-align">
                                    <span className="grey-text">绑定时间：{formatUtil.getDateTime(userCarDetailReducer.userCarInfo[0].created_on)}</span>
                                    <span className="margin-left50">{sysConst.BIND_STATUS[userCarDetailReducer.userCarInfo[0].status].label}</span>
                                </div>
                            </div>

                            <div className="col s12 grey-text">
                                <div className="row margin-left10 margin-right10">
                                    {/* 车辆信息：车牌号码 */}
                                    <div className="input-field col s4 blue-font fz20">
                                        <i className="mdi mdi-car fz20 margin-right20"/>{userCarDetailReducer.userCarInfo[0].license_plate}
                                    </div>
                                    {/* 车辆信息：联系电话 */}
                                    <div className="input-field col s4">
                                        <i className="mdi mdi-cellphone fz20 margin-right10"/>{userCarDetailReducer.userCarInfo[0].phone}
                                    </div>
                                    {/* 车辆信息：绑定用户 */}
                                    <div className="input-field col s4 right-align">
                                        <i className="mdi mdi-account-outline fz20 margin-right10"/>{userCarDetailReducer.userCarInfo[0].user_name}
                                    </div>
                                </div>

                                <div className="row divider custom-divider margin-top20 margin-left10 margin-right10"/>

                                <div className="row margin-left10 margin-right10">
                                    <div className="input-field col s6">
                                        车辆识别码：{userCarDetailReducer.userCarInfo[0].vin}
                                    </div>
                                    <div className="input-field col s6 right-align">
                                        发动机号码：{userCarDetailReducer.userCarInfo[0].engine_num}
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>

                    {/* TAB 2 : 扫描记录TAB */}
                    <div id="tab-scan" className="col s12">
                        {/* 扫描记录：车辆信息 */}
                        {userCarDetailReducer.userCarInfo.length > 0 &&
                        <div className="row z-depth-1 detail-box margin-top10 margin-left50 margin-right50 blue-font">
                            <div className="row margin-left10 margin-right10 margin-top20">
                                {/* 车辆信息：车辆编号 */}
                                <div className="col s6">车辆编号：{this.props.match.params.id}</div>
                                {/* 车辆信息：绑定状态 */}
                                <div className="col s6 right-align">
                                    <span>{sysConst.BIND_STATUS[userCarDetailReducer.userCarInfo[0].status].label}</span>
                                </div>

                                {/* 车辆信息：车牌号码 */}
                                <div className="input-field col s6 fz20">
                                    <i className="mdi mdi-car fz20 margin-right10"/>{userCarDetailReducer.userCarInfo[0].license_plate}
                                </div>
                                {/* 车辆信息：扫描记录 */}
                                <div className="input-field col s6 right-align grey-text">
                                    {/*扫描记录： <span className="blue-font fz20">{formatUtil.formatNumber(userCarDetailReducer.checkCarArray.length)}</span> 条*/}
                                </div>
                            </div>
                        </div>}

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
                                    userCarDetailReducer.checkCarArray.map(function (item) {
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
                                { userCarDetailReducer.checkCarArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="5">暂无数据</td>
                                </tr>}
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
    getOrderInfo: () => {
        dispatch(orderDetailAction.getOrderInfo(ownProps.match.params.id))
    },
    getCheckCarList: () => {
        dispatch(orderDetailAction.getCheckCarList(ownProps.match.params.id))
    },
    setStartNumber: (start) => {
        dispatch(OrderDetailActionType.setStartNumber(start))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCarDetail)
