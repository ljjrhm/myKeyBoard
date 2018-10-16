import "./keyboard.less";
import { ReactDOM } from "../../../src/framework/component/react-dom";
import { Cookie } from "../../../src/framework/basic/cookie";
import { React } from "../../../src/framework/component/react";
import { Key } from "../../../src/framework/basic/key";
import { Focus } from "../../../src/framework/component/focus";
import { Json } from "../../../src/framework/basic/Json";
import { PageEvent, PageType } from "../../../src/framework/component/pageEvent";
import { HElement } from '../../../src/framework/basic/helement';

interface IKeyboardProps {
    identCode: number;
    event: PageEvent;

    /**返回IdentCode */
    backIdentCode: number;

    up?: number;
    right?: number;
    down?: number;
    left?: number;

    /**键盘样式 */
    KeyboardType?: number;

    /**是否是密码输入 */
    pwd?: boolean;

    id: string
}

interface IKeyboardState {
    keyList: { id: string, value: string, name: string }[];
}

interface IInputProps {
    identCode: number;
    event: PageEvent;

    /**返回IdentCode */
    backIdentCode: number;

    up?: number;
    right?: number;
    down?: number;
    left?: number;

    /**输入框标题*/
    inputTitle?: string | null,
    /**输入框样式 */
    inputType?: number;

    id: string;
}

interface IInputState {
    flag:"flase";
}

/**键盘对象 */
let keyboard: HElement;
/**输入框对象 */
let input: HElement;

/**输入框 */
let inputIn: HElement;
/**输入框长度 */
let count: number;

/**秘密隐藏缓存 */
export let inputcookie = new Array();

export class KeyboardModule extends React.Component<IKeyboardProps, IKeyboardState>{
    constructor(props: IKeyboardProps) {
        super(props);
        this.state = {
            keyList: [
                { "id": "kb0", "value": "0", "name": "0" },
                { "id": "kb1", "value": "1", "name": "1" },
                { "id": "kb2", "value": "2", "name": "2" },
                { "id": "kb3", "value": "3", "name": "3" },
                { "id": "kb4", "value": "4", "name": "4" },
                { "id": "kb5", "value": "5", "name": "5" },
                { "id": "kb6", "value": "6", "name": "6" },
                { "id": "kb7", "value": "7", "name": "7" },
                { "id": "kb8", "value": "8", "name": "8" },
                { "id": "kb9", "value": "9", "name": "9" },
                { "id": "kb10", "value": "A", "name": "A" },
                { "id": "kb11", "value": "B", "name": "B" },
                { "id": "kb12", "value": "C", "name": "C" },
                { "id": "kb13", "value": "D", "name": "D" },
                { "id": "kb14", "value": "E", "name": "E" },
                { "id": "kb15", "value": "F", "name": "F" },
                { "id": "kb16", "value": "G", "name": "G" },
                { "id": "kb17", "value": "H", "name": "H" },
                { "id": "kb18", "value": "I", "name": "I" },
                { "id": "kb19", "value": "J", "name": "G" },
                { "id": "kb20", "value": "K", "name": "K" },
                { "id": "kb21", "value": "L", "name": "L" },
                { "id": "kb22", "value": "M", "name": "M" },
                { "id": "kb23", "value": "N", "name": "N" },
                { "id": "kb24", "value": "O", "name": "O" },
                { "id": "kb25", "value": "P", "name": "P" },
                { "id": "kb26", "value": "Q", "name": "Q" },
                { "id": "kb27", "value": "R", "name": "R" },
                { "id": "kb28", "value": "S", "name": "S" },
                { "id": "kb29", "value": "T", "name": "T" },
                { "id": "kb30", "value": "U", "name": "U" },
                { "id": "kb31", "value": "V", "name": "V" },
                { "id": "kb32", "value": "W", "name": "W" },
                { "id": "kb33", "value": "X", "name": "X" },
                { "id": "kb34", "value": "Y", "name": "Y" },
                { "id": "kb35", "value": "Z", "name": "Z" },
                { "id": "kb36", "value": "changeCap", "name": "切换大小写" },
                { "id": "kb37", "value": "spase", "name": "空格" },
                { "id": "kb38", "value": "del", "name": "删除" },
                { "id": "kb39", "value": "clear", "name": "清空" }
            ],
        }
    }

    render() {
        let classStr = "letter";
        let otherletter = "letter otherletter";
        return (
            <div class="model4keyBoard" id="model4keyBoard">
                <div class="changeCap" id="changeCap">ABC</div>
                <div class="kb_con" id="kb_con">
                    {
                        this.state.keyList.map((v, index) => {
                            if (index > this.state.keyList.length - 5) {
                                return (
                                    <div tag="focus" class={otherletter} data-keydown={React.props({ value: v.value, pwd: this.props.pwd })}>{v.name}</div>
                                )
                            } else {
                                return (
                                    <div tag="focus" class={classStr} data-keydown={React.props({ value: v.value, pwd: this.props.pwd })}>{v.name}</div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
    }

    subscribeToEvents() {
        this.onfocus((e) => {
            //console.log("focus");            
        });
        this.onkeydown((e) => {
            if (Key.Right === e.keyCode || Key.Left === e.keyCode || Key.Up === e.keyCode || Key.Down == e.keyCode) {
                // 右侧时候有元素
                let s = Focus.area(this.tags, this.index, e.keyCode)
                if (s) {
                    this.setFocus(s.index);
                } else {
                    if (Key.Up === e.keyCode) {
                        let up = this.props.up;
                        if (up && up != -1) {
                            this.target(up);
                            this.tags.removeClass("focus").eq(this.index);
                        }
                    }
                }
            }
            else if (Key.Enter === e.keyCode) {
                let memo = {
                    key: this.identCode,
                    index: this.index
                }

                if (e.data.pwd !== null && e.data.pwd) {
                    inputIn = new HElement("#m4inputinfo_input");
                    count = inputIn.text().length;
                    switch (e.data.value) {
                        case "changeCap":
                        case "spase":
                            break;
                        case "del":
                            inputcookie.length > 0 ? inputcookie.pop() : null;
                            break;
                        case "clear":
                            inputcookie.length > 0 ? inputcookie = [] : null;
                            break;
                        default:
                            inputcookie.length < 25 ? inputcookie.push(e.data.value) : null
                            break;
                    }
                }

                switch (memo.index - 35) {
                    case 1:
                        this.changeCap();
                        break;
                    case 2:
                        this.spaceChar(e.data.value, "m4inputinfo_input");
                        break;
                    case 3:
                        this.deleteChar(e.data.value, "m4inputinfo_input");
                        break;
                    case 4:
                        this.clear(e.data.value, "m4inputinfo_input");
                        break;
                    default:
                        KeyboardModule.kenterEvent(e.data.value, "m4inputinfo_input");
                        break;
                }

                if (e.data.pwd !== null && e.data.pwd) {
                    //count - inputIn.text().length === 0 ? null : inputIn.text(inputIn.text().replace(new RegExp(/\w|\W/,'g'),'*'));
                    count - inputIn.text().length === 0 ? null : inputIn.text(inputIn.text().replace(/\w|\W/g, "*"));
                }
            }else{
                switch (e.keyCode) {
                    case Key.Zero:           
                    case Key.One:
                    case Key.Two:
                    case Key.Three:
                    case Key.Four:
                    case Key.Five:
                    case Key.Six:
                    case Key.Seven:
                    case Key.Eight:
                    case Key.Nine:
                        KeyboardModule.kenterEvent(e.keyCode-48, "m4inputinfo_input");
                        if(e.data.pwd !== null && e.data.pwd){
                            inputIn = new HElement("#m4inputinfo_input");
                            count = inputIn.text().length;
                            inputcookie.length < 25 ? inputcookie.push(e.keyCode-48) : null;                                                        
                            count - inputIn.text().length === 0 ? inputIn.text(inputIn.text().replace(/\w|\W/g, "*")) : null;
                        }
                    break;
                    default:
                        break;
                }
            } 
            
            if (Key.Backspace === e.keyCode) {
                let memo = {
                    key: this.identCode,
                    index: this.index
                }
                //KeyboardModule.keyboardHideAll(memo);
                this.keyboardHideAll(memo);
            }
        });

    }

    componentFocusUpdate() {
        if (!this.tags || !this.tags.length || this.tags.length <= this.index || this.identCode !== this.event.getTargetIdentCode()) {
            return;
        }
        this.tags.removeClass("focus");
        this.tags.eq(this.index).addClass("focus");
    }

    static kenterEvent(value, eleId) {
        //界面值回填到输入框
        var inputObj = document.getElementById(eleId);
        if (inputObj) {
            var inputStr = inputObj.innerHTML;
            inputStr = inputStr + value;
            if (inputStr.length <= 25) {
                inputObj.innerHTML = inputStr;
            }
        }
    }
    flag = true;
    changeCap() {
        //字符转ascii码：用charCodeAt(); "A".charCodeAt()  65-90 97-122
        //ascii码转字符：用fromCharCode();  String.fromCharCode(65)  大小写相差32

        for (var i = 0, length = this.state.keyList.length; i < length; i++) {
            if(this.state.keyList[i].value.length==1){
                var charCode = this.state.keyList[i].value.charCodeAt(0);
                if (97 <= charCode && charCode <= 122) {
                    charCode = charCode - 32;
                    this.state.keyList[i].value = String.fromCharCode(charCode);
                    this.flag = true;
                } else if (65 <= charCode && charCode <= 97) {
                    charCode = charCode + 32;
                    this.state.keyList[i].value = String.fromCharCode(charCode);
                    this.flag = false;
                }
            }
           
        }

        this.setState({
            keyList: this.state.keyList
        })

    }

    deleteChar(value, eleId) {
        var inputObj = document.getElementById(eleId);
        if (inputObj) {
            var inputStr = inputObj.innerHTML;
            inputStr = inputStr.substring(0, inputStr.length - 1);
            inputObj.innerHTML = inputStr;
        }
    }

    spaceChar(value, eleId) {
        // var inputObj = document.getElementById(eleId);
        // if (inputObj) {
        //     var inputStr = inputObj.innerHTML;
        //     inputStr = inputStr + " ";
        //     inputObj.innerHTML = inputStr;
        // }
    }
    clear(value, eleId) {
        var inputObj = document.getElementById(eleId);
        if (inputObj) {
            inputObj.innerHTML = "";
        }
        
    }

    /**
     * 显示
     */
    static keyboardShowAll(memo?){
        keyboard = new HElement("#model4keyBoard");
        input = new HElement("#model4inputinfo");
        if(input){
            input.show();
        }
        if(keyboard){
            keyboard.show();
        }  
    }

    keyboardHideAll(memo?) {
        if(memo){

        }
        keyboard = new HElement("#model4keyBoard");
        input = new HElement("#model4inputinfo");
        if(input){
            input.hide();
        }
        if(keyboard){
            keyboard.hide();
        }; 
        this.event.target(this.props.backIdentCode);
        this.tags.removeClass("focus").eq(this.index);
    }

    static getInputValue() {
        if (inputcookie) {
            return inputcookie.join("");
        } else {
            return "";
        }
    }

    componentDidMount() {
        //初始及无值清空输入隐藏缓存
        if (this.props.pwd) {
            let id = new HElement('#' + this.props.id).text();
            if (id.indexOf('请') > -1 || id === '' || id === null) {
                inputcookie = [];
            }
            console.log(inputcookie);
        }
    }

    componentDidUpdate() {
        var changeCap = document.getElementById("changeCap");
        if (this.flag) {
            changeCap.innerHTML = "ABC";
        } else {
            changeCap.innerHTML = "abc";
        }
    }
}

export class InputModule extends React.Component<IInputProps, IInputState>{
    constructor(props: IInputProps) {
        super(props);
    }

    render() {
        return (
            <div class="model4inputinfo" id="model4inputinfo">
                <div class="m4inputinfo_header">
                    {/* <p class="m4inputinfo_header_p">输入户号：</p> */}
                    <p class="m4inputinfo_header_p">
                        {(this.props.inputTitle === null
                            || this.props.inputTitle === undefined
                            || this.props.inputTitle === '') ? "请输入：" : this.props.inputTitle}
                    </p>
                </div>
                <div class="m4inputinfo_main">
                    <div class="m4inputinfo_input" id="m4inputinfo_input"></div>
                </div>
                <div class="m4inputinfo_footer">
                    <div tag="focus" class="div_primary div_confirm" data-keydown={React.props({ key: "confirm" })}>确定</div>
                    <div tag="focus" class="div_primary div_cancel" data-keydown={React.props({ key: "cancel" })}>取消</div>
                </div>
            </div>
        )
    }

    subscribeToEvents() {
        this.onfocus((e) => {
            //console.log("focus");
        });
        this.onkeydown((e) => {
            if (Key.Right === e.keyCode || Key.Left === e.keyCode || Key.Up === e.keyCode || Key.Down == e.keyCode) {
                // 右侧时候有元素
                let s = Focus.area(this.tags, this.index, e.keyCode)
                if (s) {
                    this.setFocus(s.index);
                } else {
                    if (Key.Down === e.keyCode) {
                        let down = this.props.down;
                        if (down && down != -1) {
                            this.target(down);
                            this.tags.removeClass("focus").eq(this.index);
                        }
                    }
                }
            }

            if (Key.Enter === e.keyCode) {
                let memo = {
                    key: this.identCode,
                    index: this.index
                }
                if (e.data.key === "confirm") {

                    let inputText = new HElement('#m4inputinfo_input');
                    let id = new HElement('#' + this.props.id);
                    id.text('');
                    KeyboardModule.kenterEvent(inputText.text(), this.props.id);

                    keyboard = new HElement("#model4keyBoard");
                    input = new HElement("#model4inputinfo");
                    if (input) {
                        input.hide();
                    }
                    if (keyboard) {
                        keyboard.hide();
                    }
                    this.event.target(this.props.backIdentCode);
                    this.tags.removeClass("focus").eq(this.index);

                } else if (e.data.key === "cancel") {
                    keyboard = new HElement("#model4keyBoard");
                    input = new HElement("#model4inputinfo");
                    if (input) {
                        input.hide();
                    }
                    if (keyboard) {
                        keyboard.hide();
                    }
                    this.event.target(this.props.backIdentCode);
                    this.tags.removeClass("focus").eq(this.index);
                }
            }else{
                switch (e.keyCode) {
                    case Key.Zero:           
                    case Key.One:
                    case Key.Two:
                    case Key.Three:
                    case Key.Four:
                    case Key.Five:
                    case Key.Six:
                    case Key.Seven:
                    case Key.Eight:
                    case Key.Nine:
                        KeyboardModule.kenterEvent(e.keyCode-48, "m4inputinfo_input");
                        if(e.data.pwd !== null && e.data.pwd){
                            inputIn = new HElement("#m4inputinfo_input");
                            count = inputIn.text().length;
                            inputcookie.length < 25 ? inputcookie.push(e.keyCode-48) : null;                                                        
                            count - inputIn.text().length === 0 ? inputIn.text(inputIn.text().replace(/\w|\W/g, "*")) : null;
                        }
                    break;
                    default:
                        break;
                }
            }

            if (Key.Backspace === e.keyCode) {
                let memo = {
                    key: this.identCode,
                    index: this.index
                }
                this.inputHide(memo);
            }
        });

    }

    componentFocusUpdate() {
        if (!this.tags || !this.tags.length || this.tags.length <= this.index || this.identCode !== this.event.getTargetIdentCode()) {
            return;
        }
        this.tags.removeClass("focus");
        this.tags.eq(this.index).addClass("focus");
    }

    inputHide(memo) {
        keyboard = new HElement("#model4keyBoard");
        input = new HElement("#model4inputinfo");
        if (input) {
            input.hide();
        }
        if (keyboard) {
            keyboard.hide();
        }
        this.event.target(this.props.backIdentCode);
        this.tags.removeClass("focus").eq(this.index);
    }

    componentDidMount() {
        this.setState({  flag:"flase"});
    }

    componentDidUpdate(){
        let inputIn = new HElement("#m4inputinfo_input");
        let propsId = new HElement('#' + this.props.id);
        let han = /^[\u4e00-\u9fa5]+$/;
        //(propsId.text().indexOf('请') > -1) ? null : inputIn.text(propsId.text());
        han.test(propsId.text()) ? null : inputIn.text(propsId.text());
    }

}





