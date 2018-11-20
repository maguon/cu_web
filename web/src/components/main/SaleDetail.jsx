import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const saleDetailAction = require('../../actions/main/SaleDetailAction');
const formatUtil = require('../../util/FormatUtil');

class SaleDetail extends React.Component {

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
        // 取得商品信息
        this.props.getSaleInfo();
    }

    render() {
        const {saleDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/sale', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">商品销售 - 销售详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row">
                    {/* 销售详情 */}
                    {saleDetailReducer.saleInfo.length > 0 &&
                    <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                        <div className="row detail-box-header margin-bottom0">
                            <div className="col s6">销售编号：{saleDetailReducer.saleInfo[0].id}</div>
                            <div className="col s6 right-align grey-text fz14">售出时间：{formatUtil.getDateTime(saleDetailReducer.saleInfo[0].created_on)}</div>
                        </div>

                        <div className="col s12 grey-text">
                            <div className="col s12 padding-top20 padding-bottom20">
                                <div className="col s6 fz14">订单编号：{saleDetailReducer.saleInfo[0].order_id}</div>
                                <div className="col s6 fz14 right-align">商品编号：{saleDetailReducer.saleInfo[0].product_id}</div>

                                <div className="col s8 margin-top20">
                                    <span className="blue-font fz16">{saleDetailReducer.saleInfo[0].product_name}</span>
                                    <span className="margin-left50">x {saleDetailReducer.saleInfo[0].prod_count}</span>
                                    <span className="margin-left50">单价：¥ {formatUtil.formatNumber(saleDetailReducer.saleInfo[0].unit_price, 2)}</span>
                                </div>
                                <div className="col s4 margin-top20 right-align">总价：¥ <span className="red-font fz16">{formatUtil.formatNumber(saleDetailReducer.saleInfo[0].total_price, 2)}</span></div>

                                <div className="col s8 margin-top20 context-ellipsis">
                                    收货地址：{saleDetailReducer.saleInfo[0].recv_address}
                                    {/*{saleDetailReducer.saleInfo[0].recv_name} {saleDetailReducer.saleInfo[0].recv_phone}*/}
                                </div>
                                <div className="col s4 margin-top20 right-align">运费：¥ {formatUtil.formatNumber(saleDetailReducer.saleInfo[0].freight, 2)}</div>
                            </div>

                            {/* 分割线 */}
                            <div className="col s12 padding-left20 padding-right20"><div className="col s12 divider"/></div>

                            <div className="col s12 padding-top20 padding-bottom20">
                                <div className="col s8">
                                    购买人：{saleDetailReducer.saleInfo[0].user_name} ({saleDetailReducer.saleInfo[0].phone})
                                </div>
                                <div className="col s4 right-align">
                                    支付金额：：¥ <span className="red-font fz16">{formatUtil.formatNumber(saleDetailReducer.saleInfo[0].total_price + saleDetailReducer.saleInfo[0].freight, 2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        saleDetailReducer: state.SaleDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getSaleInfo: () => {
        dispatch(saleDetailAction.getSaleInfo(ownProps.match.params.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleDetail);