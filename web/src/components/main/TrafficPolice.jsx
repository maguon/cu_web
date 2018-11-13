import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {TrafficPoliceActionType} from '../../actionTypes';

const trafficPoliceAction = require('../../actions/main/TrafficPoliceAction');
const sysConst = require('../../util/SysConst');

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
        $('.modal').modal();
        if (!this.props.fromDetail) {
            this.props.setStartNumber(0);
            this.props.setConditionNo('');
            this.props.setConditionName('');
            this.props.changeConditionGender(null);
            this.props.changeConditionPosition(null);
            this.props.setConditionPhone('');
            this.props.changeConditionStatus(null);
        }
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

    /**
     * 查询交警列表
     */
    queryPoliceList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getPoliceList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.trafficPoliceReducer.start - (this.props.trafficPoliceReducer.size - 1));
        this.props.getPoliceList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.trafficPoliceReducer.start + (this.props.trafficPoliceReducer.size - 1));
        this.props.getPoliceList();
    };

    /**
     * 显示 增加交警
     */
    showAddPolice = () => {
        $('#policeModal').modal('open');
        this.props.setName('');
        this.props.setGender('0');
        this.props.changePolicePosition(null);
        this.props.setPhone('');
        this.props.setPassword('');
    };

    /**
     * 更新 增加交警：姓名
     */
    changeName = (event) => {
        this.props.setName(event.target.value);
    };

    /**
     * 更新 增加交警：性别
     */
    changeGender = (event) => {
        // this.props.setGender(value);
        this.props.setGender(event.target.value);
    };

    /**
     * 更新 增加交警：电话
     */
    changePhone = (event) => {
        this.props.setPhone(event.target.value);
    };

    /**
     * 更新 增加交警：密码
     */
    changePassword = (event) => {
        this.props.setPassword(event.target.value);
    };

    render() {
        const {trafficPoliceReducer, changeConditionGender, changeConditionPosition, changeConditionStatus, changePolicePosition, closeModal, addPolice} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">交警管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：编号 */}
                            <Input s={4} label="编号" value={trafficPoliceReducer.conditionNo} onChange={this.changeConditionNo}/>

                            {/* 查询条件：姓名 */}
                            <Input s={4} label="姓名" value={trafficPoliceReducer.conditionName} onChange={this.changeConditionName}/>

                            {/* 查询条件：性别 */}
                            <div className="input-field col s4">
                                <Select
                                    options={sysConst.GENDER}
                                    onChange={changeConditionGender}
                                    value={trafficPoliceReducer.conditionGender}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">性别</label>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：职务 */}
                            <div className="input-field col s4">
                                <Select
                                    options={sysConst.POLICE_POSITION}
                                    onChange={changeConditionPosition}
                                    value={trafficPoliceReducer.conditionPosition}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">职务</label>
                            </div>

                            {/* 查询条件：电话 */}
                            <Input s={4} label="电话" value={trafficPoliceReducer.conditionPhone} onChange={this.changeConditionPhone}/>

                            {/* 查询条件：状态 */}
                            <div className="input-field col s4">
                                <Select
                                    options={sysConst.POLICE_STATUS}
                                    onChange={changeConditionStatus}
                                    value={trafficPoliceReducer.conditionStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">状态</label>
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
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 add-btn" onClick={this.showAddPolice}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">

                        <div className="divider custom-divider"/>
                        <table className="bordered striped">
                            <thead className="blue-grey lighten-5">
                            <tr className="grey-text text-darken-2">
                                <th>编号</th>
                                <th>姓名</th>
                                <th>性别</th>
                                <th>电话(登录账号)</th>
                                <th>职务</th>
                                <th>状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                trafficPoliceReducer.policeArray.map(function (item) {
                                    return (
                                            <tr className="grey-text text-darken-1">
                                                <td>{item.id}</td>
                                                <td>{item.user_name}</td>
                                                <td>{sysConst.GENDER[item.gender].label}</td>
                                                <td>{item.phone}</td>
                                                <td>{sysConst.POLICE_POSITION[item.type].label}</td>
                                                <td>{sysConst.POLICE_STATUS[item.status].label}</td>
                                                {/* 显示【交警资料】画面按钮 */}
                                                <td className="operation center">
                                                    <Link to={{pathname: '/traffic_police/'+ item.id}} >
                                                        <i className="mdi mdi-table-search light-blue-text"/>
                                                    </Link>
                                                </td>
                                            </tr>
                                    )
                                })
                            }
                            { trafficPoliceReducer.policeArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="7">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {trafficPoliceReducer.start > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {trafficPoliceReducer.dataSize >= trafficPoliceReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>}
                        </div>
                    </div>
                </div>

                <div id="policeModal" className="modal modal-fixed-footer row">

                    {/** Modal头部：Title */}
                    <div className="modal-title center-align white-text">增加交警</div>

                    {/** Modal主体 */}
                    <div className="modal-content white">
                        <div className="row margin-top40">
                            <Input s={4} label="姓名" maxLength="100" value={trafficPoliceReducer.name} onChange={this.changeName}/>

                            <div className="col s2 margin-top25">
                                <input type="radio" id="male"   value="0" className='with-gap' checked={trafficPoliceReducer.gender==='0'} onChange={this.changeGender}/>
                                <label htmlFor="male">男</label>

                                <input type="radio" id="female" value="1" className='with-gap' checked={trafficPoliceReducer.gender==='1'} onChange={this.changeGender}/>
                                <label htmlFor="female" className="margin-left10">女</label>
                            </div>
                            <div className="input-field col s6">
                                <Select
                                    options={sysConst.POLICE_POSITION}
                                    onChange={changePolicePosition}
                                    isSearchable={false}
                                    value={trafficPoliceReducer.position}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                                <label className="active">职务</label>
                            </div>
                        </div>
                        <div className="row">
                            <Input s={6} label="电话(登录账号)" type='tel' maxLength="11" value={trafficPoliceReducer.phone} onChange={this.changePhone}/>
                            <Input s={6} label="密码" type="password" maxLength="100" value={trafficPoliceReducer.password} onChange={this.changePassword}/>
                        </div>
                    </div>

                    {/** Modal固定底部：取消确定按钮 */}
                    <div className="modal-footer">
                        <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                        <button type="button" className="btn confirm-btn" onClick={addPolice}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let fromDetail = false;
    if (typeof ownProps.location.state !== 'undefined' && ownProps.location.state.fromDetail === true) {
        fromDetail = true;
    }
    return {
        trafficPoliceReducer: state.TrafficPoliceReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getPoliceList: () => {
        dispatch(trafficPoliceAction.getPoliceList())
    },
    setStartNumber: (start) => {
        dispatch(TrafficPoliceActionType.setStartNumber(start))
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
    setName: (name) => {
        dispatch(TrafficPoliceActionType.setName(name))
    },
    setGender: (gender) => {
        dispatch(TrafficPoliceActionType.setGender(gender))
    },
    changePolicePosition: (policePosition) => {
        dispatch(TrafficPoliceActionType.setPolicePosition(policePosition))
    },
    setPhone: (phone) => {
        dispatch(TrafficPoliceActionType.setPhone(phone))
    },
    setPassword: (password) => {
        dispatch(TrafficPoliceActionType.setPassword(password))
    },
    addPolice: () => {
        dispatch(trafficPoliceAction.addPolice())
    },
    closeModal: () => {
        $('#policeModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrafficPolice)
