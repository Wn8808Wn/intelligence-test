// 防抖
export function _debounce(fn, delay) {

    var delay = delay || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    };
}
// 节流
export function _throttle(fn, interval) {
    var last;
    var timer;
    var interval = interval || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}


export default function  getTimeStyle(time){
    let d = new Date(time);
    let times =
    d.getFullYear() +"-" +(d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1): d.getMonth() + 1) +
     "-" +(d.getDate() < 10 ? "0" + d.getDate() : d.getDate())+' '+(d.getHours() < 10 ? "0" + d.getHours() : d.getHours())
     +":"+(d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes())
     return times;
}
