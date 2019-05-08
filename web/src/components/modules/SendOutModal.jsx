import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {SendOutModalActionType} from "../../actionTypes";

const commonAction = require('../../actions/main/CommonAction');
const sendOutModalAction = require('../../actions/modules/SendOutModalAction');
const sysConst = require('../../util/SysConst');

class SendOutModal extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
        this.props.getLogCoList();
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        $('.modal').modal();
    }

    /**
     * 更新 快递单号
     */
    changeLogNum = (event) => {
        this.props.setLogNum(event.target.value);
    };

    /**
     * 更新 运费
     */
    changeFreight = (event) => {
        this.props.setFreight(event.target.value);
    };

    /**
     * 更新 备注
     */
    changeRemark = (event) => {
        this.props.setRemark(event.target.value);
    };

    render() {
        const {sendOutModalReducer, commonReducer, changeLogCompany, sendOut, closeModal} = this.props;
        return (
            <div id="sendOutModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">发货信息</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">

                    {/* 发货商品信息描述 */}
                    {sendOutModalReducer.logInfo.length > 0 &&
                    <div className="col s12 padding-left20 padding-right20 margin-top10">
                        <div className="col s12 detail-box custom-grey padding-top20 padding-bottom20">
                            <div className="col s12">{sendOutModalReducer.logInfo[0].product_des}</div>
                            <div className="col s12 margin-top10 dotted-line margin-left10 margin-right10"/>
                            <div className="col s12 margin-top10">
                                {sendOutModalReducer.logInfo[0].recv_address} {sendOutModalReducer.logInfo[0].recv_name} {sendOutModalReducer.logInfo[0].recv_phone}
                            </div>
                        </div>
                    </div>}


                    {/* 发货快递信息 */}
                    <div className="col s12 margin-top25">
                        {/* 查询条件：快递公司 */}
                        <div className="input-field col s4">
                            <Select
                                options={commonReducer.logCoArray}
                                onChange={changeLogCompany}
                                value={sendOutModalReducer.logCompany}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">快递公司</label>
                        </div>

                        <Input s={4} label="快递单号" value={sendOutModalReducer.logNum} onChange={this.changeLogNum}/>
                        <Input s={4} label="运费(元)" type="number" className="right-align red-font fz16"
                               value={sendOutModalReducer.freight} onChange={this.changeFreight}/>
                    </div>

                    {/** 退款金额(元) */}
                    <div className="col s12">
                        <Input s={12} label="备注" value={sendOutModalReducer.remark} onChange={this.changeRemark}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={sendOut}>确定</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sendOutModalReducer: state.SendOutModalReducer,
        commonReducer: state.CommonReducer,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getLogCoList: () => {
        dispatch(commonAction.getLogCoList())
    },
    changeLogCompany: (value) => {
        dispatch(SendOutModalActionType.setLogCompany(value))
    },
    setLogNum: (value) => {
        dispatch(SendOutModalActionType.setLogNum(value))
    },
    setFreight: (value) => {
        dispatch(SendOutModalActionType.setFreight(value))
    },
    setRemark: (value) => {
        dispatch(SendOutModalActionType.setRemark(value))
    },
    sendOut: () => {
        dispatch(sendOutModalAction.sendOut())
    },
    closeModal: () => {
        $('#sendOutModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SendOutModal)
