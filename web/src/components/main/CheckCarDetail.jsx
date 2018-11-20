import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {CheckCarDetailActionType} from "../../actionTypes";

const checkCarDetailAction = require('../../actions/main/CheckCarDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class MessageDetail extends React.Component {

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
        // 取得消息信息
        this.props.getCheckCarInfo();
        this.props.setShowCarInfoFlag(false);
    }

    /**
     * 点击后，显示/隐藏 车辆信息
     */
    clickCarInfo = () => {
        this.props.setShowCarInfoFlag(!this.props.checkCarDetailReducer.showCarInfoFlag);
    };

    render() {
        const {checkCarDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/check_car', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">违停扫码管理 - 记录详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体部分 */}
                {checkCarDetailReducer.checkCarInfo.length > 0 &&
                <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                    <div className="row detail-box-header">
                        {/* 记录详情：编号 */}
                        <div className="col s6 no-padding">编号：{this.props.match.params.id}</div>

                        {/* 记录详情：扫描时间 状态 */}
                        <div className="col s6 no-padding right-align">
                            <span className="grey-text">扫描时间：{formatUtil.getDateTime(checkCarDetailReducer.checkCarInfo[0].created_on)}</span>
                            <span className="margin-left50">{sysConst.CHECK_CAR_STATUS[checkCarDetailReducer.checkCarInfo[0].status].label}</span>
                        </div>
                    </div>

                    <div className="col s12 blue-font">
                        {/* 记录详情：车辆信息 */}
                        <div className="row">
                            {/* 车辆信息：车牌号码 */}
                            <div className="input-field col s6 fz20">
                                <i className="mdi mdi-car fz20 margin-right20"/>{checkCarDetailReducer.checkCarInfo[0].license_plate}
                            </div>
                            {/* 车辆信息：显示/隐藏 按钮 */}
                            <div className="input-field col s6 right-align">
                                <span className="custom-btn" onClick={this.clickCarInfo}>
                                    <span className="fz12">车辆信息</span>
                                    {checkCarDetailReducer.showCarInfoFlag ? <i className="mdi mdi-chevron-up fz15"/> : <i className="mdi mdi-chevron-down fz15"/>}
                                </span>
                            </div>
                        </div>

                        {/* 记录详情：车辆信息详情 */}
                        {checkCarDetailReducer.showCarInfoFlag &&
                        <div className="row margin-left10 margin-right10 detail-box grey-text">
                            <div className="row">
                                <div className="input-field col s6">
                                    车辆识别码：{checkCarDetailReducer.checkCarInfo[0].vin}
                                </div>
                                <div className="input-field col s6 right-align">
                                    发动机号码：{checkCarDetailReducer.checkCarInfo[0].engine_num}
                                </div>
                            </div>

                            <div className="dotted-line"/>

                            <div className="row">
                                <div className="input-field col s6">
                                    联系电话：{checkCarDetailReducer.checkCarInfo[0].phone}
                                </div>
                                <div className="input-field col s6 right-align">
                                    车主：{checkCarDetailReducer.checkCarInfo[0].user_name}
                                </div>
                            </div>
                        </div>}
                        {!checkCarDetailReducer.showCarInfoFlag &&<div className="row divider margin-top20 margin-bottom0 margin-left10 margin-right10"/>}

                        {/* 记录详情：地址 */}
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="mdi mdi-map-marker-outline fz20 margin-right20"/>{checkCarDetailReducer.checkCarInfo[0].address}
                            </div>
                        </div>
                        <div className="row divider margin-top20 margin-left10 margin-right10"/>

                        {/* 记录详情：执行交警 */}
                        <div className="row margin-left10 margin-right10">
                            <div className="col s12 right-align">
                                执行交警：{checkCarDetailReducer.checkCarInfo[0].supervise_name}
                            </div>
                        </div>

                        {/* 高德地图 */}
                        <div className="row margin-left10 margin-right10">
                            <div id="map-container" className="col s12 detail-box"/>
                        </div>

                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        checkCarDetailReducer: state.CheckCarDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCheckCarInfo: () => {
        dispatch(checkCarDetailAction.getCheckCarInfo(ownProps.match.params.id))
    },
    setShowCarInfoFlag: (showCarInfoFlag) => {
        dispatch(CheckCarDetailActionType.setShowCarInfoFlag(showCarInfoFlag))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetail)
