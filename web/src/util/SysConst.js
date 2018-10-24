export const USER_ID = 'user-id';
export const USER_TYPE = 'user-type';
export const USER_STATUS = 'user-status';
export const AUTH_TOKEN = 'auth-token';

// 性别
export const GENDER = [
    {
        value: 0,
        label: "男"
    },
    {
        value: 1,
        label: "女"
    }
];

// 交警管理：职务
export const POLICE_POSITION = [
    {
        value: 0,
        label: "警员"
    }
];

// 交警管理：状态
export const POLICE_STATUS = [
    {
        value: 0,
        label: "停用"
    },
    {
        value: 1,
        label: "开通"
    }
];

// 绑定车辆管理：绑定状态
export const BIND_STATUS = [
    {
        value: 0,
        label: "解绑"
    },
    {
        value: 1,
        label: "绑定"
    }
];

// 消息类型
export const MESSAGE_TYPE = [
    {
        value: 0,
        label: "验证码"
    },
    {
        value: 1,
        label: "违停"
    }
];

// 状态：是否成功
export const SUCCESS_STATUS = [
    {
        value: 0,
        label: "失败"
    },
    {
        value: 1,
        label: "成功"
    }
];

export const DATE_PICKER_OPTION = {
    // selectMonths: true,
    // selectYears: 15,
    format: 'yyyy-mm-dd',
    weekdaysLetter: ['日', '一', '二', '三', '四', '五', '六'],
    today: '今天',
    clear: '清除',
    close: '关闭',
    monthsFull: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    weekdaysFull: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    closeOnSelect: true, // Close upon selecting a date,
    // container: undefined, // ex. 'body' will append picker to body
};

/**
 * 单选下拉菜单样式
 */
export const CUSTOM_REACT_SELECT_STYLE = {
    control: (styles, {isFocused}) => ({
        ...styles,
        height: '46px',
        borderRadius: '0',
        boxShadow: '0',
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        background: '#FFFFFF',
        margin: "0 0 20px 0",
        borderColor: isFocused ? '#26a69a' : '#ACACAC',
        ':hover': {
            borderColor: "#26a69a"
        }
    }),
    indicatorSeparator: styles => ({...styles, display: 'none'}),
    valueContainer: styles => ({...styles, paddingLeft: '0'})
};