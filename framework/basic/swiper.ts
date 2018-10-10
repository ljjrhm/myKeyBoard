export class Swiper {

    private pagination: any;
    private autoplay: number;
    private swiperId: string;
    private liLength: number;
    private liWidth: any;
    private imgsBox: any;
    private points: any;
    private index: number;
    private timer: any;

    MySwiper(swiperId, options) {
        var _this = this;
        this.pagination = "";
        this.autoplay = 0;
        this.swiperId = swiperId;
        //轮播项个数
        this.liLength = 0;
        //轮播项宽度
        this.liWidth = 0;
        //图片轮播容器
        this.imgsBox = [];
        //分页小圆点数组
        this.points = [];
        //轮播图片index
        this.index = 1;
        //定时器
        this.timer = {};
        (function initSwiper() {
            for (var option in options) {
                //轮播时长
                if ("autoplay" == option) {
                    _this.autoplay = options[option];
                } else if ("pagination" == option) {
                    //轮播小圆点
                    _this.pagination = options[option];
                }
            }
            // 初始化参数
            (function () {
                //图片容器
                _this.imgsBox = document.querySelector(_this.swiperId + "   ul:first-child");
                //轮播项的个数
                var imgs = _this.imgsBox.children;
                //实现无缝轮播，在第一张之前加上最后一张图片，在最后一张之后加上第一张图片
                var imgFirst = document.createElement("li");
                var imgLast = document.createElement("li");
                imgLast.innerHTML = imgs[0].innerHTML;
                imgFirst.innerHTML = imgs[imgs.length - 1].innerHTML;
                _this.imgsBox.appendChild(imgLast);
                _this.imgsBox.insertBefore(imgFirst, imgs[0]);
                //一个轮播项的宽度
                var width = document.querySelector(_this.swiperId).clientWidth;
                _this.liWidth = width;
                console.log(width);
                //轮播项个数
                var length = imgs.length;
                _this.liLength = length;
                //imgsBox盒子宽度
                var imgBoxWidth = width * (length) + "px";
                _this.imgsBox.style.width = imgBoxWidth;
                //每一个li的宽度
                for (var j = 0; j < length; j++) {
                    imgs[j].style.width = width + "px";
                }
                //定位到第一张图片
                _this.setranslateX(-width);
                //小圆点容器
                if (_this.pagination) {
                    var pointsBox = document.querySelector(_this.swiperId + "   ul:last-child");
                    //生成小圆点
                    var pointsNum = length - 2;
                    var pointsHtml = "";
                    for (var m = 0; m < pointsNum; m++) {
                        if (m == 0) {
                            pointsHtml = pointsHtml + "<li class = 'now'></li>";
                        } else {
                            pointsHtml = pointsHtml + "<li></li>";
                        }
                    }
                    pointsBox.innerHTML = pointsHtml;
                    pointsHtml = null;
                    _this.points = pointsBox.children;
                }

                imgs = null;
                imgFirst = null;
                imgLast = null;
                //生成唯一名称的定时器
                if (_this.autoplay) {
                    var timerName = "timer" + (Math.random() * 100);
                    _this.timer["timerName"] = timerName;
                    _this.timer[timerName] = setInterval(function () {
                        _this.index++;
                        _this.addTransition();
                        _this.setranslateX(-_this.index * width);
                    }, _this.autoplay);
                }
            })();

            _this.addEvent4Transition();
        })();
    }

    NewSwiper=(swiperId, options)=>{
        var _this = this;
        this.pagination = "";
        this.autoplay = 0;
        this.swiperId = swiperId;
        //轮播项个数
        this.liLength = 0;
        //轮播项宽度
        this.liWidth = 0;
        //图片轮播容器
        this.imgsBox = [];
        //分页小圆点数组
        this.points = [];
        //轮播图片index
        this.index = 1;
        //定时器
        this.timer = {};
        (function initSwiper() {
            for (var option in options) {
                //轮播时长
                if ("autoplay" == option) {
                    _this.autoplay = options[option];
                } else if ("pagination" == option) {
                    //轮播小圆点
                    _this.pagination = options[option];
                }
            }
            // 初始化参数
            (function () {
                //图片容器
                _this.imgsBox = document.querySelector(_this.swiperId + "   ul:first-child");
                //轮播项的个数
                var imgs = _this.imgsBox.children;
                //实现无缝轮播，在第一张之前加上最后一张图片，在最后一张之后加上第一张图片
                var imgFirst = document.createElement("li");
                var imgLast = document.createElement("li");
                imgLast.innerHTML = imgs[0].innerHTML;
                imgFirst.innerHTML = imgs[imgs.length - 1].innerHTML;
                _this.imgsBox.appendChild(imgLast);
                _this.imgsBox.insertBefore(imgFirst, imgs[0]);
                //一个轮播项的宽度
                var width = document.querySelector(_this.swiperId).clientWidth;
                _this.liWidth = width;                
                //轮播项个数
                var length = imgs.length;
                _this.liLength = length;
                //imgsBox盒子宽度
                var imgBoxWidth = width * (length) + "px";
                _this.imgsBox.style.width = imgBoxWidth;
                //每一个li的宽度
                for (var j = 0; j < length; j++) {
                    imgs[j].style.width = width + "px";
                }
                //定位到第一张图片
                _this.setranslateX(-width);
                //小圆点容器
                if (_this.pagination) {
                    var pointsBox = document.querySelector(_this.swiperId + "   ul:last-child");
                    //生成小圆点
                    var pointsNum = length - 2;
                    var pointsHtml = "";
                    for (var m = 0; m < pointsNum; m++) {
                        if (m == 0) {
                            pointsHtml = pointsHtml + "<li class = 'now'></li>";
                        } else {
                            pointsHtml = pointsHtml + "<li></li>";
                        }
                    }
                    pointsBox.innerHTML = pointsHtml;
                    pointsHtml = null;
                    _this.points = pointsBox.children;
                }

                imgs = null;
                imgFirst = null;
                imgLast = null;
                //生成唯一名称的定时器
                if (_this.autoplay) {
                    var timerName = "timer" + (Math.random() * 100);
                    _this.timer["timerName"] = timerName;
                    _this.timer[timerName] = setInterval(function () {
                        _this.index++;
                        _this.addTransition();
                        _this.setranslateX(-_this.index * width);
                    }, _this.autoplay);
                }
            })();

            _this.addEvent4Transition();
        })();
        return this.NewSwiper;
    }


    
    addTransition = function () {
        this.imgsBox.style.transition = "all  0.3s";
        this.imgsBox.style.webkitTransition = "all  0.3s";
    };

    addEvent4Transition = function () {
        var _this = this;
        _this.imgsBox.addEventListener("transitionend", function () {
            if (_this.index >= _this.liLength - 1) {
                _this.index = 1;
                _this.clearTranstion();
                _this.setranslateX(-_this.index * _this.liWidth);
            } else if (_this.index <= 0) {
                _this.index = _this.liLength - 2;
                _this.clearTranstion();
                _this.setranslateX(-_this.index * this.liWidth);
            }
            if (_this.pagination) {
                _this.setPoint();
            }
        });
    }

    clearTranstion = function () {
        this.imgsBox.style.transition = "none";
        this.imgsBox.style.webkitTransition = "none";
    };

    setranslateX = function (translateX) {
        this.imgsBox.style.transform = "translateX(" + translateX + "px)";
        this.imgsBox.style.webkitTransform = "translateX(" + translateX + "px)";
    };

    setPoint = function () {
        for (var i = 0; i < this.liLength - 2; i++) {
            this.points[i].classList.remove("now");
        }
        this.points[this.index - 1].classList.add("now");
    };

    //切换上一页
    slidePrev = function () {
        if (this.autoplay) {
            this.downTimer();
        }
        this.clearTranstion();
        this.index = this.index - 1;
        this.switchGo();
    };
    //切换下一页
    slideNext = function () {
        if (this.autoplay) {
            this.downTimer();
        }
        this.clearTranstion();
        this.index = this.index + 1;
        this.switchGo();
    };

    downTimer = function () {
        var _this = this;
        var timerName = this.timer["timerName"];
        clearInterval(_this.timer[timerName]);
        this.timer[timerName] = null;
    };

    stopAutoplay = function () {
        if (this.autoplay) {
            this.downTimer();
        }
        this.clearTranstion();
    }

    startAutoplay = function () {
        if (this.autoplay) {
            this.downTimer();
        }
        this.clearTranstion();
        this.switchGo();
    }

    switchGo = function () {
        var _this = this;
        this.addTransition();
        this.setranslateX(-this.index * this.liWidth);
        if (this.autoplay) {
            this.downTimer();
            var timerName = this.timer["timerName"];
            this.timer[timerName] = setInterval(function () {
                _this.index++;
                _this.addTransition();
                _this.setranslateX(-_this.index * _this.liWidth);
            }, _this.autoplay);
        }
    }
}

