const ADD = 'ADD';
const REDUCE = 'REDUCE';

// 新建一个reducer，reducer用来根据老的state生成新的state
export const counter = (state=10, action) => {
    switch (action.type) {
        case ADD:
            return state + 1;
        case REDUCE:
            return state - 1;
        default:
            return state;
    }
}

export const addNum = () => {
    return {type:ADD};
}

export const reduceNum = () => {
    return {type:REDUCE};
}

export const addAsync = () => {
    // 在使用了redux-thunk之后，action可以是一个函数
    return dispatch => {
        setTimeout(() => {
            dispatch(addNum())
        }, 2000);
    }
}