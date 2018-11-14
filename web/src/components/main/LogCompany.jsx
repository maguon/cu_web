import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {LogCompanyActionType, NewLogCompanyModalActionType} from '../../actionTypes';
import {NewLogCompanyModal} from '../modules/index';

const newLogCompanyModalAction = require('../../actions/modules/NewLogCompanyModalAction');
const logCompanyAction = require('../../actions/main/LogCompanyAction');

class LogCompany extends React.Component {

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
        if (!this.props.fromDetail) {
            this.props.setConditionNo('');
            this.props.setConditionName('');
            this.props.setConditionPhone('');
        }
        this.props.getLogCompanyList();
    }

    /**
     * 更新 检索条件：编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：名称
     */
    changeConditionName = (event) => {
        this.props.setConditionName(event.target.value);
    };

    /**
     * 更新 检索条件：联系电话
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 显示 新建/编辑 快递公司模态画面
     */
    showNewLogCompany = (pageType, logCompanyId) => {
        this.props.initModalData(pageType, logCompanyId);
        $('#newLogCompanyModal').modal('open');
    };

    render() {
        const {logCompanyReducer, getLogCompanyList} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">快递公司</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row z-depth-1 margin-left50 margin-right50 margin-bottom40 detail-box custom-grey">
                    <div className="col s10 margin-top20 search-condition-box">
                        {/* 查询条件：快递公司编号 */}
                        <Input s={4} label="快递公司编号" value={logCompanyReducer.conditionNo} onChange={this.changeConditionNo}/>

                        {/* 查询条件：名称 */}
                        <Input s={4} label="名称" value={logCompanyReducer.conditionName} onChange={this.changeConditionName}/>

                        {/* 查询条件：联系电话 */}
                        <Input s={4} label="联系电话" value={logCompanyReducer.conditionPhone} onChange={this.changeConditionPhone}/>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 query-btn" onClick={getLogCompanyList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 add-btn" onClick={() => {this.showNewLogCompany('new','')}}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                {logCompanyReducer.logCompanyArray.map(function (item) {
                    return (
                        <div className="row z-depth-1 margin-left50 margin-right50 detail-box margin-top20 blue-font">
                            {/* 左侧：编号 */}
                            <div className="col s-percent-10 center margin-top30 grey-text">
                                {item.id}
                            </div>

                            {/* 中部：详细信息(快递公司名称 电话 备注) */}
                            <div className="col s-percent-82 margin-top10 margin-bottom10 box-left-line box-right-line">
                                <div className="col s12">
                                    {/* 快递公司名称 */}
                                    <div className="col s6">
                                        <i className="mdi fz20 mdi-truck-fast"/> <span className="margin-left10">{item.company_name}</span>
                                    </div>
                                    {/* 电话 */}
                                    <div className="col s6 right-align">
                                        <i className="mdi fz20 mdi-phone"/><span className="grey-text margin-left10">{item.phone}</span>
                                    </div>
                                </div>
                                {/* 备注 */}
                                <div className="col s12 grey-text margin-top10 padding-left55">
                                    {item.remark}&nbsp;
                                </div>
                            </div>

                            {/* 右侧：编辑图标 */}
                            <div className="col s-percent-8 center margin-top20">
                                <i className="mdi mdi-pencil fz24 pointer" onClick={() => {this.showNewLogCompany('edit',item.id)}}/>
                            </div>
                        </div>
                    )
                },this)}
                <NewLogCompanyModal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logCompanyReducer: state.LogCompanyReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getLogCompanyList: () => {
        dispatch(logCompanyAction.getLogCompanyList())
    },
    setConditionNo: (value) => {
        dispatch(LogCompanyActionType.setConditionNo(value))
    },
    setConditionName: (value) => {
        dispatch(LogCompanyActionType.setConditionName(value))
    },
    setConditionPhone: (value) => {
        dispatch(LogCompanyActionType.setConditionPhone(value))
    },
    initModalData: (pageType , companyId) => {
        dispatch(NewLogCompanyModalActionType.setPageType(pageType));
        if (pageType === 'new') {
            dispatch(NewLogCompanyModalActionType.setCompanyName(''));
            dispatch(NewLogCompanyModalActionType.setPhone(''));
            dispatch(NewLogCompanyModalActionType.setRemark(''));
        } else {
            dispatch(newLogCompanyModalAction.getCompanyInfo(companyId));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogCompany)