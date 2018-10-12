import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import {TrafficPoliceActionType} from '../../actionTypes';

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
        // const {getCityList, setCityFormFlag, setCityName} = this.props;
        // getCityList();
        // setCityFormFlag(false);
        // setCityName('');
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
        console.log('query police list');
    };

    render() {
        const {trafficPoliceReducer, changeConditionGender, changeConditionPosition, changeConditionStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        交警管理
                        <div className="divider" style={{marginTop:'10px'}}/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 no-padding">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：编号 */}
                            <div className="input-field col s4">
                                <input id="police_no" type="text" value={trafficPoliceReducer.conditionNo} onChange={this.changeConditionNo}/>
                                <label htmlFor="police_no">编号</label>
                            </div>

                            {/* 查询条件：姓名 */}
                            <div className="input-field col s4">
                                <input id="name" type="text" value={trafficPoliceReducer.conditionName} onChange={this.changeConditionName}/>
                                <label htmlFor="name">姓名</label>
                            </div>

                            {/* 查询条件：性别 */}
                            <div className="input-field col s4">
                                <Select
                                    options={trafficPoliceReducer.genderList}
                                    onChange={changeConditionGender}
                                    isSearchable={false}
                                    placeholder={"性别"}
                                    styles={SysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                            </div>

                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：职务 */}
                            <div className="input-field col s4">
                                <Select
                                    options={trafficPoliceReducer.policePositionList}
                                    onChange={changeConditionPosition}
                                    isSearchable={false}
                                    placeholder={"职务"}
                                    styles={SysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                            </div>

                            {/* 查询条件：电话 */}
                            <div className="input-field col s4">
                                <input id="phone" type="text" value={trafficPoliceReducer.conditionPhone} onChange={this.changeConditionPhone}/>
                                <label htmlFor="phone">电话</label>
                            </div>

                            {/* 查询条件：状态 */}
                            <div className="input-field col s4">
                                <Select
                                    options={trafficPoliceReducer.policeStatusList}
                                    onChange={changeConditionStatus}
                                    isSearchable={false}
                                    placeholder={"状态"}
                                    styles={SysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                            </div>

                        </div>

                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryPoliceList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 add-btn" onClick={this.queryPoliceList}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                </div>


                {/* 数据列表 部分 */}
                <div className="row">
                    <div className="col s12">
                        TODO police list
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
    getPoliceList: () => {
        dispatch(trafficPoliceAction.getPoliceList())
    },

    setConditionNo: (policeNo) => {
        dispatch(TrafficPoliceActionType.setConditionNo(policeNo))
    },
    setConditionName: (name) => {
        dispatch(TrafficPoliceActionType.setConditionName(name))
    },
    changeConditionGender: (gender) => {
        dispatch(TrafficPoliceActionType.setConditionGender(gender))
    },
    changeConditionPosition: (policePosition) => {
        dispatch(TrafficPoliceActionType.setConditionPosition(policePosition))
    },
    setConditionPhone: (phone) => {
        dispatch(TrafficPoliceActionType.setConditionPhone(phone))
    },
    changeConditionStatus: (status) => {
        dispatch(TrafficPoliceActionType.setConditionStatus(status))
    },


    addCity: () => {
        dispatch(trafficPoliceAction.addCity())
    },
    setCityFormFlag: (flag) => {
        dispatch(TrafficPoliceActionType.setCityFormFlag(flag))
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(TrafficPolice)
