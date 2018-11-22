import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {ReSendModalActionType} from "../../actionTypes";

const reSendModalAction = require('../../actions/modules/ReSendModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class ReSendModal extends React.Component {

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

    /**
     * 追加 发货列表
     */
    addLogItem = () => {
        let selectItem = this.props.reSendModalReducer.orderItem;
        if (selectItem === null) {
            swal('请选择商品', '', 'warning');
        } else {
            let cnt = this.props.reSendModalReducer.orderItemCnt;
            let logArray = this.props.reSendModalReducer.logList;
            logArray.push({'id': selectItem.value, 'name': selectItem.label, 'cnt': cnt});
            this.props.setLogList(logArray);
        }
    };

    /**
     * 删除 发货列表
     */
    deleteLogItem = (item) => {
        let logArray = this.props.reSendModalReducer.logList;
        let idx = logArray.indexOf(item);
        logArray.splice(idx, 1);
        this.props.setLogList(logArray);
    };

    /**
     * 更新 收货人
     */
    changeRecvName = (event) => {
        this.props.setRecvName(event.target.value);
    };

    /**
     * 更新 收货电话
     */
    changeRecvPhone = (event) => {
        this.props.setRecvPhone(event.target.value);
    };

    /**
     * 更新 收货地址
     */
    changeRecvAddress = (event) => {
        this.props.setRecvAddress(event.target.value);
    };

    render() {
        const {reSendModalReducer, changeOrderItem, addLog, closeModal} = this.props;
        return (
            <div id="reSendModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">补发</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">

                    {reSendModalReducer.orderInfo.length > 0 &&
                    <div className="col s12">
                        <div className="col s12 custom-grey detail-box grey-text">
                            <div className="col s6 margin-top10 grey-text text-darken-2">订单编号：{reSendModalReducer.orderInfo[0].id}</div>
                            <div className="col s6 margin-top10 right-align no-padding">
                                下单时间：{formatUtil.getDateTime(reSendModalReducer.orderInfo[0].created_on)}
                                <span className="margin-left20 blue-font">{sysConst.PAYMENT_STATUS[reSendModalReducer.orderInfo[0].payment_status].label}/{sysConst.LOG_STATUS[reSendModalReducer.orderInfo[0].log_status].label}</span>
                            </div>
                            <div className="col s12 margin-top10 margin-bottom10 context-ellipsis">{reSendModalReducer.orderInfo[0].remark}</div>
                        </div>

                        {/* 发货信息 */}
                        <div className="col s12 no-padding margin-top20">
                            <div className="col s11 no-padding">

                                <div className="input-field col s9">
                                    <Select
                                        options={reSendModalReducer.orderItemArray}
                                        onChange={changeOrderItem}
                                        value={reSendModalReducer.orderItem}
                                        isSearchable={false}
                                        placeholder={"请选择"}
                                        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                        isClearable={false}
                                    />
                                    <label className="active">发货商品</label>
                                </div>
                                <div className="col s3">
                                    <Input s={12} label="发货件数" type="number" className="right-align"
                                           value={reSendModalReducer.orderItemCnt}
                                           onChange={this.changeOrderItemCnt}/>
                                </div>
                            </div>
                            <div className="col s1 no-padding">
                                <a className="btn-floating waves-light waves-effect btn margin-top20" onClick={this.addLogItem}>
                                    <i className="mdi mdi-plus"/>
                                </a>
                            </div>
                        </div>

                        <div className="col s12"><div className="col s12 blue-divider"/></div>

                        {reSendModalReducer.logList.length > 0 &&
                        <div className="col s12 margin-top10">
                            {reSendModalReducer.logList.map(function (item) {
                                return (
                                    <div
                                        className="col s12 no-padding padding-top10 padding-bottom5 border-bottom-line">

                                        <div className="col s8 context-ellipsis">{item.name}</div>
                                        <div className="col s3 right-align">x {item.cnt}</div>
                                        <div className="col s1 right-align">
                                            <a onClick={() => (this.deleteLogItem(item))}><i className="mdi mdi-close pointer tiny-icon red-font"/></a>
                                        </div>
                                    </div>
                                )
                            }, this)}
                        </div>}

                        {/* 收货信息 */}
                        <div className="col s12 no-padding margin-top20">
                            <Input s={6} label="收货人" className="right-align" value={reSendModalReducer.recvName} onChange={this.changeRecvName}/>
                            <Input s={6} label="收货电话" className="right-align" value={reSendModalReducer.recvPhone} onChange={this.changeRecvPhone}/>
                            <Input s={12} label="收货地址" className="right-align" value={reSendModalReducer.recvAddress} onChange={this.changeRecvAddress}/>
                        </div>
                    </div>}
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={addLog}>确定</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reSendModalReducer: state.ReSendModalReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    setOrderId: (value) => {
        dispatch(ReSendModalActionType.setOrderId(value))
    },
    getOrderInfo: () => {
        dispatch(reSendModalAction.getOrderInfo())
    },
    clearOrderInfo: () => {
        dispatch(ReSendModalActionType.getOrderInfo([]))
    },
    changeOrderItem: (selectedItem) => {
        dispatch(ReSendModalActionType.setOrderItem(selectedItem));
        dispatch(ReSendModalActionType.setOrderItemCnt(selectedItem.cnt));
    },
    setOrderItemCnt: (value) => {
        dispatch(ReSendModalActionType.setOrderItemCnt(value))
    },
    setLogList: (value) => {
        dispatch(ReSendModalActionType.setLogList(value));
    },
    setRecvName: (value) => {
        dispatch(ReSendModalActionType.setRecvName(value))
    },
    setRecvPhone: (value) => {
        dispatch(ReSendModalActionType.setRecvPhone(value))
    },
    setRecvAddress: (value) => {
        dispatch(ReSendModalActionType.setRecvAddress(value))
    },
    addLog: () => {
        dispatch(reSendModalAction.addLog())
    },
    closeModal: () => {
        $('#reSendModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReSendModal)