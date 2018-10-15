import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import {TrafficPoliceDetailActionType} from '../../actionTypes';
import {  Link } from "react-router-dom";

const trafficPoliceAction = require('../../actions/main/TrafficPoliceAction');
const SysConst = require('../../util/SysConst');

class TrafficPolice extends React.Component {

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
        this.props.getPoliceList();
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
     * 更新 检索条件：电话
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    queryPoliceList = () => {
        this.props.getPoliceList();
    };

    render() {
        const {trafficPoliceReducer, changePolicePosition, changeStatus, updatePolice} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        交警管理 - 交警资料
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 交警资料：明细 */}
                <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                    <div className="row detail-box-header vc-center">
                        {/* 交警资料：编号 */}
                        <div className="col s6 context-ellipsis">编号：ssssssss</div>

                        {/* 交警资料：开关 */}
                        <div className="col s6 right-align">
                        <span className="switch" onClick={changeStatus}>
                            <label>
                              <input type="checkbox"/>
                              <span className="lever"/>
                            </label>
                        </span>
                        </div>
                    </div>
                    <div className="row margin-left10 margin-right10">
                        <div className="input-field col s4">
                            <input id="name" type="text" maxLength="100" value={trafficPoliceReducer.name} onChange={this.changeName}/>
                            <label htmlFor="name">姓名</label>
                        </div>
                        <div className="col s2 margin-top25">
                            <input type="radio" id="male"   value="0" className='with-gap' checked={trafficPoliceReducer.gender==='0'} onChange={this.changeGender}/>
                            <label htmlFor="male">男</label>

                            <input type="radio" id="female" value="1" className='with-gap' checked={trafficPoliceReducer.gender==='1'} onChange={this.changeGender}/>
                            <label htmlFor="female" className="margin-left10">女</label>
                        </div>
                        <div className="input-field col s6">
                            <Select
                                options={trafficPoliceReducer.policePositionList}
                                onChange={changePolicePosition}
                                isSearchable={false}
                                value={trafficPoliceReducer.position}
                                placeholder={"职务"}
                                styles={SysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                            />
                        </div>
                    </div>
                    <div className="row margin-left10 margin-right10">
                        <div className="input-field col s6">
                            <input id="phone" type="text" maxLength="11" value={trafficPoliceReducer.phone} onChange={this.changePhone}/>
                            <label htmlFor="phone">电话(登录账号)</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="password" type="password" maxLength="100" value={trafficPoliceReducer.password} onChange={this.changePassword}/>
                            <label htmlFor="password">密码</label>
                        </div>
                    </div>

                    <div className="row margin-left10 margin-right10">
                        <div className="input-field col s12 right-align">
                            <button type="button" className="btn confirm-btn" onClick={updatePolice}>确定</button>
                        </div>
                    </div>
                </div>



            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        trafficPoliceReducer: state.TrafficPoliceReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    changePolicePosition: (policePosition) => {
        dispatch(TrafficPoliceDetailActionType.setPolicePosition(policePosition))
    },
    changeStatus: (status) => {
        dispatch(TrafficPoliceDetailActionType.setStatus(status))
    },










    getPoliceList: () => {
        dispatch(trafficPoliceAction.getPoliceList())
    },
    setConditionNo: (policeNo) => {
        dispatch(TrafficPoliceDetailActionType.setConditionNo(policeNo))
    },
    setConditionName: (name) => {
        dispatch(TrafficPoliceDetailActionType.setConditionName(name))
    },
    changeConditionGender: (gender) => {
        dispatch(TrafficPoliceDetailActionType.setConditionGender(gender))
    },
    changeConditionPosition: (policePosition) => {
        dispatch(TrafficPoliceDetailActionType.setConditionPosition(policePosition))
    },
    setConditionPhone: (phone) => {
        dispatch(TrafficPoliceDetailActionType.setConditionPhone(phone))
    },
    changeConditionStatus: (status) => {
        dispatch(TrafficPoliceDetailActionType.setConditionStatus(status))
    },








    updatePolice: () => {
        dispatch(trafficPoliceAction.addPolice())
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(TrafficPolice)
