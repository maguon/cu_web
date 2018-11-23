import React from 'react';
import {connect} from 'react-redux';

const mainPanelAction = require('../../actions/main/MainPanelAction');
const formatUtil = require('../../util/FormatUtil');

class MainPanel extends React.Component {

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
        // 取得画面数据
        this.props.initData();
    }

    render() {
        const {mainPanelReducer} = this.props;
        return (
            <div>
                {/* 上部分：绑定用户总数 绑定车辆总数 交警用户总数 本月扫描车辆 */}
                <div className="row margin-top50 margin-left50 margin-right50 white-text fz45">

                    <div className="col s3 padding-left10 padding-right10">
                        <div className="col s12 z-depth-1 padding-top20 padding-bottom30 center materialize-red lighten-3">
                            <i className="mdi mdi-account margin-top20"/>
                            <div className="fz18">绑定用户总数</div>
                            <div className="margin-top20 margin-bottom20 fz24">{formatUtil.formatNumber(mainPanelReducer.userCnt, 0)}</div>
                        </div>
                    </div>
                    <div className="col s3 padding-left10 padding-right10">
                        <div className="col s12 z-depth-1 padding-top20 padding-bottom30 center green lighten-3">
                            <i className="mdi mdi-car margin-top20"/>
                            <div className="fz18">绑定车辆总数</div>
                            <div className="margin-top20 margin-bottom20 fz24">{formatUtil.formatNumber(mainPanelReducer.userCarCnt, 0)}</div>
                        </div>
                    </div>
                    <div className="col s3 padding-left10 padding-right10">

                        <div className="col s12 z-depth-1 padding-top20 padding-bottom30 center indigo lighten-3">
                            <i className="mdi mdi-traffic-light margin-top20"/>
                            <div className="fz18">交警用户总数</div>
                            <div className="margin-top20 margin-bottom20 fz24">{formatUtil.formatNumber(mainPanelReducer.policeCnt, 0)}</div>
                        </div>
                    </div>
                    <div className="col s3 padding-left10 padding-right10">

                        <div className="col s12 z-depth-1 padding-top20 padding-bottom30 center deep-purple lighten-3">
                            <i className="mdi mdi-qrcode-scan margin-top20"/>
                            <div className="fz18">本月扫描车辆</div>
                            <div className="margin-top20 margin-bottom20 fz24">{formatUtil.formatNumber(mainPanelReducer.checkCarCnt, 0)}</div>
                        </div>
                    </div>
                </div>

                {/* 下部分：本月订单数 本月商城收益 本月发布指令 本月申请售后数 */}
                <div className="row margin-top40 margin-left50 margin-right50 blue-font">

                    {/* 左上：本月订单数 */}
                    <div className="col s6 padding-left10 padding-right10">
                        <div className="row z-depth-1 detail-box margin-top20 blue-font">
                            {/* 左侧：图标 */}
                            <div className="col s2 center margin-top30 margin-bottom30 padding-left30 white-text">
                                <div className="main-panel-icon custom-blue vc-center left">
                                    <i className="mdi mdi-file-document"/>
                                </div>
                            </div>

                            {/* 右侧：统计 */}
                            <div className="col s10">
                                <div className="col s12 margin-top20">
                                    {/* 本月订单数 */}
                                    <div className="col s6 fz18">本月订单数</div>
                                    {/* 数量 */}
                                    <div className="col s6 right-align fz20 red-font no-padding">{formatUtil.formatNumber(mainPanelReducer.orderCnt, 0)}</div>
                                </div>
                                {/* 支付成功订单数 */}
                                <div className="col s12 grey-text margin-top30 right-align fz14 grey-text">
                                    支付成功订单数 <span className="fz16 blue-font margin-left10">{formatUtil.formatNumber(mainPanelReducer.orderPaymentCnt, 0)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右上：本月商城收益 */}
                    <div className="col s6 padding-left10 padding-right10">
                        <div className="row z-depth-1 detail-box margin-top20 blue-font">
                            {/* 左侧：图标 */}
                            <div className="col s2 center margin-top30 margin-bottom30 padding-left30 white-text">
                                <div className="main-panel-icon custom-blue vc-center left">
                                    <i className="mdi mdi-currency-cny"/>
                                </div>
                            </div>

                            {/* 右侧：统计 */}
                            <div className="col s10">
                                <div className="col s12 margin-top20">
                                    {/* 本月商城收益 */}
                                    <div className="col s6 fz18">本月商城收益</div>
                                    {/* 数量 */}
                                    <div className="col s6 right-align no-padding grey-text fz15">
                                        ¥ <span className="fz20 red-font">{formatUtil.formatNumber(mainPanelReducer.profit, 2)}</span> 元
                                    </div>
                                </div>

                                <div className="col s6 margin-top30 padding-left20 grey-text fz14">
                                    <span className="margin-right10">支付金额</span>¥ <span className="fz16 blue-font">{formatUtil.formatNumber(mainPanelReducer.paymentFee, 2)}</span> 元
                                </div>

                                <div className="col s6 margin-top30 right-align grey-text fz14">
                                    <span className="margin-right10">退款金额</span>¥ <span className="fz16 blue-font">{formatUtil.formatNumber(mainPanelReducer.refundFee, 2)}</span> 元
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 左下：本月发布指令 */}
                    <div className="col s6 padding-left10 padding-right10">
                        <div className="row z-depth-1 detail-box margin-top20 blue-font">
                            {/* 左侧：图标 */}
                            <div className="col s2 center margin-top30 margin-bottom30 padding-left30 white-text">
                                <div className="main-panel-icon custom-blue vc-center left">
                                    <i className="mdi mdi-truck"/>
                                </div>
                            </div>

                            {/* 右侧：统计 */}
                            <div className="col s10">
                                <div className="col s12 margin-top20">
                                    {/* 本月发布指令 */}
                                    <div className="col s6 fz18">本月发布指令</div>
                                    {/* 数量 */}
                                    <div className="col s6 right-align fz20 red-font no-padding">{formatUtil.formatNumber(mainPanelReducer.logCnt, 0)}</div>
                                </div>
                                {/* 未发货 */}
                                <div className="col s12 grey-text margin-top30 right-align fz14 grey-text">
                                    未发货 <span className="fz16 blue-font margin-left10">{formatUtil.formatNumber(mainPanelReducer.logWaitCnt, 0)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右下：本月申请售后数 */}
                    <div className="col s6 padding-left10 padding-right10">
                        <div className="row z-depth-1 detail-box margin-top20 blue-font">
                            {/* 左侧：图标 */}
                            <div className="col s2 center margin-top30 margin-bottom30 padding-left30 white-text">
                                <div className="main-panel-icon custom-blue vc-center left">
                                    <i className="mdi mdi-phone-in-talk"/>
                                </div>
                            </div>

                            {/* 右侧：统计 */}
                            <div className="col s10">
                                <div className="col s12 margin-top20">
                                    {/* 本月申请售后数 */}
                                    <div className="col s6 fz18">本月申请售后数</div>
                                    {/* 数量 */}
                                    <div className="col s6 right-align fz20 red-font no-padding">{formatUtil.formatNumber(mainPanelReducer.feedBackCnt, 0)}</div>
                                </div>
                                {/* 未处理售后 */}
                                <div className="col s12 grey-text margin-top30 right-align fz14 grey-text">
                                    未处理售后 <span className="fz16 blue-font margin-left10">{formatUtil.formatNumber(mainPanelReducer.feedBackWaitCnt, 0)}</span>
                                </div>
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
        mainPanelReducer: state.MainPanelReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    initData: () => {
        dispatch(mainPanelAction.getUserStat());
        dispatch(mainPanelAction.getUserCarStat());
        dispatch(mainPanelAction.getSuperviseStat());
        dispatch(mainPanelAction.getCheckCarStatByMonth());

        dispatch(mainPanelAction.getOrderStatByMonth());
        dispatch(mainPanelAction.getPaymentFeeByMonth());
        dispatch(mainPanelAction.getLogStatByMonth());
        dispatch(mainPanelAction.getOrderFeedbackStatByMonth());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel)