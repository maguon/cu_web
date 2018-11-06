import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
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
        this.props.getAfterSaleInfo();
    };

    /**
     * 售后信息TAB：更新 处理描述
     */
    changeDescription = (event) => {
        this.props.setDescription(event.target.value);
    };

    /**
     * 售后信息TAB：更新 处理方法
     */
    changeProcessing = (event) => {
        this.props.setProcessing(event.target.value);
    };

    /**
     * 售后信息TAB：确认按钮 点击事件
     */
    updateFeedBack = () => {
        console.log('updateFeedBack')
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
                            {/* 基本信息：下单时间 */}
                            <div className="col s-percent-40 right-align">
                                <span className="grey-text fz14">下单时间：{formatUtil.getDateTime(orderDetailReducer.orderInfo[0].created_on)}</span>
                            </div>

                            {/* 基本信息：支付/发货/取消 状态 */}
                            <div className="col s-percent-10 right-align">
                                {orderDetailReducer.orderInfo[0].status === 1
                                    ?
                                    <span>{sysConst.CANCEL_STATUS[orderDetailReducer.orderInfo[0].status].label}</span>
                                    :
                                    <span>{sysConst.PAYMENT_STATUS[orderDetailReducer.orderInfo[0].payment_status].label}/{sysConst.LOG_STATUS[orderDetailReducer.orderInfo[0].log_status].label}</span>
                                }
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
                            <li className="tab col s6"><a href="#tab-base">订单信息</a></li>
                            <li className="tab col s6"><a className="active" href="#tab-after-sale" onClick={this.onClickAfterSaleTab}>售后信息</a></li>
                        </ul>
                    </div>

                    {/* TAB 1 : 基本信息TAB */}
                    <div id="tab-base" className="col s12">
                        {/* 车辆信息：明细 */}
                        {orderDetailReducer.orderInfo.length > 0 &&
                        <div>
                            {/* 购买信息 */}
                            <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                                <div className="row detail-box-header vc-center margin-bottom0">
                                    购买信息
                                </div>

                                <div className="col s12 grey-text">
                                    {orderDetailReducer.productArray.length === 0 &&
                                    <div className="row center grey-text margin-top20 fz15">
                                        该订单暂无商品记录
                                    </div>}
                                    {orderDetailReducer.productArray.map(function (item) {
                                        return (
                                            <div className="col s12 border-bottom-line padding-top20 padding-bottom20">
                                                <div className="col no-padding s-percent-10">
                                                    {item.imag == null || item.imag === '' ? <div className="no-img-box"/> : <img className="img-size-100" src={item.imag}/>}
                                                </div>
                                                <div className="col s-percent-90 margin-top10 padding-right0">
                                                    <div className="col s6 grey-text text-darken-1">{item.product_name}</div>
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
                                        <div className="col s8 no-padding context-ellipsis">
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
                                {/* 已取消的订单 显示：取消时间 */}
                                {orderDetailReducer.orderInfo[0].status === 1 &&
                                <div className="col s12 padding-top20 padding-bottom20 box-top-line">
                                    <div className="col s12 grey-text right-align padding-right20">
                                        取消时间：{formatUtil.getDateTime(orderDetailReducer.orderInfo[0].updated_on)}
                                    </div>
                                </div>
                                }
                            </div>

                            {/* 支付信息 */}
                            {orderDetailReducer.orderInfo[0].status === 0 && orderDetailReducer.orderInfo[0].payment_status === 1 &&
                            <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                                <div className="row detail-box-header vc-center margin-bottom0">
                                    支付信息
                                </div>

                                {/* 支付信息 TODO */}
                                <div className="col s12 padding-top20 padding-bottom20 grey-text">
                                    <div className="col s2 blue-font bold-font">支付</div>
                                    <div className="col s6">金额：¥ <span className="red-font bold-font fz16">{formatUtil.formatNumber(9999, 2)}</span></div>
                                    <div className="col s4 fz14 right-align padding-right20">
                                        支付时间：{formatUtil.getDateTime(orderDetailReducer.orderInfo[0].updated_on)}
                                    </div>
                                </div>
                            </div>}

                            {/* 发货信息 */}
                            {orderDetailReducer.orderInfo[0].status === 0 && orderDetailReducer.orderInfo[0].payment_status === 1 &&
                            <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                                <div className="row detail-box-header vc-center margin-bottom0">
                                    发货信息
                                </div>

                                {/* 发货信息 TODO */}
                                <div className="col s12 padding-top20 padding-bottom20 grey-text text-darken-2">
                                    <div className="col s6 fz14 grey-text">发货编号：XXXX</div>
                                    <div className="col s6 fz14 grey-text right-align padding-right20">
                                        发货时间：{formatUtil.getDateTime(orderDetailReducer.orderInfo[0].updated_on)}
                                    </div>

                                    <div className="col s4 margin-top10">快递公司：XXXXX</div>
                                    <div className="col s4 margin-top10">快递编号：XXXXX</div>
                                    <div className="col s4 margin-top10 right-align padding-right20">
                                        快递费用：¥ {formatUtil.formatNumber(9999, 2)}
                                    </div>

                                    <div className="col s12 margin-top20">
                                        <div className="col s12 detail-box custom-grey">
                                            <div className="col s6 margin-top10 blue-font bold-font">补发商品：XXXX</div>
                                            <div className="col s6 margin-top10 right-align">
                                                收货人：XXXX
                                            </div>

                                            <div className="col s6 margin-top10 grey-text fz14">收货地址：XXXX</div>
                                            <div className="col s6 margin-top10 grey-text fz14 right-align">
                                                操作时间：{formatUtil.getDateTime(orderDetailReducer.orderInfo[0].updated_on)}
                                            </div>

                                            <div className="col s12 margin-top20 dotted-line"/>

                                            <div className="col s6 margin-top10 fz14 grey-text">发货编号：XXXX</div>
                                            <div className="col s6 margin-top10 fz14 grey-text right-align">
                                                发货时间：{formatUtil.getDateTime(orderDetailReducer.orderInfo[0].updated_on)}
                                            </div>

                                            <div className="col s4 margin-top10 margin-bottom10">快递公司：XXXXX</div>
                                            <div className="col s4 margin-top10 margin-bottom10">快递编号：XXXXX</div>
                                            <div className="col s4 margin-top10 margin-bottom10 right-align">
                                                快递费用：¥ {formatUtil.formatNumber(9999, 2)}
                                            </div>

                                        </div>
                                    </div>

                                    {/* 以下内容为迭代显示，需要删除 TODO */}
                                    <div className="col s12 margin-top20">
                                        <div className="col s12 detail-box custom-grey">
                                            <div className="col s6 margin-top10 blue-font bold-font">补发商品：XXXX</div>
                                            <div className="col s6 margin-top10 right-align">
                                                收货人：XXXX
                                            </div>

                                            <div className="col s6 margin-top10 grey-text fz14">收货地址：XXXX</div>
                                            <div className="col s6 margin-top10 grey-text fz14 right-align">
                                                操作时间：{formatUtil.getDateTime(orderDetailReducer.orderInfo[0].updated_on)}
                                            </div>

                                            <div className="col s12 margin-top20 dotted-line"/>

                                            <div className="col s6 margin-top10 fz14 grey-text">发货编号：XXXX</div>
                                            <div className="col s6 margin-top10 fz14 grey-text right-align">
                                                发货时间：{formatUtil.getDateTime(orderDetailReducer.orderInfo[0].updated_on)}
                                            </div>

                                            <div className="col s4 margin-top10 margin-bottom10">快递公司：XXXXX</div>
                                            <div className="col s4 margin-top10 margin-bottom10">快递编号：XXXXX</div>
                                            <div className="col s4 margin-top10 margin-bottom10 right-align">
                                                快递费用：¥ {formatUtil.formatNumber(9999, 2)}
                                            </div>

                                        </div>
                                    </div>


                                </div>
                            </div>}

                        </div>}
                    </div>

                    {/* TAB 2 : 售后信息TAB */}
                    <div id="tab-after-sale" className="col s12">
                        {/* 售后信息 */}
                        {orderDetailReducer.orderInfo.length > 0 &&
                        <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                            {/* 售后编号 处理状态 */}
                            <div className="row detail-box-header vc-center margin-bottom0">
                                <div className="col s6 no-padding">售后编号：XXXXXXX</div>
                                <div className="col s6 no-padding right-align">{sysConst.FEED_BACK_STATUS[orderDetailReducer.orderInfo[0].status].label}</div>
                            </div>

                            {/* 用户申请 TODO */}
                            <div className="col s12 padding-top20 padding-bottom10 grey-text">
                                <div className="col s6 blue-font bold-font">用户申请</div>
                                <div className="col s6 fz14 right-align">
                                    申请时间：{formatUtil.getDateTime(orderDetailReducer.orderInfo[0].updated_on)}
                                </div>
                            </div>

                            <div className="col s12 padding-left20 padding-right20"><div className="col s12 blue-divider"/></div>

                            <div className="col s12 padding-top20 padding-bottom20">
                                <div className="col s-percent-8 grey-text text-darken-2">
                                    申请原因：
                                </div>

                                <div className="col s-percent-92 padding-left0 grey-text">
                                    不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。
                                    不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。
                                    不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。
                                    不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。不想要了。
                                </div>
                            </div>

                            <div className="col s12 padding-left20 padding-right20"><div className="col s12 divider"/></div>

                            {/* 售后处理 TODO */}
                            <div className="col s12 padding-top20 padding-bottom10">
                                <div className="col s12 blue-font bold-font">售后处理</div>
                            </div>

                            <div className="col s12 padding-left20 padding-right20"><div className="col s12 blue-divider"/></div>

                            <div className="col s12">
                                <Input s={12} label="处理描述" className="right-align" value={orderDetailReducer.description} onChange={this.changeDescription}/>
                                <Input s={12} label="处理方法" className="right-align" value={orderDetailReducer.processing} onChange={this.changeProcessing}/>
                            </div>

                            <div className="col s12 right-align padding-bottom20 padding-right20">
                                <button type="button" className="btn confirm-btn" onClick={this.updateFeedBack}>确定</button>
                            </div>


                        </div>}

                        <div className="col s12 right-align padding-right70">
                            <button type="button" className="btn confirm-btn" onClick={this.updateFeedBack}>退款</button>
                            <button type="button" className="btn confirm-btn margin-left20" onClick={this.updateFeedBack}>补发</button>
                        </div>

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
    getAfterSaleInfo: () => {
        dispatch(orderDetailAction.getOrderInfo(ownProps.match.params.id))
    },

    setDescription: (value) => {
        dispatch(OrderDetailActionType.setDescription(value))
    },
    setProcessing: (value) => {
        dispatch(OrderDetailActionType.setProcessing(value))
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
