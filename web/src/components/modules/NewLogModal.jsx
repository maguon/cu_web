import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {NewLogModalActionType} from "../../actionTypes";

const newLogModalAction = require('../../actions/modules/NewLogModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class NewLogModal extends React.Component {

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
        this.props.setOrderId('');
        // TODO 隐藏详细信息，设定flag
    }

    /**
     * 更新 订单编号
     */
    changeOrderId = (event) => {
        this.props.setOrderId(event.target.value);
    };

    /**
     * 显示 输入订单编号 详细信息
     */
    showOrderDetail = () => {
        this.props.getOrderInfo();
    };

    /**
     * 更新 补发件数
     */
    changeOrderItemCnt = (event) => {
        this.props.setOrderItemCnt(event.target.value);
    };



    render() {
        const {newLogModalReducer, changeOrderItem, refund, closeModal} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div id="newLogModal" className="modal modal-fixed-footer row">

                    {/** Modal头部：Title */}
                    <div className="modal-title center-align white-text">新增发货信息</div>

                    {/** Modal主体 */}
                    <div className="modal-content white grey-text text-darken-2">
                        <div className="row margin-bottom0">
                            <Input s={11} label="关联订单" value={newLogModalReducer.orderId} onChange={this.changeOrderId}/>
                            {/* 追加按钮 */}
                            <div className="col s1">
                                <a className="btn-floating waves-light waves-effect btn small-btn margin-top20" onClick={this.showOrderDetail}>
                                    <i className="mdi mdi-check small-icon"/>
                                </a>
                            </div>
                        </div>

                        {/*<Autocomplete s={12} title='关联订单' data={newLogModalReducer.orderArray}*/}
                                      {/*onAutocomplete={(value) => (this.onSelected(value))}*/}
                        {/*/>*/}

                        {newLogModalReducer.orderInfo.length > 0 &&
                        <div className="col s12">
                            <div className="row margin-bottom0 z-depth-1 detail-box">
                                <div className="col s12 custom-grey border-bottom-line">
                                    <div className="col s5">订单编号：{newLogModalReducer.orderInfo[0].id}</div>
                                    <div className="col s6 right-align no-padding">
                                        下单时间：{formatUtil.getDateTime(newLogModalReducer.orderInfo[0].created_on)}
                                        <span className="margin-left20">{sysConst.PAYMENT_STATUS[newLogModalReducer.orderInfo[0].payment_status].label}/{sysConst.LOG_STATUS[newLogModalReducer.orderInfo[0].log_status].label}</span>
                                    </div>
                                    <div className="col s1 right-align no-padding"><a><i className="mdi mdi-close red-font"/></a></div>
                                    <div className="col s12 context-ellipsis">{newLogModalReducer.orderInfo[0].remark}</div>
                                </div>

                                {/* 用户申请 TODO */}
                                <div className="col s12 padding-top20 padding-bottom10 grey-text">
                                    <div className="col s11">

                                        <div className="input-field col s6">
                                            <Select
                                                options={newLogModalReducer.orderItemArray}
                                                onChange={changeOrderItem}
                                                value={newLogModalReducer.orderItem}
                                                isSearchable={false}
                                                placeholder={"请选择"}
                                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                                isClearable={true}
                                            />
                                            <label className="active">补发商品</label>
                                        </div>

                                        <div className="col s6">
                                            <Input s={12} label="补发件数" type="number" value={newLogModalReducer.orderItemCnt} onChange={this.changeOrderItemCnt}/>
                                        </div>
                                    </div>
                                    <div className="col s1">
                                        <a className="btn-floating waves-light waves-effect btn margin-top20" onClick={this.showOrderDetail}>
                                            <i className="mdi mdi-add"/>
                                        </a>
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

                            </div>



                        </div>}


                    </div>

                    {/** Modal固定底部：取消/确定按钮 */}
                    <div className="modal-footer">
                        <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                        <button type="button" className="btn confirm-btn margin-left20" onClick={refund}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newLogModalReducer: state.NewLogModalReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    setOrderId: (value) => {
        dispatch(NewLogModalActionType.setOrderId(value))
    },
    getOrderInfo: () => {
        dispatch(newLogModalAction.getOrderInfo())
    },

    changeOrderItem: (selectedItem) => {
        dispatch(NewLogModalActionType.setOrderItem(selectedItem));
        dispatch(newLogModalAction.getOrderItemCnt(selectedItem));
    },
    setOrderItemCnt: (value) => {
        dispatch(NewLogModalActionType.setOrderItemCnt(value))
    },



    setRecvName: (value) => {
        dispatch(NewLogModalActionType.setRecvName(value))
    },
    setRecvPhone: (value) => {
        dispatch(NewLogModalActionType.setRecvPhone(value))
    },
    setRecvAddress: (value) => {
        dispatch(NewLogModalActionType.setRecvAddress(value))
    },

    refund: () => {
        dispatch(newLogModalAction.refund())
    },
    closeModal: () => {
        $('#newLogModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewLogModal)
