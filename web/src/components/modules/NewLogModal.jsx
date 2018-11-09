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
        let selectItem = this.props.newLogModalReducer.orderItem;
        let cnt = this.props.newLogModalReducer.orderItemCnt;
        let logArray = this.props.newLogModalReducer.logList;
        logArray.push({'id': selectItem.value, 'name': selectItem.label, 'remark': selectItem.remark, 'cnt': cnt});
        this.props.setLogList(logArray);
    };

    /**
     * 删除 发货列表
     */
    deleteLogItem = (item) => {
        let logArray = this.props.newLogModalReducer.logList;
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
        const {newLogModalReducer, clearModal, changeOrderItem, addLog, closeModal} = this.props;
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
                                <div className="col s12 custom-grey border-bottom-line grey-text">
                                    <div className="col s5 margin-top10 grey-text text-darken-2">订单编号：{newLogModalReducer.orderInfo[0].id}</div>
                                    <div className="col s6 margin-top10 right-align no-padding">
                                        下单时间：{formatUtil.getDateTime(newLogModalReducer.orderInfo[0].created_on)}
                                        <span className="margin-left20 blue-font">{sysConst.PAYMENT_STATUS[newLogModalReducer.orderInfo[0].payment_status].label}/{sysConst.LOG_STATUS[newLogModalReducer.orderInfo[0].log_status].label}</span>
                                    </div>
                                    <div className="col s1 margin-top10 right-align no-padding">
                                        <a onClick={clearModal}><i className="mdi mdi-close pointer tiny-icon red-font"/></a>
                                    </div>
                                    <div className="col s12 margin-top10 margin-bottom10 context-ellipsis">{newLogModalReducer.orderInfo[0].remark}</div>
                                </div>

                                {/* 用户申请 TODO */}
                                <div className="col s12 padding-top20">
                                    <div className="col s11">

                                        <div className="input-field col s4">
                                            <Select
                                                options={newLogModalReducer.orderItemArray}
                                                onChange={changeOrderItem}
                                                value={newLogModalReducer.orderItem}
                                                isSearchable={false}
                                                placeholder={"请选择"}
                                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                                isClearable={false}
                                            />
                                            <label className="active">补发商品</label>
                                        </div>
                                        <div className="col s6 context-ellipsis">
                                            <Input s={12} label="商品描述" value={newLogModalReducer.orderItemDes} disabled />
                                        </div>
                                        <div className="col s2">
                                            <Input s={12} label="补发件数" type="number" className="right-align"
                                                   value={newLogModalReducer.orderItemCnt}
                                                   onChange={this.changeOrderItemCnt}/>
                                        </div>
                                    </div>
                                    <div className="col s1">
                                        <a className="btn-floating waves-light waves-effect btn margin-top20" onClick={this.addLogItem}>
                                            <i className="mdi mdi-plus"/>
                                        </a>
                                    </div>

                                </div>

                                <div className="col s12 padding-left20 padding-right20"><div className="col s12 blue-divider"/></div>

                                {newLogModalReducer.logList.length > 0 &&
                                <div className="col s12 padding-left30 padding-right30 padding-top10 padding-bottom10">
                                    {
                                        newLogModalReducer.logList.map(function (item) {
                                            return (
                                                <div className="col s12 no-padding padding-top10 padding-bottom5 border-bottom-line">

                                                    <div className="col s8 context-ellipsis">{item.name} ({item.remark})</div>
                                                    <div className="col s3 right-align">x {item.cnt}</div>
                                                    <div className="col s1 right-align">
                                                        <a onClick={() => (this.deleteLogItem(item))}><i className="mdi mdi-close pointer tiny-icon red-font"/></a>
                                                    </div>
                                                </div>
                                            )
                                        }, this)
                                    }
                                </div>}

                                {/* 收货信息 */}
                                <div className="col s12 padding-top20 padding-bottom10">
                                    <Input s={6} label="收货人" className="right-align" value={newLogModalReducer.recvName} onChange={this.changeRecvName}/>
                                    <Input s={6} label="收货电话" className="right-align" value={newLogModalReducer.recvPhone} onChange={this.changeRecvPhone}/>
                                    <Input s={12} label="收货地址" className="right-align" value={newLogModalReducer.recvAddress} onChange={this.changeRecvAddress}/>
                                </div>
                            </div>
                        </div>}
                    </div>

                    {/** Modal固定底部：取消/确定按钮 */}
                    <div className="modal-footer">
                        <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                        <button type="button" className="btn confirm-btn margin-left20" onClick={addLog}>确定</button>
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

const mapDispatchToProps = (dispatch) => ({
    setOrderId: (value) => {
        dispatch(NewLogModalActionType.setOrderId(value))
    },
    getOrderInfo: () => {
        dispatch(newLogModalAction.getOrderInfo())
    },
    clearOrderInfo: () => {
        dispatch(NewLogModalActionType.getOrderInfo([]))
    },
    changeOrderItem: (selectedItem) => {
        dispatch(NewLogModalActionType.setOrderItem(selectedItem));
        dispatch(NewLogModalActionType.setOrderItemDes(selectedItem.remark));
        dispatch(NewLogModalActionType.setOrderItemCnt(selectedItem.cnt));
    },
    setOrderItemCnt: (value) => {
        dispatch(NewLogModalActionType.setOrderItemCnt(value))
    },
    setLogList: (value) => {
        dispatch(NewLogModalActionType.setLogList(value));
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
    clearModal: () => {
        dispatch(newLogModalAction.initData())
    },
    addLog: () => {
        dispatch(newLogModalAction.addLog())
    },
    closeModal: () => {
        $('#newLogModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewLogModal)
