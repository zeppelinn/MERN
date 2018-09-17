// 根据用户信息 返回要跳转的地址
// 一共有四种跳转方式
// 根据用户类型 跳转 /boss 或者 /genius
// 根据用户信息是否完善 跳转 /bossinfo 或者 /geniusinfo
export const getRedirectPath = ({type, avatar}) => {
    let url = (type === 'boss') ? '/boss' : '/genius';
    if (!avatar) {
        url += 'info';
    }
    return url;
}