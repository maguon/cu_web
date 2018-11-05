import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {OrderDetailActionType} from '../../actionTypes';

const orderDetailAction = require('../../actions/main/OrderDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class OrderDetail extends React.Component {

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
        // 取得订单信息
        this.props.getOrderInfo();
        // 取得订单购买信息
        this.props.getOrderDetail();
        // 初始化TAB
        $('ul.tabs').tabs();
    }

    /**
     * 售后信息TAB：点击事件
     */
    onClickAfterSaleTab = () => {
        this.props.getCheckCarList();
    };

    render() {
        const {orderDetailReducer} = this.props;
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
                        {/* 订单详情：基本信息 */}
                        {orderDetailReducer.orderInfo.length > 0 &&
                        <div className="order-detail-header">
                            {/* 基本信息：订单编号 */}
                            <div className="col s6">订单编号：{this.props.match.params.id}</div>
                            {/* 基本信息：下单时间 支付/发货状态 */}
                            <div className="col s6 right-align">
                                <span className="grey-text fz14">下单时间：{formatUtil.getDateTime(orderDetailReducer.orderInfo[0].created_on)}</span>
                                <span className="margin-left50">{sysConst.PAYMENT_STATUS[orderDetailReducer.orderInfo[0].payment_status].label}/{sysConst.LOG_STATUS[orderDetailReducer.orderInfo[0].log_status].label}</span>
                            </div>

                            {/* 基本信息：订单描述 */}
                            <div className="col s6 grey-text fz14 margin-top10 context-ellipsis">{orderDetailReducer.orderInfo[0].remark}</div>
                            {/* 基本信息：用户 电话 微信昵称 */}
                            <div className="col s6 margin-top10 right-align">
                                <span><i className="mdi mdi-account margin-right10 fz20"/>{orderDetailReducer.orderInfo[0].user_name}</span>
                                <span className="margin-left50"><i className="mdi mdi-cellphone margin-right10 fz20"/>{orderDetailReducer.orderInfo[0].phone}</span>
                                <span className="margin-left50"><i className="mdi mdi-wechat margin-right10 fz20"/>{orderDetailReducer.orderInfo[0].wechat_name}</span>
                            </div>
                        </div>}

                        {/* 订单详情：订单信息/售后信息 TAB菜单 */}
                        <ul className="tabs">
                            <li className="tab col s6"><a className="active" href="#tab-base">订单信息</a></li>
                            <li className="tab col s6"><a href="#tab-after-sale" onClick={this.onClickAfterSaleTab}>售后信息</a></li>
                        </ul>
                    </div>

                    {/* TAB 1 : 基本信息TAB */}
                    <div id="tab-base" className="col s12">
                        {/* 车辆信息：明细 */}
                        {orderDetailReducer.orderInfo.length > 0 &&
                        <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                            <div className="row detail-box-header vc-center margin-bottom0">
                                {/* 车辆信息：车辆编号 */}
                                <div className="col s12">购买信息</div>
                            </div>

                            <div className="col s12 grey-text">
                                {orderDetailReducer.productArray.length === 0 &&
                                <div className="row center grey-text margin-top20 fz15">
                                    该订单暂无商品记录
                                </div>}
                                {orderDetailReducer.productArray.map(function (item) {
                                    return (
                                        <div className="col s12 border-bottom-line padding-top20 padding-bottom20">
                                            <div className="col s-percent-10">
                                                {item.imag == null || item.imag === '' ? <div className="no-img-box"/> : <img className="img-size-100" src={item.imag}/>}
                                            </div>
                                            <div className="col s-percent-90 margin-top10 padding-right0">
                                                <div className="col s6">{item.product_name}</div>
                                                <div className="col s6 right-align">x <span className="fz16">{item.prod_count}</span></div>
                                                <div className="col s12 margin-top10">{item.remark}</div>
                                                <div className="col s6 margin-top10">
                                                    单价：¥ <span className="fz16">{formatUtil.formatNumber(item.unit_price, 2)}</span>
                                                </div>
                                                <div className="col s6 margin-top10 right-align">
                                                    总价：¥ <span className="fz16">{formatUtil.formatNumber(item.total_price, 2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                },this)}

                                <div className="col s12 padding-top20 padding-bottom20">
                                    <div className="col s8 context-ellipsis">
                                        收货地址：{orderDetailReducer.orderInfo[0].recv_address} {orderDetailReducer.orderInfo[0].recv_name} {orderDetailReducer.orderInfo[0].recv_phone}
                                    </div>
                                    <div className="col s4 right-align">
                                        ( 运费：¥ {formatUtil.formatNumber(orderDetailReducer.orderInfo[0].total_freight, 2)} )
                                        <span className="margin-left30">合计：¥ </span>
                                        <span className="fz16 red-font bold-font">
                                        {formatUtil.formatNumber(orderDetailReducer.orderInfo[0].total_price + orderDetailReducer.orderInfo[0].total_freight, 2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>

                    {/* TAB 2 : 售后信息TAB */}
                    <div id="tab-after-sale" className="col s12">
                        {/* 售后信息：xxxxxxx */}
                    </div>




                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orderDetailReducer: state.OrderDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getOrderInfo: () => {
        dispatch(orderDetailAction.getOrderInfo(ownProps.match.params.id))
    },
    getOrderDetail: () => {
        dispatch(orderDetailAction.getOrderDetail(ownProps.match.params.id))
    },
    getCheckCarList: () => {
        dispatch(orderDetailAction.getCheckCarList(ownProps.match.params.id))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
