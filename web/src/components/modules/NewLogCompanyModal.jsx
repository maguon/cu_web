import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {NewLogCompanyModalActionType} from "../../actionTypes";

const newLogCompanyModalAction = require('../../actions/modules/NewLogCompanyModalAction');

class NewLogCompanyModal extends React.Component {

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
     * 更新 快递公司名
     */
    changeCompanyName = (event) => {
        this.props.setCompanyName(event.target.value);
    };

    /**
     * 更新 联系电话
     */
    changePhone = (event) => {
        this.props.setPhone(event.target.value);
    };

    /**
     * 更新 备注
     */
    changeRemark = (event) => {
        this.props.setRemark(event.target.value);
    };

    render() {
        const {newLogCompanyModalReducer, saveLogCompany, closeModal} = this.props;
        return (
            <div id="newLogCompanyModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">{newLogCompanyModalReducer.pageType === 'new' ? '新增快递公司' : '修改信息'}</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top40">
                        <Input s={6} label="快递公司" maxLength="50" value={newLogCompanyModalReducer.companyName} onChange={this.changeCompanyName}/>
                        <Input s={6} label="联系电话" maxLength="11" type="tel" value={newLogCompanyModalReducer.phone} onChange={this.changePhone}/>
                    </div>
                    <div className="row">
                        <Input s={12} label="备注" maxLength="100" value={newLogCompanyModalReducer.remark} onChange={this.changeRemark}/>
                    </div>

                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveLogCompany}>确定</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newLogCompanyModalReducer: state.NewLogCompanyModalReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    setCompanyName: (value) => {
        dispatch(NewLogCompanyModalActionType.setCompanyName(value))
    },
    setPhone: (value) => {
        dispatch(NewLogCompanyModalActionType.setPhone(value))
    },
    setRemark: (value) => {
        dispatch(NewLogCompanyModalActionType.setRemark(value))
    },
    saveLogCompany: () => {
        dispatch(newLogCompanyModalAction.saveLogCompany())
    },
    closeModal: () => {
        $('#newLogCompanyModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewLogCompanyModal)