(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["prc"] = factory();
	else
		root["prc"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 971:
/***/ ((module, exports, __webpack_require__) => {

/**
 *
Parametric Robot Control (PRC) gRPC client in JavaScript
 *
 */

const {
    Action,
    AddRobotTaskReply,
    AddRobotTaskRequest,
    AxisMotion,
    AxisName,
    Base,
    CartesianPosition,
    CartesianReference,
    CartesianTarget,
    CircularMotion,
    CoordinateSystem,
    CustomRobot,
    End,
    Euler,
    ExternalAxis,
    ExternalAxisType,
    Flow,
    IfElse,
    Task,
    TaskPayload,
    While,
    FrameType,
    GetSimulatedRobotStateRequest,
    Heartbeat,
    Hold,
    InsertCode,
    Int4,
    JointTarget,
    LINMotion,
    Matrix4x4,
    Mesh,
    MetaData,
    MotionCommand,
    MotionGroup,
    Ping,
    PolyMesh,
    PTPMotion,
    Robot,
    RobotFeedback,
    RobotState,
    Settings,
    SetupRobotReply,
    SetupRobotRequest,
    SetVariable,
    SimulationResult,
    SimulationResultUnit,
    SubscribeRobotFeedbackRequest,
    TaskType,
    Tool,
    TransformationArray,
    UpdateVariableReply,
    UpdateVariableRequest,
    Variable,
    VariableArray,
    Vector3,
    WaitForVariable,
    MotionGroupType
}= __webpack_require__(155);

const {ParametricRobotControlServiceClient, ParametricRobotControlServicePromiseClient} = __webpack_require__(577);

exports = module.exports = {ParametricRobotControlServicePromiseClient,
    ParametricRobotControlServiceClient,
    Action,
    AddRobotTaskReply,
    AddRobotTaskRequest,
    AxisMotion,
    AxisName,
    Base,
    CartesianPosition,
    CartesianReference,
    CartesianTarget,
    CircularMotion,
    CoordinateSystem,
    CustomRobot,
    End,
    Euler,
    ExternalAxis,
    ExternalAxisType,
    Flow,
    IfElse,
    Task,
    TaskPayload,
    While,
    FrameType,
    GetSimulatedRobotStateRequest,
    Heartbeat,
    Hold,
    InsertCode,
    Int4,
    JointTarget,
    LINMotion,
    Matrix4x4,
    Mesh,
    MetaData,
    MotionCommand,
    MotionGroup,
    Ping,
    PolyMesh,
    PTPMotion,
    Robot,
    RobotFeedback,
    RobotState,
    Settings,
    SetupRobotReply,
    SetupRobotRequest,
    SetVariable,
    SimulationResult,
    SimulationResultUnit,
    SubscribeRobotFeedbackRequest,
    TaskType,
    Tool,
    TransformationArray,
    UpdateVariableReply,
    UpdateVariableRequest,
    Variable,
    VariableArray,
    Vector3,
    WaitForVariable,
    MotionGroupType,
    };

/***/ }),

/***/ 339:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},e="undefined"!=typeof window&&window===this?this:"undefined"!=typeof __webpack_require__.g&&null!=__webpack_require__.g?__webpack_require__.g:this;function ba(a,b){if(b){var c=e;a=a.split(".");for(var d=0;d<a.length-1;d++){var f=a[d];f in c||(c[f]={});c=c[f]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&aa(c,a,{configurable:!0,writable:!0,value:b})}}
function ca(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function da(){da=function(){};e.Symbol||(e.Symbol=ea)}function fa(a,b){this.a=a;aa(this,"description",{configurable:!0,writable:!0,value:b})}fa.prototype.toString=function(){return this.a};var ea=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new fa("jscomp_symbol_"+(c||"")+"_"+b++,c)}var b=0;return a}();
function ha(){da();var a=e.Symbol.iterator;a||(a=e.Symbol.iterator=e.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&aa(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return ia(ca(this))}});ha=function(){}}function ia(a){ha();a={next:a};a[e.Symbol.iterator]=function(){return this};return a}
function ja(a,b){ha();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d}ba("Array.prototype.entries",function(a){return a?a:function(){return ja(this,function(b,c){return[b,c]})}});var ka=this||self;
function g(a,b,c){a=a.split(".");c=c||ka;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b}
function k(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function la(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ma(a,b,c){g(a,b,c)}function na(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a};var oa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function pa(a,b){for(var c,d,f=1;f<arguments.length;f++){d=arguments[f];for(c in d)a[c]=d[c];for(var h=0;h<oa.length;h++)c=oa[h],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var qa=Array.prototype.forEach?function(a,b){Array.prototype.forEach.call(a,b,void 0)}:function(a,b){for(var c=a.length,d="string"===typeof a?a.split(""):a,f=0;f<c;f++)f in d&&b.call(void 0,d[f],f,a)},l=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),f="string"===typeof a?a.split(""):a,h=0;h<c;h++)h in f&&(d[h]=b.call(void 0,f[h],h,a));return d};
function ra(a,b,c){return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)};function sa(a,b,c,d){var f="Assertion failed";if(c){f+=": "+c;var h=d}else a&&(f+=": "+a,h=b);throw Error(f,h||[]);}function n(a,b,c){for(var d=[],f=2;f<arguments.length;++f)d[f-2]=arguments[f];a||sa("",null,b,d);return a}function ta(a,b,c){for(var d=[],f=2;f<arguments.length;++f)d[f-2]=arguments[f];"string"!==typeof a&&sa("Expected string but got %s: %s.",[k(a),a],b,d)}
function ua(a,b,c){for(var d=[],f=2;f<arguments.length;++f)d[f-2]=arguments[f];Array.isArray(a)||sa("Expected array but got %s: %s.",[k(a),a],b,d)}function p(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];throw Error("Failure"+(a?": "+a:""),c);}function q(a,b,c,d){for(var f=[],h=3;h<arguments.length;++h)f[h-3]=arguments[h];a instanceof b||sa("Expected instanceof %s but got %s.",[va(b),va(a)],c,f)}
function va(a){return a instanceof Function?a.displayName||a.name||"unknown type name":a instanceof Object?a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a):null===a?"null":typeof a};function r(a,b){this.c=a;this.b=b;this.a={};this.arrClean=!0;if(0<this.c.length){for(a=0;a<this.c.length;a++){b=this.c[a];var c=b[0];this.a[c.toString()]=new wa(c,b[1])}this.arrClean=!0}}g("jspb.Map",r,void 0);
r.prototype.g=function(){if(this.arrClean){if(this.b){var a=this.a,b;for(b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b].a;c&&c.g()}}}else{this.c.length=0;a=u(this);a.sort();for(b=0;b<a.length;b++){var d=this.a[a[b]];(c=d.a)&&c.g();this.c.push([d.key,d.value])}this.arrClean=!0}return this.c};r.prototype.toArray=r.prototype.g;
r.prototype.Mc=function(a,b){for(var c=this.g(),d=[],f=0;f<c.length;f++){var h=this.a[c[f][0].toString()];v(this,h);var m=h.a;m?(n(b),d.push([h.key,b(a,m)])):d.push([h.key,h.value])}return d};r.prototype.toObject=r.prototype.Mc;r.fromObject=function(a,b,c){b=new r([],b);for(var d=0;d<a.length;d++){var f=a[d][0],h=c(a[d][1]);b.set(f,h)}return b};function w(a){this.a=0;this.b=a}w.prototype.next=function(){return this.a<this.b.length?{done:!1,value:this.b[this.a++]}:{done:!0,value:void 0}};
"undefined"!=typeof Symbol&&(w.prototype[Symbol.iterator]=function(){return this});r.prototype.Jb=function(){return u(this).length};r.prototype.getLength=r.prototype.Jb;r.prototype.clear=function(){this.a={};this.arrClean=!1};r.prototype.clear=r.prototype.clear;r.prototype.Cb=function(a){a=a.toString();var b=this.a.hasOwnProperty(a);delete this.a[a];this.arrClean=!1;return b};r.prototype.del=r.prototype.Cb;
r.prototype.Eb=function(){var a=[],b=u(this);b.sort();for(var c=0;c<b.length;c++){var d=this.a[b[c]];a.push([d.key,d.value])}return a};r.prototype.getEntryList=r.prototype.Eb;r.prototype.entries=function(){var a=[],b=u(this);b.sort();for(var c=0;c<b.length;c++){var d=this.a[b[c]];a.push([d.key,v(this,d)])}return new w(a)};r.prototype.entries=r.prototype.entries;r.prototype.keys=function(){var a=[],b=u(this);b.sort();for(var c=0;c<b.length;c++)a.push(this.a[b[c]].key);return new w(a)};
r.prototype.keys=r.prototype.keys;r.prototype.values=function(){var a=[],b=u(this);b.sort();for(var c=0;c<b.length;c++)a.push(v(this,this.a[b[c]]));return new w(a)};r.prototype.values=r.prototype.values;r.prototype.forEach=function(a,b){var c=u(this);c.sort();for(var d=0;d<c.length;d++){var f=this.a[c[d]];a.call(b,v(this,f),f.key,this)}};r.prototype.forEach=r.prototype.forEach;
r.prototype.set=function(a,b){var c=new wa(a);this.b?(c.a=b,c.value=b.g()):c.value=b;this.a[a.toString()]=c;this.arrClean=!1;return this};r.prototype.set=r.prototype.set;function v(a,b){return a.b?(b.a||(b.a=new a.b(b.value)),b.a):b.value}r.prototype.get=function(a){if(a=this.a[a.toString()])return v(this,a)};r.prototype.get=r.prototype.get;r.prototype.has=function(a){return a.toString()in this.a};r.prototype.has=r.prototype.has;
r.prototype.Jc=function(a,b,c,d,f){var h=u(this);h.sort();for(var m=0;m<h.length;m++){var t=this.a[h[m]];b.Va(a);c.call(b,1,t.key);this.b?d.call(b,2,v(this,t),f):d.call(b,2,t.value);b.Ya()}};r.prototype.serializeBinary=r.prototype.Jc;r.deserializeBinary=function(a,b,c,d,f,h,m){for(;b.oa()&&!b.bb();){var t=b.c;1==t?h=c.call(b):2==t&&(a.b?(n(f),m||(m=new a.b),d.call(b,m,f)):m=d.call(b))}n(void 0!=h);n(void 0!=m);a.set(h,m)};
function u(a){a=a.a;var b=[],c;for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b}function wa(a,b){this.key=a;this.value=b;this.a=void 0};function xa(a){if(8192>=a.length)return String.fromCharCode.apply(null,a);for(var b="",c=0;c<a.length;c+=8192)b+=String.fromCharCode.apply(null,ra(a,c,c+8192));return b};var ya={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"\\u003C"},za={"'":"\\'"};var Aa={},x=null;function Ba(a,b){void 0===b&&(b=0);Ca();b=Aa[b];for(var c=[],d=0;d<a.length;d+=3){var f=a[d],h=d+1<a.length,m=h?a[d+1]:0,t=d+2<a.length,B=t?a[d+2]:0,M=f>>2;f=(f&3)<<4|m>>4;m=(m&15)<<2|B>>6;B&=63;t||(B=64,h||(m=64));c.push(b[M],b[f],b[m]||"",b[B]||"")}return c.join("")}function Da(a){var b=a.length,c=3*b/4;c%3?c=Math.floor(c):-1!="=.".indexOf(a[b-1])&&(c=-1!="=.".indexOf(a[b-2])?c-2:c-1);var d=new Uint8Array(c),f=0;Ea(a,function(h){d[f++]=h});return d.subarray(0,f)}
function Ea(a,b){function c(B){for(;d<a.length;){var M=a.charAt(d++),La=x[M];if(null!=La)return La;if(!/^[\s\xa0]*$/.test(M))throw Error("Unknown base64 encoding at char: "+M);}return B}Ca();for(var d=0;;){var f=c(-1),h=c(0),m=c(64),t=c(64);if(64===t&&-1===f)break;b(f<<2|h>>4);64!=m&&(b(h<<4&240|m>>2),64!=t&&b(m<<6&192|t))}}
function Ca(){if(!x){x={};for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),b=["+/=","+/","-_=","-_.","-_"],c=0;5>c;c++){var d=a.concat(b[c].split(""));Aa[c]=d;for(var f=0;f<d.length;f++){var h=d[f];void 0===x[h]&&(x[h]=f)}}}};g("jspb.ConstBinaryMessage",function(){},void 0);g("jspb.BinaryMessage",function(){},void 0);g("jspb.BinaryConstants.FieldType",{yb:-1,ee:1,FLOAT:2,ke:3,te:4,je:5,xb:6,wb:7,BOOL:8,re:9,ie:10,le:11,ce:12,se:13,ge:14,me:15,ne:16,oe:17,pe:18,he:30,ve:31},void 0);g("jspb.BinaryConstants.WireType",{yb:-1,ue:0,xb:1,de:2,qe:3,fe:4,wb:5},void 0);
g("jspb.BinaryConstants.FieldTypeToWireType",function(a){switch(a){case 5:case 3:case 13:case 4:case 17:case 18:case 8:case 14:case 31:return 0;case 1:case 6:case 16:case 30:return 1;case 9:case 11:case 12:return 2;case 2:case 7:case 15:return 5;default:return-1}},void 0);g("jspb.BinaryConstants.INVALID_FIELD_NUMBER",-1,void 0);g("jspb.BinaryConstants.FLOAT32_EPS",1.401298464324817E-45,void 0);g("jspb.BinaryConstants.FLOAT32_MIN",1.1754943508222875E-38,void 0);
g("jspb.BinaryConstants.FLOAT32_MAX",3.4028234663852886E38,void 0);g("jspb.BinaryConstants.FLOAT64_EPS",4.9E-324,void 0);g("jspb.BinaryConstants.FLOAT64_MIN",2.2250738585072014E-308,void 0);g("jspb.BinaryConstants.FLOAT64_MAX",1.7976931348623157E308,void 0);g("jspb.BinaryConstants.TWO_TO_20",1048576,void 0);g("jspb.BinaryConstants.TWO_TO_23",8388608,void 0);g("jspb.BinaryConstants.TWO_TO_31",2147483648,void 0);g("jspb.BinaryConstants.TWO_TO_32",4294967296,void 0);
g("jspb.BinaryConstants.TWO_TO_52",4503599627370496,void 0);g("jspb.BinaryConstants.TWO_TO_63",0x7fffffffffffffff,void 0);g("jspb.BinaryConstants.TWO_TO_64",1.8446744073709552E19,void 0);g("jspb.BinaryConstants.ZERO_HASH","\x00\x00\x00\x00\x00\x00\x00\x00",void 0);var y=0,z=0;g("jspb.utils.getSplit64Low",function(){return y},void 0);g("jspb.utils.getSplit64High",function(){return z},void 0);function Fa(a){var b=a>>>0;a=Math.floor((a-b)/4294967296)>>>0;y=b;z=a}g("jspb.utils.splitUint64",Fa,void 0);function A(a){var b=0>a;a=Math.abs(a);var c=a>>>0;a=Math.floor((a-c)/4294967296);a>>>=0;b&&(a=~a>>>0,c=(~c>>>0)+1,4294967295<c&&(c=0,a++,4294967295<a&&(a=0)));y=c;z=a}g("jspb.utils.splitInt64",A,void 0);
function Ga(a){var b=0>a;a=2*Math.abs(a);Fa(a);a=y;var c=z;b&&(0==a?0==c?c=a=4294967295:(c--,a=4294967295):a--);y=a;z=c}g("jspb.utils.splitZigzag64",Ga,void 0);
function Ha(a){var b=0>a?1:0;a=b?-a:a;if(0===a)0<1/a?y=z=0:(z=0,y=2147483648);else if(isNaN(a))z=0,y=2147483647;else if(3.4028234663852886E38<a)z=0,y=(b<<31|2139095040)>>>0;else if(1.1754943508222875E-38>a)a=Math.round(a/Math.pow(2,-149)),z=0,y=(b<<31|a)>>>0;else{var c=Math.floor(Math.log(a)/Math.LN2);a*=Math.pow(2,-c);a=Math.round(8388608*a);16777216<=a&&++c;z=0;y=(b<<31|c+127<<23|a&8388607)>>>0}}g("jspb.utils.splitFloat32",Ha,void 0);
function Ia(a){var b=0>a?1:0;a=b?-a:a;if(0===a)z=0<1/a?0:2147483648,y=0;else if(isNaN(a))z=2147483647,y=4294967295;else if(1.7976931348623157E308<a)z=(b<<31|2146435072)>>>0,y=0;else if(2.2250738585072014E-308>a)a/=Math.pow(2,-1074),z=(b<<31|a/4294967296)>>>0,y=a>>>0;else{var c=a,d=0;if(2<=c)for(;2<=c&&1023>d;)d++,c/=2;else for(;1>c&&-1022<d;)c*=2,d--;a*=Math.pow(2,-d);z=(b<<31|d+1023<<20|1048576*a&1048575)>>>0;y=4503599627370496*a>>>0}}g("jspb.utils.splitFloat64",Ia,void 0);
function C(a){var b=a.charCodeAt(4),c=a.charCodeAt(5),d=a.charCodeAt(6),f=a.charCodeAt(7);y=a.charCodeAt(0)+(a.charCodeAt(1)<<8)+(a.charCodeAt(2)<<16)+(a.charCodeAt(3)<<24)>>>0;z=b+(c<<8)+(d<<16)+(f<<24)>>>0}g("jspb.utils.splitHash64",C,void 0);function D(a,b){return 4294967296*b+(a>>>0)}g("jspb.utils.joinUint64",D,void 0);function E(a,b){var c=b&2147483648;c&&(a=~a+1>>>0,b=~b>>>0,0==a&&(b=b+1>>>0));a=D(a,b);return c?-a:a}g("jspb.utils.joinInt64",E,void 0);
function Ja(a,b,c){var d=b>>31;return c(a<<1^d,(b<<1|a>>>31)^d)}g("jspb.utils.toZigzag64",Ja,void 0);function Ka(a,b){return Ma(a,b,E)}g("jspb.utils.joinZigzag64",Ka,void 0);function Ma(a,b,c){var d=-(a&1);return c((a>>>1|b<<31)^d,b>>>1^d)}g("jspb.utils.fromZigzag64",Ma,void 0);function Na(a){var b=2*(a>>31)+1,c=a>>>23&255;a&=8388607;return 255==c?a?NaN:Infinity*b:0==c?b*Math.pow(2,-149)*a:b*Math.pow(2,c-150)*(a+Math.pow(2,23))}g("jspb.utils.joinFloat32",Na,void 0);
function Oa(a,b){var c=2*(b>>31)+1,d=b>>>20&2047;a=4294967296*(b&1048575)+a;return 2047==d?a?NaN:Infinity*c:0==d?c*Math.pow(2,-1074)*a:c*Math.pow(2,d-1075)*(a+4503599627370496)}g("jspb.utils.joinFloat64",Oa,void 0);function Pa(a,b){return String.fromCharCode(a>>>0&255,a>>>8&255,a>>>16&255,a>>>24&255,b>>>0&255,b>>>8&255,b>>>16&255,b>>>24&255)}g("jspb.utils.joinHash64",Pa,void 0);g("jspb.utils.DIGITS","0123456789abcdef".split(""),void 0);
function F(a,b){function c(f,h){f=f?String(f):"";return h?"0000000".slice(f.length)+f:f}if(2097151>=b)return""+D(a,b);var d=(a>>>24|b<<8)>>>0&16777215;b=b>>16&65535;a=(a&16777215)+6777216*d+6710656*b;d+=8147497*b;b*=2;1E7<=a&&(d+=Math.floor(a/1E7),a%=1E7);1E7<=d&&(b+=Math.floor(d/1E7),d%=1E7);return c(b,0)+c(d,b)+c(a,1)}g("jspb.utils.joinUnsignedDecimalString",F,void 0);function G(a,b){var c=b&2147483648;c&&(a=~a+1>>>0,b=~b+(0==a?1:0)>>>0);a=F(a,b);return c?"-"+a:a}
g("jspb.utils.joinSignedDecimalString",G,void 0);function Qa(a,b){C(a);a=y;var c=z;return b?G(a,c):F(a,c)}g("jspb.utils.hash64ToDecimalString",Qa,void 0);g("jspb.utils.hash64ArrayToDecimalStrings",function(a,b){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]=Qa(a[d],b);return c},void 0);
function H(a){function b(m,t){for(var B=0;8>B&&(1!==m||0<t);B++)t=m*f[B]+t,f[B]=t&255,t>>>=8}function c(){for(var m=0;8>m;m++)f[m]=~f[m]&255}n(0<a.length);var d=!1;"-"===a[0]&&(d=!0,a=a.slice(1));for(var f=[0,0,0,0,0,0,0,0],h=0;h<a.length;h++)b(10,a.charCodeAt(h)-48);d&&(c(),b(1,1));return xa(f)}g("jspb.utils.decimalStringToHash64",H,void 0);g("jspb.utils.splitDecimalString",function(a){C(H(a))},void 0);function Ra(a){return String.fromCharCode(10>a?48+a:87+a)}
function Sa(a){return 97<=a?a-97+10:a-48}g("jspb.utils.hash64ToHexString",function(a){var b=Array(18);b[0]="0";b[1]="x";for(var c=0;8>c;c++){var d=a.charCodeAt(7-c);b[2*c+2]=Ra(d>>4);b[2*c+3]=Ra(d&15)}return b.join("")},void 0);g("jspb.utils.hexStringToHash64",function(a){a=a.toLowerCase();n(18==a.length);n("0"==a[0]);n("x"==a[1]);for(var b="",c=0;8>c;c++)b=String.fromCharCode(16*Sa(a.charCodeAt(2*c+2))+Sa(a.charCodeAt(2*c+3)))+b;return b},void 0);
g("jspb.utils.hash64ToNumber",function(a,b){C(a);a=y;var c=z;return b?E(a,c):D(a,c)},void 0);g("jspb.utils.numberToHash64",function(a){A(a);return Pa(y,z)},void 0);g("jspb.utils.countVarints",function(a,b,c){for(var d=0,f=b;f<c;f++)d+=a[f]>>7;return c-b-d},void 0);
g("jspb.utils.countVarintFields",function(a,b,c,d){var f=0;d*=8;if(128>d)for(;b<c&&a[b++]==d;)for(f++;;){var h=a[b++];if(0==(h&128))break}else for(;b<c;){for(h=d;128<h;){if(a[b]!=(h&127|128))return f;b++;h>>=7}if(a[b++]!=h)break;for(f++;h=a[b++],0!=(h&128););}return f},void 0);function Ta(a,b,c,d,f){var h=0;if(128>d)for(;b<c&&a[b++]==d;)h++,b+=f;else for(;b<c;){for(var m=d;128<m;){if(a[b++]!=(m&127|128))return h;m>>=7}if(a[b++]!=m)break;h++;b+=f}return h}
g("jspb.utils.countFixed32Fields",function(a,b,c,d){return Ta(a,b,c,8*d+5,4)},void 0);g("jspb.utils.countFixed64Fields",function(a,b,c,d){return Ta(a,b,c,8*d+1,8)},void 0);g("jspb.utils.countDelimitedFields",function(a,b,c,d){var f=0;for(d=8*d+2;b<c;){for(var h=d;128<h;){if(a[b++]!=(h&127|128))return f;h>>=7}if(a[b++]!=h)break;f++;for(var m=0,t=1;h=a[b++],m+=(h&127)*t,t*=128,0!=(h&128););b+=m}return f},void 0);
g("jspb.utils.debugBytesToTextFormat",function(a){var b='"';if(a){a=Ua(a);for(var c=0;c<a.length;c++)b+="\\x",16>a[c]&&(b+="0"),b+=a[c].toString(16)}return b+'"'},void 0);
g("jspb.utils.debugScalarToTextFormat",function(a){if("string"===typeof a){a=String(a);for(var b=['"'],c=0;c<a.length;c++){var d=a.charAt(c),f=d.charCodeAt(0),h=c+1,m;if(!(m=ya[d])){if(!(31<f&&127>f))if(f=d,f in za)d=za[f];else if(f in ya)d=za[f]=ya[f];else{m=f.charCodeAt(0);if(31<m&&127>m)d=f;else{if(256>m){if(d="\\x",16>m||256<m)d+="0"}else d="\\u",4096>m&&(d+="0");d+=m.toString(16).toUpperCase()}d=za[f]=d}m=d}b[h]=m}b.push('"');a=b.join("")}else a=a.toString();return a},void 0);
g("jspb.utils.stringToByteArray",function(a){for(var b=new Uint8Array(a.length),c=0;c<a.length;c++){var d=a.charCodeAt(c);if(255<d)throw Error("Conversion error: string contains codepoint outside of byte range");b[c]=d}return b},void 0);
function Ua(a){if(a.constructor===Uint8Array)return a;if(a.constructor===ArrayBuffer)return new Uint8Array(a);if(a.constructor===Array)return new Uint8Array(a);if(a.constructor===String)return Da(a);if(a instanceof Uint8Array)return new Uint8Array(a.buffer,a.byteOffset,a.byteLength);p("Type not convertible to Uint8Array.");return new Uint8Array(0)}g("jspb.utils.byteSourceToUint8Array",Ua,void 0);function I(a,b,c){this.b=null;this.a=this.c=this.h=0;this.v=!1;a&&this.H(a,b,c)}g("jspb.BinaryDecoder",I,void 0);var Va=[];I.getInstanceCacheLength=function(){return Va.length};function Wa(a,b,c){if(Va.length){var d=Va.pop();a&&d.H(a,b,c);return d}return new I(a,b,c)}I.alloc=Wa;I.prototype.Ca=function(){this.clear();100>Va.length&&Va.push(this)};I.prototype.free=I.prototype.Ca;I.prototype.clone=function(){return Wa(this.b,this.h,this.c-this.h)};I.prototype.clone=I.prototype.clone;
I.prototype.clear=function(){this.b=null;this.a=this.c=this.h=0;this.v=!1};I.prototype.clear=I.prototype.clear;I.prototype.Y=function(){return this.b};I.prototype.getBuffer=I.prototype.Y;I.prototype.H=function(a,b,c){this.b=Ua(a);this.h=void 0!==b?b:0;this.c=void 0!==c?this.h+c:this.b.length;this.a=this.h};I.prototype.setBlock=I.prototype.H;I.prototype.Db=function(){return this.c};I.prototype.getEnd=I.prototype.Db;I.prototype.setEnd=function(a){this.c=a};I.prototype.setEnd=I.prototype.setEnd;
I.prototype.reset=function(){this.a=this.h};I.prototype.reset=I.prototype.reset;I.prototype.B=function(){return this.a};I.prototype.getCursor=I.prototype.B;I.prototype.Ma=function(a){this.a=a};I.prototype.setCursor=I.prototype.Ma;I.prototype.advance=function(a){this.a+=a;n(this.a<=this.c)};I.prototype.advance=I.prototype.advance;I.prototype.ya=function(){return this.a==this.c};I.prototype.atEnd=I.prototype.ya;I.prototype.Qb=function(){return this.a>this.c};I.prototype.pastEnd=I.prototype.Qb;
I.prototype.getError=function(){return this.v||0>this.a||this.a>this.c};I.prototype.getError=I.prototype.getError;I.prototype.w=function(a){for(var b=128,c=0,d=0,f=0;4>f&&128<=b;f++)b=this.b[this.a++],c|=(b&127)<<7*f;128<=b&&(b=this.b[this.a++],c|=(b&127)<<28,d|=(b&127)>>4);if(128<=b)for(f=0;5>f&&128<=b;f++)b=this.b[this.a++],d|=(b&127)<<7*f+3;if(128>b)return a(c>>>0,d>>>0);p("Failed to read varint, encoding is invalid.");this.v=!0};I.prototype.readSplitVarint64=I.prototype.w;
I.prototype.ea=function(a){return this.w(function(b,c){return Ma(b,c,a)})};I.prototype.readSplitZigzagVarint64=I.prototype.ea;I.prototype.ta=function(a){var b=this.b,c=this.a;this.a+=8;for(var d=0,f=0,h=c+7;h>=c;h--)d=d<<8|b[h],f=f<<8|b[h+4];return a(d,f)};I.prototype.readSplitFixed64=I.prototype.ta;I.prototype.kb=function(){for(;this.b[this.a]&128;)this.a++;this.a++};I.prototype.skipVarint=I.prototype.kb;I.prototype.mb=function(a){for(;128<a;)this.a--,a>>>=7;this.a--};I.prototype.unskipVarint=I.prototype.mb;
I.prototype.o=function(){var a=this.b;var b=a[this.a];var c=b&127;if(128>b)return this.a+=1,n(this.a<=this.c),c;b=a[this.a+1];c|=(b&127)<<7;if(128>b)return this.a+=2,n(this.a<=this.c),c;b=a[this.a+2];c|=(b&127)<<14;if(128>b)return this.a+=3,n(this.a<=this.c),c;b=a[this.a+3];c|=(b&127)<<21;if(128>b)return this.a+=4,n(this.a<=this.c),c;b=a[this.a+4];c|=(b&15)<<28;if(128>b)return this.a+=5,n(this.a<=this.c),c>>>0;this.a+=5;128<=a[this.a++]&&128<=a[this.a++]&&128<=a[this.a++]&&128<=a[this.a++]&&128<=
a[this.a++]&&n(!1);n(this.a<=this.c);return c};I.prototype.readUnsignedVarint32=I.prototype.o;I.prototype.da=function(){return~~this.o()};I.prototype.readSignedVarint32=I.prototype.da;I.prototype.O=function(){return this.o().toString()};I.prototype.Ea=function(){return this.da().toString()};I.prototype.readSignedVarint32String=I.prototype.Ea;I.prototype.Ia=function(){var a=this.o();return a>>>1^-(a&1)};I.prototype.readZigzagVarint32=I.prototype.Ia;I.prototype.Ga=function(){return this.w(D)};
I.prototype.readUnsignedVarint64=I.prototype.Ga;I.prototype.Ha=function(){return this.w(F)};I.prototype.readUnsignedVarint64String=I.prototype.Ha;I.prototype.sa=function(){return this.w(E)};I.prototype.readSignedVarint64=I.prototype.sa;I.prototype.Fa=function(){return this.w(G)};I.prototype.readSignedVarint64String=I.prototype.Fa;I.prototype.Ja=function(){return this.w(Ka)};I.prototype.readZigzagVarint64=I.prototype.Ja;I.prototype.fb=function(){return this.ea(Pa)};
I.prototype.readZigzagVarintHash64=I.prototype.fb;I.prototype.Ka=function(){return this.ea(G)};I.prototype.readZigzagVarint64String=I.prototype.Ka;I.prototype.Gc=function(){var a=this.b[this.a];this.a+=1;n(this.a<=this.c);return a};I.prototype.readUint8=I.prototype.Gc;I.prototype.Ec=function(){var a=this.b[this.a],b=this.b[this.a+1];this.a+=2;n(this.a<=this.c);return a<<0|b<<8};I.prototype.readUint16=I.prototype.Ec;
I.prototype.m=function(){var a=this.b[this.a],b=this.b[this.a+1],c=this.b[this.a+2],d=this.b[this.a+3];this.a+=4;n(this.a<=this.c);return(a<<0|b<<8|c<<16|d<<24)>>>0};I.prototype.readUint32=I.prototype.m;I.prototype.ga=function(){var a=this.m(),b=this.m();return D(a,b)};I.prototype.readUint64=I.prototype.ga;I.prototype.ha=function(){var a=this.m(),b=this.m();return F(a,b)};I.prototype.readUint64String=I.prototype.ha;
I.prototype.Xb=function(){var a=this.b[this.a];this.a+=1;n(this.a<=this.c);return a<<24>>24};I.prototype.readInt8=I.prototype.Xb;I.prototype.Vb=function(){var a=this.b[this.a],b=this.b[this.a+1];this.a+=2;n(this.a<=this.c);return(a<<0|b<<8)<<16>>16};I.prototype.readInt16=I.prototype.Vb;I.prototype.P=function(){var a=this.b[this.a],b=this.b[this.a+1],c=this.b[this.a+2],d=this.b[this.a+3];this.a+=4;n(this.a<=this.c);return a<<0|b<<8|c<<16|d<<24};I.prototype.readInt32=I.prototype.P;
I.prototype.ba=function(){var a=this.m(),b=this.m();return E(a,b)};I.prototype.readInt64=I.prototype.ba;I.prototype.ca=function(){var a=this.m(),b=this.m();return G(a,b)};I.prototype.readInt64String=I.prototype.ca;I.prototype.aa=function(){var a=this.m();return Na(a,0)};I.prototype.readFloat=I.prototype.aa;I.prototype.Z=function(){var a=this.m(),b=this.m();return Oa(a,b)};I.prototype.readDouble=I.prototype.Z;I.prototype.pa=function(){return!!this.b[this.a++]};I.prototype.readBool=I.prototype.pa;
I.prototype.ra=function(){return this.da()};I.prototype.readEnum=I.prototype.ra;
I.prototype.fa=function(a){var b=this.b,c=this.a;a=c+a;for(var d=[],f="";c<a;){var h=b[c++];if(128>h)d.push(h);else if(192>h)continue;else if(224>h){var m=b[c++];d.push((h&31)<<6|m&63)}else if(240>h){m=b[c++];var t=b[c++];d.push((h&15)<<12|(m&63)<<6|t&63)}else if(248>h){m=b[c++];t=b[c++];var B=b[c++];h=(h&7)<<18|(m&63)<<12|(t&63)<<6|B&63;h-=65536;d.push((h>>10&1023)+55296,(h&1023)+56320)}8192<=d.length&&(f+=String.fromCharCode.apply(null,d),d.length=0)}f+=xa(d);this.a=c;return f};
I.prototype.readString=I.prototype.fa;I.prototype.Dc=function(){var a=this.o();return this.fa(a)};I.prototype.readStringWithLength=I.prototype.Dc;I.prototype.qa=function(a){if(0>a||this.a+a>this.b.length)return this.v=!0,p("Invalid byte length!"),new Uint8Array(0);var b=this.b.subarray(this.a,this.a+a);this.a+=a;n(this.a<=this.c);return b};I.prototype.readBytes=I.prototype.qa;I.prototype.ia=function(){return this.w(Pa)};I.prototype.readVarintHash64=I.prototype.ia;
I.prototype.$=function(){var a=this.b,b=this.a,c=a[b],d=a[b+1],f=a[b+2],h=a[b+3],m=a[b+4],t=a[b+5],B=a[b+6];a=a[b+7];this.a+=8;return String.fromCharCode(c,d,f,h,m,t,B,a)};I.prototype.readFixedHash64=I.prototype.$;function J(a,b,c){this.a=Wa(a,b,c);this.O=this.a.B();this.b=this.c=-1;this.h=!1;this.v=null}g("jspb.BinaryReader",J,void 0);var K=[];J.clearInstanceCache=function(){K=[]};J.getInstanceCacheLength=function(){return K.length};function Xa(a,b,c){if(K.length){var d=K.pop();a&&d.a.H(a,b,c);return d}return new J(a,b,c)}J.alloc=Xa;J.prototype.zb=Xa;J.prototype.alloc=J.prototype.zb;J.prototype.Ca=function(){this.a.clear();this.b=this.c=-1;this.h=!1;this.v=null;100>K.length&&K.push(this)};
J.prototype.free=J.prototype.Ca;J.prototype.Fb=function(){return this.O};J.prototype.getFieldCursor=J.prototype.Fb;J.prototype.B=function(){return this.a.B()};J.prototype.getCursor=J.prototype.B;J.prototype.Y=function(){return this.a.Y()};J.prototype.getBuffer=J.prototype.Y;J.prototype.Hb=function(){return this.c};J.prototype.getFieldNumber=J.prototype.Hb;J.prototype.Lb=function(){return this.b};J.prototype.getWireType=J.prototype.Lb;J.prototype.Mb=function(){return 2==this.b};
J.prototype.isDelimited=J.prototype.Mb;J.prototype.bb=function(){return 4==this.b};J.prototype.isEndGroup=J.prototype.bb;J.prototype.getError=function(){return this.h||this.a.getError()};J.prototype.getError=J.prototype.getError;J.prototype.H=function(a,b,c){this.a.H(a,b,c);this.b=this.c=-1};J.prototype.setBlock=J.prototype.H;J.prototype.reset=function(){this.a.reset();this.b=this.c=-1};J.prototype.reset=J.prototype.reset;J.prototype.advance=function(a){this.a.advance(a)};J.prototype.advance=J.prototype.advance;
J.prototype.oa=function(){if(this.a.ya())return!1;if(this.getError())return p("Decoder hit an error"),!1;this.O=this.a.B();var a=this.a.o(),b=a>>>3;a&=7;if(0!=a&&5!=a&&1!=a&&2!=a&&3!=a&&4!=a)return p("Invalid wire type: %s (at position %s)",a,this.O),this.h=!0,!1;this.c=b;this.b=a;return!0};J.prototype.nextField=J.prototype.oa;J.prototype.Oa=function(){this.a.mb(this.c<<3|this.b)};J.prototype.unskipHeader=J.prototype.Oa;
J.prototype.Lc=function(){var a=this.c;for(this.Oa();this.oa()&&this.c==a;)this.C();this.a.ya()||this.Oa()};J.prototype.skipMatchingFields=J.prototype.Lc;J.prototype.lb=function(){0!=this.b?(p("Invalid wire type for skipVarintField"),this.C()):this.a.kb()};J.prototype.skipVarintField=J.prototype.lb;J.prototype.gb=function(){if(2!=this.b)p("Invalid wire type for skipDelimitedField"),this.C();else{var a=this.a.o();this.a.advance(a)}};J.prototype.skipDelimitedField=J.prototype.gb;
J.prototype.hb=function(){5!=this.b?(p("Invalid wire type for skipFixed32Field"),this.C()):this.a.advance(4)};J.prototype.skipFixed32Field=J.prototype.hb;J.prototype.ib=function(){1!=this.b?(p("Invalid wire type for skipFixed64Field"),this.C()):this.a.advance(8)};J.prototype.skipFixed64Field=J.prototype.ib;J.prototype.jb=function(){var a=this.c;do{if(!this.oa()){p("Unmatched start-group tag: stream EOF");this.h=!0;break}if(4==this.b){this.c!=a&&(p("Unmatched end-group tag"),this.h=!0);break}this.C()}while(1)};
J.prototype.skipGroup=J.prototype.jb;J.prototype.C=function(){switch(this.b){case 0:this.lb();break;case 1:this.ib();break;case 2:this.gb();break;case 5:this.hb();break;case 3:this.jb();break;default:p("Invalid wire encoding for field.")}};J.prototype.skipField=J.prototype.C;J.prototype.Hc=function(a,b){null===this.v&&(this.v={});n(!this.v[a]);this.v[a]=b};J.prototype.registerReadCallback=J.prototype.Hc;J.prototype.Ic=function(a){n(null!==this.v);a=this.v[a];n(a);return a(this)};
J.prototype.runReadCallback=J.prototype.Ic;J.prototype.Yb=function(a,b){n(2==this.b);var c=this.a.c,d=this.a.o();d=this.a.B()+d;this.a.setEnd(d);b(a,this);this.a.Ma(d);this.a.setEnd(c)};J.prototype.readMessage=J.prototype.Yb;J.prototype.Ub=function(a,b,c){n(3==this.b);n(this.c==a);c(b,this);this.h||4==this.b||(p("Group submessage did not end with an END_GROUP tag"),this.h=!0)};J.prototype.readGroup=J.prototype.Ub;
J.prototype.Gb=function(){n(2==this.b);var a=this.a.o(),b=this.a.B(),c=b+a;a=Wa(this.a.Y(),b,a);this.a.Ma(c);return a};J.prototype.getFieldDecoder=J.prototype.Gb;J.prototype.P=function(){n(0==this.b);return this.a.da()};J.prototype.readInt32=J.prototype.P;J.prototype.Wb=function(){n(0==this.b);return this.a.Ea()};J.prototype.readInt32String=J.prototype.Wb;J.prototype.ba=function(){n(0==this.b);return this.a.sa()};J.prototype.readInt64=J.prototype.ba;J.prototype.ca=function(){n(0==this.b);return this.a.Fa()};
J.prototype.readInt64String=J.prototype.ca;J.prototype.m=function(){n(0==this.b);return this.a.o()};J.prototype.readUint32=J.prototype.m;J.prototype.Fc=function(){n(0==this.b);return this.a.O()};J.prototype.readUint32String=J.prototype.Fc;J.prototype.ga=function(){n(0==this.b);return this.a.Ga()};J.prototype.readUint64=J.prototype.ga;J.prototype.ha=function(){n(0==this.b);return this.a.Ha()};J.prototype.readUint64String=J.prototype.ha;J.prototype.zc=function(){n(0==this.b);return this.a.Ia()};
J.prototype.readSint32=J.prototype.zc;J.prototype.Ac=function(){n(0==this.b);return this.a.Ja()};J.prototype.readSint64=J.prototype.Ac;J.prototype.Bc=function(){n(0==this.b);return this.a.Ka()};J.prototype.readSint64String=J.prototype.Bc;J.prototype.Rb=function(){n(5==this.b);return this.a.m()};J.prototype.readFixed32=J.prototype.Rb;J.prototype.Sb=function(){n(1==this.b);return this.a.ga()};J.prototype.readFixed64=J.prototype.Sb;J.prototype.Tb=function(){n(1==this.b);return this.a.ha()};
J.prototype.readFixed64String=J.prototype.Tb;J.prototype.vc=function(){n(5==this.b);return this.a.P()};J.prototype.readSfixed32=J.prototype.vc;J.prototype.wc=function(){n(5==this.b);return this.a.P().toString()};J.prototype.readSfixed32String=J.prototype.wc;J.prototype.xc=function(){n(1==this.b);return this.a.ba()};J.prototype.readSfixed64=J.prototype.xc;J.prototype.yc=function(){n(1==this.b);return this.a.ca()};J.prototype.readSfixed64String=J.prototype.yc;
J.prototype.aa=function(){n(5==this.b);return this.a.aa()};J.prototype.readFloat=J.prototype.aa;J.prototype.Z=function(){n(1==this.b);return this.a.Z()};J.prototype.readDouble=J.prototype.Z;J.prototype.pa=function(){n(0==this.b);return!!this.a.o()};J.prototype.readBool=J.prototype.pa;J.prototype.ra=function(){n(0==this.b);return this.a.sa()};J.prototype.readEnum=J.prototype.ra;J.prototype.fa=function(){n(2==this.b);var a=this.a.o();return this.a.fa(a)};J.prototype.readString=J.prototype.fa;
J.prototype.qa=function(){n(2==this.b);var a=this.a.o();return this.a.qa(a)};J.prototype.readBytes=J.prototype.qa;J.prototype.ia=function(){n(0==this.b);return this.a.ia()};J.prototype.readVarintHash64=J.prototype.ia;J.prototype.Cc=function(){n(0==this.b);return this.a.fb()};J.prototype.readSintHash64=J.prototype.Cc;J.prototype.w=function(a){n(0==this.b);return this.a.w(a)};J.prototype.readSplitVarint64=J.prototype.w;
J.prototype.ea=function(a){n(0==this.b);return this.a.w(function(b,c){return Ma(b,c,a)})};J.prototype.readSplitZigzagVarint64=J.prototype.ea;J.prototype.$=function(){n(1==this.b);return this.a.$()};J.prototype.readFixedHash64=J.prototype.$;J.prototype.ta=function(a){n(1==this.b);return this.a.ta(a)};J.prototype.readSplitFixed64=J.prototype.ta;function L(a,b){n(2==a.b);var c=a.a.o();c=a.a.B()+c;for(var d=[];a.a.B()<c;)d.push(b.call(a.a));return d}J.prototype.gc=function(){return L(this,this.a.da)};
J.prototype.readPackedInt32=J.prototype.gc;J.prototype.hc=function(){return L(this,this.a.Ea)};J.prototype.readPackedInt32String=J.prototype.hc;J.prototype.ic=function(){return L(this,this.a.sa)};J.prototype.readPackedInt64=J.prototype.ic;J.prototype.jc=function(){return L(this,this.a.Fa)};J.prototype.readPackedInt64String=J.prototype.jc;J.prototype.qc=function(){return L(this,this.a.o)};J.prototype.readPackedUint32=J.prototype.qc;J.prototype.rc=function(){return L(this,this.a.O)};
J.prototype.readPackedUint32String=J.prototype.rc;J.prototype.sc=function(){return L(this,this.a.Ga)};J.prototype.readPackedUint64=J.prototype.sc;J.prototype.tc=function(){return L(this,this.a.Ha)};J.prototype.readPackedUint64String=J.prototype.tc;J.prototype.nc=function(){return L(this,this.a.Ia)};J.prototype.readPackedSint32=J.prototype.nc;J.prototype.oc=function(){return L(this,this.a.Ja)};J.prototype.readPackedSint64=J.prototype.oc;J.prototype.pc=function(){return L(this,this.a.Ka)};
J.prototype.readPackedSint64String=J.prototype.pc;J.prototype.bc=function(){return L(this,this.a.m)};J.prototype.readPackedFixed32=J.prototype.bc;J.prototype.cc=function(){return L(this,this.a.ga)};J.prototype.readPackedFixed64=J.prototype.cc;J.prototype.dc=function(){return L(this,this.a.ha)};J.prototype.readPackedFixed64String=J.prototype.dc;J.prototype.kc=function(){return L(this,this.a.P)};J.prototype.readPackedSfixed32=J.prototype.kc;J.prototype.lc=function(){return L(this,this.a.ba)};
J.prototype.readPackedSfixed64=J.prototype.lc;J.prototype.mc=function(){return L(this,this.a.ca)};J.prototype.readPackedSfixed64String=J.prototype.mc;J.prototype.fc=function(){return L(this,this.a.aa)};J.prototype.readPackedFloat=J.prototype.fc;J.prototype.$b=function(){return L(this,this.a.Z)};J.prototype.readPackedDouble=J.prototype.$b;J.prototype.Zb=function(){return L(this,this.a.pa)};J.prototype.readPackedBool=J.prototype.Zb;J.prototype.ac=function(){return L(this,this.a.ra)};
J.prototype.readPackedEnum=J.prototype.ac;J.prototype.uc=function(){return L(this,this.a.ia)};J.prototype.readPackedVarintHash64=J.prototype.uc;J.prototype.ec=function(){return L(this,this.a.$)};J.prototype.readPackedFixedHash64=J.prototype.ec;function Ya(a,b,c,d,f){this.ma=a;this.Ba=b;this.la=c;this.Na=d;this.na=f}g("jspb.ExtensionFieldInfo",Ya,void 0);function Za(a,b,c,d,f,h){this.Za=a;this.za=b;this.Aa=c;this.Wa=d;this.Ab=f;this.Nb=h}g("jspb.ExtensionFieldBinaryInfo",Za,void 0);Ya.prototype.F=function(){return!!this.la};Ya.prototype.isMessageType=Ya.prototype.F;function N(){}g("jspb.Message",N,void 0);N.GENERATE_TO_OBJECT=!0;N.GENERATE_FROM_OBJECT=!0;var $a="function"==typeof Uint8Array;N.prototype.Ib=function(){return this.b};
N.prototype.getJsPbMessageId=N.prototype.Ib;
N.initialize=function(a,b,c,d,f,h){a.f=null;b||(b=c?[c]:[]);a.b=c?String(c):void 0;a.D=0===c?-1:0;a.u=b;a:{c=a.u.length;b=-1;if(c&&(b=c-1,c=a.u[b],!(null===c||"object"!=typeof c||Array.isArray(c)||$a&&c instanceof Uint8Array))){a.G=b-a.D;a.i=c;break a}-1<d?(a.G=Math.max(d,b+1-a.D),a.i=null):a.G=Number.MAX_VALUE}a.a={};if(f)for(d=0;d<f.length;d++)b=f[d],b<a.G?(b+=a.D,a.u[b]=a.u[b]||ab):(bb(a),a.i[b]=a.i[b]||ab);if(h&&h.length)for(d=0;d<h.length;d++)cb(a,h[d])};
var ab=Object.freeze?Object.freeze([]):[];function bb(a){var b=a.G+a.D;a.u[b]||(a.i=a.u[b]={})}function db(a,b,c){for(var d=[],f=0;f<a.length;f++)d[f]=b.call(a[f],c,a[f]);return d}N.toObjectList=db;N.toObjectExtension=function(a,b,c,d,f){for(var h in c){var m=c[h],t=d.call(a,m);if(null!=t){for(var B in m.Ba)if(m.Ba.hasOwnProperty(B))break;b[B]=m.Na?m.na?db(t,m.Na,f):m.Na(f,t):t}}};
N.serializeBinaryExtensions=function(a,b,c,d){for(var f in c){var h=c[f],m=h.Za;if(!h.Aa)throw Error("Message extension present that was generated without binary serialization support");var t=d.call(a,m);if(null!=t)if(m.F())if(h.Wa)h.Aa.call(b,m.ma,t,h.Wa);else throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");else h.Aa.call(b,m.ma,t)}};
N.readBinaryExtension=function(a,b,c,d,f){var h=c[b.c];if(h){c=h.Za;if(!h.za)throw Error("Deserializing extension whose generated code does not support binary format");if(c.F()){var m=new c.la;h.za.call(b,m,h.Ab)}else m=h.za.call(b);c.na&&!h.Nb?(b=d.call(a,c))?b.push(m):f.call(a,c,[m]):f.call(a,c,m)}else b.C()};function O(a,b){if(b<a.G){b+=a.D;var c=a.u[b];return c===ab?a.u[b]=[]:c}if(a.i)return c=a.i[b],c===ab?a.i[b]=[]:c}N.getField=O;N.getRepeatedField=function(a,b){return O(a,b)};
function eb(a,b){a=O(a,b);return null==a?a:+a}N.getOptionalFloatingPointField=eb;function fb(a,b){a=O(a,b);return null==a?a:!!a}N.getBooleanField=fb;N.getRepeatedFloatingPointField=function(a,b){var c=O(a,b);a.a||(a.a={});if(!a.a[b]){for(var d=0;d<c.length;d++)c[d]=+c[d];a.a[b]=!0}return c};N.getRepeatedBooleanField=function(a,b){var c=O(a,b);a.a||(a.a={});if(!a.a[b]){for(var d=0;d<c.length;d++)c[d]=!!c[d];a.a[b]=!0}return c};
function gb(a){if(null==a||"string"===typeof a)return a;if($a&&a instanceof Uint8Array)return Ba(a);p("Cannot coerce to b64 string: "+k(a));return null}N.bytesAsB64=gb;function hb(a){if(null==a||a instanceof Uint8Array)return a;if("string"===typeof a)return Da(a);p("Cannot coerce to Uint8Array: "+k(a));return null}N.bytesAsU8=hb;N.bytesListAsB64=function(a){ib(a);return a.length&&"string"!==typeof a[0]?l(a,gb):a};N.bytesListAsU8=function(a){ib(a);return!a.length||a[0]instanceof Uint8Array?a:l(a,hb)};
function ib(a){if(a&&1<a.length){var b=k(a[0]);qa(a,function(c){k(c)!=b&&p("Inconsistent type in JSPB repeated field array. Got "+k(c)+" expected "+b)})}}function jb(a,b,c){a=O(a,b);return null==a?c:a}N.getFieldWithDefault=jb;N.getBooleanFieldWithDefault=function(a,b,c){a=fb(a,b);return null==a?c:a};N.getFloatingPointFieldWithDefault=function(a,b,c){a=eb(a,b);return null==a?c:a};N.getFieldProto3=jb;
N.getMapField=function(a,b,c,d){a.f||(a.f={});if(b in a.f)return a.f[b];var f=O(a,b);if(!f){if(c)return;f=[];P(a,b,f)}return a.f[b]=new r(f,d)};function P(a,b,c){q(a,N);b<a.G?a.u[b+a.D]=c:(bb(a),a.i[b]=c);return a}N.setField=P;N.setProto3IntField=function(a,b,c){return Q(a,b,c,0)};N.setProto3FloatField=function(a,b,c){return Q(a,b,c,0)};N.setProto3BooleanField=function(a,b,c){return Q(a,b,c,!1)};N.setProto3StringField=function(a,b,c){return Q(a,b,c,"")};
N.setProto3BytesField=function(a,b,c){return Q(a,b,c,"")};N.setProto3EnumField=function(a,b,c){return Q(a,b,c,0)};N.setProto3StringIntField=function(a,b,c){return Q(a,b,c,"0")};function Q(a,b,c,d){q(a,N);c!==d?P(a,b,c):b<a.G?a.u[b+a.D]=null:(bb(a),delete a.i[b]);return a}N.addToRepeatedField=function(a,b,c,d){q(a,N);b=O(a,b);void 0!=d?b.splice(d,0,c):b.push(c);return a};function kb(a,b,c,d){q(a,N);(c=cb(a,c))&&c!==b&&void 0!==d&&(a.f&&c in a.f&&(a.f[c]=void 0),P(a,c,void 0));return P(a,b,d)}
N.setOneofField=kb;function cb(a,b){for(var c,d,f=0;f<b.length;f++){var h=b[f],m=O(a,h);null!=m&&(c=h,d=m,P(a,h,void 0))}return c?(P(a,c,d),c):0}N.computeOneofCase=cb;N.getWrapperField=function(a,b,c,d){a.f||(a.f={});if(!a.f[c]){var f=O(a,c);if(d||f)a.f[c]=new b(f)}return a.f[c]};N.getRepeatedWrapperField=function(a,b,c){lb(a,b,c);b=a.f[c];b==ab&&(b=a.f[c]=[]);return b};function lb(a,b,c){a.f||(a.f={});if(!a.f[c]){for(var d=O(a,c),f=[],h=0;h<d.length;h++)f[h]=new b(d[h]);a.f[c]=f}}
N.setWrapperField=function(a,b,c){q(a,N);a.f||(a.f={});var d=c?c.g():c;a.f[b]=c;return P(a,b,d)};N.setOneofWrapperField=function(a,b,c,d){q(a,N);a.f||(a.f={});var f=d?d.g():d;a.f[b]=d;return kb(a,b,c,f)};N.setRepeatedWrapperField=function(a,b,c){q(a,N);a.f||(a.f={});c=c||[];for(var d=[],f=0;f<c.length;f++)d[f]=c[f].g();a.f[b]=c;return P(a,b,d)};
N.addToRepeatedWrapperField=function(a,b,c,d,f){lb(a,d,b);var h=a.f[b];h||(h=a.f[b]=[]);c=c?c:new d;a=O(a,b);void 0!=f?(h.splice(f,0,c),a.splice(f,0,c.g())):(h.push(c),a.push(c.g()));return c};N.toMap=function(a,b,c,d){for(var f={},h=0;h<a.length;h++)f[b.call(a[h])]=c?c.call(a[h],d,a[h]):a[h];return f};function mb(a){if(a.f)for(var b in a.f){var c=a.f[b];if(Array.isArray(c))for(var d=0;d<c.length;d++)c[d]&&c[d].g();else c&&c.g()}}N.prototype.g=function(){mb(this);return this.u};
N.prototype.toArray=N.prototype.g;N.prototype.toString=function(){mb(this);return this.u.toString()};N.prototype.getExtension=function(a){if(this.i){this.f||(this.f={});var b=a.ma;if(a.na){if(a.F())return this.f[b]||(this.f[b]=l(this.i[b]||[],function(c){return new a.la(c)})),this.f[b]}else if(a.F())return!this.f[b]&&this.i[b]&&(this.f[b]=new a.la(this.i[b])),this.f[b];return this.i[b]}};N.prototype.getExtension=N.prototype.getExtension;
N.prototype.Kc=function(a,b){this.f||(this.f={});bb(this);var c=a.ma;a.na?(b=b||[],a.F()?(this.f[c]=b,this.i[c]=l(b,function(d){return d.g()})):this.i[c]=b):a.F()?(this.f[c]=b,this.i[c]=b?b.g():b):this.i[c]=b;return this};N.prototype.setExtension=N.prototype.Kc;N.difference=function(a,b){if(!(a instanceof b.constructor))throw Error("Messages have different types.");var c=a.g();b=b.g();var d=[],f=0,h=c.length>b.length?c.length:b.length;a.b&&(d[0]=a.b,f=1);for(;f<h;f++)nb(c[f],b[f])||(d[f]=b[f]);return new a.constructor(d)};
N.equals=function(a,b){return a==b||!(!a||!b)&&a instanceof b.constructor&&nb(a.g(),b.g())};function ob(a,b){a=a||{};b=b||{};var c={},d;for(d in a)c[d]=0;for(d in b)c[d]=0;for(d in c)if(!nb(a[d],b[d]))return!1;return!0}N.compareExtensions=ob;
function nb(a,b){if(a==b)return!0;if(!la(a)||!la(b))return"number"===typeof a&&isNaN(a)||"number"===typeof b&&isNaN(b)?String(a)==String(b):!1;if(a.constructor!=b.constructor)return!1;if($a&&a.constructor===Uint8Array){if(a.length!=b.length)return!1;for(var c=0;c<a.length;c++)if(a[c]!=b[c])return!1;return!0}if(a.constructor===Array){var d=void 0,f=void 0,h=Math.max(a.length,b.length);for(c=0;c<h;c++){var m=a[c],t=b[c];m&&m.constructor==Object&&(n(void 0===d),n(c===a.length-1),d=m,m=void 0);t&&t.constructor==
Object&&(n(void 0===f),n(c===b.length-1),f=t,t=void 0);if(!nb(m,t))return!1}return d||f?(d=d||{},f=f||{},ob(d,f)):!0}if(a.constructor===Object)return ob(a,b);throw Error("Invalid type in JSPB array");}N.compareFields=nb;N.prototype.Bb=function(){return pb(this)};N.prototype.cloneMessage=N.prototype.Bb;N.prototype.clone=function(){return pb(this)};N.prototype.clone=N.prototype.clone;N.clone=function(a){return pb(a)};function pb(a){return new a.constructor(qb(a.g()))}
N.copyInto=function(a,b){q(a,N);q(b,N);n(a.constructor==b.constructor,"Copy source and target message should have the same type.");a=pb(a);for(var c=b.g(),d=a.g(),f=c.length=0;f<d.length;f++)c[f]=d[f];b.f=a.f;b.i=a.i};function qb(a){if(Array.isArray(a)){for(var b=Array(a.length),c=0;c<a.length;c++){var d=a[c];null!=d&&(b[c]="object"==typeof d?qb(n(d)):d)}return b}if($a&&a instanceof Uint8Array)return new Uint8Array(a);b={};for(c in a)d=a[c],null!=d&&(b[c]="object"==typeof d?qb(n(d)):d);return b}
N.registerMessageType=function(a,b){b.we=a};var R={dump:function(a){q(a,N,"jspb.Message instance expected");n(a.getExtension,"Only unobfuscated and unoptimized compilation modes supported.");return R.X(a)}};g("jspb.debug.dump",R.dump,void 0);
R.X=function(a){var b=k(a);if("number"==b||"string"==b||"boolean"==b||"null"==b||"undefined"==b||"undefined"!==typeof Uint8Array&&a instanceof Uint8Array)return a;if("array"==b)return ua(a),l(a,R.X);if(a instanceof r){var c={};a=a.entries();for(var d=a.next();!d.done;d=a.next())c[d.value[0]]=R.X(d.value[1]);return c}q(a,N,"Only messages expected: "+a);b=a.constructor;var f={$name:b.name||b.displayName};for(t in b.prototype){var h=/^get([A-Z]\w*)/.exec(t);if(h&&"getExtension"!=t&&"getJsPbMessageId"!=
t){var m="has"+h[1];if(!a[m]||a[m]())m=a[t](),f[R.$a(h[1])]=R.X(m)}}if(a.extensionObject_)return f.$extensions="Recursive dumping of extensions not supported in compiled code. Switch to uncompiled or dump extension object directly",f;for(d in b.extensions)if(/^\d+$/.test(d)){m=b.extensions[d];var t=a.getExtension(m);h=void 0;m=m.Ba;var B=[],M=0;for(h in m)B[M++]=h;h=B[0];null!=t&&(c||(c=f.$extensions={}),c[R.$a(h)]=R.X(t))}return f};R.$a=function(a){return a.replace(/^[A-Z]/,function(b){return b.toLowerCase()})};function S(){this.a=[]}g("jspb.BinaryEncoder",S,void 0);S.prototype.length=function(){return this.a.length};S.prototype.length=S.prototype.length;S.prototype.end=function(){var a=this.a;this.a=[];return a};S.prototype.end=S.prototype.end;S.prototype.l=function(a,b){n(a==Math.floor(a));n(b==Math.floor(b));n(0<=a&&4294967296>a);for(n(0<=b&&4294967296>b);0<b||127<a;)this.a.push(a&127|128),a=(a>>>7|b<<25)>>>0,b>>>=7;this.a.push(a)};S.prototype.writeSplitVarint64=S.prototype.l;
S.prototype.A=function(a,b){n(a==Math.floor(a));n(b==Math.floor(b));n(0<=a&&4294967296>a);n(0<=b&&4294967296>b);this.s(a);this.s(b)};S.prototype.writeSplitFixed64=S.prototype.A;S.prototype.j=function(a){n(a==Math.floor(a));for(n(0<=a&&4294967296>a);127<a;)this.a.push(a&127|128),a>>>=7;this.a.push(a)};S.prototype.writeUnsignedVarint32=S.prototype.j;S.prototype.M=function(a){n(a==Math.floor(a));n(-2147483648<=a&&2147483648>a);if(0<=a)this.j(a);else{for(var b=0;9>b;b++)this.a.push(a&127|128),a>>=7;this.a.push(1)}};
S.prototype.writeSignedVarint32=S.prototype.M;S.prototype.va=function(a){n(a==Math.floor(a));n(0<=a&&1.8446744073709552E19>a);A(a);this.l(y,z)};S.prototype.writeUnsignedVarint64=S.prototype.va;S.prototype.ua=function(a){n(a==Math.floor(a));n(-9223372036854775808<=a&&0x7fffffffffffffff>a);A(a);this.l(y,z)};S.prototype.writeSignedVarint64=S.prototype.ua;S.prototype.wa=function(a){n(a==Math.floor(a));n(-2147483648<=a&&2147483648>a);this.j((a<<1^a>>31)>>>0)};S.prototype.writeZigzagVarint32=S.prototype.wa;
S.prototype.xa=function(a){n(a==Math.floor(a));n(-9223372036854775808<=a&&0x7fffffffffffffff>a);Ga(a);this.l(y,z)};S.prototype.writeZigzagVarint64=S.prototype.xa;S.prototype.Ta=function(a){this.W(H(a))};S.prototype.writeZigzagVarint64String=S.prototype.Ta;S.prototype.W=function(a){var b=this;C(a);Ja(y,z,function(c,d){b.l(c>>>0,d>>>0)})};S.prototype.writeZigzagVarintHash64=S.prototype.W;S.prototype.be=function(a){n(a==Math.floor(a));n(0<=a&&256>a);this.a.push(a>>>0&255)};S.prototype.writeUint8=S.prototype.be;
S.prototype.ae=function(a){n(a==Math.floor(a));n(0<=a&&65536>a);this.a.push(a>>>0&255);this.a.push(a>>>8&255)};S.prototype.writeUint16=S.prototype.ae;S.prototype.s=function(a){n(a==Math.floor(a));n(0<=a&&4294967296>a);this.a.push(a>>>0&255);this.a.push(a>>>8&255);this.a.push(a>>>16&255);this.a.push(a>>>24&255)};S.prototype.writeUint32=S.prototype.s;S.prototype.V=function(a){n(a==Math.floor(a));n(0<=a&&1.8446744073709552E19>a);Fa(a);this.s(y);this.s(z)};S.prototype.writeUint64=S.prototype.V;
S.prototype.Qc=function(a){n(a==Math.floor(a));n(-128<=a&&128>a);this.a.push(a>>>0&255)};S.prototype.writeInt8=S.prototype.Qc;S.prototype.Pc=function(a){n(a==Math.floor(a));n(-32768<=a&&32768>a);this.a.push(a>>>0&255);this.a.push(a>>>8&255)};S.prototype.writeInt16=S.prototype.Pc;S.prototype.S=function(a){n(a==Math.floor(a));n(-2147483648<=a&&2147483648>a);this.a.push(a>>>0&255);this.a.push(a>>>8&255);this.a.push(a>>>16&255);this.a.push(a>>>24&255)};S.prototype.writeInt32=S.prototype.S;
S.prototype.T=function(a){n(a==Math.floor(a));n(-9223372036854775808<=a&&0x7fffffffffffffff>a);A(a);this.A(y,z)};S.prototype.writeInt64=S.prototype.T;S.prototype.ka=function(a){n(a==Math.floor(a));n(-9223372036854775808<=+a&&0x7fffffffffffffff>+a);C(H(a));this.A(y,z)};S.prototype.writeInt64String=S.prototype.ka;S.prototype.L=function(a){n(Infinity===a||-Infinity===a||isNaN(a)||-3.4028234663852886E38<=a&&3.4028234663852886E38>=a);Ha(a);this.s(y)};S.prototype.writeFloat=S.prototype.L;
S.prototype.J=function(a){n(Infinity===a||-Infinity===a||isNaN(a)||-1.7976931348623157E308<=a&&1.7976931348623157E308>=a);Ia(a);this.s(y);this.s(z)};S.prototype.writeDouble=S.prototype.J;S.prototype.I=function(a){n("boolean"===typeof a||"number"===typeof a);this.a.push(a?1:0)};S.prototype.writeBool=S.prototype.I;S.prototype.R=function(a){n(a==Math.floor(a));n(-2147483648<=a&&2147483648>a);this.M(a)};S.prototype.writeEnum=S.prototype.R;S.prototype.ja=function(a){this.a.push.apply(this.a,a)};
S.prototype.writeBytes=S.prototype.ja;S.prototype.N=function(a){C(a);this.l(y,z)};S.prototype.writeVarintHash64=S.prototype.N;S.prototype.K=function(a){C(a);this.s(y);this.s(z)};S.prototype.writeFixedHash64=S.prototype.K;
S.prototype.U=function(a){var b=this.a.length;ta(a);for(var c=0;c<a.length;c++){var d=a.charCodeAt(c);if(128>d)this.a.push(d);else if(2048>d)this.a.push(d>>6|192),this.a.push(d&63|128);else if(65536>d)if(55296<=d&&56319>=d&&c+1<a.length){var f=a.charCodeAt(c+1);56320<=f&&57343>=f&&(d=1024*(d-55296)+f-56320+65536,this.a.push(d>>18|240),this.a.push(d>>12&63|128),this.a.push(d>>6&63|128),this.a.push(d&63|128),c++)}else this.a.push(d>>12|224),this.a.push(d>>6&63|128),this.a.push(d&63|128)}return this.a.length-
b};S.prototype.writeString=S.prototype.U;function T(a,b){this.lo=a;this.hi=b}g("jspb.arith.UInt64",T,void 0);T.prototype.cmp=function(a){return this.hi<a.hi||this.hi==a.hi&&this.lo<a.lo?-1:this.hi==a.hi&&this.lo==a.lo?0:1};T.prototype.cmp=T.prototype.cmp;T.prototype.La=function(){return new T((this.lo>>>1|(this.hi&1)<<31)>>>0,this.hi>>>1>>>0)};T.prototype.rightShift=T.prototype.La;T.prototype.Da=function(){return new T(this.lo<<1>>>0,(this.hi<<1|this.lo>>>31)>>>0)};T.prototype.leftShift=T.prototype.Da;
T.prototype.cb=function(){return!!(this.hi&2147483648)};T.prototype.msb=T.prototype.cb;T.prototype.Ob=function(){return!!(this.lo&1)};T.prototype.lsb=T.prototype.Ob;T.prototype.Ua=function(){return 0==this.lo&&0==this.hi};T.prototype.zero=T.prototype.Ua;T.prototype.add=function(a){return new T((this.lo+a.lo&4294967295)>>>0>>>0,((this.hi+a.hi&4294967295)>>>0)+(4294967296<=this.lo+a.lo?1:0)>>>0)};T.prototype.add=T.prototype.add;
T.prototype.sub=function(a){return new T((this.lo-a.lo&4294967295)>>>0>>>0,((this.hi-a.hi&4294967295)>>>0)-(0>this.lo-a.lo?1:0)>>>0)};T.prototype.sub=T.prototype.sub;function rb(a,b){var c=a&65535;a>>>=16;var d=b&65535,f=b>>>16;b=c*d+65536*(c*f&65535)+65536*(a*d&65535);for(c=a*f+(c*f>>>16)+(a*d>>>16);4294967296<=b;)b-=4294967296,c+=1;return new T(b>>>0,c>>>0)}T.mul32x32=rb;T.prototype.eb=function(a){var b=rb(this.lo,a);a=rb(this.hi,a);a.hi=a.lo;a.lo=0;return b.add(a)};T.prototype.mul=T.prototype.eb;
T.prototype.Xa=function(a){if(0==a)return[];var b=new T(0,0),c=new T(this.lo,this.hi);a=new T(a,0);for(var d=new T(1,0);!a.cb();)a=a.Da(),d=d.Da();for(;!d.Ua();)0>=a.cmp(c)&&(b=b.add(d),c=c.sub(a)),a=a.La(),d=d.La();return[b,c]};T.prototype.div=T.prototype.Xa;T.prototype.toString=function(){for(var a="",b=this;!b.Ua();){b=b.Xa(10);var c=b[0];a=b[1].lo+a;b=c}""==a&&(a="0");return a};T.prototype.toString=T.prototype.toString;
function U(a){for(var b=new T(0,0),c=new T(0,0),d=0;d<a.length;d++){if("0">a[d]||"9"<a[d])return null;c.lo=parseInt(a[d],10);b=b.eb(10).add(c)}return b}T.fromString=U;T.prototype.clone=function(){return new T(this.lo,this.hi)};T.prototype.clone=T.prototype.clone;function V(a,b){this.lo=a;this.hi=b}g("jspb.arith.Int64",V,void 0);V.prototype.add=function(a){return new V((this.lo+a.lo&4294967295)>>>0>>>0,((this.hi+a.hi&4294967295)>>>0)+(4294967296<=this.lo+a.lo?1:0)>>>0)};V.prototype.add=V.prototype.add;
V.prototype.sub=function(a){return new V((this.lo-a.lo&4294967295)>>>0>>>0,((this.hi-a.hi&4294967295)>>>0)-(0>this.lo-a.lo?1:0)>>>0)};V.prototype.sub=V.prototype.sub;V.prototype.clone=function(){return new V(this.lo,this.hi)};V.prototype.clone=V.prototype.clone;V.prototype.toString=function(){var a=0!=(this.hi&2147483648),b=new T(this.lo,this.hi);a&&(b=(new T(0,0)).sub(b));return(a?"-":"")+b.toString()};V.prototype.toString=V.prototype.toString;
function sb(a){var b=0<a.length&&"-"==a[0];b&&(a=a.substring(1));a=U(a);if(null===a)return null;b&&(a=(new T(0,0)).sub(a));return new V(a.lo,a.hi)}V.fromString=sb;function W(){this.c=[];this.b=0;this.a=new S;this.h=[]}g("jspb.BinaryWriter",W,void 0);function tb(a,b){var c=a.a.end();a.c.push(c);a.c.push(b);a.b+=c.length+b.length}function X(a,b){Y(a,b,2);b=a.a.end();a.c.push(b);a.b+=b.length;b.push(a.b);return b}function Z(a,b){var c=b.pop();c=a.b+a.a.length()-c;for(n(0<=c);127<c;)b.push(c&127|128),c>>>=7,a.b++;b.push(c);a.b++}W.prototype.pb=function(a,b,c){tb(this,a.subarray(b,c))};W.prototype.writeSerializedMessage=W.prototype.pb;
W.prototype.Pb=function(a,b,c){null!=a&&null!=b&&null!=c&&this.pb(a,b,c)};W.prototype.maybeWriteSerializedMessage=W.prototype.Pb;W.prototype.reset=function(){this.c=[];this.a.end();this.b=0;this.h=[]};W.prototype.reset=W.prototype.reset;W.prototype.ab=function(){n(0==this.h.length);for(var a=new Uint8Array(this.b+this.a.length()),b=this.c,c=b.length,d=0,f=0;f<c;f++){var h=b[f];a.set(h,d);d+=h.length}b=this.a.end();a.set(b,d);d+=b.length;n(d==a.length);this.c=[a];return a};
W.prototype.getResultBuffer=W.prototype.ab;W.prototype.Kb=function(a){return Ba(this.ab(),a)};W.prototype.getResultBase64String=W.prototype.Kb;W.prototype.Va=function(a){this.h.push(X(this,a))};W.prototype.beginSubMessage=W.prototype.Va;W.prototype.Ya=function(){n(0<=this.h.length);Z(this,this.h.pop())};W.prototype.endSubMessage=W.prototype.Ya;function Y(a,b,c){n(1<=b&&b==Math.floor(b));a.a.j(8*b+c)}
W.prototype.Nc=function(a,b,c){switch(a){case 1:this.J(b,c);break;case 2:this.L(b,c);break;case 3:this.T(b,c);break;case 4:this.V(b,c);break;case 5:this.S(b,c);break;case 6:this.Qa(b,c);break;case 7:this.Pa(b,c);break;case 8:this.I(b,c);break;case 9:this.U(b,c);break;case 10:p("Group field type not supported in writeAny()");break;case 11:p("Message field type not supported in writeAny()");break;case 12:this.ja(b,c);break;case 13:this.s(b,c);break;case 14:this.R(b,c);break;case 15:this.Ra(b,c);break;
case 16:this.Sa(b,c);break;case 17:this.rb(b,c);break;case 18:this.sb(b,c);break;case 30:this.K(b,c);break;case 31:this.N(b,c);break;default:p("Invalid field type in writeAny()")}};W.prototype.writeAny=W.prototype.Nc;function ub(a,b,c){null!=c&&(Y(a,b,0),a.a.j(c))}function vb(a,b,c){null!=c&&(Y(a,b,0),a.a.M(c))}W.prototype.S=function(a,b){null!=b&&(n(-2147483648<=b&&2147483648>b),vb(this,a,b))};W.prototype.writeInt32=W.prototype.S;
W.prototype.ob=function(a,b){null!=b&&(b=parseInt(b,10),n(-2147483648<=b&&2147483648>b),vb(this,a,b))};W.prototype.writeInt32String=W.prototype.ob;W.prototype.T=function(a,b){null!=b&&(n(-9223372036854775808<=b&&0x7fffffffffffffff>b),null!=b&&(Y(this,a,0),this.a.ua(b)))};W.prototype.writeInt64=W.prototype.T;W.prototype.ka=function(a,b){null!=b&&(b=sb(b),Y(this,a,0),this.a.l(b.lo,b.hi))};W.prototype.writeInt64String=W.prototype.ka;
W.prototype.s=function(a,b){null!=b&&(n(0<=b&&4294967296>b),ub(this,a,b))};W.prototype.writeUint32=W.prototype.s;W.prototype.ub=function(a,b){null!=b&&(b=parseInt(b,10),n(0<=b&&4294967296>b),ub(this,a,b))};W.prototype.writeUint32String=W.prototype.ub;W.prototype.V=function(a,b){null!=b&&(n(0<=b&&1.8446744073709552E19>b),null!=b&&(Y(this,a,0),this.a.va(b)))};W.prototype.writeUint64=W.prototype.V;W.prototype.vb=function(a,b){null!=b&&(b=U(b),Y(this,a,0),this.a.l(b.lo,b.hi))};
W.prototype.writeUint64String=W.prototype.vb;W.prototype.rb=function(a,b){null!=b&&(n(-2147483648<=b&&2147483648>b),null!=b&&(Y(this,a,0),this.a.wa(b)))};W.prototype.writeSint32=W.prototype.rb;W.prototype.sb=function(a,b){null!=b&&(n(-9223372036854775808<=b&&0x7fffffffffffffff>b),null!=b&&(Y(this,a,0),this.a.xa(b)))};W.prototype.writeSint64=W.prototype.sb;W.prototype.$d=function(a,b){null!=b&&null!=b&&(Y(this,a,0),this.a.W(b))};W.prototype.writeSintHash64=W.prototype.$d;
W.prototype.Zd=function(a,b){null!=b&&null!=b&&(Y(this,a,0),this.a.Ta(b))};W.prototype.writeSint64String=W.prototype.Zd;W.prototype.Pa=function(a,b){null!=b&&(n(0<=b&&4294967296>b),Y(this,a,5),this.a.s(b))};W.prototype.writeFixed32=W.prototype.Pa;W.prototype.Qa=function(a,b){null!=b&&(n(0<=b&&1.8446744073709552E19>b),Y(this,a,1),this.a.V(b))};W.prototype.writeFixed64=W.prototype.Qa;W.prototype.nb=function(a,b){null!=b&&(b=U(b),Y(this,a,1),this.a.A(b.lo,b.hi))};W.prototype.writeFixed64String=W.prototype.nb;
W.prototype.Ra=function(a,b){null!=b&&(n(-2147483648<=b&&2147483648>b),Y(this,a,5),this.a.S(b))};W.prototype.writeSfixed32=W.prototype.Ra;W.prototype.Sa=function(a,b){null!=b&&(n(-9223372036854775808<=b&&0x7fffffffffffffff>b),Y(this,a,1),this.a.T(b))};W.prototype.writeSfixed64=W.prototype.Sa;W.prototype.qb=function(a,b){null!=b&&(b=sb(b),Y(this,a,1),this.a.A(b.lo,b.hi))};W.prototype.writeSfixed64String=W.prototype.qb;W.prototype.L=function(a,b){null!=b&&(Y(this,a,5),this.a.L(b))};
W.prototype.writeFloat=W.prototype.L;W.prototype.J=function(a,b){null!=b&&(Y(this,a,1),this.a.J(b))};W.prototype.writeDouble=W.prototype.J;W.prototype.I=function(a,b){null!=b&&(n("boolean"===typeof b||"number"===typeof b),Y(this,a,0),this.a.I(b))};W.prototype.writeBool=W.prototype.I;W.prototype.R=function(a,b){null!=b&&(n(-2147483648<=b&&2147483648>b),Y(this,a,0),this.a.M(b))};W.prototype.writeEnum=W.prototype.R;W.prototype.U=function(a,b){null!=b&&(a=X(this,a),this.a.U(b),Z(this,a))};
W.prototype.writeString=W.prototype.U;W.prototype.ja=function(a,b){null!=b&&(b=Ua(b),Y(this,a,2),this.a.j(b.length),tb(this,b))};W.prototype.writeBytes=W.prototype.ja;W.prototype.Rc=function(a,b,c){null!=b&&(a=X(this,a),c(b,this),Z(this,a))};W.prototype.writeMessage=W.prototype.Rc;W.prototype.Sc=function(a,b,c){null!=b&&(Y(this,1,3),Y(this,2,0),this.a.M(a),a=X(this,3),c(b,this),Z(this,a),Y(this,1,4))};W.prototype.writeMessageSet=W.prototype.Sc;
W.prototype.Oc=function(a,b,c){null!=b&&(Y(this,a,3),c(b,this),Y(this,a,4))};W.prototype.writeGroup=W.prototype.Oc;W.prototype.K=function(a,b){null!=b&&(n(8==b.length),Y(this,a,1),this.a.K(b))};W.prototype.writeFixedHash64=W.prototype.K;W.prototype.N=function(a,b){null!=b&&(n(8==b.length),Y(this,a,0),this.a.N(b))};W.prototype.writeVarintHash64=W.prototype.N;W.prototype.A=function(a,b,c){Y(this,a,1);this.a.A(b,c)};W.prototype.writeSplitFixed64=W.prototype.A;
W.prototype.l=function(a,b,c){Y(this,a,0);this.a.l(b,c)};W.prototype.writeSplitVarint64=W.prototype.l;W.prototype.tb=function(a,b,c){Y(this,a,0);var d=this.a;Ja(b,c,function(f,h){d.l(f>>>0,h>>>0)})};W.prototype.writeSplitZigzagVarint64=W.prototype.tb;W.prototype.Ed=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)vb(this,a,b[c])};W.prototype.writeRepeatedInt32=W.prototype.Ed;W.prototype.Fd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.ob(a,b[c])};
W.prototype.writeRepeatedInt32String=W.prototype.Fd;W.prototype.Gd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++){var d=b[c];null!=d&&(Y(this,a,0),this.a.ua(d))}};W.prototype.writeRepeatedInt64=W.prototype.Gd;W.prototype.Qd=function(a,b,c,d){if(null!=b)for(var f=0;f<b.length;f++)this.A(a,c(b[f]),d(b[f]))};W.prototype.writeRepeatedSplitFixed64=W.prototype.Qd;W.prototype.Rd=function(a,b,c,d){if(null!=b)for(var f=0;f<b.length;f++)this.l(a,c(b[f]),d(b[f]))};
W.prototype.writeRepeatedSplitVarint64=W.prototype.Rd;W.prototype.Sd=function(a,b,c,d){if(null!=b)for(var f=0;f<b.length;f++)this.tb(a,c(b[f]),d(b[f]))};W.prototype.writeRepeatedSplitZigzagVarint64=W.prototype.Sd;W.prototype.Hd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.ka(a,b[c])};W.prototype.writeRepeatedInt64String=W.prototype.Hd;W.prototype.Ud=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)ub(this,a,b[c])};W.prototype.writeRepeatedUint32=W.prototype.Ud;
W.prototype.Vd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.ub(a,b[c])};W.prototype.writeRepeatedUint32String=W.prototype.Vd;W.prototype.Wd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++){var d=b[c];null!=d&&(Y(this,a,0),this.a.va(d))}};W.prototype.writeRepeatedUint64=W.prototype.Wd;W.prototype.Xd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.vb(a,b[c])};W.prototype.writeRepeatedUint64String=W.prototype.Xd;
W.prototype.Md=function(a,b){if(null!=b)for(var c=0;c<b.length;c++){var d=b[c];null!=d&&(Y(this,a,0),this.a.wa(d))}};W.prototype.writeRepeatedSint32=W.prototype.Md;W.prototype.Nd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++){var d=b[c];null!=d&&(Y(this,a,0),this.a.xa(d))}};W.prototype.writeRepeatedSint64=W.prototype.Nd;W.prototype.Od=function(a,b){if(null!=b)for(var c=0;c<b.length;c++){var d=b[c];null!=d&&(Y(this,a,0),this.a.Ta(d))}};W.prototype.writeRepeatedSint64String=W.prototype.Od;
W.prototype.Pd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++){var d=b[c];null!=d&&(Y(this,a,0),this.a.W(d))}};W.prototype.writeRepeatedSintHash64=W.prototype.Pd;W.prototype.yd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.Pa(a,b[c])};W.prototype.writeRepeatedFixed32=W.prototype.yd;W.prototype.zd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.Qa(a,b[c])};W.prototype.writeRepeatedFixed64=W.prototype.zd;
W.prototype.Ad=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.nb(a,b[c])};W.prototype.writeRepeatedFixed64String=W.prototype.Ad;W.prototype.Jd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.Ra(a,b[c])};W.prototype.writeRepeatedSfixed32=W.prototype.Jd;W.prototype.Kd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.Sa(a,b[c])};W.prototype.writeRepeatedSfixed64=W.prototype.Kd;W.prototype.Ld=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.qb(a,b[c])};
W.prototype.writeRepeatedSfixed64String=W.prototype.Ld;W.prototype.Cd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.L(a,b[c])};W.prototype.writeRepeatedFloat=W.prototype.Cd;W.prototype.wd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.J(a,b[c])};W.prototype.writeRepeatedDouble=W.prototype.wd;W.prototype.ud=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.I(a,b[c])};W.prototype.writeRepeatedBool=W.prototype.ud;
W.prototype.xd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.R(a,b[c])};W.prototype.writeRepeatedEnum=W.prototype.xd;W.prototype.Td=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.U(a,b[c])};W.prototype.writeRepeatedString=W.prototype.Td;W.prototype.vd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.ja(a,b[c])};W.prototype.writeRepeatedBytes=W.prototype.vd;W.prototype.Id=function(a,b,c){if(null!=b)for(var d=0;d<b.length;d++){var f=X(this,a);c(b[d],this);Z(this,f)}};
W.prototype.writeRepeatedMessage=W.prototype.Id;W.prototype.Dd=function(a,b,c){if(null!=b)for(var d=0;d<b.length;d++)Y(this,a,3),c(b[d],this),Y(this,a,4)};W.prototype.writeRepeatedGroup=W.prototype.Dd;W.prototype.Bd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.K(a,b[c])};W.prototype.writeRepeatedFixedHash64=W.prototype.Bd;W.prototype.Yd=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.N(a,b[c])};W.prototype.writeRepeatedVarintHash64=W.prototype.Yd;
W.prototype.ad=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++)this.a.M(b[c]);Z(this,a)}};W.prototype.writePackedInt32=W.prototype.ad;W.prototype.bd=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++)this.a.M(parseInt(b[c],10));Z(this,a)}};W.prototype.writePackedInt32String=W.prototype.bd;W.prototype.cd=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++)this.a.ua(b[c]);Z(this,a)}};W.prototype.writePackedInt64=W.prototype.cd;
W.prototype.md=function(a,b,c,d){if(null!=b){a=X(this,a);for(var f=0;f<b.length;f++)this.a.A(c(b[f]),d(b[f]));Z(this,a)}};W.prototype.writePackedSplitFixed64=W.prototype.md;W.prototype.nd=function(a,b,c,d){if(null!=b){a=X(this,a);for(var f=0;f<b.length;f++)this.a.l(c(b[f]),d(b[f]));Z(this,a)}};W.prototype.writePackedSplitVarint64=W.prototype.nd;W.prototype.od=function(a,b,c,d){if(null!=b){a=X(this,a);for(var f=this.a,h=0;h<b.length;h++)Ja(c(b[h]),d(b[h]),function(m,t){f.l(m>>>0,t>>>0)});Z(this,a)}};
W.prototype.writePackedSplitZigzagVarint64=W.prototype.od;W.prototype.dd=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++){var d=sb(b[c]);this.a.l(d.lo,d.hi)}Z(this,a)}};W.prototype.writePackedInt64String=W.prototype.dd;W.prototype.pd=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++)this.a.j(b[c]);Z(this,a)}};W.prototype.writePackedUint32=W.prototype.pd;
W.prototype.qd=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++)this.a.j(parseInt(b[c],10));Z(this,a)}};W.prototype.writePackedUint32String=W.prototype.qd;W.prototype.rd=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++)this.a.va(b[c]);Z(this,a)}};W.prototype.writePackedUint64=W.prototype.rd;W.prototype.sd=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++){var d=U(b[c]);this.a.l(d.lo,d.hi)}Z(this,a)}};
W.prototype.writePackedUint64String=W.prototype.sd;W.prototype.hd=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++)this.a.wa(b[c]);Z(this,a)}};W.prototype.writePackedSint32=W.prototype.hd;W.prototype.jd=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++)this.a.xa(b[c]);Z(this,a)}};W.prototype.writePackedSint64=W.prototype.jd;W.prototype.kd=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++)this.a.W(H(b[c]));Z(this,a)}};
W.prototype.writePackedSint64String=W.prototype.kd;W.prototype.ld=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++)this.a.W(b[c]);Z(this,a)}};W.prototype.writePackedSintHash64=W.prototype.ld;W.prototype.Wc=function(a,b){if(null!=b&&b.length)for(Y(this,a,2),this.a.j(4*b.length),a=0;a<b.length;a++)this.a.s(b[a])};W.prototype.writePackedFixed32=W.prototype.Wc;W.prototype.Xc=function(a,b){if(null!=b&&b.length)for(Y(this,a,2),this.a.j(8*b.length),a=0;a<b.length;a++)this.a.V(b[a])};
W.prototype.writePackedFixed64=W.prototype.Xc;W.prototype.Yc=function(a,b){if(null!=b&&b.length)for(Y(this,a,2),this.a.j(8*b.length),a=0;a<b.length;a++){var c=U(b[a]);this.a.A(c.lo,c.hi)}};W.prototype.writePackedFixed64String=W.prototype.Yc;W.prototype.ed=function(a,b){if(null!=b&&b.length)for(Y(this,a,2),this.a.j(4*b.length),a=0;a<b.length;a++)this.a.S(b[a])};W.prototype.writePackedSfixed32=W.prototype.ed;
W.prototype.fd=function(a,b){if(null!=b&&b.length)for(Y(this,a,2),this.a.j(8*b.length),a=0;a<b.length;a++)this.a.T(b[a])};W.prototype.writePackedSfixed64=W.prototype.fd;W.prototype.gd=function(a,b){if(null!=b&&b.length)for(Y(this,a,2),this.a.j(8*b.length),a=0;a<b.length;a++)this.a.ka(b[a])};W.prototype.writePackedSfixed64String=W.prototype.gd;W.prototype.$c=function(a,b){if(null!=b&&b.length)for(Y(this,a,2),this.a.j(4*b.length),a=0;a<b.length;a++)this.a.L(b[a])};W.prototype.writePackedFloat=W.prototype.$c;
W.prototype.Uc=function(a,b){if(null!=b&&b.length)for(Y(this,a,2),this.a.j(8*b.length),a=0;a<b.length;a++)this.a.J(b[a])};W.prototype.writePackedDouble=W.prototype.Uc;W.prototype.Tc=function(a,b){if(null!=b&&b.length)for(Y(this,a,2),this.a.j(b.length),a=0;a<b.length;a++)this.a.I(b[a])};W.prototype.writePackedBool=W.prototype.Tc;W.prototype.Vc=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++)this.a.R(b[c]);Z(this,a)}};W.prototype.writePackedEnum=W.prototype.Vc;
W.prototype.Zc=function(a,b){if(null!=b&&b.length)for(Y(this,a,2),this.a.j(8*b.length),a=0;a<b.length;a++)this.a.K(b[a])};W.prototype.writePackedFixedHash64=W.prototype.Zc;W.prototype.td=function(a,b){if(null!=b&&b.length){a=X(this,a);for(var c=0;c<b.length;c++)this.a.N(b[c]);Z(this,a)}};W.prototype.writePackedVarintHash64=W.prototype.td; true&&(exports.debug=R,exports.Map=r,exports.Message=N,exports.BinaryReader=J,exports.BinaryWriter=W,exports.ExtensionFieldInfo=Ya,exports.ExtensionFieldBinaryInfo=Za,exports.exportSymbol=ma,exports.inherits=na,exports.object={extend:pa},exports.typeOf=k);


/***/ }),

/***/ 154:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var n;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};function ca(a){a=["object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof __webpack_require__.g&&__webpack_require__.g,a];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}var r=ca(this);
function t(){t=function(){};r.Symbol||(r.Symbol=da)}function ea(a,b){this.a=a;ba(this,"description",{configurable:!0,writable:!0,value:b})}ea.prototype.toString=function(){return this.a};var da=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new ea("jscomp_symbol_"+(c||"")+"_"+b++,c)}var b=0;return a}();
function u(){t();var a=r.Symbol.iterator;a||(a=r.Symbol.iterator=r.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&ba(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return fa(aa(this))}});u=function(){}}function fa(a){u();a={next:a};a[r.Symbol.iterator]=function(){return this};return a}function ha(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}
var ia="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},ja;if("function"==typeof Object.setPrototypeOf)ja=Object.setPrototypeOf;else{var ka;a:{var la={V:!0},ma={};try{ma.__proto__=la;ka=ma.V;break a}catch(a){}ka=!1}ja=ka?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var na=ja;
function oa(a,b){a.prototype=ia(b.prototype);a.prototype.constructor=a;if(na)na(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.O=b.prototype}
function pa(a,b){u();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d}function v(a,b){if(b){var c=r;a=a.split(".");for(var d=0;d<a.length-1;d++){var f=a[d];f in c||(c[f]={});c=c[f]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&ba(c,a,{configurable:!0,writable:!0,value:b})}}
v("Array.prototype.keys",function(a){return a?a:function(){return pa(this,function(b){return b})}});v("Array.prototype.find",function(a){return a?a:function(b,c){a:{var d=this;d instanceof String&&(d=String(d));for(var f=d.length,g=0;g<f;g++){var e=d[g];if(b.call(c,e,g,d)){b=e;break a}}b=void 0}return b}});v("Object.is",function(a){return a?a:function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c}});
v("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var f=d.length;c=c||0;for(0>c&&(c=Math.max(c+f,0));c<f;c++){var g=d[c];if(g===b||Object.is(g,b))return!0}return!1}});
v("Promise",function(a){function b(e){this.b=0;this.c=void 0;this.a=[];var h=this.f();try{e(h.resolve,h.reject)}catch(k){h.reject(k)}}function c(){this.a=null}function d(e){return e instanceof b?e:new b(function(h){h(e)})}if(a)return a;c.prototype.b=function(e){if(null==this.a){this.a=[];var h=this;this.c(function(){h.g()})}this.a.push(e)};var f=r.setTimeout;c.prototype.c=function(e){f(e,0)};c.prototype.g=function(){for(;this.a&&this.a.length;){var e=this.a;this.a=[];for(var h=0;h<e.length;++h){var k=
e[h];e[h]=null;try{k()}catch(l){this.f(l)}}}this.a=null};c.prototype.f=function(e){this.c(function(){throw e;})};b.prototype.f=function(){function e(l){return function(m){k||(k=!0,l.call(h,m))}}var h=this,k=!1;return{resolve:e(this.s),reject:e(this.g)}};b.prototype.s=function(e){if(e===this)this.g(new TypeError("A Promise cannot resolve to itself"));else if(e instanceof b)this.v(e);else{a:switch(typeof e){case "object":var h=null!=e;break a;case "function":h=!0;break a;default:h=!1}h?this.m(e):this.h(e)}};
b.prototype.m=function(e){var h=void 0;try{h=e.then}catch(k){this.g(k);return}"function"==typeof h?this.w(h,e):this.h(e)};b.prototype.g=function(e){this.i(2,e)};b.prototype.h=function(e){this.i(1,e)};b.prototype.i=function(e,h){if(0!=this.b)throw Error("Cannot settle("+e+", "+h+"): Promise already settled in state"+this.b);this.b=e;this.c=h;this.l()};b.prototype.l=function(){if(null!=this.a){for(var e=0;e<this.a.length;++e)g.b(this.a[e]);this.a=null}};var g=new c;b.prototype.v=function(e){var h=this.f();
e.F(h.resolve,h.reject)};b.prototype.w=function(e,h){var k=this.f();try{e.call(h,k.resolve,k.reject)}catch(l){k.reject(l)}};b.prototype.then=function(e,h){function k(q,w){return"function"==typeof q?function(A){try{l(q(A))}catch(L){m(L)}}:w}var l,m,p=new b(function(q,w){l=q;m=w});this.F(k(e,l),k(h,m));return p};b.prototype.catch=function(e){return this.then(void 0,e)};b.prototype.F=function(e,h){function k(){switch(l.b){case 1:e(l.c);break;case 2:h(l.c);break;default:throw Error("Unexpected state: "+
l.b);}}var l=this;null==this.a?g.b(k):this.a.push(k)};b.resolve=d;b.reject=function(e){return new b(function(h,k){k(e)})};b.race=function(e){return new b(function(h,k){for(var l=ha(e),m=l.next();!m.done;m=l.next())d(m.value).F(h,k)})};b.all=function(e){var h=ha(e),k=h.next();return k.done?d([]):new b(function(l,m){function p(A){return function(L){q[A]=L;w--;0==w&&l(q)}}var q=[],w=0;do q.push(void 0),w++,d(k.value).F(p(q.length-1),m),k=h.next();while(!k.done)})};return b});var qa=qa||{},x=this||self;
function y(a,b){a=a.split(".");b=b||x;for(var c=0;c<a.length;c++)if(b=b[a[c]],null==b)return null;return b}function ra(){}function sa(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}var ta="closure_uid_"+(1E9*Math.random()>>>0),ua=0;function va(a,b,c){return a.call.apply(a.bind,arguments)}
function wa(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var f=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(f,d);return a.apply(b,f)}}return function(){return a.apply(b,arguments)}}function z(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?z=va:z=wa;return z.apply(null,arguments)}
function B(a,b){function c(){}c.prototype=b.prototype;a.O=b.prototype;a.prototype=new c;a.prototype.constructor=a};function xa(a){this.a=a||{}}xa.prototype.get=function(a){return this.a[a]};xa.prototype.G=function(){return Object.keys(this.a)};function C(a,b,c,d){this.f=a;this.c=b;this.b=c;this.a=d}C.prototype.getRequestMessage=function(){return this.f};C.prototype.getMethodDescriptor=function(){return this.c};C.prototype.getMetadata=function(){return this.b};C.prototype.getCallOptions=function(){return this.a};function D(a,b,c,d){c=void 0===c?{}:c;this.c=a;this.a=c;this.b=b;this.f=void 0===d?null:d}D.prototype.getResponseMessage=function(){return this.c};D.prototype.getMetadata=function(){return this.a};D.prototype.getMethodDescriptor=function(){return this.b};D.prototype.getStatus=function(){return this.f};function ya(a,b,c,d,f,g){this.name=a;this.a=f;this.b=g}function za(a,b,c){c=void 0===c?{}:c;var d=void 0===d?new xa:d;return new C(b,a,c,d)}ya.prototype.getName=function(){return this.name};ya.prototype.getName=ya.prototype.getName;function Aa(a){switch(a){case 200:return 0;case 400:return 3;case 401:return 16;case 403:return 7;case 404:return 5;case 409:return 10;case 412:return 9;case 429:return 8;case 499:return 1;case 500:return 2;case 501:return 12;case 503:return 14;case 504:return 4;default:return 2}}
function Ba(a){switch(a){case 0:return"OK";case 1:return"CANCELLED";case 2:return"UNKNOWN";case 3:return"INVALID_ARGUMENT";case 4:return"DEADLINE_EXCEEDED";case 5:return"NOT_FOUND";case 6:return"ALREADY_EXISTS";case 7:return"PERMISSION_DENIED";case 16:return"UNAUTHENTICATED";case 8:return"RESOURCE_EXHAUSTED";case 9:return"FAILED_PRECONDITION";case 10:return"ABORTED";case 11:return"OUT_OF_RANGE";case 12:return"UNIMPLEMENTED";case 13:return"INTERNAL";case 14:return"UNAVAILABLE";case 15:return"DATA_LOSS";
default:return""}};function E(a,b,c){c=void 0===c?{}:c;b=Error.call(this,b);this.message=b.message;"stack"in b&&(this.stack=b.stack);this.code=a;this.metadata=c}oa(E,Error);E.prototype.toString=function(){var a="RpcError("+(Ba(this.code)||String(this.code))+")";this.message&&(a+=": "+this.message);return a};E.prototype.name="RpcError";function Ca(a){this.a=a}Ca.prototype.on=function(a,b){return"data"==a||"error"==a?this:this.a.on(a,b)};Ca.prototype.removeListener=function(a,b){return this.a.removeListener(a,b)};Ca.prototype.cancel=function(){this.a.cancel()};function Da(a){switch(a){case 0:return"No Error";case 1:return"Access denied to content document";case 2:return"File not found";case 3:return"Firefox silently errored";case 4:return"Application custom error";case 5:return"An exception occurred";case 6:return"Http response at 400 or 500 level";case 7:return"Request was aborted";case 8:return"Request timed out";case 9:return"The resource is not available offline";default:return"Unrecognized error code"}};function F(a){if(Error.captureStackTrace)Error.captureStackTrace(this,F);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}B(F,Error);F.prototype.name="CustomError";function Ea(a,b){a=a.split("%s");for(var c="",d=a.length-1,f=0;f<d;f++)c+=a[f]+(f<b.length?b[f]:"%s");F.call(this,c+a[d])}B(Ea,F);Ea.prototype.name="AssertionError";function Fa(a,b){throw new Ea("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};function Ga(){this.l=null;this.i=[];this.m=0;this.b=Ha;this.f=this.a=this.h=0;this.c=null;this.g=0}
function Ia(a,b){function c(l){l==Ja?e.h=l:l==G?e.h=l:Ka(e,h,k,"invalid frame byte");e.b=La;e.a=0;e.f=0}function d(l){e.f++;e.a=(e.a<<8)+l;4==e.f&&(e.b=Ma,e.g=0,"undefined"!==typeof Uint8Array?e.c=new Uint8Array(e.a):e.c=Array(e.a),0==e.a&&g())}function f(l){e.c[e.g++]=l;e.g==e.a&&g()}function g(){var l={};l[e.h]=e.c;e.i.push(l);e.b=Ha}var e=a,h,k=0;for(b instanceof Uint8Array||b instanceof Array?h=b:h=new Uint8Array(b);k<h.length;){switch(e.b){case Na:Ka(e,h,k,"stream already broken");break;case Ha:c(h[k]);
break;case La:d(h[k]);break;case Ma:f(h[k]);break;default:throw Error("unexpected parser state: "+e.b);}e.m++;k++}a=e.i;e.i=[];return 0<a.length?a:null}var Ha=0,La=1,Ma=2,Na=3,Ja=0,G=128;function Ka(a,b,c,d){a.b=Na;a.l="The stream is broken @"+a.m+"/"+c+". Error: "+d+". With input:\n"+b;throw Error(a.l);};var Oa=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};var Pa=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};function H(a,b){return-1!=a.indexOf(b)}function Qa(a,b){return a<b?-1:a>b?1:0};var I;a:{var Ra=x.navigator;if(Ra){var Sa=Ra.userAgent;if(Sa){I=Sa;break a}}I=""};function Ta(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function Ua(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}var Va="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Wa(a,b){for(var c,d,f=1;f<arguments.length;f++){d=arguments[f];for(c in d)a[c]=d[c];for(var g=0;g<Va.length;g++)c=Va[g],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function Xa(a){var b=1;a=a.split(":");for(var c=[];0<b&&a.length;)c.push(a.shift()),b--;a.length&&c.push(a.join(":"));return c};function Ya(a){Ya[" "](a);return a}Ya[" "]=ra;function Za(a){var b=$a;return Object.prototype.hasOwnProperty.call(b,9)?b[9]:b[9]=a(9)};var ab=H(I,"Opera"),bb=H(I,"Trident")||H(I,"MSIE"),cb=H(I,"Edge"),db=H(I,"Gecko")&&!(H(I.toLowerCase(),"webkit")&&!H(I,"Edge"))&&!(H(I,"Trident")||H(I,"MSIE"))&&!H(I,"Edge"),eb=H(I.toLowerCase(),"webkit")&&!H(I,"Edge"),fb;
a:{var gb="",hb=function(){var a=I;if(db)return/rv:([^\);]+)(\)|;)/.exec(a);if(cb)return/Edge\/([\d\.]+)/.exec(a);if(bb)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(eb)return/WebKit\/(\S+)/.exec(a);if(ab)return/(?:Version)[ \/]?(\S+)/.exec(a)}();hb&&(gb=hb?hb[1]:"");if(bb){var ib,jb=x.document;ib=jb?jb.documentMode:void 0;if(null!=ib&&ib>parseFloat(gb)){fb=String(ib);break a}}fb=gb}var $a={};
function kb(){return Za(function(){for(var a=0,b=Pa(String(fb)).split("."),c=Pa("9").split("."),d=Math.max(b.length,c.length),f=0;0==a&&f<d;f++){var g=b[f]||"",e=c[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];e=/(\d*)(\D*)(.*)/.exec(e)||["","","",""];if(0==g[0].length&&0==e[0].length)break;a=Qa(0==g[1].length?0:parseInt(g[1],10),0==e[1].length?0:parseInt(e[1],10))||Qa(0==g[2].length,0==e[2].length)||Qa(g[2],e[2]);g=g[3];e=e[3]}while(0==a)}return 0<=a})};function lb(){0!=mb&&(Object.prototype.hasOwnProperty.call(this,ta)&&this[ta]||(this[ta]=++ua));this.K=this.K}var mb=0;lb.prototype.K=!1;var nb=Object.freeze||function(a){return a};function J(a,b){this.type=a;this.a=this.target=b;this.defaultPrevented=!1}J.prototype.b=function(){this.defaultPrevented=!0};var ob=function(){if(!x.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});try{x.addEventListener("test",ra,b),x.removeEventListener("test",ra,b)}catch(c){}return a}();function K(a,b){J.call(this,a?a.type:"");this.relatedTarget=this.a=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.pointerId=0;this.pointerType="";this.c=null;if(a){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.a=b;if(b=a.relatedTarget){if(db){a:{try{Ya(b.nodeName);var f=!0;break a}catch(g){}f=!1}f||(b=null)}}else"mouseover"==
c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.key=a.key||"";this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.pointerId=a.pointerId||0;this.pointerType="string"===typeof a.pointerType?a.pointerType:pb[a.pointerType]||"";this.c=a;a.defaultPrevented&&K.O.b.call(this)}}B(K,J);var pb=nb({2:"touch",3:"pen",4:"mouse"});K.prototype.b=function(){K.O.b.call(this);var a=this.c;a.preventDefault?a.preventDefault():a.returnValue=!1};var M="closure_listenable_"+(1E6*Math.random()|0);var qb=0;function rb(a,b,c,d,f){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.H=f;this.key=++qb;this.A=this.D=!1}function sb(a){a.A=!0;a.listener=null;a.proxy=null;a.src=null;a.H=null};function tb(a){this.src=a;this.a={};this.b=0}tb.prototype.add=function(a,b,c,d,f){var g=a.toString();a=this.a[g];a||(a=this.a[g]=[],this.b++);var e=ub(a,b,d,f);-1<e?(b=a[e],c||(b.D=!1)):(b=new rb(b,this.src,g,!!d,f),b.D=c,a.push(b));return b};tb.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.a))return!1;var f=this.a[a];b=ub(f,b,c,d);return-1<b?(sb(f[b]),Array.prototype.splice.call(f,b,1),0==f.length&&(delete this.a[a],this.b--),!0):!1};
function vb(a,b){var c=b.type;if(c in a.a){var d=a.a[c],f=Oa(d,b),g;(g=0<=f)&&Array.prototype.splice.call(d,f,1);g&&(sb(b),0==a.a[c].length&&(delete a.a[c],a.b--))}}function ub(a,b,c,d){for(var f=0;f<a.length;++f){var g=a[f];if(!g.A&&g.listener==b&&g.capture==!!c&&g.H==d)return f}return-1};var wb="closure_lm_"+(1E6*Math.random()|0),xb={},yb=0;function zb(a,b,c,d,f){if(d&&d.once)Ab(a,b,c,d,f);else if(Array.isArray(b))for(var g=0;g<b.length;g++)zb(a,b[g],c,d,f);else c=Bb(c),a&&a[M]?a.f.add(String(b),c,!1,sa(d)?!!d.capture:!!d,f):Cb(a,b,c,!1,d,f)}
function Cb(a,b,c,d,f,g){if(!b)throw Error("Invalid event type");var e=sa(f)?!!f.capture:!!f,h=Db(a);h||(a[wb]=h=new tb(a));c=h.add(b,c,d,e,g);if(!c.proxy){d=Eb();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)ob||(f=e),void 0===f&&(f=!1),a.addEventListener(b.toString(),d,f);else if(a.attachEvent)a.attachEvent(Fb(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");yb++}}
function Eb(){function a(c){return b.call(a.src,a.listener,c)}var b=Gb;return a}function Ab(a,b,c,d,f){if(Array.isArray(b))for(var g=0;g<b.length;g++)Ab(a,b[g],c,d,f);else c=Bb(c),a&&a[M]?a.f.add(String(b),c,!0,sa(d)?!!d.capture:!!d,f):Cb(a,b,c,!0,d,f)}function Hb(a,b,c,d,f){if(Array.isArray(b))for(var g=0;g<b.length;g++)Hb(a,b[g],c,d,f);else(d=sa(d)?!!d.capture:!!d,c=Bb(c),a&&a[M])?a.f.remove(String(b),c,d,f):a&&(a=Db(a))&&(b=a.a[b.toString()],a=-1,b&&(a=ub(b,c,d,f)),(c=-1<a?b[a]:null)&&Ib(c))}
function Ib(a){if("number"!==typeof a&&a&&!a.A){var b=a.src;if(b&&b[M])vb(b.f,a);else{var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(Fb(c),d):b.addListener&&b.removeListener&&b.removeListener(d);yb--;(c=Db(b))?(vb(c,a),0==c.b&&(c.src=null,b[wb]=null)):sb(a)}}}function Fb(a){return a in xb?xb[a]:xb[a]="on"+a}function Gb(a,b){if(a.A)a=!0;else{b=new K(b,this);var c=a.listener,d=a.H||a.src;a.D&&Ib(a);a=c.call(d,b)}return a}
function Db(a){a=a[wb];return a instanceof tb?a:null}var Jb="__closure_events_fn_"+(1E9*Math.random()>>>0);function Bb(a){if("function"===typeof a)return a;a[Jb]||(a[Jb]=function(b){return a.handleEvent(b)});return a[Jb]};function N(){lb.call(this);this.f=new tb(this);this.U=this}B(N,lb);N.prototype[M]=!0;N.prototype.addEventListener=function(a,b,c,d){zb(this,a,b,c,d)};N.prototype.removeEventListener=function(a,b,c,d){Hb(this,a,b,c,d)};function O(a,b){a=a.U;var c=b.type||b;if("string"===typeof b)b=new J(b,a);else if(b instanceof J)b.target=b.target||a;else{var d=b;b=new J(c,a);Wa(b,d)}a=b.a=a;Kb(a,c,!0,b);Kb(a,c,!1,b)}
function Kb(a,b,c,d){if(b=a.f.a[String(b)]){b=b.concat();for(var f=!0,g=0;g<b.length;++g){var e=b[g];if(e&&!e.A&&e.capture==c){var h=e.listener,k=e.H||e.src;e.D&&vb(a.f,e);f=!1!==h.call(k,d)&&f}}}};var Lb=x;function Mb(a,b,c){if("function"===typeof a)c&&(a=z(a,c));else if(a&&"function"==typeof a.handleEvent)a=z(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:Lb.setTimeout(a,b||0)};function Nb(a,b){this.name=a;this.value=b}Nb.prototype.toString=function(){return this.name};var Ob=new Nb("OFF",Infinity),Pb=new Nb("SEVERE",1E3),Qb=new Nb("CONFIG",700),Rb=new Nb("FINE",500);function Tb(){this.clear()}var Ub;Tb.prototype.clear=function(){};function Vb(a,b,c){this.reset(a||Ob,b,c,void 0,void 0)}Vb.prototype.reset=function(){};function Wb(a,b){this.a=null;this.f=[];this.b=(void 0===b?null:b)||null;this.c=[];this.g={getName:function(){return a}}}
function Xb(a){if(a.a)return a.a;if(a.b)return Xb(a.b);Fa("Root logger has no level set.");return Ob}function Yb(a,b){for(;a;)a.f.forEach(function(c){c(b)}),a=a.b}function Zb(){this.entries={};var a=new Wb("");a.a=Qb;this.entries[""]=a}var $b;function ac(a,b,c){var d=a.entries[b];if(d)return void 0!==c&&(d.a=c),d;d=ac(a,b.substr(0,b.lastIndexOf(".")));var f=new Wb(b,d);a.entries[b]=f;d.c.push(f);void 0!==c&&(f.a=c);return f}function bc(){$b||($b=new Zb);return $b}
function cc(a,b,c){var d;if(d=a)if(d=a&&b){d=b.value;var f=a?Xb(ac(bc(),a.getName())):Ob;d=d>=f.value}d&&(b=b||Ob,d=ac(bc(),a.getName()),"function"===typeof c&&(c=c()),Ub||(Ub=new Tb),a=a.getName(),a=new Vb(b,c,a),Yb(d,a))}function P(a,b){a&&cc(a,Rb,b)};function dc(){}dc.prototype.a=null;function ec(a){var b;(b=a.a)||(b={},fc(a)&&(b[0]=!0,b[1]=!0),b=a.a=b);return b};var gc;function hc(){}B(hc,dc);function ic(a){return(a=fc(a))?new ActiveXObject(a):new XMLHttpRequest}function fc(a){if(!a.b&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.b=d}catch(f){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.b}gc=new hc;t();u();function jc(a,b){this.b=a[x.Symbol.iterator]();this.c=b;this.f=0}jc.prototype[Symbol.iterator]=function(){return this};jc.prototype.next=function(){var a=this.b.next();return{value:a.done?void 0:this.c.call(void 0,a.value,this.f++),done:a.done}};function kc(a,b){return new jc(a,b)}t();u();t();u();var lc="StopIteration"in x?x.StopIteration:{message:"StopIteration",stack:""};function Q(){}Q.prototype.next=function(){return Q.prototype.a.call(this)};Q.prototype.a=function(){throw lc;};Q.prototype.u=function(){return this};function mc(a){if(a instanceof R||a instanceof S||a instanceof T)return a;if("function"==typeof a.next)return new R(function(){return nc(a)});t();u();if("function"==typeof a[Symbol.iterator])return t(),u(),new R(function(){return a[Symbol.iterator]()});if("function"==typeof a.u)return new R(function(){return nc(a.u())});throw Error("Not an iterator or iterable.");}
function nc(a){if(!(a instanceof Q))return a;var b=!1;return{next:function(){for(var c;!b;)try{c=a.a();break}catch(d){if(d!==lc)throw d;b=!0}return{value:c,done:b}}}}t();u();function R(a){this.b=a}R.prototype.u=function(){return new S(this.b())};R.prototype[Symbol.iterator]=function(){return new T(this.b())};R.prototype.c=function(){return new T(this.b())};t();u();function S(a){this.b=a}oa(S,Q);S.prototype.a=function(){var a=this.b.next();if(a.done)throw lc;return a.value};S.prototype.next=function(){return S.prototype.a.call(this)};
S.prototype[Symbol.iterator]=function(){return new T(this.b)};S.prototype.c=function(){return new T(this.b)};function T(a){R.call(this,function(){return a});this.f=a}oa(T,R);T.prototype.next=function(){return this.f.next()};function oc(a,b){this.o={};this.j=[];this.B=this.size=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.addAll(a)}n=oc.prototype;n.G=function(){pc(this);return this.j.concat()};n.has=function(a){return U(this.o,a)};n.clear=function(){this.o={};this.B=this.size=this.j.length=0};n.remove=function(a){return this.delete(a)};
n.delete=function(a){return U(this.o,a)?(delete this.o[a],--this.size,this.B++,this.j.length>2*this.size&&pc(this),!0):!1};function pc(a){if(a.size!=a.j.length){for(var b=0,c=0;b<a.j.length;){var d=a.j[b];U(a.o,d)&&(a.j[c++]=d);b++}a.j.length=c}if(a.size!=a.j.length){var f={};for(c=b=0;b<a.j.length;)d=a.j[b],U(f,d)||(a.j[c++]=d,f[d]=1),b++;a.j.length=c}}n.get=function(a,b){return U(this.o,a)?this.o[a]:b};n.set=function(a,b){U(this.o,a)||(this.size+=1,this.j.push(a),this.B++);this.o[a]=b};
n.addAll=function(a){if(a instanceof oc)for(var b=a.G(),c=0;c<b.length;c++)this.set(b[c],a.get(b[c]));else for(b in a)this.set(b,a[b])};n.forEach=function(a,b){for(var c=this.G(),d=0;d<c.length;d++){var f=c[d],g=this.get(f);a.call(b,g,f,this)}};n.clone=function(){return new oc(this)};n.keys=function(){return mc(this.u(!0)).c()};n.values=function(){return mc(this.u(!1)).c()};n.entries=function(){var a=this;return kc(this.keys(),function(b){return[b,a.get(b)]})};
n.u=function(a){pc(this);var b=0,c=this.B,d=this,f=new Q;f.a=function(){if(c!=d.B)throw Error("The map has changed since the iterator was created");if(b>=d.j.length)throw lc;var g=d.j[b++];return a?g:d.o[g]};f.next=f.a.bind(f);return f};function U(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var qc=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function rc(a){N.call(this);this.headers=new oc;this.C=a||null;this.c=!1;this.J=this.a=null;this.P=this.v="";this.g=0;this.l="";this.i=this.N=this.s=this.L=!1;this.h=0;this.w=null;this.m=sc;this.I=this.M=!1}B(rc,N);var sc="";rc.prototype.b=ac(bc(),"goog.net.XhrIo",void 0).g;var tc=/^https?$/i,uc=["POST","PUT"];
function vc(a,b,c){if(a.a)throw Error("[goog.net.XhrIo] Object is active with another request="+a.v+"; newUri="+b);a.v=b;a.l="";a.g=0;a.P="POST";a.L=!1;a.c=!0;a.a=a.C?ic(a.C):ic(gc);a.J=a.C?ec(a.C):ec(gc);a.a.onreadystatechange=z(a.R,a);try{P(a.b,V(a,"Opening Xhr")),a.N=!0,a.a.open("POST",String(b),!0),a.N=!1}catch(g){P(a.b,V(a,"Error opening Xhr: "+g.message));wc(a,g);return}b=c||"";c=a.headers.clone();var d=c.G().find(function(g){return"content-type"==g.toLowerCase()}),f=x.FormData&&b instanceof
x.FormData;!(0<=Oa(uc,"POST"))||d||f||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");c.forEach(function(g,e){this.a.setRequestHeader(e,g)},a);a.m&&(a.a.responseType=a.m);"withCredentials"in a.a&&a.a.withCredentials!==a.M&&(a.a.withCredentials=a.M);try{xc(a),0<a.h&&(a.I=yc(a.a),P(a.b,V(a,"Will abort after "+a.h+"ms if incomplete, xhr2 "+a.I)),a.I?(a.a.timeout=a.h,a.a.ontimeout=z(a.T,a)):a.w=Mb(a.T,a.h,a)),P(a.b,V(a,"Sending request")),a.s=!0,a.a.send(b),a.s=!1}catch(g){P(a.b,
V(a,"Send error: "+g.message)),wc(a,g)}}function yc(a){return bb&&kb()&&"number"===typeof a.timeout&&void 0!==a.ontimeout}n=rc.prototype;n.T=function(){"undefined"!=typeof qa&&this.a&&(this.l="Timed out after "+this.h+"ms, aborting",this.g=8,P(this.b,V(this,this.l)),O(this,"timeout"),this.abort(8))};function wc(a,b){a.c=!1;a.a&&(a.i=!0,a.a.abort(),a.i=!1);a.l=b;a.g=5;zc(a);Ac(a)}function zc(a){a.L||(a.L=!0,O(a,"complete"),O(a,"error"))}
n.abort=function(a){this.a&&this.c&&(P(this.b,V(this,"Aborting")),this.c=!1,this.i=!0,this.a.abort(),this.i=!1,this.g=a||7,O(this,"complete"),O(this,"abort"),Ac(this))};n.R=function(){this.K||(this.N||this.s||this.i?Bc(this):this.W())};n.W=function(){Bc(this)};
function Bc(a){if(a.c&&"undefined"!=typeof qa)if(a.J[1]&&4==W(a)&&2==a.getStatus())P(a.b,V(a,"Local request error detected and ignored"));else if(a.s&&4==W(a))Mb(a.R,0,a);else if(O(a,"readystatechange"),4==W(a)){P(a.b,V(a,"Request complete"));a.c=!1;try{var b=a.getStatus();a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break a;default:c=!1}var d;if(!(d=c)){var f;if(f=0===b){var g=String(a.v).match(qc)[1]||null;if(!g&&x.self&&x.self.location){var e=x.self.location.protocol;
g=e.substr(0,e.length-1)}f=!tc.test(g?g.toLowerCase():"")}d=f}if(d)O(a,"complete"),O(a,"success");else{a.g=6;try{var h=2<W(a)?a.a.statusText:""}catch(k){P(a.b,"Can not get status: "+k.message),h=""}a.l=h+" ["+a.getStatus()+"]";zc(a)}}finally{Ac(a)}}}function Ac(a){if(a.a){xc(a);var b=a.a,c=a.J[0]?ra:null;a.a=null;a.J=null;O(a,"ready");try{b.onreadystatechange=c}catch(d){(a=a.b)&&cc(a,Pb,"Problem encountered resetting onreadystatechange: "+d.message)}}}
function xc(a){a.a&&a.I&&(a.a.ontimeout=null);a.w&&(Lb.clearTimeout(a.w),a.w=null)}function W(a){return a.a?a.a.readyState:0}n.getStatus=function(){try{return 2<W(this)?this.a.status:-1}catch(a){return-1}};
function Cc(a){try{if(!a.a)return null;if("response"in a.a)return a.a.response;switch(a.m){case sc:case "text":return a.a.responseText;case "arraybuffer":if("mozResponseArrayBuffer"in a.a)return a.a.mozResponseArrayBuffer}var b=a.b;b&&cc(b,Pb,"Response type "+a.m+" is not supported on this browser");return null}catch(c){return P(a.b,"Can not get response: "+c.message),null}}
function Dc(a){var b={};a=(a.a&&4==W(a)?a.a.getAllResponseHeaders()||"":"").split("\r\n");for(var c=0;c<a.length;c++)if(!/^[\s\xa0]*$/.test(a[c])){var d=Xa(a[c]),f=d[0];d=d[1];if("string"===typeof d){d=d.trim();var g=b[f]||[];b[f]=g;g.push(d)}}return Ua(b,function(e){return e.join(", ")})}function V(a,b){return b+" ["+a.P+" "+a.v+" "+a.getStatus()+"]"};var Ec={},Fc=null;function Gc(a){var b=a.length,c=3*b/4;c%3?c=Math.floor(c):H("=.",a[b-1])&&(c=H("=.",a[b-2])?c-2:c-1);var d=new Uint8Array(c),f=0;Hc(a,function(g){d[f++]=g});return d.subarray(0,f)}
function Hc(a,b){function c(k){for(;d<a.length;){var l=a.charAt(d++),m=Fc[l];if(null!=m)return m;if(!/^[\s\xa0]*$/.test(l))throw Error("Unknown base64 encoding at char: "+l);}return k}Ic();for(var d=0;;){var f=c(-1),g=c(0),e=c(64),h=c(64);if(64===h&&-1===f)break;b(f<<2|g>>4);64!=e&&(b(g<<4&240|e>>2),64!=h&&b(e<<6&192|h))}}
function Ic(){if(!Fc){Fc={};for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),b=["+/=","+/","-_=","-_.","-_"],c=0;5>c;c++){var d=a.concat(b[c].split(""));Ec[c]=d;for(var f=0;f<d.length;f++){var g=d[f];void 0===Fc[g]&&(Fc[g]=f)}}}};var Jc=["content-type","grpc-status","grpc-message"];
function X(a){this.a=a.Z;this.m=null;this.b=[];this.h=[];this.g=[];this.f=[];this.c=[];this.l=!1;this.i=0;this.s=new Ga;var b=this;zb(this.a,"readystatechange",function(){var c=b.a;if(c=c.a?c.a.getResponseHeader("Content-Type"):null){c=c.toLowerCase();if(0==c.lastIndexOf("application/grpc-web-text",0)){c=b.a;try{var d=c.a?c.a.responseText:""}catch(k){P(c.b,"Can not get responseText: "+k.message),d=""}c=d||"";d=c.length-c.length%4;c=c.substr(b.i,d-b.i);if(0==c.length)return;b.i=d;c=Gc(c)}else if(0==
c.lastIndexOf("application/grpc",0))c=new Uint8Array(Cc(b.a));else{Y(b,new E(2,"Unknown Content-type received."));return}d=null;try{d=Ia(b.s,c)}catch(k){Y(b,new E(2,"Error in parsing response body"))}if(d)for(c=0;c<d.length;c++){if(Ja in d[c]){var f=d[c][Ja];if(f){var g=!1,e=void 0;try{e=b.m(f),g=!0}catch(k){Y(b,new E(13,"Error when deserializing response data; error: "+k+(", response: "+e)))}if(g)for(f=e,g=0;g<b.b.length;g++)b.b[g](f)}}if(G in d[c]&&0<d[c][G].length){f="";for(g=0;g<d[c][G].length;g++)f+=
String.fromCharCode(d[c][G][g]);f=f.trim().split("\r\n");g={};for(e=0;e<f.length;e++){var h=f[e].indexOf(":");g[f[e].substring(0,h).trim()]=f[e].substring(h+1).trim()}f=g;g=0;e="";"grpc-status"in f&&(g=Number(f["grpc-status"]),delete f["grpc-status"]);"grpc-message"in f&&(e=f["grpc-message"],delete f["grpc-message"]);Y(b,new E(g,e,f))}}}});zb(this.a,"complete",function(){var c=b.a.g,d=2,f="",g={};d=Dc(b.a);var e={};for(h in d)d.hasOwnProperty(h)&&(e[h.toLowerCase()]=d[h]);Object.keys(e).forEach(function(k){Jc.includes(k)||
(g[k]=e[k])});Kc(b,g);var h=-1;if(0!=c){switch(c){case 7:d=10;break;case 8:d=4;break;case 6:h=b.a.getStatus();d=Aa(h);break;default:d=14}10==d&&b.l||(f=Da(c),-1!=h&&(f+=", http status code: "+h),Y(b,new E(d,f)))}else c=!1,"grpc-status"in e&&(d=Number(e["grpc-status"]),"grpc-message"in e&&(f=e["grpc-message"]),0!=d&&(Y(b,new E(d,f||"",e)),c=!0)),c||Lc(b)})}
X.prototype.on=function(a,b){"data"==a?this.b.push(b):"status"==a?this.h.push(b):"metadata"==a?this.g.push(b):"end"==a?this.c.push(b):"error"==a&&this.f.push(b);return this};function Mc(a,b){b=a.indexOf(b);-1<b&&a.splice(b,1)}X.prototype.removeListener=function(a,b){"data"==a?Mc(this.b,b):"status"==a?Mc(this.h,b):"metadata"==a?Mc(this.g,b):"end"==a?Mc(this.c,b):"error"==a&&Mc(this.f,b);return this};X.prototype.cancel=function(){this.l=!0;this.a.abort()};
function Y(a,b){if(0!=b.code)for(var c=new E(b.code,decodeURIComponent(b.message||""),b.metadata),d=0;d<a.f.length;d++)a.f[d](c);b={code:b.code,details:decodeURIComponent(b.message||""),metadata:b.metadata};for(c=0;c<a.h.length;c++)a.h[c](b)}function Kc(a,b){for(var c=0;c<a.g.length;c++)a.g[c](b)}function Lc(a){for(var b=0;b<a.c.length;b++)a.c[b]()}X.prototype.cancel=X.prototype.cancel;X.prototype.removeListener=X.prototype.removeListener;X.prototype.on=X.prototype.on;function Nc(a){var b="";Ta(a,function(c,d){b+=d;b+=":";b+=c;b+="\r\n"});return b};function Z(a,b){a=void 0===a?{}:a;this.a=a.format||y("format",a)||"text";this.g=a.aa||y("suppressCorsPreflight",a)||!1;this.f=a.withCredentials||y("withCredentials",a)||!1;this.b=a.$||y("streamInterceptors",a)||[];this.h=a.ba||y("unaryInterceptors",a)||[];this.c=b||null}Z.prototype.X=function(a,b,c,d,f){var g=this,e=a.substr(0,a.length-d.name.length);a=Oc(function(h){return Pc(g,h,e)},this.b).call(this,za(d,b,c));Qc(a,f,!1);return new Ca(a)};
Z.prototype.S=function(a,b,c,d){var f=this,g=a.substr(0,a.length-d.name.length);return Oc(function(e){return new Promise(function(h,k){var l=Pc(f,e,g),m,p,q;Qc(l,function(w,A,L,Sb,Rc){w?k(w):Rc?q=A:L?p=L:Sb?m=Sb:(w=e.getMethodDescriptor(),A=m,A=void 0===A?{}:A,h(new D(q,w,A,void 0===p?null:p)))},!0)})},this.h).call(this,za(d,b,c)).then(function(e){return e.getResponseMessage()})};Z.prototype.unaryCall=function(a,b,c,d){return this.S(a,b,c,d)};
Z.prototype.Y=function(a,b,c,d){var f=this,g=a.substr(0,a.length-d.name.length);return Oc(function(e){return Pc(f,e,g)},this.b).call(this,za(d,b,c))};
function Pc(a,b,c){var d=b.getMethodDescriptor(),f=c+d.getName();c=a.c?a.c:new rc;c.M=a.f;var g=new X({Z:c});g.m=d.b;var e=b.getMetadata();for(h in e)c.headers.set(h,e[h]);"text"==a.a?(c.headers.set("Content-Type","application/grpc-web-text"),c.headers.set("Accept","application/grpc-web-text")):c.headers.set("Content-Type","application/grpc-web+proto");c.headers.set("X-User-Agent","grpc-web-javascript/0.1");c.headers.set("X-Grpc-Web","1");if(c.headers.has("deadline")){var h=Number(c.headers.get("deadline"));
h=Math.ceil(h-(new Date).getTime());c.headers.delete("deadline");Infinity===h&&(h=0);0<h&&(c.headers.set("grpc-timeout",h+"m"),c.h=Math.max(0,Math.max(1E3,Math.ceil(1.1*h))))}if(a.g){e=c.headers;h={};for(var k=ha(e.keys()),l=k.next();!l.done;l=k.next())l=l.value,h[l]=e.get(l);c.headers.clear();b:{for(m in h){var m=!1;break b}m=!0}if(!m)if(h=Nc(h),"string"===typeof f){if(m=encodeURIComponent("$httpHeaders"),h=null!=h?"="+encodeURIComponent(String(h)):"",m+=h)h=f.indexOf("#"),0>h&&(h=f.length),e=f.indexOf("?"),
0>e||e>h?(e=h,k=""):k=f.substring(e+1,h),f=[f.substr(0,e),k,f.substr(h)],h=f[1],f[1]=m?h?h+"&"+m:m:h,f=f[0]+(f[1]?"?"+f[1]:"")+f[2]}else f.a("$httpHeaders",h)}b=(0,d.a)(b.getRequestMessage());d=b.length;m=[0,0,0,0];h=new Uint8Array(5+d);for(e=3;0<=e;e--)m[e]=d%256,d>>>=8;h.set(new Uint8Array(m),1);h.set(b,5);b=h;if("text"==a.a){a=b;var p;void 0===p&&(p=0);Ic();p=Ec[p];b=Array(Math.floor(a.length/3));d=p[64]||"";for(m=h=0;h<a.length-2;h+=3){l=a[h];var q=a[h+1];k=a[h+2];e=p[l>>2];l=p[(l&3)<<4|q>>4];
q=p[(q&15)<<2|k>>6];k=p[k&63];b[m++]=e+l+q+k}e=0;k=d;switch(a.length-h){case 2:e=a[h+1],k=p[(e&15)<<2]||d;case 1:a=a[h],b[m]=p[a>>2]+p[(a&3)<<4|e>>4]+k+d}b=b.join("")}else"binary"==a.a&&(c.m="arraybuffer");vc(c,f,b);return g}
function Qc(a,b,c){var d=!1,f=null,g=!1;a.on("data",function(e){d=!0;f=e});a.on("error",function(e){0==e.code||g||(g=!0,b(e,null))});a.on("status",function(e){0==e.code||g?c&&b(null,null,e):(g=!0,b({code:e.code,message:e.details,metadata:e.metadata},null))});if(c)a.on("metadata",function(e){b(null,null,null,e)});a.on("end",function(){g||(d?c?b(null,f,null,null,!0):b(null,f):b({code:2,message:"Incomplete response"}));c&&b(null,null)})}
function Oc(a,b){var c=a;b.forEach(function(d){var f=c;c=function(g){return d.intercept(g,f)}});return c}Z.prototype.serverStreaming=Z.prototype.Y;Z.prototype.unaryCall=Z.prototype.unaryCall;Z.prototype.thenableCall=Z.prototype.S;Z.prototype.rpcCall=Z.prototype.X;module.exports.CallOptions=xa;module.exports.MethodDescriptor=ya;module.exports.GrpcWebClientBase=Z;module.exports.RpcError=E;module.exports.StatusCode={OK:0,CANCELLED:1,UNKNOWN:2,INVALID_ARGUMENT:3,DEADLINE_EXCEEDED:4,NOT_FOUND:5,ALREADY_EXISTS:6,PERMISSION_DENIED:7,UNAUTHENTICATED:16,RESOURCE_EXHAUSTED:8,FAILED_PRECONDITION:9,ABORTED:10,OUT_OF_RANGE:11,UNIMPLEMENTED:12,INTERNAL:13,UNAVAILABLE:14,DATA_LOSS:15};module.exports.MethodType={UNARY:"unary",SERVER_STREAMING:"server_streaming",BIDI_STREAMING:"bidi_streaming"};
Lb="undefined"!==typeof globalThis&&globalThis||self;


/***/ }),

/***/ 577:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v3.12.4
// source: prc.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = __webpack_require__(154);

const proto = __webpack_require__(155);

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ParametricRobotControlServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ParametricRobotControlServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.SetupRobotRequest,
 *   !proto.SetupRobotReply>}
 */
const methodDescriptor_ParametricRobotControlService_SetupRobot = new grpc.web.MethodDescriptor(
  '/ParametricRobotControlService/SetupRobot',
  grpc.web.MethodType.UNARY,
  proto.SetupRobotRequest,
  proto.SetupRobotReply,
  /**
   * @param {!proto.SetupRobotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.SetupRobotReply.deserializeBinary
);


/**
 * @param {!proto.SetupRobotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.SetupRobotReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.SetupRobotReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ParametricRobotControlServiceClient.prototype.setupRobot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ParametricRobotControlService/SetupRobot',
      request,
      metadata || {},
      methodDescriptor_ParametricRobotControlService_SetupRobot,
      callback);
};


/**
 * @param {!proto.SetupRobotRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.SetupRobotReply>}
 *     Promise that resolves to the response
 */
proto.ParametricRobotControlServicePromiseClient.prototype.setupRobot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ParametricRobotControlService/SetupRobot',
      request,
      metadata || {},
      methodDescriptor_ParametricRobotControlService_SetupRobot);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.AddRobotTaskRequest,
 *   !proto.AddRobotTaskReply>}
 */
const methodDescriptor_ParametricRobotControlService_AddRobotTask = new grpc.web.MethodDescriptor(
  '/ParametricRobotControlService/AddRobotTask',
  grpc.web.MethodType.UNARY,
  proto.AddRobotTaskRequest,
  proto.AddRobotTaskReply,
  /**
   * @param {!proto.AddRobotTaskRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.AddRobotTaskReply.deserializeBinary
);


/**
 * @param {!proto.AddRobotTaskRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.AddRobotTaskReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.AddRobotTaskReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ParametricRobotControlServiceClient.prototype.addRobotTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ParametricRobotControlService/AddRobotTask',
      request,
      metadata || {},
      methodDescriptor_ParametricRobotControlService_AddRobotTask,
      callback);
};


/**
 * @param {!proto.AddRobotTaskRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.AddRobotTaskReply>}
 *     Promise that resolves to the response
 */
proto.ParametricRobotControlServicePromiseClient.prototype.addRobotTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ParametricRobotControlService/AddRobotTask',
      request,
      metadata || {},
      methodDescriptor_ParametricRobotControlService_AddRobotTask);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.SubscribeRobotFeedbackRequest,
 *   !proto.RobotFeedback>}
 */
const methodDescriptor_ParametricRobotControlService_SubscribeRobotFeedback = new grpc.web.MethodDescriptor(
  '/ParametricRobotControlService/SubscribeRobotFeedback',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.SubscribeRobotFeedbackRequest,
  proto.RobotFeedback,
  /**
   * @param {!proto.SubscribeRobotFeedbackRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.RobotFeedback.deserializeBinary
);


/**
 * @param {!proto.SubscribeRobotFeedbackRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.RobotFeedback>}
 *     The XHR Node Readable Stream
 */
proto.ParametricRobotControlServiceClient.prototype.subscribeRobotFeedback =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/ParametricRobotControlService/SubscribeRobotFeedback',
      request,
      metadata || {},
      methodDescriptor_ParametricRobotControlService_SubscribeRobotFeedback);
};


/**
 * @param {!proto.SubscribeRobotFeedbackRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.RobotFeedback>}
 *     The XHR Node Readable Stream
 */
proto.ParametricRobotControlServicePromiseClient.prototype.subscribeRobotFeedback =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/ParametricRobotControlService/SubscribeRobotFeedback',
      request,
      metadata || {},
      methodDescriptor_ParametricRobotControlService_SubscribeRobotFeedback);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.GetSimulatedRobotStateRequest,
 *   !proto.RobotState>}
 */
const methodDescriptor_ParametricRobotControlService_GetSimulatedRobotState = new grpc.web.MethodDescriptor(
  '/ParametricRobotControlService/GetSimulatedRobotState',
  grpc.web.MethodType.UNARY,
  proto.GetSimulatedRobotStateRequest,
  proto.RobotState,
  /**
   * @param {!proto.GetSimulatedRobotStateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.RobotState.deserializeBinary
);


/**
 * @param {!proto.GetSimulatedRobotStateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.RobotState)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.RobotState>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ParametricRobotControlServiceClient.prototype.getSimulatedRobotState =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ParametricRobotControlService/GetSimulatedRobotState',
      request,
      metadata || {},
      methodDescriptor_ParametricRobotControlService_GetSimulatedRobotState,
      callback);
};


/**
 * @param {!proto.GetSimulatedRobotStateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.RobotState>}
 *     Promise that resolves to the response
 */
proto.ParametricRobotControlServicePromiseClient.prototype.getSimulatedRobotState =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ParametricRobotControlService/GetSimulatedRobotState',
      request,
      metadata || {},
      methodDescriptor_ParametricRobotControlService_GetSimulatedRobotState);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.UpdateVariableRequest,
 *   !proto.UpdateVariableReply>}
 */
const methodDescriptor_ParametricRobotControlService_UpdateVariable = new grpc.web.MethodDescriptor(
  '/ParametricRobotControlService/UpdateVariable',
  grpc.web.MethodType.UNARY,
  proto.UpdateVariableRequest,
  proto.UpdateVariableReply,
  /**
   * @param {!proto.UpdateVariableRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.UpdateVariableReply.deserializeBinary
);


/**
 * @param {!proto.UpdateVariableRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.UpdateVariableReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.UpdateVariableReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ParametricRobotControlServiceClient.prototype.updateVariable =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ParametricRobotControlService/UpdateVariable',
      request,
      metadata || {},
      methodDescriptor_ParametricRobotControlService_UpdateVariable,
      callback);
};


/**
 * @param {!proto.UpdateVariableRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.UpdateVariableReply>}
 *     Promise that resolves to the response
 */
proto.ParametricRobotControlServicePromiseClient.prototype.updateVariable =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ParametricRobotControlService/UpdateVariable',
      request,
      metadata || {},
      methodDescriptor_ParametricRobotControlService_UpdateVariable);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Ping,
 *   !proto.Ping>}
 */
const methodDescriptor_ParametricRobotControlService_SendPing = new grpc.web.MethodDescriptor(
  '/ParametricRobotControlService/SendPing',
  grpc.web.MethodType.UNARY,
  proto.Ping,
  proto.Ping,
  /**
   * @param {!proto.Ping} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Ping.deserializeBinary
);


/**
 * @param {!proto.Ping} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Ping)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Ping>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ParametricRobotControlServiceClient.prototype.sendPing =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ParametricRobotControlService/SendPing',
      request,
      metadata || {},
      methodDescriptor_ParametricRobotControlService_SendPing,
      callback);
};


/**
 * @param {!proto.Ping} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Ping>}
 *     Promise that resolves to the response
 */
proto.ParametricRobotControlServicePromiseClient.prototype.sendPing =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ParametricRobotControlService/SendPing',
      request,
      metadata || {},
      methodDescriptor_ParametricRobotControlService_SendPing);
};


module.exports = proto;



/***/ }),

/***/ 155:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// source: prc.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(339);
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.Action', null, global);
goog.exportSymbol('proto.Action.ActionNodeCase', null, global);
goog.exportSymbol('proto.AddRobotTaskReply', null, global);
goog.exportSymbol('proto.AddRobotTaskRequest', null, global);
goog.exportSymbol('proto.AxisMotion', null, global);
goog.exportSymbol('proto.AxisName', null, global);
goog.exportSymbol('proto.Base', null, global);
goog.exportSymbol('proto.CartesianPosition', null, global);
goog.exportSymbol('proto.CartesianPosition.FrameCase', null, global);
goog.exportSymbol('proto.CartesianReference', null, global);
goog.exportSymbol('proto.CartesianTarget', null, global);
goog.exportSymbol('proto.CircularMotion', null, global);
goog.exportSymbol('proto.CoordinateSystem', null, global);
goog.exportSymbol('proto.CustomRobot', null, global);
goog.exportSymbol('proto.End', null, global);
goog.exportSymbol('proto.Euler', null, global);
goog.exportSymbol('proto.ExternalAxis', null, global);
goog.exportSymbol('proto.ExternalAxisType', null, global);
goog.exportSymbol('proto.Flow', null, global);
goog.exportSymbol('proto.Flow.FlowNodeCase', null, global);
goog.exportSymbol('proto.FrameType', null, global);
goog.exportSymbol('proto.GetSimulatedRobotStateRequest', null, global);
goog.exportSymbol('proto.Heartbeat', null, global);
goog.exportSymbol('proto.Hold', null, global);
goog.exportSymbol('proto.IfElse', null, global);
goog.exportSymbol('proto.InsertCode', null, global);
goog.exportSymbol('proto.Int4', null, global);
goog.exportSymbol('proto.JointTarget', null, global);
goog.exportSymbol('proto.LINMotion', null, global);
goog.exportSymbol('proto.Matrix4x4', null, global);
goog.exportSymbol('proto.Mesh', null, global);
goog.exportSymbol('proto.MetaData', null, global);
goog.exportSymbol('proto.MotionCommand', null, global);
goog.exportSymbol('proto.MotionCommand.CommandCase', null, global);
goog.exportSymbol('proto.MotionGroup', null, global);
goog.exportSymbol('proto.MotionGroupType', null, global);
goog.exportSymbol('proto.PTPMotion', null, global);
goog.exportSymbol('proto.Ping', null, global);
goog.exportSymbol('proto.PolyMesh', null, global);
goog.exportSymbol('proto.Robot', null, global);
goog.exportSymbol('proto.Robot.RobotDataCase', null, global);
goog.exportSymbol('proto.RobotFeedback', null, global);
goog.exportSymbol('proto.RobotFeedback.DataPackageCase', null, global);
goog.exportSymbol('proto.RobotState', null, global);
goog.exportSymbol('proto.SetVariable', null, global);
goog.exportSymbol('proto.Settings', null, global);
goog.exportSymbol('proto.SetupRobotReply', null, global);
goog.exportSymbol('proto.SetupRobotRequest', null, global);
goog.exportSymbol('proto.SimulationResult', null, global);
goog.exportSymbol('proto.SimulationResultUnit', null, global);
goog.exportSymbol('proto.SubscribeRobotFeedbackRequest', null, global);
goog.exportSymbol('proto.Task', null, global);
goog.exportSymbol('proto.TaskPayload', null, global);
goog.exportSymbol('proto.TaskPayload.PayloadCase', null, global);
goog.exportSymbol('proto.TaskType', null, global);
goog.exportSymbol('proto.Tool', null, global);
goog.exportSymbol('proto.TransformationArray', null, global);
goog.exportSymbol('proto.UpdateVariableReply', null, global);
goog.exportSymbol('proto.UpdateVariableRequest', null, global);
goog.exportSymbol('proto.Variable', null, global);
goog.exportSymbol('proto.Variable.VariableValueCase', null, global);
goog.exportSymbol('proto.VariableArray', null, global);
goog.exportSymbol('proto.Vector3', null, global);
goog.exportSymbol('proto.WaitForVariable', null, global);
goog.exportSymbol('proto.While', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Action = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.Action.oneofGroups_);
};
goog.inherits(proto.Action, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Action.displayName = 'proto.Action';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetVariable = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetVariable, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetVariable.displayName = 'proto.SetVariable';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.WaitForVariable = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.WaitForVariable, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.WaitForVariable.displayName = 'proto.WaitForVariable';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Hold = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Hold, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Hold.displayName = 'proto.Hold';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Ping = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Ping, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Ping.displayName = 'proto.Ping';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.InsertCode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.InsertCode.repeatedFields_, null);
};
goog.inherits(proto.InsertCode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.InsertCode.displayName = 'proto.InsertCode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SimulationResult = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.SimulationResult.repeatedFields_, null);
};
goog.inherits(proto.SimulationResult, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SimulationResult.displayName = 'proto.SimulationResult';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SimulationResultUnit = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.SimulationResultUnit.repeatedFields_, null);
};
goog.inherits(proto.SimulationResultUnit, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SimulationResultUnit.displayName = 'proto.SimulationResultUnit';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.RobotState = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.RobotState.repeatedFields_, null);
};
goog.inherits(proto.RobotState, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.RobotState.displayName = 'proto.RobotState';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Task = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Task.repeatedFields_, null);
};
goog.inherits(proto.Task, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Task.displayName = 'proto.Task';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.TaskPayload = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.TaskPayload.oneofGroups_);
};
goog.inherits(proto.TaskPayload, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.TaskPayload.displayName = 'proto.TaskPayload';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Flow = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.Flow.oneofGroups_);
};
goog.inherits(proto.Flow, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Flow.displayName = 'proto.Flow';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.IfElse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.IfElse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.IfElse.displayName = 'proto.IfElse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.While = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.While, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.While.displayName = 'proto.While';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.End = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.End, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.End.displayName = 'proto.End';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.MotionCommand = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.MotionCommand.oneofGroups_);
};
goog.inherits(proto.MotionCommand, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.MotionCommand.displayName = 'proto.MotionCommand';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.MotionGroup = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.MotionGroup.repeatedFields_, null);
};
goog.inherits(proto.MotionGroup, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.MotionGroup.displayName = 'proto.MotionGroup';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.AxisMotion = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.AxisMotion, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.AxisMotion.displayName = 'proto.AxisMotion';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.CircularMotion = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.CircularMotion.repeatedFields_, null);
};
goog.inherits(proto.CircularMotion, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.CircularMotion.displayName = 'proto.CircularMotion';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.LINMotion = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.LINMotion, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.LINMotion.displayName = 'proto.LINMotion';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.PTPMotion = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.PTPMotion, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.PTPMotion.displayName = 'proto.PTPMotion';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Matrix4x4 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Matrix4x4, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Matrix4x4.displayName = 'proto.Matrix4x4';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.CartesianPosition = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.CartesianPosition.oneofGroups_);
};
goog.inherits(proto.CartesianPosition, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.CartesianPosition.displayName = 'proto.CartesianPosition';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.CartesianTarget = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.CartesianTarget.repeatedFields_, null);
};
goog.inherits(proto.CartesianTarget, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.CartesianTarget.displayName = 'proto.CartesianTarget';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.JointTarget = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.JointTarget.repeatedFields_, null);
};
goog.inherits(proto.JointTarget, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.JointTarget.displayName = 'proto.JointTarget';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Vector3 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Vector3, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Vector3.displayName = 'proto.Vector3';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Int4 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Int4, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Int4.displayName = 'proto.Int4';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Euler = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Euler, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Euler.displayName = 'proto.Euler';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.CoordinateSystem = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.CoordinateSystem, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.CoordinateSystem.displayName = 'proto.CoordinateSystem';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Variable = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.Variable.oneofGroups_);
};
goog.inherits(proto.Variable, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Variable.displayName = 'proto.Variable';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Heartbeat = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Heartbeat, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Heartbeat.displayName = 'proto.Heartbeat';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Settings = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Settings, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Settings.displayName = 'proto.Settings';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Mesh = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Mesh.repeatedFields_, null);
};
goog.inherits(proto.Mesh, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Mesh.displayName = 'proto.Mesh';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.PolyMesh = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.PolyMesh.repeatedFields_, null);
};
goog.inherits(proto.PolyMesh, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.PolyMesh.displayName = 'proto.PolyMesh';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.TransformationArray = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.TransformationArray.repeatedFields_, null);
};
goog.inherits(proto.TransformationArray, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.TransformationArray.displayName = 'proto.TransformationArray';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.VariableArray = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.VariableArray.repeatedFields_, null);
};
goog.inherits(proto.VariableArray, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.VariableArray.displayName = 'proto.VariableArray';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.MetaData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.MetaData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.MetaData.displayName = 'proto.MetaData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SubscribeRobotFeedbackRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SubscribeRobotFeedbackRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SubscribeRobotFeedbackRequest.displayName = 'proto.SubscribeRobotFeedbackRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.RobotFeedback = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.RobotFeedback.oneofGroups_);
};
goog.inherits(proto.RobotFeedback, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.RobotFeedback.displayName = 'proto.RobotFeedback';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.GetSimulatedRobotStateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.GetSimulatedRobotStateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GetSimulatedRobotStateRequest.displayName = 'proto.GetSimulatedRobotStateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.AddRobotTaskRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.AddRobotTaskRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.AddRobotTaskRequest.displayName = 'proto.AddRobotTaskRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.AddRobotTaskReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.AddRobotTaskReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.AddRobotTaskReply.displayName = 'proto.AddRobotTaskReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.UpdateVariableRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.UpdateVariableRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.UpdateVariableRequest.displayName = 'proto.UpdateVariableRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.UpdateVariableReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.UpdateVariableReply.repeatedFields_, null);
};
goog.inherits(proto.UpdateVariableReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.UpdateVariableReply.displayName = 'proto.UpdateVariableReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetupRobotRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetupRobotRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetupRobotRequest.displayName = 'proto.SetupRobotRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.SetupRobotReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SetupRobotReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.SetupRobotReply.displayName = 'proto.SetupRobotReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Robot = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Robot.repeatedFields_, proto.Robot.oneofGroups_);
};
goog.inherits(proto.Robot, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Robot.displayName = 'proto.Robot';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Tool = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Tool, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Tool.displayName = 'proto.Tool';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Base = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Base, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Base.displayName = 'proto.Base';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.CustomRobot = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.CustomRobot.repeatedFields_, null);
};
goog.inherits(proto.CustomRobot, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.CustomRobot.displayName = 'proto.CustomRobot';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ExternalAxis = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ExternalAxis.repeatedFields_, null);
};
goog.inherits(proto.ExternalAxis, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ExternalAxis.displayName = 'proto.ExternalAxis';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.Action.oneofGroups_ = [[1,2,3,4,5]];

/**
 * @enum {number}
 */
proto.Action.ActionNodeCase = {
  ACTION_NODE_NOT_SET: 0,
  SET_VARIABLE_ACTION: 1,
  WAIT_FOR_VARIABLE_ACTION: 2,
  HOLD_ACTION: 3,
  PING_ACTION: 4,
  INSERT_CODE_ACTION: 5
};

/**
 * @return {proto.Action.ActionNodeCase}
 */
proto.Action.prototype.getActionNodeCase = function() {
  return /** @type {proto.Action.ActionNodeCase} */(jspb.Message.computeOneofCase(this, proto.Action.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Action.prototype.toObject = function(opt_includeInstance) {
  return proto.Action.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Action} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Action.toObject = function(includeInstance, msg) {
  var f, obj = {
    setVariableAction: (f = msg.getSetVariableAction()) && proto.SetVariable.toObject(includeInstance, f),
    waitForVariableAction: (f = msg.getWaitForVariableAction()) && proto.WaitForVariable.toObject(includeInstance, f),
    holdAction: (f = msg.getHoldAction()) && proto.Hold.toObject(includeInstance, f),
    pingAction: (f = msg.getPingAction()) && proto.Ping.toObject(includeInstance, f),
    insertCodeAction: (f = msg.getInsertCodeAction()) && proto.InsertCode.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Action}
 */
proto.Action.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Action;
  return proto.Action.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Action} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Action}
 */
proto.Action.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.SetVariable;
      reader.readMessage(value,proto.SetVariable.deserializeBinaryFromReader);
      msg.setSetVariableAction(value);
      break;
    case 2:
      var value = new proto.WaitForVariable;
      reader.readMessage(value,proto.WaitForVariable.deserializeBinaryFromReader);
      msg.setWaitForVariableAction(value);
      break;
    case 3:
      var value = new proto.Hold;
      reader.readMessage(value,proto.Hold.deserializeBinaryFromReader);
      msg.setHoldAction(value);
      break;
    case 4:
      var value = new proto.Ping;
      reader.readMessage(value,proto.Ping.deserializeBinaryFromReader);
      msg.setPingAction(value);
      break;
    case 5:
      var value = new proto.InsertCode;
      reader.readMessage(value,proto.InsertCode.deserializeBinaryFromReader);
      msg.setInsertCodeAction(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Action.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Action.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Action} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Action.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSetVariableAction();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.SetVariable.serializeBinaryToWriter
    );
  }
  f = message.getWaitForVariableAction();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.WaitForVariable.serializeBinaryToWriter
    );
  }
  f = message.getHoldAction();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.Hold.serializeBinaryToWriter
    );
  }
  f = message.getPingAction();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.Ping.serializeBinaryToWriter
    );
  }
  f = message.getInsertCodeAction();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.InsertCode.serializeBinaryToWriter
    );
  }
};


/**
 * optional SetVariable set_variable_action = 1;
 * @return {?proto.SetVariable}
 */
proto.Action.prototype.getSetVariableAction = function() {
  return /** @type{?proto.SetVariable} */ (
    jspb.Message.getWrapperField(this, proto.SetVariable, 1));
};


/**
 * @param {?proto.SetVariable|undefined} value
 * @return {!proto.Action} returns this
*/
proto.Action.prototype.setSetVariableAction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.Action.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Action} returns this
 */
proto.Action.prototype.clearSetVariableAction = function() {
  return this.setSetVariableAction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Action.prototype.hasSetVariableAction = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional WaitForVariable wait_for_variable_action = 2;
 * @return {?proto.WaitForVariable}
 */
proto.Action.prototype.getWaitForVariableAction = function() {
  return /** @type{?proto.WaitForVariable} */ (
    jspb.Message.getWrapperField(this, proto.WaitForVariable, 2));
};


/**
 * @param {?proto.WaitForVariable|undefined} value
 * @return {!proto.Action} returns this
*/
proto.Action.prototype.setWaitForVariableAction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.Action.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Action} returns this
 */
proto.Action.prototype.clearWaitForVariableAction = function() {
  return this.setWaitForVariableAction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Action.prototype.hasWaitForVariableAction = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Hold hold_action = 3;
 * @return {?proto.Hold}
 */
proto.Action.prototype.getHoldAction = function() {
  return /** @type{?proto.Hold} */ (
    jspb.Message.getWrapperField(this, proto.Hold, 3));
};


/**
 * @param {?proto.Hold|undefined} value
 * @return {!proto.Action} returns this
*/
proto.Action.prototype.setHoldAction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.Action.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Action} returns this
 */
proto.Action.prototype.clearHoldAction = function() {
  return this.setHoldAction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Action.prototype.hasHoldAction = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Ping ping_action = 4;
 * @return {?proto.Ping}
 */
proto.Action.prototype.getPingAction = function() {
  return /** @type{?proto.Ping} */ (
    jspb.Message.getWrapperField(this, proto.Ping, 4));
};


/**
 * @param {?proto.Ping|undefined} value
 * @return {!proto.Action} returns this
*/
proto.Action.prototype.setPingAction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.Action.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Action} returns this
 */
proto.Action.prototype.clearPingAction = function() {
  return this.setPingAction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Action.prototype.hasPingAction = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional InsertCode insert_code_action = 5;
 * @return {?proto.InsertCode}
 */
proto.Action.prototype.getInsertCodeAction = function() {
  return /** @type{?proto.InsertCode} */ (
    jspb.Message.getWrapperField(this, proto.InsertCode, 5));
};


/**
 * @param {?proto.InsertCode|undefined} value
 * @return {!proto.Action} returns this
*/
proto.Action.prototype.setInsertCodeAction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.Action.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Action} returns this
 */
proto.Action.prototype.clearInsertCodeAction = function() {
  return this.setInsertCodeAction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Action.prototype.hasInsertCodeAction = function() {
  return jspb.Message.getField(this, 5) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetVariable.prototype.toObject = function(opt_includeInstance) {
  return proto.SetVariable.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetVariable} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetVariable.toObject = function(includeInstance, msg) {
  var f, obj = {
    newState: (f = msg.getNewState()) && proto.Variable.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetVariable}
 */
proto.SetVariable.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetVariable;
  return proto.SetVariable.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetVariable} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetVariable}
 */
proto.SetVariable.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Variable;
      reader.readMessage(value,proto.Variable.deserializeBinaryFromReader);
      msg.setNewState(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetVariable.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetVariable.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetVariable} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetVariable.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNewState();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.Variable.serializeBinaryToWriter
    );
  }
};


/**
 * optional Variable new_state = 1;
 * @return {?proto.Variable}
 */
proto.SetVariable.prototype.getNewState = function() {
  return /** @type{?proto.Variable} */ (
    jspb.Message.getWrapperField(this, proto.Variable, 1));
};


/**
 * @param {?proto.Variable|undefined} value
 * @return {!proto.SetVariable} returns this
*/
proto.SetVariable.prototype.setNewState = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.SetVariable} returns this
 */
proto.SetVariable.prototype.clearNewState = function() {
  return this.setNewState(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.SetVariable.prototype.hasNewState = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.WaitForVariable.prototype.toObject = function(opt_includeInstance) {
  return proto.WaitForVariable.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.WaitForVariable} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.WaitForVariable.toObject = function(includeInstance, msg) {
  var f, obj = {
    awaitState: (f = msg.getAwaitState()) && proto.Variable.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.WaitForVariable}
 */
proto.WaitForVariable.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.WaitForVariable;
  return proto.WaitForVariable.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.WaitForVariable} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.WaitForVariable}
 */
proto.WaitForVariable.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Variable;
      reader.readMessage(value,proto.Variable.deserializeBinaryFromReader);
      msg.setAwaitState(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.WaitForVariable.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.WaitForVariable.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.WaitForVariable} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.WaitForVariable.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAwaitState();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.Variable.serializeBinaryToWriter
    );
  }
};


/**
 * optional Variable await_state = 1;
 * @return {?proto.Variable}
 */
proto.WaitForVariable.prototype.getAwaitState = function() {
  return /** @type{?proto.Variable} */ (
    jspb.Message.getWrapperField(this, proto.Variable, 1));
};


/**
 * @param {?proto.Variable|undefined} value
 * @return {!proto.WaitForVariable} returns this
*/
proto.WaitForVariable.prototype.setAwaitState = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.WaitForVariable} returns this
 */
proto.WaitForVariable.prototype.clearAwaitState = function() {
  return this.setAwaitState(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.WaitForVariable.prototype.hasAwaitState = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Hold.prototype.toObject = function(opt_includeInstance) {
  return proto.Hold.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Hold} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Hold.toObject = function(includeInstance, msg) {
  var f, obj = {
    holdMs: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Hold}
 */
proto.Hold.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Hold;
  return proto.Hold.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Hold} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Hold}
 */
proto.Hold.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setHoldMs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Hold.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Hold.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Hold} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Hold.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHoldMs();
  if (f !== 0.0) {
    writer.writeFloat(
      1,
      f
    );
  }
};


/**
 * optional float hold_ms = 1;
 * @return {number}
 */
proto.Hold.prototype.getHoldMs = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Hold} returns this
 */
proto.Hold.prototype.setHoldMs = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Ping.prototype.toObject = function(opt_includeInstance) {
  return proto.Ping.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Ping} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Ping.toObject = function(includeInstance, msg) {
  var f, obj = {
    payload: jspb.Message.getFieldWithDefault(msg, 1, ""),
    timeMs: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Ping}
 */
proto.Ping.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Ping;
  return proto.Ping.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Ping} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Ping}
 */
proto.Ping.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPayload(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimeMs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Ping.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Ping.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Ping} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Ping.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPayload();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTimeMs();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional string payload = 1;
 * @return {string}
 */
proto.Ping.prototype.getPayload = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.Ping} returns this
 */
proto.Ping.prototype.setPayload = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 time_ms = 2;
 * @return {number}
 */
proto.Ping.prototype.getTimeMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.Ping} returns this
 */
proto.Ping.prototype.setTimeMs = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.InsertCode.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.InsertCode.prototype.toObject = function(opt_includeInstance) {
  return proto.InsertCode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.InsertCode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.InsertCode.toObject = function(includeInstance, msg) {
  var f, obj = {
    codeList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.InsertCode}
 */
proto.InsertCode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.InsertCode;
  return proto.InsertCode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.InsertCode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.InsertCode}
 */
proto.InsertCode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.InsertCode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.InsertCode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.InsertCode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.InsertCode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCodeList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string code = 1;
 * @return {!Array<string>}
 */
proto.InsertCode.prototype.getCodeList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.InsertCode} returns this
 */
proto.InsertCode.prototype.setCodeList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.InsertCode} returns this
 */
proto.InsertCode.prototype.addCode = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.InsertCode} returns this
 */
proto.InsertCode.prototype.clearCodeList = function() {
  return this.setCodeList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.SimulationResult.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SimulationResult.prototype.toObject = function(opt_includeInstance) {
  return proto.SimulationResult.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SimulationResult} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SimulationResult.toObject = function(includeInstance, msg) {
  var f, obj = {
    simulationResultsList: jspb.Message.toObjectList(msg.getSimulationResultsList(),
    proto.SimulationResultUnit.toObject, includeInstance),
    isValid: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    time: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    code: jspb.Message.getFieldWithDefault(msg, 4, ""),
    data: (f = msg.getData()) && proto.MetaData.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SimulationResult}
 */
proto.SimulationResult.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SimulationResult;
  return proto.SimulationResult.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SimulationResult} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SimulationResult}
 */
proto.SimulationResult.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.SimulationResultUnit;
      reader.readMessage(value,proto.SimulationResultUnit.deserializeBinaryFromReader);
      msg.addSimulationResults(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsValid(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setTime(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setCode(value);
      break;
    case 5:
      var value = new proto.MetaData;
      reader.readMessage(value,proto.MetaData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SimulationResult.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SimulationResult.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SimulationResult} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SimulationResult.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSimulationResultsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.SimulationResultUnit.serializeBinaryToWriter
    );
  }
  f = message.getIsValid();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getTime();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getCode();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.MetaData.serializeBinaryToWriter
    );
  }
};


/**
 * repeated SimulationResultUnit simulation_results = 1;
 * @return {!Array<!proto.SimulationResultUnit>}
 */
proto.SimulationResult.prototype.getSimulationResultsList = function() {
  return /** @type{!Array<!proto.SimulationResultUnit>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.SimulationResultUnit, 1));
};


/**
 * @param {!Array<!proto.SimulationResultUnit>} value
 * @return {!proto.SimulationResult} returns this
*/
proto.SimulationResult.prototype.setSimulationResultsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.SimulationResultUnit=} opt_value
 * @param {number=} opt_index
 * @return {!proto.SimulationResultUnit}
 */
proto.SimulationResult.prototype.addSimulationResults = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.SimulationResultUnit, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.SimulationResult} returns this
 */
proto.SimulationResult.prototype.clearSimulationResultsList = function() {
  return this.setSimulationResultsList([]);
};


/**
 * optional bool is_valid = 2;
 * @return {boolean}
 */
proto.SimulationResult.prototype.getIsValid = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.SimulationResult} returns this
 */
proto.SimulationResult.prototype.setIsValid = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional float time = 3;
 * @return {number}
 */
proto.SimulationResult.prototype.getTime = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SimulationResult} returns this
 */
proto.SimulationResult.prototype.setTime = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional string code = 4;
 * @return {string}
 */
proto.SimulationResult.prototype.getCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.SimulationResult} returns this
 */
proto.SimulationResult.prototype.setCode = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional MetaData data = 5;
 * @return {?proto.MetaData}
 */
proto.SimulationResult.prototype.getData = function() {
  return /** @type{?proto.MetaData} */ (
    jspb.Message.getWrapperField(this, proto.MetaData, 5));
};


/**
 * @param {?proto.MetaData|undefined} value
 * @return {!proto.SimulationResult} returns this
*/
proto.SimulationResult.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.SimulationResult} returns this
 */
proto.SimulationResult.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.SimulationResult.prototype.hasData = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.SimulationResultUnit.repeatedFields_ = [1,4,5,6,7,8];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SimulationResultUnit.prototype.toObject = function(opt_includeInstance) {
  return proto.SimulationResultUnit.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SimulationResultUnit} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SimulationResultUnit.toObject = function(includeInstance, msg) {
  var f, obj = {
    axisValuesList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 1)) == null ? undefined : f,
    position: (f = msg.getPosition()) && proto.Matrix4x4.toObject(includeInstance, f),
    time: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    collisionList: (f = jspb.Message.getRepeatedBooleanField(msg, 4)) == null ? undefined : f,
    singularityList: (f = jspb.Message.getRepeatedBooleanField(msg, 5)) == null ? undefined : f,
    outofreachList: (f = jspb.Message.getRepeatedBooleanField(msg, 6)) == null ? undefined : f,
    externalAxisValuesList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 7)) == null ? undefined : f,
    externalAxisOutofreachList: (f = jspb.Message.getRepeatedBooleanField(msg, 8)) == null ? undefined : f,
    interpolationFactor: jspb.Message.getFloatingPointFieldWithDefault(msg, 9, 0.0),
    id: jspb.Message.getFieldWithDefault(msg, 10, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SimulationResultUnit}
 */
proto.SimulationResultUnit.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SimulationResultUnit;
  return proto.SimulationResultUnit.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SimulationResultUnit} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SimulationResultUnit}
 */
proto.SimulationResultUnit.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setAxisValuesList(value);
      break;
    case 2:
      var value = new proto.Matrix4x4;
      reader.readMessage(value,proto.Matrix4x4.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setTime(value);
      break;
    case 4:
      var value = /** @type {!Array<boolean>} */ (reader.readPackedBool());
      msg.setCollisionList(value);
      break;
    case 5:
      var value = /** @type {!Array<boolean>} */ (reader.readPackedBool());
      msg.setSingularityList(value);
      break;
    case 6:
      var value = /** @type {!Array<boolean>} */ (reader.readPackedBool());
      msg.setOutofreachList(value);
      break;
    case 7:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setExternalAxisValuesList(value);
      break;
    case 8:
      var value = /** @type {!Array<boolean>} */ (reader.readPackedBool());
      msg.setExternalAxisOutofreachList(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setInterpolationFactor(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SimulationResultUnit.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SimulationResultUnit.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SimulationResultUnit} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SimulationResultUnit.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAxisValuesList();
  if (f.length > 0) {
    writer.writePackedFloat(
      1,
      f
    );
  }
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.Matrix4x4.serializeBinaryToWriter
    );
  }
  f = message.getTime();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getCollisionList();
  if (f.length > 0) {
    writer.writePackedBool(
      4,
      f
    );
  }
  f = message.getSingularityList();
  if (f.length > 0) {
    writer.writePackedBool(
      5,
      f
    );
  }
  f = message.getOutofreachList();
  if (f.length > 0) {
    writer.writePackedBool(
      6,
      f
    );
  }
  f = message.getExternalAxisValuesList();
  if (f.length > 0) {
    writer.writePackedFloat(
      7,
      f
    );
  }
  f = message.getExternalAxisOutofreachList();
  if (f.length > 0) {
    writer.writePackedBool(
      8,
      f
    );
  }
  f = message.getInterpolationFactor();
  if (f !== 0.0) {
    writer.writeFloat(
      9,
      f
    );
  }
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
};


/**
 * repeated float axis_values = 1;
 * @return {!Array<number>}
 */
proto.SimulationResultUnit.prototype.getAxisValuesList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.setAxisValuesList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.addAxisValues = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.clearAxisValuesList = function() {
  return this.setAxisValuesList([]);
};


/**
 * optional Matrix4x4 position = 2;
 * @return {?proto.Matrix4x4}
 */
proto.SimulationResultUnit.prototype.getPosition = function() {
  return /** @type{?proto.Matrix4x4} */ (
    jspb.Message.getWrapperField(this, proto.Matrix4x4, 2));
};


/**
 * @param {?proto.Matrix4x4|undefined} value
 * @return {!proto.SimulationResultUnit} returns this
*/
proto.SimulationResultUnit.prototype.setPosition = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.clearPosition = function() {
  return this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.SimulationResultUnit.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional float time = 3;
 * @return {number}
 */
proto.SimulationResultUnit.prototype.getTime = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.setTime = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * repeated bool collision = 4;
 * @return {!Array<boolean>}
 */
proto.SimulationResultUnit.prototype.getCollisionList = function() {
  return /** @type {!Array<boolean>} */ (jspb.Message.getRepeatedBooleanField(this, 4));
};


/**
 * @param {!Array<boolean>} value
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.setCollisionList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {boolean} value
 * @param {number=} opt_index
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.addCollision = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.clearCollisionList = function() {
  return this.setCollisionList([]);
};


/**
 * repeated bool singularity = 5;
 * @return {!Array<boolean>}
 */
proto.SimulationResultUnit.prototype.getSingularityList = function() {
  return /** @type {!Array<boolean>} */ (jspb.Message.getRepeatedBooleanField(this, 5));
};


/**
 * @param {!Array<boolean>} value
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.setSingularityList = function(value) {
  return jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {boolean} value
 * @param {number=} opt_index
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.addSingularity = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.clearSingularityList = function() {
  return this.setSingularityList([]);
};


/**
 * repeated bool outofreach = 6;
 * @return {!Array<boolean>}
 */
proto.SimulationResultUnit.prototype.getOutofreachList = function() {
  return /** @type {!Array<boolean>} */ (jspb.Message.getRepeatedBooleanField(this, 6));
};


/**
 * @param {!Array<boolean>} value
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.setOutofreachList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {boolean} value
 * @param {number=} opt_index
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.addOutofreach = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.clearOutofreachList = function() {
  return this.setOutofreachList([]);
};


/**
 * repeated float external_axis_values = 7;
 * @return {!Array<number>}
 */
proto.SimulationResultUnit.prototype.getExternalAxisValuesList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 7));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.setExternalAxisValuesList = function(value) {
  return jspb.Message.setField(this, 7, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.addExternalAxisValues = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 7, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.clearExternalAxisValuesList = function() {
  return this.setExternalAxisValuesList([]);
};


/**
 * repeated bool external_axis_outofreach = 8;
 * @return {!Array<boolean>}
 */
proto.SimulationResultUnit.prototype.getExternalAxisOutofreachList = function() {
  return /** @type {!Array<boolean>} */ (jspb.Message.getRepeatedBooleanField(this, 8));
};


/**
 * @param {!Array<boolean>} value
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.setExternalAxisOutofreachList = function(value) {
  return jspb.Message.setField(this, 8, value || []);
};


/**
 * @param {boolean} value
 * @param {number=} opt_index
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.addExternalAxisOutofreach = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 8, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.clearExternalAxisOutofreachList = function() {
  return this.setExternalAxisOutofreachList([]);
};


/**
 * optional float interpolation_factor = 9;
 * @return {number}
 */
proto.SimulationResultUnit.prototype.getInterpolationFactor = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 9, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.setInterpolationFactor = function(value) {
  return jspb.Message.setProto3FloatField(this, 9, value);
};


/**
 * optional string id = 10;
 * @return {string}
 */
proto.SimulationResultUnit.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.SimulationResultUnit} returns this
 */
proto.SimulationResultUnit.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.RobotState.repeatedFields_ = [2,8,9];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.RobotState.prototype.toObject = function(opt_includeInstance) {
  return proto.RobotState.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.RobotState} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RobotState.toObject = function(includeInstance, msg) {
  var f, obj = {
    actualAxisPosition: (f = msg.getActualAxisPosition()) && proto.JointTarget.toObject(includeInstance, f),
    robotTransformationsList: jspb.Message.toObjectList(msg.getRobotTransformationsList(),
    proto.TransformationArray.toObject, includeInstance),
    toolpathIndex: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    toolId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    toolFrame: (f = msg.getToolFrame()) && proto.Matrix4x4.toObject(includeInstance, f),
    rootFrame: (f = msg.getRootFrame()) && proto.Matrix4x4.toObject(includeInstance, f),
    flangeFrame: (f = msg.getFlangeFrame()) && proto.Matrix4x4.toObject(includeInstance, f),
    axisAlarmList: (f = jspb.Message.getRepeatedBooleanField(msg, 8)) == null ? undefined : f,
    externalAxisAlarmList: (f = jspb.Message.getRepeatedBooleanField(msg, 9)) == null ? undefined : f,
    variablesMap: (f = msg.getVariablesMap()) ? f.toObject(includeInstance, proto.VariableArray.toObject) : [],
    dataMap: (f = msg.getDataMap()) ? f.toObject(includeInstance, undefined) : [],
    connectionFeedback: jspb.Message.getFieldWithDefault(msg, 12, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.RobotState}
 */
proto.RobotState.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.RobotState;
  return proto.RobotState.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.RobotState} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.RobotState}
 */
proto.RobotState.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.JointTarget;
      reader.readMessage(value,proto.JointTarget.deserializeBinaryFromReader);
      msg.setActualAxisPosition(value);
      break;
    case 2:
      var value = new proto.TransformationArray;
      reader.readMessage(value,proto.TransformationArray.deserializeBinaryFromReader);
      msg.addRobotTransformations(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setToolpathIndex(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setToolId(value);
      break;
    case 5:
      var value = new proto.Matrix4x4;
      reader.readMessage(value,proto.Matrix4x4.deserializeBinaryFromReader);
      msg.setToolFrame(value);
      break;
    case 6:
      var value = new proto.Matrix4x4;
      reader.readMessage(value,proto.Matrix4x4.deserializeBinaryFromReader);
      msg.setRootFrame(value);
      break;
    case 7:
      var value = new proto.Matrix4x4;
      reader.readMessage(value,proto.Matrix4x4.deserializeBinaryFromReader);
      msg.setFlangeFrame(value);
      break;
    case 8:
      var value = /** @type {!Array<boolean>} */ (reader.readPackedBool());
      msg.setAxisAlarmList(value);
      break;
    case 9:
      var value = /** @type {!Array<boolean>} */ (reader.readPackedBool());
      msg.setExternalAxisAlarmList(value);
      break;
    case 10:
      var value = msg.getVariablesMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.VariableArray.deserializeBinaryFromReader, "", new proto.VariableArray());
         });
      break;
    case 11:
      var value = msg.getDataMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setConnectionFeedback(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.RobotState.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.RobotState.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.RobotState} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RobotState.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getActualAxisPosition();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.JointTarget.serializeBinaryToWriter
    );
  }
  f = message.getRobotTransformationsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.TransformationArray.serializeBinaryToWriter
    );
  }
  f = message.getToolpathIndex();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getToolId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getToolFrame();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.Matrix4x4.serializeBinaryToWriter
    );
  }
  f = message.getRootFrame();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.Matrix4x4.serializeBinaryToWriter
    );
  }
  f = message.getFlangeFrame();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.Matrix4x4.serializeBinaryToWriter
    );
  }
  f = message.getAxisAlarmList();
  if (f.length > 0) {
    writer.writePackedBool(
      8,
      f
    );
  }
  f = message.getExternalAxisAlarmList();
  if (f.length > 0) {
    writer.writePackedBool(
      9,
      f
    );
  }
  f = message.getVariablesMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(10, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.VariableArray.serializeBinaryToWriter);
  }
  f = message.getDataMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(11, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
  f = message.getConnectionFeedback();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
};


/**
 * optional JointTarget actual_axis_position = 1;
 * @return {?proto.JointTarget}
 */
proto.RobotState.prototype.getActualAxisPosition = function() {
  return /** @type{?proto.JointTarget} */ (
    jspb.Message.getWrapperField(this, proto.JointTarget, 1));
};


/**
 * @param {?proto.JointTarget|undefined} value
 * @return {!proto.RobotState} returns this
*/
proto.RobotState.prototype.setActualAxisPosition = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.clearActualAxisPosition = function() {
  return this.setActualAxisPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.RobotState.prototype.hasActualAxisPosition = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated TransformationArray robot_transformations = 2;
 * @return {!Array<!proto.TransformationArray>}
 */
proto.RobotState.prototype.getRobotTransformationsList = function() {
  return /** @type{!Array<!proto.TransformationArray>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.TransformationArray, 2));
};


/**
 * @param {!Array<!proto.TransformationArray>} value
 * @return {!proto.RobotState} returns this
*/
proto.RobotState.prototype.setRobotTransformationsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.TransformationArray=} opt_value
 * @param {number=} opt_index
 * @return {!proto.TransformationArray}
 */
proto.RobotState.prototype.addRobotTransformations = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.TransformationArray, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.clearRobotTransformationsList = function() {
  return this.setRobotTransformationsList([]);
};


/**
 * optional float toolpath_index = 3;
 * @return {number}
 */
proto.RobotState.prototype.getToolpathIndex = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.setToolpathIndex = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional string tool_id = 4;
 * @return {string}
 */
proto.RobotState.prototype.getToolId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.setToolId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional Matrix4x4 tool_frame = 5;
 * @return {?proto.Matrix4x4}
 */
proto.RobotState.prototype.getToolFrame = function() {
  return /** @type{?proto.Matrix4x4} */ (
    jspb.Message.getWrapperField(this, proto.Matrix4x4, 5));
};


/**
 * @param {?proto.Matrix4x4|undefined} value
 * @return {!proto.RobotState} returns this
*/
proto.RobotState.prototype.setToolFrame = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.clearToolFrame = function() {
  return this.setToolFrame(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.RobotState.prototype.hasToolFrame = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional Matrix4x4 root_frame = 6;
 * @return {?proto.Matrix4x4}
 */
proto.RobotState.prototype.getRootFrame = function() {
  return /** @type{?proto.Matrix4x4} */ (
    jspb.Message.getWrapperField(this, proto.Matrix4x4, 6));
};


/**
 * @param {?proto.Matrix4x4|undefined} value
 * @return {!proto.RobotState} returns this
*/
proto.RobotState.prototype.setRootFrame = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.clearRootFrame = function() {
  return this.setRootFrame(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.RobotState.prototype.hasRootFrame = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional Matrix4x4 flange_frame = 7;
 * @return {?proto.Matrix4x4}
 */
proto.RobotState.prototype.getFlangeFrame = function() {
  return /** @type{?proto.Matrix4x4} */ (
    jspb.Message.getWrapperField(this, proto.Matrix4x4, 7));
};


/**
 * @param {?proto.Matrix4x4|undefined} value
 * @return {!proto.RobotState} returns this
*/
proto.RobotState.prototype.setFlangeFrame = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.clearFlangeFrame = function() {
  return this.setFlangeFrame(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.RobotState.prototype.hasFlangeFrame = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * repeated bool axis_alarm = 8;
 * @return {!Array<boolean>}
 */
proto.RobotState.prototype.getAxisAlarmList = function() {
  return /** @type {!Array<boolean>} */ (jspb.Message.getRepeatedBooleanField(this, 8));
};


/**
 * @param {!Array<boolean>} value
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.setAxisAlarmList = function(value) {
  return jspb.Message.setField(this, 8, value || []);
};


/**
 * @param {boolean} value
 * @param {number=} opt_index
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.addAxisAlarm = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 8, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.clearAxisAlarmList = function() {
  return this.setAxisAlarmList([]);
};


/**
 * repeated bool external_axis_alarm = 9;
 * @return {!Array<boolean>}
 */
proto.RobotState.prototype.getExternalAxisAlarmList = function() {
  return /** @type {!Array<boolean>} */ (jspb.Message.getRepeatedBooleanField(this, 9));
};


/**
 * @param {!Array<boolean>} value
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.setExternalAxisAlarmList = function(value) {
  return jspb.Message.setField(this, 9, value || []);
};


/**
 * @param {boolean} value
 * @param {number=} opt_index
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.addExternalAxisAlarm = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 9, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.clearExternalAxisAlarmList = function() {
  return this.setExternalAxisAlarmList([]);
};


/**
 * map<string, VariableArray> variables = 10;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.VariableArray>}
 */
proto.RobotState.prototype.getVariablesMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.VariableArray>} */ (
      jspb.Message.getMapField(this, 10, opt_noLazyCreate,
      proto.VariableArray));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.clearVariablesMap = function() {
  this.getVariablesMap().clear();
  return this;};


/**
 * map<string, string> data = 11;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.RobotState.prototype.getDataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 11, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.clearDataMap = function() {
  this.getDataMap().clear();
  return this;};


/**
 * optional string connection_feedback = 12;
 * @return {string}
 */
proto.RobotState.prototype.getConnectionFeedback = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.RobotState} returns this
 */
proto.RobotState.prototype.setConnectionFeedback = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Task.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Task.prototype.toObject = function(opt_includeInstance) {
  return proto.Task.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Task} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Task.toObject = function(includeInstance, msg) {
  var f, obj = {
    payloadList: jspb.Message.toObjectList(msg.getPayloadList(),
    proto.TaskPayload.toObject, includeInstance),
    type: jspb.Message.getFieldWithDefault(msg, 2, 0),
    name: jspb.Message.getFieldWithDefault(msg, 3, ""),
    data: (f = msg.getData()) && proto.MetaData.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Task}
 */
proto.Task.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Task;
  return proto.Task.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Task} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Task}
 */
proto.Task.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.TaskPayload;
      reader.readMessage(value,proto.TaskPayload.deserializeBinaryFromReader);
      msg.addPayload(value);
      break;
    case 2:
      var value = /** @type {!proto.TaskType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 4:
      var value = new proto.MetaData;
      reader.readMessage(value,proto.MetaData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Task.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Task.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Task} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Task.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPayloadList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.TaskPayload.serializeBinaryToWriter
    );
  }
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.MetaData.serializeBinaryToWriter
    );
  }
};


/**
 * repeated TaskPayload payload = 1;
 * @return {!Array<!proto.TaskPayload>}
 */
proto.Task.prototype.getPayloadList = function() {
  return /** @type{!Array<!proto.TaskPayload>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.TaskPayload, 1));
};


/**
 * @param {!Array<!proto.TaskPayload>} value
 * @return {!proto.Task} returns this
*/
proto.Task.prototype.setPayloadList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.TaskPayload=} opt_value
 * @param {number=} opt_index
 * @return {!proto.TaskPayload}
 */
proto.Task.prototype.addPayload = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.TaskPayload, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Task} returns this
 */
proto.Task.prototype.clearPayloadList = function() {
  return this.setPayloadList([]);
};


/**
 * optional TaskType type = 2;
 * @return {!proto.TaskType}
 */
proto.Task.prototype.getType = function() {
  return /** @type {!proto.TaskType} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.TaskType} value
 * @return {!proto.Task} returns this
 */
proto.Task.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional string name = 3;
 * @return {string}
 */
proto.Task.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.Task} returns this
 */
proto.Task.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional MetaData data = 4;
 * @return {?proto.MetaData}
 */
proto.Task.prototype.getData = function() {
  return /** @type{?proto.MetaData} */ (
    jspb.Message.getWrapperField(this, proto.MetaData, 4));
};


/**
 * @param {?proto.MetaData|undefined} value
 * @return {!proto.Task} returns this
*/
proto.Task.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Task} returns this
 */
proto.Task.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Task.prototype.hasData = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.TaskPayload.oneofGroups_ = [[1,2,3]];

/**
 * @enum {number}
 */
proto.TaskPayload.PayloadCase = {
  PAYLOAD_NOT_SET: 0,
  FLOW_TASK: 1,
  MOTION_GROUP_TASK: 2,
  ACTION_TASK: 3
};

/**
 * @return {proto.TaskPayload.PayloadCase}
 */
proto.TaskPayload.prototype.getPayloadCase = function() {
  return /** @type {proto.TaskPayload.PayloadCase} */(jspb.Message.computeOneofCase(this, proto.TaskPayload.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.TaskPayload.prototype.toObject = function(opt_includeInstance) {
  return proto.TaskPayload.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.TaskPayload} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.TaskPayload.toObject = function(includeInstance, msg) {
  var f, obj = {
    flowTask: (f = msg.getFlowTask()) && proto.Flow.toObject(includeInstance, f),
    motionGroupTask: (f = msg.getMotionGroupTask()) && proto.MotionGroup.toObject(includeInstance, f),
    actionTask: (f = msg.getActionTask()) && proto.Action.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.TaskPayload}
 */
proto.TaskPayload.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.TaskPayload;
  return proto.TaskPayload.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.TaskPayload} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.TaskPayload}
 */
proto.TaskPayload.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Flow;
      reader.readMessage(value,proto.Flow.deserializeBinaryFromReader);
      msg.setFlowTask(value);
      break;
    case 2:
      var value = new proto.MotionGroup;
      reader.readMessage(value,proto.MotionGroup.deserializeBinaryFromReader);
      msg.setMotionGroupTask(value);
      break;
    case 3:
      var value = new proto.Action;
      reader.readMessage(value,proto.Action.deserializeBinaryFromReader);
      msg.setActionTask(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.TaskPayload.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.TaskPayload.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.TaskPayload} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.TaskPayload.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFlowTask();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.Flow.serializeBinaryToWriter
    );
  }
  f = message.getMotionGroupTask();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.MotionGroup.serializeBinaryToWriter
    );
  }
  f = message.getActionTask();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.Action.serializeBinaryToWriter
    );
  }
};


/**
 * optional Flow flow_task = 1;
 * @return {?proto.Flow}
 */
proto.TaskPayload.prototype.getFlowTask = function() {
  return /** @type{?proto.Flow} */ (
    jspb.Message.getWrapperField(this, proto.Flow, 1));
};


/**
 * @param {?proto.Flow|undefined} value
 * @return {!proto.TaskPayload} returns this
*/
proto.TaskPayload.prototype.setFlowTask = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.TaskPayload.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.TaskPayload} returns this
 */
proto.TaskPayload.prototype.clearFlowTask = function() {
  return this.setFlowTask(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.TaskPayload.prototype.hasFlowTask = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional MotionGroup motion_group_task = 2;
 * @return {?proto.MotionGroup}
 */
proto.TaskPayload.prototype.getMotionGroupTask = function() {
  return /** @type{?proto.MotionGroup} */ (
    jspb.Message.getWrapperField(this, proto.MotionGroup, 2));
};


/**
 * @param {?proto.MotionGroup|undefined} value
 * @return {!proto.TaskPayload} returns this
*/
proto.TaskPayload.prototype.setMotionGroupTask = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.TaskPayload.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.TaskPayload} returns this
 */
proto.TaskPayload.prototype.clearMotionGroupTask = function() {
  return this.setMotionGroupTask(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.TaskPayload.prototype.hasMotionGroupTask = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Action action_task = 3;
 * @return {?proto.Action}
 */
proto.TaskPayload.prototype.getActionTask = function() {
  return /** @type{?proto.Action} */ (
    jspb.Message.getWrapperField(this, proto.Action, 3));
};


/**
 * @param {?proto.Action|undefined} value
 * @return {!proto.TaskPayload} returns this
*/
proto.TaskPayload.prototype.setActionTask = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.TaskPayload.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.TaskPayload} returns this
 */
proto.TaskPayload.prototype.clearActionTask = function() {
  return this.setActionTask(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.TaskPayload.prototype.hasActionTask = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.Flow.oneofGroups_ = [[2,3,4]];

/**
 * @enum {number}
 */
proto.Flow.FlowNodeCase = {
  FLOW_NODE_NOT_SET: 0,
  IF_ELSE_FLOW: 2,
  WHILE_FLOW: 3,
  END_FLOW: 4
};

/**
 * @return {proto.Flow.FlowNodeCase}
 */
proto.Flow.prototype.getFlowNodeCase = function() {
  return /** @type {proto.Flow.FlowNodeCase} */(jspb.Message.computeOneofCase(this, proto.Flow.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Flow.prototype.toObject = function(opt_includeInstance) {
  return proto.Flow.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Flow} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Flow.toObject = function(includeInstance, msg) {
  var f, obj = {
    ifElseFlow: (f = msg.getIfElseFlow()) && proto.IfElse.toObject(includeInstance, f),
    whileFlow: (f = msg.getWhileFlow()) && proto.While.toObject(includeInstance, f),
    endFlow: (f = msg.getEndFlow()) && proto.End.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Flow}
 */
proto.Flow.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Flow;
  return proto.Flow.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Flow} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Flow}
 */
proto.Flow.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = new proto.IfElse;
      reader.readMessage(value,proto.IfElse.deserializeBinaryFromReader);
      msg.setIfElseFlow(value);
      break;
    case 3:
      var value = new proto.While;
      reader.readMessage(value,proto.While.deserializeBinaryFromReader);
      msg.setWhileFlow(value);
      break;
    case 4:
      var value = new proto.End;
      reader.readMessage(value,proto.End.deserializeBinaryFromReader);
      msg.setEndFlow(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Flow.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Flow.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Flow} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Flow.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIfElseFlow();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.IfElse.serializeBinaryToWriter
    );
  }
  f = message.getWhileFlow();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.While.serializeBinaryToWriter
    );
  }
  f = message.getEndFlow();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.End.serializeBinaryToWriter
    );
  }
};


/**
 * optional IfElse if_else_flow = 2;
 * @return {?proto.IfElse}
 */
proto.Flow.prototype.getIfElseFlow = function() {
  return /** @type{?proto.IfElse} */ (
    jspb.Message.getWrapperField(this, proto.IfElse, 2));
};


/**
 * @param {?proto.IfElse|undefined} value
 * @return {!proto.Flow} returns this
*/
proto.Flow.prototype.setIfElseFlow = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.Flow.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Flow} returns this
 */
proto.Flow.prototype.clearIfElseFlow = function() {
  return this.setIfElseFlow(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Flow.prototype.hasIfElseFlow = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional While while_flow = 3;
 * @return {?proto.While}
 */
proto.Flow.prototype.getWhileFlow = function() {
  return /** @type{?proto.While} */ (
    jspb.Message.getWrapperField(this, proto.While, 3));
};


/**
 * @param {?proto.While|undefined} value
 * @return {!proto.Flow} returns this
*/
proto.Flow.prototype.setWhileFlow = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.Flow.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Flow} returns this
 */
proto.Flow.prototype.clearWhileFlow = function() {
  return this.setWhileFlow(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Flow.prototype.hasWhileFlow = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional End end_flow = 4;
 * @return {?proto.End}
 */
proto.Flow.prototype.getEndFlow = function() {
  return /** @type{?proto.End} */ (
    jspb.Message.getWrapperField(this, proto.End, 4));
};


/**
 * @param {?proto.End|undefined} value
 * @return {!proto.Flow} returns this
*/
proto.Flow.prototype.setEndFlow = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.Flow.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Flow} returns this
 */
proto.Flow.prototype.clearEndFlow = function() {
  return this.setEndFlow(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Flow.prototype.hasEndFlow = function() {
  return jspb.Message.getField(this, 4) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.IfElse.prototype.toObject = function(opt_includeInstance) {
  return proto.IfElse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.IfElse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.IfElse.toObject = function(includeInstance, msg) {
  var f, obj = {
    condition: (f = msg.getCondition()) && proto.Variable.toObject(includeInstance, f),
    ifTrue: (f = msg.getIfTrue()) && proto.Task.toObject(includeInstance, f),
    ifFalse: (f = msg.getIfFalse()) && proto.Task.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.IfElse}
 */
proto.IfElse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.IfElse;
  return proto.IfElse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.IfElse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.IfElse}
 */
proto.IfElse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Variable;
      reader.readMessage(value,proto.Variable.deserializeBinaryFromReader);
      msg.setCondition(value);
      break;
    case 2:
      var value = new proto.Task;
      reader.readMessage(value,proto.Task.deserializeBinaryFromReader);
      msg.setIfTrue(value);
      break;
    case 3:
      var value = new proto.Task;
      reader.readMessage(value,proto.Task.deserializeBinaryFromReader);
      msg.setIfFalse(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.IfElse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.IfElse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.IfElse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.IfElse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCondition();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.Variable.serializeBinaryToWriter
    );
  }
  f = message.getIfTrue();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.Task.serializeBinaryToWriter
    );
  }
  f = message.getIfFalse();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.Task.serializeBinaryToWriter
    );
  }
};


/**
 * optional Variable condition = 1;
 * @return {?proto.Variable}
 */
proto.IfElse.prototype.getCondition = function() {
  return /** @type{?proto.Variable} */ (
    jspb.Message.getWrapperField(this, proto.Variable, 1));
};


/**
 * @param {?proto.Variable|undefined} value
 * @return {!proto.IfElse} returns this
*/
proto.IfElse.prototype.setCondition = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.IfElse} returns this
 */
proto.IfElse.prototype.clearCondition = function() {
  return this.setCondition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.IfElse.prototype.hasCondition = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Task if_true = 2;
 * @return {?proto.Task}
 */
proto.IfElse.prototype.getIfTrue = function() {
  return /** @type{?proto.Task} */ (
    jspb.Message.getWrapperField(this, proto.Task, 2));
};


/**
 * @param {?proto.Task|undefined} value
 * @return {!proto.IfElse} returns this
*/
proto.IfElse.prototype.setIfTrue = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.IfElse} returns this
 */
proto.IfElse.prototype.clearIfTrue = function() {
  return this.setIfTrue(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.IfElse.prototype.hasIfTrue = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Task if_false = 3;
 * @return {?proto.Task}
 */
proto.IfElse.prototype.getIfFalse = function() {
  return /** @type{?proto.Task} */ (
    jspb.Message.getWrapperField(this, proto.Task, 3));
};


/**
 * @param {?proto.Task|undefined} value
 * @return {!proto.IfElse} returns this
*/
proto.IfElse.prototype.setIfFalse = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.IfElse} returns this
 */
proto.IfElse.prototype.clearIfFalse = function() {
  return this.setIfFalse(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.IfElse.prototype.hasIfFalse = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.While.prototype.toObject = function(opt_includeInstance) {
  return proto.While.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.While} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.While.toObject = function(includeInstance, msg) {
  var f, obj = {
    condition: (f = msg.getCondition()) && proto.Variable.toObject(includeInstance, f),
    body: (f = msg.getBody()) && proto.Task.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.While}
 */
proto.While.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.While;
  return proto.While.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.While} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.While}
 */
proto.While.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Variable;
      reader.readMessage(value,proto.Variable.deserializeBinaryFromReader);
      msg.setCondition(value);
      break;
    case 2:
      var value = new proto.Task;
      reader.readMessage(value,proto.Task.deserializeBinaryFromReader);
      msg.setBody(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.While.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.While.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.While} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.While.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCondition();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.Variable.serializeBinaryToWriter
    );
  }
  f = message.getBody();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.Task.serializeBinaryToWriter
    );
  }
};


/**
 * optional Variable condition = 1;
 * @return {?proto.Variable}
 */
proto.While.prototype.getCondition = function() {
  return /** @type{?proto.Variable} */ (
    jspb.Message.getWrapperField(this, proto.Variable, 1));
};


/**
 * @param {?proto.Variable|undefined} value
 * @return {!proto.While} returns this
*/
proto.While.prototype.setCondition = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.While} returns this
 */
proto.While.prototype.clearCondition = function() {
  return this.setCondition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.While.prototype.hasCondition = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Task body = 2;
 * @return {?proto.Task}
 */
proto.While.prototype.getBody = function() {
  return /** @type{?proto.Task} */ (
    jspb.Message.getWrapperField(this, proto.Task, 2));
};


/**
 * @param {?proto.Task|undefined} value
 * @return {!proto.While} returns this
*/
proto.While.prototype.setBody = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.While} returns this
 */
proto.While.prototype.clearBody = function() {
  return this.setBody(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.While.prototype.hasBody = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.End.prototype.toObject = function(opt_includeInstance) {
  return proto.End.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.End} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.End.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.End}
 */
proto.End.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.End;
  return proto.End.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.End} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.End}
 */
proto.End.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.End.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.End.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.End} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.End.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.MotionCommand.oneofGroups_ = [[1,2,3,4]];

/**
 * @enum {number}
 */
proto.MotionCommand.CommandCase = {
  COMMAND_NOT_SET: 0,
  AXIS_MOTION: 1,
  CIRCULAR_MOTION: 2,
  PTP_MOTION: 3,
  LIN_MOTION: 4
};

/**
 * @return {proto.MotionCommand.CommandCase}
 */
proto.MotionCommand.prototype.getCommandCase = function() {
  return /** @type {proto.MotionCommand.CommandCase} */(jspb.Message.computeOneofCase(this, proto.MotionCommand.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.MotionCommand.prototype.toObject = function(opt_includeInstance) {
  return proto.MotionCommand.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.MotionCommand} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.MotionCommand.toObject = function(includeInstance, msg) {
  var f, obj = {
    axisMotion: (f = msg.getAxisMotion()) && proto.AxisMotion.toObject(includeInstance, f),
    circularMotion: (f = msg.getCircularMotion()) && proto.CircularMotion.toObject(includeInstance, f),
    ptpMotion: (f = msg.getPtpMotion()) && proto.PTPMotion.toObject(includeInstance, f),
    linMotion: (f = msg.getLinMotion()) && proto.LINMotion.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.MotionCommand}
 */
proto.MotionCommand.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.MotionCommand;
  return proto.MotionCommand.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.MotionCommand} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.MotionCommand}
 */
proto.MotionCommand.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.AxisMotion;
      reader.readMessage(value,proto.AxisMotion.deserializeBinaryFromReader);
      msg.setAxisMotion(value);
      break;
    case 2:
      var value = new proto.CircularMotion;
      reader.readMessage(value,proto.CircularMotion.deserializeBinaryFromReader);
      msg.setCircularMotion(value);
      break;
    case 3:
      var value = new proto.PTPMotion;
      reader.readMessage(value,proto.PTPMotion.deserializeBinaryFromReader);
      msg.setPtpMotion(value);
      break;
    case 4:
      var value = new proto.LINMotion;
      reader.readMessage(value,proto.LINMotion.deserializeBinaryFromReader);
      msg.setLinMotion(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.MotionCommand.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.MotionCommand.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.MotionCommand} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.MotionCommand.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAxisMotion();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.AxisMotion.serializeBinaryToWriter
    );
  }
  f = message.getCircularMotion();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.CircularMotion.serializeBinaryToWriter
    );
  }
  f = message.getPtpMotion();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.PTPMotion.serializeBinaryToWriter
    );
  }
  f = message.getLinMotion();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.LINMotion.serializeBinaryToWriter
    );
  }
};


/**
 * optional AxisMotion axis_motion = 1;
 * @return {?proto.AxisMotion}
 */
proto.MotionCommand.prototype.getAxisMotion = function() {
  return /** @type{?proto.AxisMotion} */ (
    jspb.Message.getWrapperField(this, proto.AxisMotion, 1));
};


/**
 * @param {?proto.AxisMotion|undefined} value
 * @return {!proto.MotionCommand} returns this
*/
proto.MotionCommand.prototype.setAxisMotion = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.MotionCommand.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.MotionCommand} returns this
 */
proto.MotionCommand.prototype.clearAxisMotion = function() {
  return this.setAxisMotion(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.MotionCommand.prototype.hasAxisMotion = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional CircularMotion circular_motion = 2;
 * @return {?proto.CircularMotion}
 */
proto.MotionCommand.prototype.getCircularMotion = function() {
  return /** @type{?proto.CircularMotion} */ (
    jspb.Message.getWrapperField(this, proto.CircularMotion, 2));
};


/**
 * @param {?proto.CircularMotion|undefined} value
 * @return {!proto.MotionCommand} returns this
*/
proto.MotionCommand.prototype.setCircularMotion = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.MotionCommand.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.MotionCommand} returns this
 */
proto.MotionCommand.prototype.clearCircularMotion = function() {
  return this.setCircularMotion(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.MotionCommand.prototype.hasCircularMotion = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional PTPMotion ptp_motion = 3;
 * @return {?proto.PTPMotion}
 */
proto.MotionCommand.prototype.getPtpMotion = function() {
  return /** @type{?proto.PTPMotion} */ (
    jspb.Message.getWrapperField(this, proto.PTPMotion, 3));
};


/**
 * @param {?proto.PTPMotion|undefined} value
 * @return {!proto.MotionCommand} returns this
*/
proto.MotionCommand.prototype.setPtpMotion = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.MotionCommand.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.MotionCommand} returns this
 */
proto.MotionCommand.prototype.clearPtpMotion = function() {
  return this.setPtpMotion(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.MotionCommand.prototype.hasPtpMotion = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional LINMotion lin_motion = 4;
 * @return {?proto.LINMotion}
 */
proto.MotionCommand.prototype.getLinMotion = function() {
  return /** @type{?proto.LINMotion} */ (
    jspb.Message.getWrapperField(this, proto.LINMotion, 4));
};


/**
 * @param {?proto.LINMotion|undefined} value
 * @return {!proto.MotionCommand} returns this
*/
proto.MotionCommand.prototype.setLinMotion = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.MotionCommand.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.MotionCommand} returns this
 */
proto.MotionCommand.prototype.clearLinMotion = function() {
  return this.setLinMotion(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.MotionCommand.prototype.hasLinMotion = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.MotionGroup.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.MotionGroup.prototype.toObject = function(opt_includeInstance) {
  return proto.MotionGroup.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.MotionGroup} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.MotionGroup.toObject = function(includeInstance, msg) {
  var f, obj = {
    motionGroupType: jspb.Message.getFieldWithDefault(msg, 1, 0),
    commandsList: jspb.Message.toObjectList(msg.getCommandsList(),
    proto.MotionCommand.toObject, includeInstance),
    interpolation: jspb.Message.getFieldWithDefault(msg, 3, ""),
    toolId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    robotBase: (f = msg.getRobotBase()) && proto.Base.toObject(includeInstance, f),
    data: (f = msg.getData()) && proto.MetaData.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.MotionGroup}
 */
proto.MotionGroup.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.MotionGroup;
  return proto.MotionGroup.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.MotionGroup} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.MotionGroup}
 */
proto.MotionGroup.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.MotionGroupType} */ (reader.readEnum());
      msg.setMotionGroupType(value);
      break;
    case 2:
      var value = new proto.MotionCommand;
      reader.readMessage(value,proto.MotionCommand.deserializeBinaryFromReader);
      msg.addCommands(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setInterpolation(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setToolId(value);
      break;
    case 5:
      var value = new proto.Base;
      reader.readMessage(value,proto.Base.deserializeBinaryFromReader);
      msg.setRobotBase(value);
      break;
    case 6:
      var value = new proto.MetaData;
      reader.readMessage(value,proto.MetaData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.MotionGroup.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.MotionGroup.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.MotionGroup} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.MotionGroup.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMotionGroupType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getCommandsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.MotionCommand.serializeBinaryToWriter
    );
  }
  f = message.getInterpolation();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getToolId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getRobotBase();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.Base.serializeBinaryToWriter
    );
  }
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.MetaData.serializeBinaryToWriter
    );
  }
};


/**
 * optional MotionGroupType motion_group_type = 1;
 * @return {!proto.MotionGroupType}
 */
proto.MotionGroup.prototype.getMotionGroupType = function() {
  return /** @type {!proto.MotionGroupType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.MotionGroupType} value
 * @return {!proto.MotionGroup} returns this
 */
proto.MotionGroup.prototype.setMotionGroupType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * repeated MotionCommand commands = 2;
 * @return {!Array<!proto.MotionCommand>}
 */
proto.MotionGroup.prototype.getCommandsList = function() {
  return /** @type{!Array<!proto.MotionCommand>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.MotionCommand, 2));
};


/**
 * @param {!Array<!proto.MotionCommand>} value
 * @return {!proto.MotionGroup} returns this
*/
proto.MotionGroup.prototype.setCommandsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.MotionCommand=} opt_value
 * @param {number=} opt_index
 * @return {!proto.MotionCommand}
 */
proto.MotionGroup.prototype.addCommands = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.MotionCommand, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.MotionGroup} returns this
 */
proto.MotionGroup.prototype.clearCommandsList = function() {
  return this.setCommandsList([]);
};


/**
 * optional string interpolation = 3;
 * @return {string}
 */
proto.MotionGroup.prototype.getInterpolation = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.MotionGroup} returns this
 */
proto.MotionGroup.prototype.setInterpolation = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string tool_id = 4;
 * @return {string}
 */
proto.MotionGroup.prototype.getToolId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.MotionGroup} returns this
 */
proto.MotionGroup.prototype.setToolId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional Base robot_base = 5;
 * @return {?proto.Base}
 */
proto.MotionGroup.prototype.getRobotBase = function() {
  return /** @type{?proto.Base} */ (
    jspb.Message.getWrapperField(this, proto.Base, 5));
};


/**
 * @param {?proto.Base|undefined} value
 * @return {!proto.MotionGroup} returns this
*/
proto.MotionGroup.prototype.setRobotBase = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.MotionGroup} returns this
 */
proto.MotionGroup.prototype.clearRobotBase = function() {
  return this.setRobotBase(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.MotionGroup.prototype.hasRobotBase = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional MetaData data = 6;
 * @return {?proto.MetaData}
 */
proto.MotionGroup.prototype.getData = function() {
  return /** @type{?proto.MetaData} */ (
    jspb.Message.getWrapperField(this, proto.MetaData, 6));
};


/**
 * @param {?proto.MetaData|undefined} value
 * @return {!proto.MotionGroup} returns this
*/
proto.MotionGroup.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.MotionGroup} returns this
 */
proto.MotionGroup.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.MotionGroup.prototype.hasData = function() {
  return jspb.Message.getField(this, 6) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.AxisMotion.prototype.toObject = function(opt_includeInstance) {
  return proto.AxisMotion.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.AxisMotion} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.AxisMotion.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.MetaData.toObject(includeInstance, f),
    target: (f = msg.getTarget()) && proto.JointTarget.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.AxisMotion}
 */
proto.AxisMotion.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.AxisMotion;
  return proto.AxisMotion.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.AxisMotion} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.AxisMotion}
 */
proto.AxisMotion.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.MetaData;
      reader.readMessage(value,proto.MetaData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new proto.JointTarget;
      reader.readMessage(value,proto.JointTarget.deserializeBinaryFromReader);
      msg.setTarget(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.AxisMotion.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.AxisMotion.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.AxisMotion} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.AxisMotion.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.MetaData.serializeBinaryToWriter
    );
  }
  f = message.getTarget();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.JointTarget.serializeBinaryToWriter
    );
  }
};


/**
 * optional MetaData data = 1;
 * @return {?proto.MetaData}
 */
proto.AxisMotion.prototype.getData = function() {
  return /** @type{?proto.MetaData} */ (
    jspb.Message.getWrapperField(this, proto.MetaData, 1));
};


/**
 * @param {?proto.MetaData|undefined} value
 * @return {!proto.AxisMotion} returns this
*/
proto.AxisMotion.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.AxisMotion} returns this
 */
proto.AxisMotion.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.AxisMotion.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional JointTarget target = 2;
 * @return {?proto.JointTarget}
 */
proto.AxisMotion.prototype.getTarget = function() {
  return /** @type{?proto.JointTarget} */ (
    jspb.Message.getWrapperField(this, proto.JointTarget, 2));
};


/**
 * @param {?proto.JointTarget|undefined} value
 * @return {!proto.AxisMotion} returns this
*/
proto.AxisMotion.prototype.setTarget = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.AxisMotion} returns this
 */
proto.AxisMotion.prototype.clearTarget = function() {
  return this.setTarget(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.AxisMotion.prototype.hasTarget = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.CircularMotion.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.CircularMotion.prototype.toObject = function(opt_includeInstance) {
  return proto.CircularMotion.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.CircularMotion} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CircularMotion.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.MetaData.toObject(includeInstance, f),
    targetsList: jspb.Message.toObjectList(msg.getTargetsList(),
    proto.CartesianTarget.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.CircularMotion}
 */
proto.CircularMotion.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.CircularMotion;
  return proto.CircularMotion.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.CircularMotion} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.CircularMotion}
 */
proto.CircularMotion.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.MetaData;
      reader.readMessage(value,proto.MetaData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new proto.CartesianTarget;
      reader.readMessage(value,proto.CartesianTarget.deserializeBinaryFromReader);
      msg.addTargets(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.CircularMotion.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.CircularMotion.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.CircularMotion} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CircularMotion.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.MetaData.serializeBinaryToWriter
    );
  }
  f = message.getTargetsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.CartesianTarget.serializeBinaryToWriter
    );
  }
};


/**
 * optional MetaData data = 1;
 * @return {?proto.MetaData}
 */
proto.CircularMotion.prototype.getData = function() {
  return /** @type{?proto.MetaData} */ (
    jspb.Message.getWrapperField(this, proto.MetaData, 1));
};


/**
 * @param {?proto.MetaData|undefined} value
 * @return {!proto.CircularMotion} returns this
*/
proto.CircularMotion.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.CircularMotion} returns this
 */
proto.CircularMotion.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CircularMotion.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated CartesianTarget targets = 2;
 * @return {!Array<!proto.CartesianTarget>}
 */
proto.CircularMotion.prototype.getTargetsList = function() {
  return /** @type{!Array<!proto.CartesianTarget>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.CartesianTarget, 2));
};


/**
 * @param {!Array<!proto.CartesianTarget>} value
 * @return {!proto.CircularMotion} returns this
*/
proto.CircularMotion.prototype.setTargetsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.CartesianTarget=} opt_value
 * @param {number=} opt_index
 * @return {!proto.CartesianTarget}
 */
proto.CircularMotion.prototype.addTargets = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.CartesianTarget, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.CircularMotion} returns this
 */
proto.CircularMotion.prototype.clearTargetsList = function() {
  return this.setTargetsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.LINMotion.prototype.toObject = function(opt_includeInstance) {
  return proto.LINMotion.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.LINMotion} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.LINMotion.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.MetaData.toObject(includeInstance, f),
    target: (f = msg.getTarget()) && proto.CartesianTarget.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.LINMotion}
 */
proto.LINMotion.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.LINMotion;
  return proto.LINMotion.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.LINMotion} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.LINMotion}
 */
proto.LINMotion.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.MetaData;
      reader.readMessage(value,proto.MetaData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new proto.CartesianTarget;
      reader.readMessage(value,proto.CartesianTarget.deserializeBinaryFromReader);
      msg.setTarget(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.LINMotion.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.LINMotion.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.LINMotion} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.LINMotion.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.MetaData.serializeBinaryToWriter
    );
  }
  f = message.getTarget();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.CartesianTarget.serializeBinaryToWriter
    );
  }
};


/**
 * optional MetaData data = 1;
 * @return {?proto.MetaData}
 */
proto.LINMotion.prototype.getData = function() {
  return /** @type{?proto.MetaData} */ (
    jspb.Message.getWrapperField(this, proto.MetaData, 1));
};


/**
 * @param {?proto.MetaData|undefined} value
 * @return {!proto.LINMotion} returns this
*/
proto.LINMotion.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.LINMotion} returns this
 */
proto.LINMotion.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.LINMotion.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional CartesianTarget target = 2;
 * @return {?proto.CartesianTarget}
 */
proto.LINMotion.prototype.getTarget = function() {
  return /** @type{?proto.CartesianTarget} */ (
    jspb.Message.getWrapperField(this, proto.CartesianTarget, 2));
};


/**
 * @param {?proto.CartesianTarget|undefined} value
 * @return {!proto.LINMotion} returns this
*/
proto.LINMotion.prototype.setTarget = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.LINMotion} returns this
 */
proto.LINMotion.prototype.clearTarget = function() {
  return this.setTarget(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.LINMotion.prototype.hasTarget = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.PTPMotion.prototype.toObject = function(opt_includeInstance) {
  return proto.PTPMotion.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.PTPMotion} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.PTPMotion.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.MetaData.toObject(includeInstance, f),
    target: (f = msg.getTarget()) && proto.CartesianTarget.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.PTPMotion}
 */
proto.PTPMotion.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.PTPMotion;
  return proto.PTPMotion.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.PTPMotion} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.PTPMotion}
 */
proto.PTPMotion.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.MetaData;
      reader.readMessage(value,proto.MetaData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new proto.CartesianTarget;
      reader.readMessage(value,proto.CartesianTarget.deserializeBinaryFromReader);
      msg.setTarget(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.PTPMotion.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.PTPMotion.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.PTPMotion} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.PTPMotion.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.MetaData.serializeBinaryToWriter
    );
  }
  f = message.getTarget();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.CartesianTarget.serializeBinaryToWriter
    );
  }
};


/**
 * optional MetaData data = 1;
 * @return {?proto.MetaData}
 */
proto.PTPMotion.prototype.getData = function() {
  return /** @type{?proto.MetaData} */ (
    jspb.Message.getWrapperField(this, proto.MetaData, 1));
};


/**
 * @param {?proto.MetaData|undefined} value
 * @return {!proto.PTPMotion} returns this
*/
proto.PTPMotion.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.PTPMotion} returns this
 */
proto.PTPMotion.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.PTPMotion.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional CartesianTarget target = 2;
 * @return {?proto.CartesianTarget}
 */
proto.PTPMotion.prototype.getTarget = function() {
  return /** @type{?proto.CartesianTarget} */ (
    jspb.Message.getWrapperField(this, proto.CartesianTarget, 2));
};


/**
 * @param {?proto.CartesianTarget|undefined} value
 * @return {!proto.PTPMotion} returns this
*/
proto.PTPMotion.prototype.setTarget = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.PTPMotion} returns this
 */
proto.PTPMotion.prototype.clearTarget = function() {
  return this.setTarget(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.PTPMotion.prototype.hasTarget = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Matrix4x4.prototype.toObject = function(opt_includeInstance) {
  return proto.Matrix4x4.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Matrix4x4} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Matrix4x4.toObject = function(includeInstance, msg) {
  var f, obj = {
    m11: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
    m12: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    m13: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    m14: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    m21: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    m22: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    m23: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
    m24: jspb.Message.getFloatingPointFieldWithDefault(msg, 8, 0.0),
    m31: jspb.Message.getFloatingPointFieldWithDefault(msg, 9, 0.0),
    m32: jspb.Message.getFloatingPointFieldWithDefault(msg, 10, 0.0),
    m33: jspb.Message.getFloatingPointFieldWithDefault(msg, 11, 0.0),
    m34: jspb.Message.getFloatingPointFieldWithDefault(msg, 12, 0.0),
    m41: jspb.Message.getFloatingPointFieldWithDefault(msg, 13, 0.0),
    m42: jspb.Message.getFloatingPointFieldWithDefault(msg, 14, 0.0),
    m43: jspb.Message.getFloatingPointFieldWithDefault(msg, 15, 0.0),
    m44: jspb.Message.getFloatingPointFieldWithDefault(msg, 16, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Matrix4x4}
 */
proto.Matrix4x4.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Matrix4x4;
  return proto.Matrix4x4.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Matrix4x4} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Matrix4x4}
 */
proto.Matrix4x4.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM11(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM12(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM13(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM14(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM21(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM22(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM23(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM24(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM31(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM32(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM33(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM34(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM41(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM42(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM43(value);
      break;
    case 16:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setM44(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Matrix4x4.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Matrix4x4.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Matrix4x4} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Matrix4x4.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getM11();
  if (f !== 0.0) {
    writer.writeFloat(
      1,
      f
    );
  }
  f = message.getM12();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = message.getM13();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getM14();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getM21();
  if (f !== 0.0) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = message.getM22();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = message.getM23();
  if (f !== 0.0) {
    writer.writeFloat(
      7,
      f
    );
  }
  f = message.getM24();
  if (f !== 0.0) {
    writer.writeFloat(
      8,
      f
    );
  }
  f = message.getM31();
  if (f !== 0.0) {
    writer.writeFloat(
      9,
      f
    );
  }
  f = message.getM32();
  if (f !== 0.0) {
    writer.writeFloat(
      10,
      f
    );
  }
  f = message.getM33();
  if (f !== 0.0) {
    writer.writeFloat(
      11,
      f
    );
  }
  f = message.getM34();
  if (f !== 0.0) {
    writer.writeFloat(
      12,
      f
    );
  }
  f = message.getM41();
  if (f !== 0.0) {
    writer.writeFloat(
      13,
      f
    );
  }
  f = message.getM42();
  if (f !== 0.0) {
    writer.writeFloat(
      14,
      f
    );
  }
  f = message.getM43();
  if (f !== 0.0) {
    writer.writeFloat(
      15,
      f
    );
  }
  f = message.getM44();
  if (f !== 0.0) {
    writer.writeFloat(
      16,
      f
    );
  }
};


/**
 * optional float m11 = 1;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM11 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM11 = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional float m12 = 2;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM12 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM12 = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional float m13 = 3;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM13 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM13 = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional float m14 = 4;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM14 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM14 = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional float m21 = 5;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM21 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM21 = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional float m22 = 6;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM22 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM22 = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional float m23 = 7;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM23 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM23 = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * optional float m24 = 8;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM24 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 8, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM24 = function(value) {
  return jspb.Message.setProto3FloatField(this, 8, value);
};


/**
 * optional float m31 = 9;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM31 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 9, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM31 = function(value) {
  return jspb.Message.setProto3FloatField(this, 9, value);
};


/**
 * optional float m32 = 10;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM32 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 10, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM32 = function(value) {
  return jspb.Message.setProto3FloatField(this, 10, value);
};


/**
 * optional float m33 = 11;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM33 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 11, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM33 = function(value) {
  return jspb.Message.setProto3FloatField(this, 11, value);
};


/**
 * optional float m34 = 12;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM34 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 12, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM34 = function(value) {
  return jspb.Message.setProto3FloatField(this, 12, value);
};


/**
 * optional float m41 = 13;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM41 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 13, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM41 = function(value) {
  return jspb.Message.setProto3FloatField(this, 13, value);
};


/**
 * optional float m42 = 14;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM42 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 14, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM42 = function(value) {
  return jspb.Message.setProto3FloatField(this, 14, value);
};


/**
 * optional float m43 = 15;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM43 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 15, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM43 = function(value) {
  return jspb.Message.setProto3FloatField(this, 15, value);
};


/**
 * optional float m44 = 16;
 * @return {number}
 */
proto.Matrix4x4.prototype.getM44 = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 16, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Matrix4x4} returns this
 */
proto.Matrix4x4.prototype.setM44 = function(value) {
  return jspb.Message.setProto3FloatField(this, 16, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.CartesianPosition.oneofGroups_ = [[1,2,3]];

/**
 * @enum {number}
 */
proto.CartesianPosition.FrameCase = {
  FRAME_NOT_SET: 0,
  MATRIX: 1,
  EULER: 2,
  CS: 3
};

/**
 * @return {proto.CartesianPosition.FrameCase}
 */
proto.CartesianPosition.prototype.getFrameCase = function() {
  return /** @type {proto.CartesianPosition.FrameCase} */(jspb.Message.computeOneofCase(this, proto.CartesianPosition.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.CartesianPosition.prototype.toObject = function(opt_includeInstance) {
  return proto.CartesianPosition.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.CartesianPosition} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CartesianPosition.toObject = function(includeInstance, msg) {
  var f, obj = {
    matrix: (f = msg.getMatrix()) && proto.Matrix4x4.toObject(includeInstance, f),
    euler: (f = msg.getEuler()) && proto.Euler.toObject(includeInstance, f),
    cs: (f = msg.getCs()) && proto.CoordinateSystem.toObject(includeInstance, f),
    reference: jspb.Message.getFieldWithDefault(msg, 4, 0),
    parent: (f = msg.getParent()) && proto.Matrix4x4.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.CartesianPosition}
 */
proto.CartesianPosition.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.CartesianPosition;
  return proto.CartesianPosition.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.CartesianPosition} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.CartesianPosition}
 */
proto.CartesianPosition.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Matrix4x4;
      reader.readMessage(value,proto.Matrix4x4.deserializeBinaryFromReader);
      msg.setMatrix(value);
      break;
    case 2:
      var value = new proto.Euler;
      reader.readMessage(value,proto.Euler.deserializeBinaryFromReader);
      msg.setEuler(value);
      break;
    case 3:
      var value = new proto.CoordinateSystem;
      reader.readMessage(value,proto.CoordinateSystem.deserializeBinaryFromReader);
      msg.setCs(value);
      break;
    case 4:
      var value = /** @type {!proto.CartesianReference} */ (reader.readEnum());
      msg.setReference(value);
      break;
    case 5:
      var value = new proto.Matrix4x4;
      reader.readMessage(value,proto.Matrix4x4.deserializeBinaryFromReader);
      msg.setParent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.CartesianPosition.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.CartesianPosition.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.CartesianPosition} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CartesianPosition.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMatrix();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.Matrix4x4.serializeBinaryToWriter
    );
  }
  f = message.getEuler();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.Euler.serializeBinaryToWriter
    );
  }
  f = message.getCs();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.CoordinateSystem.serializeBinaryToWriter
    );
  }
  f = message.getReference();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getParent();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.Matrix4x4.serializeBinaryToWriter
    );
  }
};


/**
 * optional Matrix4x4 matrix = 1;
 * @return {?proto.Matrix4x4}
 */
proto.CartesianPosition.prototype.getMatrix = function() {
  return /** @type{?proto.Matrix4x4} */ (
    jspb.Message.getWrapperField(this, proto.Matrix4x4, 1));
};


/**
 * @param {?proto.Matrix4x4|undefined} value
 * @return {!proto.CartesianPosition} returns this
*/
proto.CartesianPosition.prototype.setMatrix = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.CartesianPosition.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.CartesianPosition} returns this
 */
proto.CartesianPosition.prototype.clearMatrix = function() {
  return this.setMatrix(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CartesianPosition.prototype.hasMatrix = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Euler euler = 2;
 * @return {?proto.Euler}
 */
proto.CartesianPosition.prototype.getEuler = function() {
  return /** @type{?proto.Euler} */ (
    jspb.Message.getWrapperField(this, proto.Euler, 2));
};


/**
 * @param {?proto.Euler|undefined} value
 * @return {!proto.CartesianPosition} returns this
*/
proto.CartesianPosition.prototype.setEuler = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.CartesianPosition.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.CartesianPosition} returns this
 */
proto.CartesianPosition.prototype.clearEuler = function() {
  return this.setEuler(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CartesianPosition.prototype.hasEuler = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional CoordinateSystem cs = 3;
 * @return {?proto.CoordinateSystem}
 */
proto.CartesianPosition.prototype.getCs = function() {
  return /** @type{?proto.CoordinateSystem} */ (
    jspb.Message.getWrapperField(this, proto.CoordinateSystem, 3));
};


/**
 * @param {?proto.CoordinateSystem|undefined} value
 * @return {!proto.CartesianPosition} returns this
*/
proto.CartesianPosition.prototype.setCs = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.CartesianPosition.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.CartesianPosition} returns this
 */
proto.CartesianPosition.prototype.clearCs = function() {
  return this.setCs(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CartesianPosition.prototype.hasCs = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional CartesianReference reference = 4;
 * @return {!proto.CartesianReference}
 */
proto.CartesianPosition.prototype.getReference = function() {
  return /** @type {!proto.CartesianReference} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.CartesianReference} value
 * @return {!proto.CartesianPosition} returns this
 */
proto.CartesianPosition.prototype.setReference = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * optional Matrix4x4 parent = 5;
 * @return {?proto.Matrix4x4}
 */
proto.CartesianPosition.prototype.getParent = function() {
  return /** @type{?proto.Matrix4x4} */ (
    jspb.Message.getWrapperField(this, proto.Matrix4x4, 5));
};


/**
 * @param {?proto.Matrix4x4|undefined} value
 * @return {!proto.CartesianPosition} returns this
*/
proto.CartesianPosition.prototype.setParent = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.CartesianPosition} returns this
 */
proto.CartesianPosition.prototype.clearParent = function() {
  return this.setParent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CartesianPosition.prototype.hasParent = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.CartesianTarget.repeatedFields_ = [3,4,5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.CartesianTarget.prototype.toObject = function(opt_includeInstance) {
  return proto.CartesianTarget.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.CartesianTarget} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CartesianTarget.toObject = function(includeInstance, msg) {
  var f, obj = {
    position: (f = msg.getPosition()) && proto.CartesianPosition.toObject(includeInstance, f),
    posture: jspb.Message.getFieldWithDefault(msg, 2, ""),
    speedList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 3)) == null ? undefined : f,
    accelerationList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 4)) == null ? undefined : f,
    externalAxisValuesList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 5)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.CartesianTarget}
 */
proto.CartesianTarget.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.CartesianTarget;
  return proto.CartesianTarget.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.CartesianTarget} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.CartesianTarget}
 */
proto.CartesianTarget.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.CartesianPosition;
      reader.readMessage(value,proto.CartesianPosition.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPosture(value);
      break;
    case 3:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setSpeedList(value);
      break;
    case 4:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setAccelerationList(value);
      break;
    case 5:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setExternalAxisValuesList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.CartesianTarget.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.CartesianTarget.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.CartesianTarget} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CartesianTarget.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.CartesianPosition.serializeBinaryToWriter
    );
  }
  f = message.getPosture();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSpeedList();
  if (f.length > 0) {
    writer.writePackedFloat(
      3,
      f
    );
  }
  f = message.getAccelerationList();
  if (f.length > 0) {
    writer.writePackedFloat(
      4,
      f
    );
  }
  f = message.getExternalAxisValuesList();
  if (f.length > 0) {
    writer.writePackedFloat(
      5,
      f
    );
  }
};


/**
 * optional CartesianPosition position = 1;
 * @return {?proto.CartesianPosition}
 */
proto.CartesianTarget.prototype.getPosition = function() {
  return /** @type{?proto.CartesianPosition} */ (
    jspb.Message.getWrapperField(this, proto.CartesianPosition, 1));
};


/**
 * @param {?proto.CartesianPosition|undefined} value
 * @return {!proto.CartesianTarget} returns this
*/
proto.CartesianTarget.prototype.setPosition = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.CartesianTarget} returns this
 */
proto.CartesianTarget.prototype.clearPosition = function() {
  return this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CartesianTarget.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string posture = 2;
 * @return {string}
 */
proto.CartesianTarget.prototype.getPosture = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.CartesianTarget} returns this
 */
proto.CartesianTarget.prototype.setPosture = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated float speed = 3;
 * @return {!Array<number>}
 */
proto.CartesianTarget.prototype.getSpeedList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 3));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.CartesianTarget} returns this
 */
proto.CartesianTarget.prototype.setSpeedList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.CartesianTarget} returns this
 */
proto.CartesianTarget.prototype.addSpeed = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.CartesianTarget} returns this
 */
proto.CartesianTarget.prototype.clearSpeedList = function() {
  return this.setSpeedList([]);
};


/**
 * repeated float acceleration = 4;
 * @return {!Array<number>}
 */
proto.CartesianTarget.prototype.getAccelerationList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 4));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.CartesianTarget} returns this
 */
proto.CartesianTarget.prototype.setAccelerationList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.CartesianTarget} returns this
 */
proto.CartesianTarget.prototype.addAcceleration = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.CartesianTarget} returns this
 */
proto.CartesianTarget.prototype.clearAccelerationList = function() {
  return this.setAccelerationList([]);
};


/**
 * repeated float external_axis_values = 5;
 * @return {!Array<number>}
 */
proto.CartesianTarget.prototype.getExternalAxisValuesList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 5));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.CartesianTarget} returns this
 */
proto.CartesianTarget.prototype.setExternalAxisValuesList = function(value) {
  return jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.CartesianTarget} returns this
 */
proto.CartesianTarget.prototype.addExternalAxisValues = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.CartesianTarget} returns this
 */
proto.CartesianTarget.prototype.clearExternalAxisValuesList = function() {
  return this.setExternalAxisValuesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.JointTarget.repeatedFields_ = [1,2,3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.JointTarget.prototype.toObject = function(opt_includeInstance) {
  return proto.JointTarget.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.JointTarget} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.JointTarget.toObject = function(includeInstance, msg) {
  var f, obj = {
    axisValuesList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 1)) == null ? undefined : f,
    speedList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 2)) == null ? undefined : f,
    accelerationList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 3)) == null ? undefined : f,
    externalAxisValuesList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 4)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.JointTarget}
 */
proto.JointTarget.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.JointTarget;
  return proto.JointTarget.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.JointTarget} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.JointTarget}
 */
proto.JointTarget.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setAxisValuesList(value);
      break;
    case 2:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setSpeedList(value);
      break;
    case 3:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setAccelerationList(value);
      break;
    case 4:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setExternalAxisValuesList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.JointTarget.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.JointTarget.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.JointTarget} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.JointTarget.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAxisValuesList();
  if (f.length > 0) {
    writer.writePackedFloat(
      1,
      f
    );
  }
  f = message.getSpeedList();
  if (f.length > 0) {
    writer.writePackedFloat(
      2,
      f
    );
  }
  f = message.getAccelerationList();
  if (f.length > 0) {
    writer.writePackedFloat(
      3,
      f
    );
  }
  f = message.getExternalAxisValuesList();
  if (f.length > 0) {
    writer.writePackedFloat(
      4,
      f
    );
  }
};


/**
 * repeated float axis_values = 1;
 * @return {!Array<number>}
 */
proto.JointTarget.prototype.getAxisValuesList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.JointTarget} returns this
 */
proto.JointTarget.prototype.setAxisValuesList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.JointTarget} returns this
 */
proto.JointTarget.prototype.addAxisValues = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.JointTarget} returns this
 */
proto.JointTarget.prototype.clearAxisValuesList = function() {
  return this.setAxisValuesList([]);
};


/**
 * repeated float speed = 2;
 * @return {!Array<number>}
 */
proto.JointTarget.prototype.getSpeedList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 2));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.JointTarget} returns this
 */
proto.JointTarget.prototype.setSpeedList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.JointTarget} returns this
 */
proto.JointTarget.prototype.addSpeed = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.JointTarget} returns this
 */
proto.JointTarget.prototype.clearSpeedList = function() {
  return this.setSpeedList([]);
};


/**
 * repeated float acceleration = 3;
 * @return {!Array<number>}
 */
proto.JointTarget.prototype.getAccelerationList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 3));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.JointTarget} returns this
 */
proto.JointTarget.prototype.setAccelerationList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.JointTarget} returns this
 */
proto.JointTarget.prototype.addAcceleration = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.JointTarget} returns this
 */
proto.JointTarget.prototype.clearAccelerationList = function() {
  return this.setAccelerationList([]);
};


/**
 * repeated float external_axis_values = 4;
 * @return {!Array<number>}
 */
proto.JointTarget.prototype.getExternalAxisValuesList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 4));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.JointTarget} returns this
 */
proto.JointTarget.prototype.setExternalAxisValuesList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.JointTarget} returns this
 */
proto.JointTarget.prototype.addExternalAxisValues = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.JointTarget} returns this
 */
proto.JointTarget.prototype.clearExternalAxisValuesList = function() {
  return this.setExternalAxisValuesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Vector3.prototype.toObject = function(opt_includeInstance) {
  return proto.Vector3.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Vector3} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Vector3.toObject = function(includeInstance, msg) {
  var f, obj = {
    x: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
    y: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    z: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Vector3}
 */
proto.Vector3.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Vector3;
  return proto.Vector3.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Vector3} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Vector3}
 */
proto.Vector3.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setX(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setY(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setZ(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Vector3.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Vector3.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Vector3} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Vector3.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getX();
  if (f !== 0.0) {
    writer.writeFloat(
      1,
      f
    );
  }
  f = message.getY();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = message.getZ();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
};


/**
 * optional float x = 1;
 * @return {number}
 */
proto.Vector3.prototype.getX = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Vector3} returns this
 */
proto.Vector3.prototype.setX = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional float y = 2;
 * @return {number}
 */
proto.Vector3.prototype.getY = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Vector3} returns this
 */
proto.Vector3.prototype.setY = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional float z = 3;
 * @return {number}
 */
proto.Vector3.prototype.getZ = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Vector3} returns this
 */
proto.Vector3.prototype.setZ = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Int4.prototype.toObject = function(opt_includeInstance) {
  return proto.Int4.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Int4} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Int4.toObject = function(includeInstance, msg) {
  var f, obj = {
    x: jspb.Message.getFieldWithDefault(msg, 1, 0),
    y: jspb.Message.getFieldWithDefault(msg, 2, 0),
    z: jspb.Message.getFieldWithDefault(msg, 3, 0),
    w: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Int4}
 */
proto.Int4.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Int4;
  return proto.Int4.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Int4} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Int4}
 */
proto.Int4.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setX(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setY(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setZ(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setW(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Int4.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Int4.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Int4} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Int4.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getX();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getY();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getZ();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getW();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
};


/**
 * optional int32 x = 1;
 * @return {number}
 */
proto.Int4.prototype.getX = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.Int4} returns this
 */
proto.Int4.prototype.setX = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 y = 2;
 * @return {number}
 */
proto.Int4.prototype.getY = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.Int4} returns this
 */
proto.Int4.prototype.setY = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 z = 3;
 * @return {number}
 */
proto.Int4.prototype.getZ = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.Int4} returns this
 */
proto.Int4.prototype.setZ = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 w = 4;
 * @return {number}
 */
proto.Int4.prototype.getW = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.Int4} returns this
 */
proto.Int4.prototype.setW = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Euler.prototype.toObject = function(opt_includeInstance) {
  return proto.Euler.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Euler} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Euler.toObject = function(includeInstance, msg) {
  var f, obj = {
    x: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
    y: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    z: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    a: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    b: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    c: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Euler}
 */
proto.Euler.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Euler;
  return proto.Euler.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Euler} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Euler}
 */
proto.Euler.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setX(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setY(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setZ(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setA(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setB(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setC(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Euler.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Euler.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Euler} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Euler.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getX();
  if (f !== 0.0) {
    writer.writeFloat(
      1,
      f
    );
  }
  f = message.getY();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = message.getZ();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getA();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getB();
  if (f !== 0.0) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = message.getC();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
};


/**
 * optional float x = 1;
 * @return {number}
 */
proto.Euler.prototype.getX = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Euler} returns this
 */
proto.Euler.prototype.setX = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional float y = 2;
 * @return {number}
 */
proto.Euler.prototype.getY = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Euler} returns this
 */
proto.Euler.prototype.setY = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional float z = 3;
 * @return {number}
 */
proto.Euler.prototype.getZ = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Euler} returns this
 */
proto.Euler.prototype.setZ = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional float a = 4;
 * @return {number}
 */
proto.Euler.prototype.getA = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Euler} returns this
 */
proto.Euler.prototype.setA = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional float b = 5;
 * @return {number}
 */
proto.Euler.prototype.getB = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Euler} returns this
 */
proto.Euler.prototype.setB = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional float c = 6;
 * @return {number}
 */
proto.Euler.prototype.getC = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Euler} returns this
 */
proto.Euler.prototype.setC = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.CoordinateSystem.prototype.toObject = function(opt_includeInstance) {
  return proto.CoordinateSystem.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.CoordinateSystem} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CoordinateSystem.toObject = function(includeInstance, msg) {
  var f, obj = {
    origin: (f = msg.getOrigin()) && proto.Vector3.toObject(includeInstance, f),
    xAxis: (f = msg.getXAxis()) && proto.Vector3.toObject(includeInstance, f),
    yAxis: (f = msg.getYAxis()) && proto.Vector3.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.CoordinateSystem}
 */
proto.CoordinateSystem.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.CoordinateSystem;
  return proto.CoordinateSystem.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.CoordinateSystem} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.CoordinateSystem}
 */
proto.CoordinateSystem.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Vector3;
      reader.readMessage(value,proto.Vector3.deserializeBinaryFromReader);
      msg.setOrigin(value);
      break;
    case 2:
      var value = new proto.Vector3;
      reader.readMessage(value,proto.Vector3.deserializeBinaryFromReader);
      msg.setXAxis(value);
      break;
    case 3:
      var value = new proto.Vector3;
      reader.readMessage(value,proto.Vector3.deserializeBinaryFromReader);
      msg.setYAxis(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.CoordinateSystem.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.CoordinateSystem.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.CoordinateSystem} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CoordinateSystem.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrigin();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.Vector3.serializeBinaryToWriter
    );
  }
  f = message.getXAxis();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.Vector3.serializeBinaryToWriter
    );
  }
  f = message.getYAxis();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.Vector3.serializeBinaryToWriter
    );
  }
};


/**
 * optional Vector3 origin = 1;
 * @return {?proto.Vector3}
 */
proto.CoordinateSystem.prototype.getOrigin = function() {
  return /** @type{?proto.Vector3} */ (
    jspb.Message.getWrapperField(this, proto.Vector3, 1));
};


/**
 * @param {?proto.Vector3|undefined} value
 * @return {!proto.CoordinateSystem} returns this
*/
proto.CoordinateSystem.prototype.setOrigin = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.CoordinateSystem} returns this
 */
proto.CoordinateSystem.prototype.clearOrigin = function() {
  return this.setOrigin(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CoordinateSystem.prototype.hasOrigin = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Vector3 x_axis = 2;
 * @return {?proto.Vector3}
 */
proto.CoordinateSystem.prototype.getXAxis = function() {
  return /** @type{?proto.Vector3} */ (
    jspb.Message.getWrapperField(this, proto.Vector3, 2));
};


/**
 * @param {?proto.Vector3|undefined} value
 * @return {!proto.CoordinateSystem} returns this
*/
proto.CoordinateSystem.prototype.setXAxis = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.CoordinateSystem} returns this
 */
proto.CoordinateSystem.prototype.clearXAxis = function() {
  return this.setXAxis(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CoordinateSystem.prototype.hasXAxis = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Vector3 y_axis = 3;
 * @return {?proto.Vector3}
 */
proto.CoordinateSystem.prototype.getYAxis = function() {
  return /** @type{?proto.Vector3} */ (
    jspb.Message.getWrapperField(this, proto.Vector3, 3));
};


/**
 * @param {?proto.Vector3|undefined} value
 * @return {!proto.CoordinateSystem} returns this
*/
proto.CoordinateSystem.prototype.setYAxis = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.CoordinateSystem} returns this
 */
proto.CoordinateSystem.prototype.clearYAxis = function() {
  return this.setYAxis(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CoordinateSystem.prototype.hasYAxis = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.Variable.oneofGroups_ = [[1,2,3,4]];

/**
 * @enum {number}
 */
proto.Variable.VariableValueCase = {
  VARIABLE_VALUE_NOT_SET: 0,
  BOOLEAN: 1,
  SINGLE: 2,
  INTEGER: 3,
  TEXT: 4
};

/**
 * @return {proto.Variable.VariableValueCase}
 */
proto.Variable.prototype.getVariableValueCase = function() {
  return /** @type {proto.Variable.VariableValueCase} */(jspb.Message.computeOneofCase(this, proto.Variable.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Variable.prototype.toObject = function(opt_includeInstance) {
  return proto.Variable.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Variable} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Variable.toObject = function(includeInstance, msg) {
  var f, obj = {
    pb_boolean: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    single: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    integer: jspb.Message.getFieldWithDefault(msg, 3, 0),
    text: jspb.Message.getFieldWithDefault(msg, 4, ""),
    name: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Variable}
 */
proto.Variable.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Variable;
  return proto.Variable.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Variable} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Variable}
 */
proto.Variable.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBoolean(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setSingle(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInteger(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setText(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Variable.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Variable.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Variable} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Variable.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {boolean} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBool(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional bool boolean = 1;
 * @return {boolean}
 */
proto.Variable.prototype.getBoolean = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Variable} returns this
 */
proto.Variable.prototype.setBoolean = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.Variable.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Variable} returns this
 */
proto.Variable.prototype.clearBoolean = function() {
  return jspb.Message.setOneofField(this, 1, proto.Variable.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Variable.prototype.hasBoolean = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional float single = 2;
 * @return {number}
 */
proto.Variable.prototype.getSingle = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Variable} returns this
 */
proto.Variable.prototype.setSingle = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.Variable.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Variable} returns this
 */
proto.Variable.prototype.clearSingle = function() {
  return jspb.Message.setOneofField(this, 2, proto.Variable.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Variable.prototype.hasSingle = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional int32 integer = 3;
 * @return {number}
 */
proto.Variable.prototype.getInteger = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.Variable} returns this
 */
proto.Variable.prototype.setInteger = function(value) {
  return jspb.Message.setOneofField(this, 3, proto.Variable.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Variable} returns this
 */
proto.Variable.prototype.clearInteger = function() {
  return jspb.Message.setOneofField(this, 3, proto.Variable.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Variable.prototype.hasInteger = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string text = 4;
 * @return {string}
 */
proto.Variable.prototype.getText = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.Variable} returns this
 */
proto.Variable.prototype.setText = function(value) {
  return jspb.Message.setOneofField(this, 4, proto.Variable.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Variable} returns this
 */
proto.Variable.prototype.clearText = function() {
  return jspb.Message.setOneofField(this, 4, proto.Variable.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Variable.prototype.hasText = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional string name = 5;
 * @return {string}
 */
proto.Variable.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.Variable} returns this
 */
proto.Variable.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Heartbeat.prototype.toObject = function(opt_includeInstance) {
  return proto.Heartbeat.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Heartbeat} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Heartbeat.toObject = function(includeInstance, msg) {
  var f, obj = {
    beat: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Heartbeat}
 */
proto.Heartbeat.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Heartbeat;
  return proto.Heartbeat.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Heartbeat} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Heartbeat}
 */
proto.Heartbeat.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBeat(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Heartbeat.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Heartbeat.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Heartbeat} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Heartbeat.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBeat();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 beat = 1;
 * @return {number}
 */
proto.Heartbeat.prototype.getBeat = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.Heartbeat} returns this
 */
proto.Heartbeat.prototype.setBeat = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Settings.prototype.toObject = function(opt_includeInstance) {
  return proto.Settings.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Settings} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Settings.toObject = function(includeInstance, msg) {
  var f, obj = {
    settingsDictionaryMap: (f = msg.getSettingsDictionaryMap()) ? f.toObject(includeInstance, undefined) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Settings}
 */
proto.Settings.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Settings;
  return proto.Settings.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Settings} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Settings}
 */
proto.Settings.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = msg.getSettingsDictionaryMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Settings.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Settings.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Settings} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Settings.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSettingsDictionaryMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(1, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
};


/**
 * map<string, string> settings_dictionary = 1;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.Settings.prototype.getSettingsDictionaryMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 1, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.Settings} returns this
 */
proto.Settings.prototype.clearSettingsDictionaryMap = function() {
  this.getSettingsDictionaryMap().clear();
  return this;};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Mesh.repeatedFields_ = [1,2,3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Mesh.prototype.toObject = function(opt_includeInstance) {
  return proto.Mesh.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Mesh} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mesh.toObject = function(includeInstance, msg) {
  var f, obj = {
    facesList: jspb.Message.toObjectList(msg.getFacesList(),
    proto.Int4.toObject, includeInstance),
    verticesList: jspb.Message.toObjectList(msg.getVerticesList(),
    proto.Vector3.toObject, includeInstance),
    normalsList: jspb.Message.toObjectList(msg.getNormalsList(),
    proto.Vector3.toObject, includeInstance),
    meshColor: (f = msg.getMeshColor()) && proto.Int4.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Mesh}
 */
proto.Mesh.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Mesh;
  return proto.Mesh.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Mesh} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Mesh}
 */
proto.Mesh.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Int4;
      reader.readMessage(value,proto.Int4.deserializeBinaryFromReader);
      msg.addFaces(value);
      break;
    case 2:
      var value = new proto.Vector3;
      reader.readMessage(value,proto.Vector3.deserializeBinaryFromReader);
      msg.addVertices(value);
      break;
    case 3:
      var value = new proto.Vector3;
      reader.readMessage(value,proto.Vector3.deserializeBinaryFromReader);
      msg.addNormals(value);
      break;
    case 4:
      var value = new proto.Int4;
      reader.readMessage(value,proto.Int4.deserializeBinaryFromReader);
      msg.setMeshColor(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Mesh.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Mesh.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Mesh} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mesh.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFacesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Int4.serializeBinaryToWriter
    );
  }
  f = message.getVerticesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.Vector3.serializeBinaryToWriter
    );
  }
  f = message.getNormalsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.Vector3.serializeBinaryToWriter
    );
  }
  f = message.getMeshColor();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.Int4.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Int4 faces = 1;
 * @return {!Array<!proto.Int4>}
 */
proto.Mesh.prototype.getFacesList = function() {
  return /** @type{!Array<!proto.Int4>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Int4, 1));
};


/**
 * @param {!Array<!proto.Int4>} value
 * @return {!proto.Mesh} returns this
*/
proto.Mesh.prototype.setFacesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Int4=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Int4}
 */
proto.Mesh.prototype.addFaces = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Int4, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Mesh} returns this
 */
proto.Mesh.prototype.clearFacesList = function() {
  return this.setFacesList([]);
};


/**
 * repeated Vector3 vertices = 2;
 * @return {!Array<!proto.Vector3>}
 */
proto.Mesh.prototype.getVerticesList = function() {
  return /** @type{!Array<!proto.Vector3>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Vector3, 2));
};


/**
 * @param {!Array<!proto.Vector3>} value
 * @return {!proto.Mesh} returns this
*/
proto.Mesh.prototype.setVerticesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.Vector3=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Vector3}
 */
proto.Mesh.prototype.addVertices = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.Vector3, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Mesh} returns this
 */
proto.Mesh.prototype.clearVerticesList = function() {
  return this.setVerticesList([]);
};


/**
 * repeated Vector3 normals = 3;
 * @return {!Array<!proto.Vector3>}
 */
proto.Mesh.prototype.getNormalsList = function() {
  return /** @type{!Array<!proto.Vector3>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Vector3, 3));
};


/**
 * @param {!Array<!proto.Vector3>} value
 * @return {!proto.Mesh} returns this
*/
proto.Mesh.prototype.setNormalsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.Vector3=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Vector3}
 */
proto.Mesh.prototype.addNormals = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.Vector3, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Mesh} returns this
 */
proto.Mesh.prototype.clearNormalsList = function() {
  return this.setNormalsList([]);
};


/**
 * optional Int4 mesh_color = 4;
 * @return {?proto.Int4}
 */
proto.Mesh.prototype.getMeshColor = function() {
  return /** @type{?proto.Int4} */ (
    jspb.Message.getWrapperField(this, proto.Int4, 4));
};


/**
 * @param {?proto.Int4|undefined} value
 * @return {!proto.Mesh} returns this
*/
proto.Mesh.prototype.setMeshColor = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Mesh} returns this
 */
proto.Mesh.prototype.clearMeshColor = function() {
  return this.setMeshColor(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Mesh.prototype.hasMeshColor = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.PolyMesh.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.PolyMesh.prototype.toObject = function(opt_includeInstance) {
  return proto.PolyMesh.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.PolyMesh} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.PolyMesh.toObject = function(includeInstance, msg) {
  var f, obj = {
    meshesList: jspb.Message.toObjectList(msg.getMeshesList(),
    proto.Mesh.toObject, includeInstance),
    collisionConvexHullList: jspb.Message.toObjectList(msg.getCollisionConvexHullList(),
    proto.Mesh.toObject, includeInstance),
    transform: (f = msg.getTransform()) && proto.Matrix4x4.toObject(includeInstance, f),
    name: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.PolyMesh}
 */
proto.PolyMesh.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.PolyMesh;
  return proto.PolyMesh.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.PolyMesh} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.PolyMesh}
 */
proto.PolyMesh.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Mesh;
      reader.readMessage(value,proto.Mesh.deserializeBinaryFromReader);
      msg.addMeshes(value);
      break;
    case 2:
      var value = new proto.Mesh;
      reader.readMessage(value,proto.Mesh.deserializeBinaryFromReader);
      msg.addCollisionConvexHull(value);
      break;
    case 3:
      var value = new proto.Matrix4x4;
      reader.readMessage(value,proto.Matrix4x4.deserializeBinaryFromReader);
      msg.setTransform(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.PolyMesh.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.PolyMesh.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.PolyMesh} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.PolyMesh.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMeshesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Mesh.serializeBinaryToWriter
    );
  }
  f = message.getCollisionConvexHullList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.Mesh.serializeBinaryToWriter
    );
  }
  f = message.getTransform();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.Matrix4x4.serializeBinaryToWriter
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * repeated Mesh meshes = 1;
 * @return {!Array<!proto.Mesh>}
 */
proto.PolyMesh.prototype.getMeshesList = function() {
  return /** @type{!Array<!proto.Mesh>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Mesh, 1));
};


/**
 * @param {!Array<!proto.Mesh>} value
 * @return {!proto.PolyMesh} returns this
*/
proto.PolyMesh.prototype.setMeshesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Mesh=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Mesh}
 */
proto.PolyMesh.prototype.addMeshes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Mesh, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.PolyMesh} returns this
 */
proto.PolyMesh.prototype.clearMeshesList = function() {
  return this.setMeshesList([]);
};


/**
 * repeated Mesh collision_convex_hull = 2;
 * @return {!Array<!proto.Mesh>}
 */
proto.PolyMesh.prototype.getCollisionConvexHullList = function() {
  return /** @type{!Array<!proto.Mesh>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Mesh, 2));
};


/**
 * @param {!Array<!proto.Mesh>} value
 * @return {!proto.PolyMesh} returns this
*/
proto.PolyMesh.prototype.setCollisionConvexHullList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.Mesh=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Mesh}
 */
proto.PolyMesh.prototype.addCollisionConvexHull = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.Mesh, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.PolyMesh} returns this
 */
proto.PolyMesh.prototype.clearCollisionConvexHullList = function() {
  return this.setCollisionConvexHullList([]);
};


/**
 * optional Matrix4x4 transform = 3;
 * @return {?proto.Matrix4x4}
 */
proto.PolyMesh.prototype.getTransform = function() {
  return /** @type{?proto.Matrix4x4} */ (
    jspb.Message.getWrapperField(this, proto.Matrix4x4, 3));
};


/**
 * @param {?proto.Matrix4x4|undefined} value
 * @return {!proto.PolyMesh} returns this
*/
proto.PolyMesh.prototype.setTransform = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.PolyMesh} returns this
 */
proto.PolyMesh.prototype.clearTransform = function() {
  return this.setTransform(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.PolyMesh.prototype.hasTransform = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string name = 4;
 * @return {string}
 */
proto.PolyMesh.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.PolyMesh} returns this
 */
proto.PolyMesh.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.TransformationArray.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.TransformationArray.prototype.toObject = function(opt_includeInstance) {
  return proto.TransformationArray.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.TransformationArray} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.TransformationArray.toObject = function(includeInstance, msg) {
  var f, obj = {
    transformationList: jspb.Message.toObjectList(msg.getTransformationList(),
    proto.Matrix4x4.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.TransformationArray}
 */
proto.TransformationArray.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.TransformationArray;
  return proto.TransformationArray.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.TransformationArray} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.TransformationArray}
 */
proto.TransformationArray.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Matrix4x4;
      reader.readMessage(value,proto.Matrix4x4.deserializeBinaryFromReader);
      msg.addTransformation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.TransformationArray.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.TransformationArray.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.TransformationArray} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.TransformationArray.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransformationList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Matrix4x4.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Matrix4x4 transformation = 1;
 * @return {!Array<!proto.Matrix4x4>}
 */
proto.TransformationArray.prototype.getTransformationList = function() {
  return /** @type{!Array<!proto.Matrix4x4>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Matrix4x4, 1));
};


/**
 * @param {!Array<!proto.Matrix4x4>} value
 * @return {!proto.TransformationArray} returns this
*/
proto.TransformationArray.prototype.setTransformationList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Matrix4x4=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Matrix4x4}
 */
proto.TransformationArray.prototype.addTransformation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Matrix4x4, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.TransformationArray} returns this
 */
proto.TransformationArray.prototype.clearTransformationList = function() {
  return this.setTransformationList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.VariableArray.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.VariableArray.prototype.toObject = function(opt_includeInstance) {
  return proto.VariableArray.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.VariableArray} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.VariableArray.toObject = function(includeInstance, msg) {
  var f, obj = {
    variablesList: jspb.Message.toObjectList(msg.getVariablesList(),
    proto.Variable.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.VariableArray}
 */
proto.VariableArray.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.VariableArray;
  return proto.VariableArray.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.VariableArray} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.VariableArray}
 */
proto.VariableArray.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Variable;
      reader.readMessage(value,proto.Variable.deserializeBinaryFromReader);
      msg.addVariables(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.VariableArray.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.VariableArray.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.VariableArray} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.VariableArray.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVariablesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Variable.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Variable variables = 1;
 * @return {!Array<!proto.Variable>}
 */
proto.VariableArray.prototype.getVariablesList = function() {
  return /** @type{!Array<!proto.Variable>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Variable, 1));
};


/**
 * @param {!Array<!proto.Variable>} value
 * @return {!proto.VariableArray} returns this
*/
proto.VariableArray.prototype.setVariablesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Variable=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Variable}
 */
proto.VariableArray.prototype.addVariables = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Variable, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.VariableArray} returns this
 */
proto.VariableArray.prototype.clearVariablesList = function() {
  return this.setVariablesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.MetaData.prototype.toObject = function(opt_includeInstance) {
  return proto.MetaData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.MetaData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.MetaData.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    dataMap: (f = msg.getDataMap()) ? f.toObject(includeInstance, undefined) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.MetaData}
 */
proto.MetaData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.MetaData;
  return proto.MetaData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.MetaData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.MetaData}
 */
proto.MetaData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = msg.getDataMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.MetaData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.MetaData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.MetaData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.MetaData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDataMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.MetaData.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.MetaData} returns this
 */
proto.MetaData.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * map<string, string> data = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.MetaData.prototype.getDataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.MetaData} returns this
 */
proto.MetaData.prototype.clearDataMap = function() {
  this.getDataMap().clear();
  return this;};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SubscribeRobotFeedbackRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SubscribeRobotFeedbackRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SubscribeRobotFeedbackRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SubscribeRobotFeedbackRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SubscribeRobotFeedbackRequest}
 */
proto.SubscribeRobotFeedbackRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SubscribeRobotFeedbackRequest;
  return proto.SubscribeRobotFeedbackRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SubscribeRobotFeedbackRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SubscribeRobotFeedbackRequest}
 */
proto.SubscribeRobotFeedbackRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SubscribeRobotFeedbackRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SubscribeRobotFeedbackRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SubscribeRobotFeedbackRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SubscribeRobotFeedbackRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.SubscribeRobotFeedbackRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SubscribeRobotFeedbackRequest} returns this
 */
proto.SubscribeRobotFeedbackRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.RobotFeedback.oneofGroups_ = [[2,3,4,5]];

/**
 * @enum {number}
 */
proto.RobotFeedback.DataPackageCase = {
  DATA_PACKAGE_NOT_SET: 0,
  HEARTBEAT_DATA: 2,
  ROBOT_STATE_DATA: 3,
  SETTINGS_DATA: 4,
  PING_DATA: 5
};

/**
 * @return {proto.RobotFeedback.DataPackageCase}
 */
proto.RobotFeedback.prototype.getDataPackageCase = function() {
  return /** @type {proto.RobotFeedback.DataPackageCase} */(jspb.Message.computeOneofCase(this, proto.RobotFeedback.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.RobotFeedback.prototype.toObject = function(opt_includeInstance) {
  return proto.RobotFeedback.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.RobotFeedback} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RobotFeedback.toObject = function(includeInstance, msg) {
  var f, obj = {
    status: jspb.Message.getFieldWithDefault(msg, 1, ""),
    heartbeatData: (f = msg.getHeartbeatData()) && proto.Heartbeat.toObject(includeInstance, f),
    robotStateData: (f = msg.getRobotStateData()) && proto.RobotState.toObject(includeInstance, f),
    settingsData: (f = msg.getSettingsData()) && proto.Settings.toObject(includeInstance, f),
    pingData: (f = msg.getPingData()) && proto.Ping.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.RobotFeedback}
 */
proto.RobotFeedback.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.RobotFeedback;
  return proto.RobotFeedback.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.RobotFeedback} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.RobotFeedback}
 */
proto.RobotFeedback.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 2:
      var value = new proto.Heartbeat;
      reader.readMessage(value,proto.Heartbeat.deserializeBinaryFromReader);
      msg.setHeartbeatData(value);
      break;
    case 3:
      var value = new proto.RobotState;
      reader.readMessage(value,proto.RobotState.deserializeBinaryFromReader);
      msg.setRobotStateData(value);
      break;
    case 4:
      var value = new proto.Settings;
      reader.readMessage(value,proto.Settings.deserializeBinaryFromReader);
      msg.setSettingsData(value);
      break;
    case 5:
      var value = new proto.Ping;
      reader.readMessage(value,proto.Ping.deserializeBinaryFromReader);
      msg.setPingData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.RobotFeedback.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.RobotFeedback.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.RobotFeedback} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.RobotFeedback.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getHeartbeatData();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.Heartbeat.serializeBinaryToWriter
    );
  }
  f = message.getRobotStateData();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.RobotState.serializeBinaryToWriter
    );
  }
  f = message.getSettingsData();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.Settings.serializeBinaryToWriter
    );
  }
  f = message.getPingData();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.Ping.serializeBinaryToWriter
    );
  }
};


/**
 * optional string status = 1;
 * @return {string}
 */
proto.RobotFeedback.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.RobotFeedback} returns this
 */
proto.RobotFeedback.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional Heartbeat heartbeat_data = 2;
 * @return {?proto.Heartbeat}
 */
proto.RobotFeedback.prototype.getHeartbeatData = function() {
  return /** @type{?proto.Heartbeat} */ (
    jspb.Message.getWrapperField(this, proto.Heartbeat, 2));
};


/**
 * @param {?proto.Heartbeat|undefined} value
 * @return {!proto.RobotFeedback} returns this
*/
proto.RobotFeedback.prototype.setHeartbeatData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.RobotFeedback.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.RobotFeedback} returns this
 */
proto.RobotFeedback.prototype.clearHeartbeatData = function() {
  return this.setHeartbeatData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.RobotFeedback.prototype.hasHeartbeatData = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional RobotState robot_state_data = 3;
 * @return {?proto.RobotState}
 */
proto.RobotFeedback.prototype.getRobotStateData = function() {
  return /** @type{?proto.RobotState} */ (
    jspb.Message.getWrapperField(this, proto.RobotState, 3));
};


/**
 * @param {?proto.RobotState|undefined} value
 * @return {!proto.RobotFeedback} returns this
*/
proto.RobotFeedback.prototype.setRobotStateData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.RobotFeedback.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.RobotFeedback} returns this
 */
proto.RobotFeedback.prototype.clearRobotStateData = function() {
  return this.setRobotStateData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.RobotFeedback.prototype.hasRobotStateData = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Settings settings_data = 4;
 * @return {?proto.Settings}
 */
proto.RobotFeedback.prototype.getSettingsData = function() {
  return /** @type{?proto.Settings} */ (
    jspb.Message.getWrapperField(this, proto.Settings, 4));
};


/**
 * @param {?proto.Settings|undefined} value
 * @return {!proto.RobotFeedback} returns this
*/
proto.RobotFeedback.prototype.setSettingsData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.RobotFeedback.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.RobotFeedback} returns this
 */
proto.RobotFeedback.prototype.clearSettingsData = function() {
  return this.setSettingsData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.RobotFeedback.prototype.hasSettingsData = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional Ping ping_data = 5;
 * @return {?proto.Ping}
 */
proto.RobotFeedback.prototype.getPingData = function() {
  return /** @type{?proto.Ping} */ (
    jspb.Message.getWrapperField(this, proto.Ping, 5));
};


/**
 * @param {?proto.Ping|undefined} value
 * @return {!proto.RobotFeedback} returns this
*/
proto.RobotFeedback.prototype.setPingData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.RobotFeedback.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.RobotFeedback} returns this
 */
proto.RobotFeedback.prototype.clearPingData = function() {
  return this.setPingData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.RobotFeedback.prototype.hasPingData = function() {
  return jspb.Message.getField(this, 5) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.GetSimulatedRobotStateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.GetSimulatedRobotStateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GetSimulatedRobotStateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetSimulatedRobotStateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    normalizedState: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    asyncStreamUpdate: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.GetSimulatedRobotStateRequest}
 */
proto.GetSimulatedRobotStateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GetSimulatedRobotStateRequest;
  return proto.GetSimulatedRobotStateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GetSimulatedRobotStateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GetSimulatedRobotStateRequest}
 */
proto.GetSimulatedRobotStateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setNormalizedState(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAsyncStreamUpdate(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.GetSimulatedRobotStateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GetSimulatedRobotStateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GetSimulatedRobotStateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetSimulatedRobotStateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNormalizedState();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = message.getAsyncStreamUpdate();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.GetSimulatedRobotStateRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.GetSimulatedRobotStateRequest} returns this
 */
proto.GetSimulatedRobotStateRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional float normalized_state = 2;
 * @return {number}
 */
proto.GetSimulatedRobotStateRequest.prototype.getNormalizedState = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.GetSimulatedRobotStateRequest} returns this
 */
proto.GetSimulatedRobotStateRequest.prototype.setNormalizedState = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional bool async_stream_update = 3;
 * @return {boolean}
 */
proto.GetSimulatedRobotStateRequest.prototype.getAsyncStreamUpdate = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.GetSimulatedRobotStateRequest} returns this
 */
proto.GetSimulatedRobotStateRequest.prototype.setAsyncStreamUpdate = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.AddRobotTaskRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.AddRobotTaskRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.AddRobotTaskRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.AddRobotTaskRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    robotTask: (f = msg.getRobotTask()) && proto.Task.toObject(includeInstance, f),
    robotSettings: (f = msg.getRobotSettings()) && proto.Settings.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.AddRobotTaskRequest}
 */
proto.AddRobotTaskRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.AddRobotTaskRequest;
  return proto.AddRobotTaskRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.AddRobotTaskRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.AddRobotTaskRequest}
 */
proto.AddRobotTaskRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = new proto.Task;
      reader.readMessage(value,proto.Task.deserializeBinaryFromReader);
      msg.setRobotTask(value);
      break;
    case 3:
      var value = new proto.Settings;
      reader.readMessage(value,proto.Settings.deserializeBinaryFromReader);
      msg.setRobotSettings(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.AddRobotTaskRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.AddRobotTaskRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.AddRobotTaskRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.AddRobotTaskRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRobotTask();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.Task.serializeBinaryToWriter
    );
  }
  f = message.getRobotSettings();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.Settings.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.AddRobotTaskRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.AddRobotTaskRequest} returns this
 */
proto.AddRobotTaskRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional Task robot_task = 2;
 * @return {?proto.Task}
 */
proto.AddRobotTaskRequest.prototype.getRobotTask = function() {
  return /** @type{?proto.Task} */ (
    jspb.Message.getWrapperField(this, proto.Task, 2));
};


/**
 * @param {?proto.Task|undefined} value
 * @return {!proto.AddRobotTaskRequest} returns this
*/
proto.AddRobotTaskRequest.prototype.setRobotTask = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.AddRobotTaskRequest} returns this
 */
proto.AddRobotTaskRequest.prototype.clearRobotTask = function() {
  return this.setRobotTask(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.AddRobotTaskRequest.prototype.hasRobotTask = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Settings robot_settings = 3;
 * @return {?proto.Settings}
 */
proto.AddRobotTaskRequest.prototype.getRobotSettings = function() {
  return /** @type{?proto.Settings} */ (
    jspb.Message.getWrapperField(this, proto.Settings, 3));
};


/**
 * @param {?proto.Settings|undefined} value
 * @return {!proto.AddRobotTaskRequest} returns this
*/
proto.AddRobotTaskRequest.prototype.setRobotSettings = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.AddRobotTaskRequest} returns this
 */
proto.AddRobotTaskRequest.prototype.clearRobotSettings = function() {
  return this.setRobotSettings(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.AddRobotTaskRequest.prototype.hasRobotSettings = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.AddRobotTaskReply.prototype.toObject = function(opt_includeInstance) {
  return proto.AddRobotTaskReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.AddRobotTaskReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.AddRobotTaskReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    status: jspb.Message.getFieldWithDefault(msg, 1, ""),
    simulationResultData: (f = msg.getSimulationResultData()) && proto.SimulationResult.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.AddRobotTaskReply}
 */
proto.AddRobotTaskReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.AddRobotTaskReply;
  return proto.AddRobotTaskReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.AddRobotTaskReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.AddRobotTaskReply}
 */
proto.AddRobotTaskReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 2:
      var value = new proto.SimulationResult;
      reader.readMessage(value,proto.SimulationResult.deserializeBinaryFromReader);
      msg.setSimulationResultData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.AddRobotTaskReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.AddRobotTaskReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.AddRobotTaskReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.AddRobotTaskReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSimulationResultData();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.SimulationResult.serializeBinaryToWriter
    );
  }
};


/**
 * optional string status = 1;
 * @return {string}
 */
proto.AddRobotTaskReply.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.AddRobotTaskReply} returns this
 */
proto.AddRobotTaskReply.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional SimulationResult simulation_result_data = 2;
 * @return {?proto.SimulationResult}
 */
proto.AddRobotTaskReply.prototype.getSimulationResultData = function() {
  return /** @type{?proto.SimulationResult} */ (
    jspb.Message.getWrapperField(this, proto.SimulationResult, 2));
};


/**
 * @param {?proto.SimulationResult|undefined} value
 * @return {!proto.AddRobotTaskReply} returns this
*/
proto.AddRobotTaskReply.prototype.setSimulationResultData = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.AddRobotTaskReply} returns this
 */
proto.AddRobotTaskReply.prototype.clearSimulationResultData = function() {
  return this.setSimulationResultData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.AddRobotTaskReply.prototype.hasSimulationResultData = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.UpdateVariableRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.UpdateVariableRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.UpdateVariableRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.UpdateVariableRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pb_var: (f = msg.getVar()) && proto.Variable.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.UpdateVariableRequest}
 */
proto.UpdateVariableRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.UpdateVariableRequest;
  return proto.UpdateVariableRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.UpdateVariableRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.UpdateVariableRequest}
 */
proto.UpdateVariableRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = new proto.Variable;
      reader.readMessage(value,proto.Variable.deserializeBinaryFromReader);
      msg.setVar(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.UpdateVariableRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.UpdateVariableRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.UpdateVariableRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.UpdateVariableRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getVar();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.Variable.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.UpdateVariableRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.UpdateVariableRequest} returns this
 */
proto.UpdateVariableRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional Variable var = 2;
 * @return {?proto.Variable}
 */
proto.UpdateVariableRequest.prototype.getVar = function() {
  return /** @type{?proto.Variable} */ (
    jspb.Message.getWrapperField(this, proto.Variable, 2));
};


/**
 * @param {?proto.Variable|undefined} value
 * @return {!proto.UpdateVariableRequest} returns this
*/
proto.UpdateVariableRequest.prototype.setVar = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.UpdateVariableRequest} returns this
 */
proto.UpdateVariableRequest.prototype.clearVar = function() {
  return this.setVar(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.UpdateVariableRequest.prototype.hasVar = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.UpdateVariableReply.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.UpdateVariableReply.prototype.toObject = function(opt_includeInstance) {
  return proto.UpdateVariableReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.UpdateVariableReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.UpdateVariableReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    idList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    variablesList: jspb.Message.toObjectList(msg.getVariablesList(),
    proto.VariableArray.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.UpdateVariableReply}
 */
proto.UpdateVariableReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.UpdateVariableReply;
  return proto.UpdateVariableReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.UpdateVariableReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.UpdateVariableReply}
 */
proto.UpdateVariableReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addId(value);
      break;
    case 2:
      var value = new proto.VariableArray;
      reader.readMessage(value,proto.VariableArray.deserializeBinaryFromReader);
      msg.addVariables(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.UpdateVariableReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.UpdateVariableReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.UpdateVariableReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.UpdateVariableReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
  f = message.getVariablesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.VariableArray.serializeBinaryToWriter
    );
  }
};


/**
 * repeated string id = 1;
 * @return {!Array<string>}
 */
proto.UpdateVariableReply.prototype.getIdList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.UpdateVariableReply} returns this
 */
proto.UpdateVariableReply.prototype.setIdList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.UpdateVariableReply} returns this
 */
proto.UpdateVariableReply.prototype.addId = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.UpdateVariableReply} returns this
 */
proto.UpdateVariableReply.prototype.clearIdList = function() {
  return this.setIdList([]);
};


/**
 * repeated VariableArray variables = 2;
 * @return {!Array<!proto.VariableArray>}
 */
proto.UpdateVariableReply.prototype.getVariablesList = function() {
  return /** @type{!Array<!proto.VariableArray>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.VariableArray, 2));
};


/**
 * @param {!Array<!proto.VariableArray>} value
 * @return {!proto.UpdateVariableReply} returns this
*/
proto.UpdateVariableReply.prototype.setVariablesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.VariableArray=} opt_value
 * @param {number=} opt_index
 * @return {!proto.VariableArray}
 */
proto.UpdateVariableReply.prototype.addVariables = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.VariableArray, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.UpdateVariableReply} returns this
 */
proto.UpdateVariableReply.prototype.clearVariablesList = function() {
  return this.setVariablesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetupRobotRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.SetupRobotRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetupRobotRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetupRobotRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    clientId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    softwareVersion: jspb.Message.getFieldWithDefault(msg, 2, ""),
    robotSetup: (f = msg.getRobotSetup()) && proto.Robot.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetupRobotRequest}
 */
proto.SetupRobotRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetupRobotRequest;
  return proto.SetupRobotRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetupRobotRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetupRobotRequest}
 */
proto.SetupRobotRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setClientId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSoftwareVersion(value);
      break;
    case 3:
      var value = new proto.Robot;
      reader.readMessage(value,proto.Robot.deserializeBinaryFromReader);
      msg.setRobotSetup(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetupRobotRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetupRobotRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetupRobotRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetupRobotRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getClientId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSoftwareVersion();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRobotSetup();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.Robot.serializeBinaryToWriter
    );
  }
};


/**
 * optional string client_id = 1;
 * @return {string}
 */
proto.SetupRobotRequest.prototype.getClientId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetupRobotRequest} returns this
 */
proto.SetupRobotRequest.prototype.setClientId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string software_version = 2;
 * @return {string}
 */
proto.SetupRobotRequest.prototype.getSoftwareVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetupRobotRequest} returns this
 */
proto.SetupRobotRequest.prototype.setSoftwareVersion = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional Robot robot_setup = 3;
 * @return {?proto.Robot}
 */
proto.SetupRobotRequest.prototype.getRobotSetup = function() {
  return /** @type{?proto.Robot} */ (
    jspb.Message.getWrapperField(this, proto.Robot, 3));
};


/**
 * @param {?proto.Robot|undefined} value
 * @return {!proto.SetupRobotRequest} returns this
*/
proto.SetupRobotRequest.prototype.setRobotSetup = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.SetupRobotRequest} returns this
 */
proto.SetupRobotRequest.prototype.clearRobotSetup = function() {
  return this.setRobotSetup(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.SetupRobotRequest.prototype.hasRobotSetup = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.SetupRobotReply.prototype.toObject = function(opt_includeInstance) {
  return proto.SetupRobotReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.SetupRobotReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetupRobotReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    status: jspb.Message.getFieldWithDefault(msg, 1, ""),
    id: jspb.Message.getFieldWithDefault(msg, 2, ""),
    robotSettings: (f = msg.getRobotSettings()) && proto.Settings.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.SetupRobotReply}
 */
proto.SetupRobotReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.SetupRobotReply;
  return proto.SetupRobotReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.SetupRobotReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.SetupRobotReply}
 */
proto.SetupRobotReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 3:
      var value = new proto.Settings;
      reader.readMessage(value,proto.Settings.deserializeBinaryFromReader);
      msg.setRobotSettings(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.SetupRobotReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.SetupRobotReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.SetupRobotReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.SetupRobotReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRobotSettings();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.Settings.serializeBinaryToWriter
    );
  }
};


/**
 * optional string status = 1;
 * @return {string}
 */
proto.SetupRobotReply.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetupRobotReply} returns this
 */
proto.SetupRobotReply.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string id = 2;
 * @return {string}
 */
proto.SetupRobotReply.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.SetupRobotReply} returns this
 */
proto.SetupRobotReply.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional Settings robot_settings = 3;
 * @return {?proto.Settings}
 */
proto.SetupRobotReply.prototype.getRobotSettings = function() {
  return /** @type{?proto.Settings} */ (
    jspb.Message.getWrapperField(this, proto.Settings, 3));
};


/**
 * @param {?proto.Settings|undefined} value
 * @return {!proto.SetupRobotReply} returns this
*/
proto.SetupRobotReply.prototype.setRobotSettings = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.SetupRobotReply} returns this
 */
proto.SetupRobotReply.prototype.clearRobotSettings = function() {
  return this.setRobotSettings(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.SetupRobotReply.prototype.hasRobotSettings = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Robot.repeatedFields_ = [7,8];

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.Robot.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.Robot.RobotDataCase = {
  ROBOT_DATA_NOT_SET: 0,
  PRESET_ROBOT_CLASS: 1,
  CUSTOM_ROBOT: 2
};

/**
 * @return {proto.Robot.RobotDataCase}
 */
proto.Robot.prototype.getRobotDataCase = function() {
  return /** @type {proto.Robot.RobotDataCase} */(jspb.Message.computeOneofCase(this, proto.Robot.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Robot.prototype.toObject = function(opt_includeInstance) {
  return proto.Robot.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Robot} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Robot.toObject = function(includeInstance, msg) {
  var f, obj = {
    presetRobotClass: jspb.Message.getFieldWithDefault(msg, 1, ""),
    customRobot: (f = msg.getCustomRobot()) && proto.CustomRobot.toObject(includeInstance, f),
    robotDriverClass: jspb.Message.getFieldWithDefault(msg, 3, ""),
    friendlyId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    toolDictionaryMap: (f = msg.getToolDictionaryMap()) ? f.toObject(includeInstance, proto.Tool.toObject) : [],
    initialBase: (f = msg.getInitialBase()) && proto.Base.toObject(includeInstance, f),
    collisionGeometryList: jspb.Message.toObjectList(msg.getCollisionGeometryList(),
    proto.PolyMesh.toObject, includeInstance),
    externalAxesList: jspb.Message.toObjectList(msg.getExternalAxesList(),
    proto.ExternalAxis.toObject, includeInstance),
    data: (f = msg.getData()) && proto.MetaData.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Robot}
 */
proto.Robot.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Robot;
  return proto.Robot.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Robot} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Robot}
 */
proto.Robot.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPresetRobotClass(value);
      break;
    case 2:
      var value = new proto.CustomRobot;
      reader.readMessage(value,proto.CustomRobot.deserializeBinaryFromReader);
      msg.setCustomRobot(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setRobotDriverClass(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setFriendlyId(value);
      break;
    case 5:
      var value = msg.getToolDictionaryMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.Tool.deserializeBinaryFromReader, "", new proto.Tool());
         });
      break;
    case 6:
      var value = new proto.Base;
      reader.readMessage(value,proto.Base.deserializeBinaryFromReader);
      msg.setInitialBase(value);
      break;
    case 7:
      var value = new proto.PolyMesh;
      reader.readMessage(value,proto.PolyMesh.deserializeBinaryFromReader);
      msg.addCollisionGeometry(value);
      break;
    case 8:
      var value = new proto.ExternalAxis;
      reader.readMessage(value,proto.ExternalAxis.deserializeBinaryFromReader);
      msg.addExternalAxes(value);
      break;
    case 9:
      var value = new proto.MetaData;
      reader.readMessage(value,proto.MetaData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Robot.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Robot.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Robot} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Robot.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCustomRobot();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.CustomRobot.serializeBinaryToWriter
    );
  }
  f = message.getRobotDriverClass();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getFriendlyId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getToolDictionaryMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(5, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.Tool.serializeBinaryToWriter);
  }
  f = message.getInitialBase();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.Base.serializeBinaryToWriter
    );
  }
  f = message.getCollisionGeometryList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.PolyMesh.serializeBinaryToWriter
    );
  }
  f = message.getExternalAxesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.ExternalAxis.serializeBinaryToWriter
    );
  }
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.MetaData.serializeBinaryToWriter
    );
  }
};


/**
 * optional string preset_robot_class = 1;
 * @return {string}
 */
proto.Robot.prototype.getPresetRobotClass = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.Robot} returns this
 */
proto.Robot.prototype.setPresetRobotClass = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.Robot.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Robot} returns this
 */
proto.Robot.prototype.clearPresetRobotClass = function() {
  return jspb.Message.setOneofField(this, 1, proto.Robot.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Robot.prototype.hasPresetRobotClass = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional CustomRobot custom_robot = 2;
 * @return {?proto.CustomRobot}
 */
proto.Robot.prototype.getCustomRobot = function() {
  return /** @type{?proto.CustomRobot} */ (
    jspb.Message.getWrapperField(this, proto.CustomRobot, 2));
};


/**
 * @param {?proto.CustomRobot|undefined} value
 * @return {!proto.Robot} returns this
*/
proto.Robot.prototype.setCustomRobot = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.Robot.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Robot} returns this
 */
proto.Robot.prototype.clearCustomRobot = function() {
  return this.setCustomRobot(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Robot.prototype.hasCustomRobot = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string robot_driver_class = 3;
 * @return {string}
 */
proto.Robot.prototype.getRobotDriverClass = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.Robot} returns this
 */
proto.Robot.prototype.setRobotDriverClass = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string friendly_id = 4;
 * @return {string}
 */
proto.Robot.prototype.getFriendlyId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.Robot} returns this
 */
proto.Robot.prototype.setFriendlyId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * map<string, Tool> tool_dictionary = 5;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.Tool>}
 */
proto.Robot.prototype.getToolDictionaryMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.Tool>} */ (
      jspb.Message.getMapField(this, 5, opt_noLazyCreate,
      proto.Tool));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.Robot} returns this
 */
proto.Robot.prototype.clearToolDictionaryMap = function() {
  this.getToolDictionaryMap().clear();
  return this;};


/**
 * optional Base initial_base = 6;
 * @return {?proto.Base}
 */
proto.Robot.prototype.getInitialBase = function() {
  return /** @type{?proto.Base} */ (
    jspb.Message.getWrapperField(this, proto.Base, 6));
};


/**
 * @param {?proto.Base|undefined} value
 * @return {!proto.Robot} returns this
*/
proto.Robot.prototype.setInitialBase = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Robot} returns this
 */
proto.Robot.prototype.clearInitialBase = function() {
  return this.setInitialBase(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Robot.prototype.hasInitialBase = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * repeated PolyMesh collision_geometry = 7;
 * @return {!Array<!proto.PolyMesh>}
 */
proto.Robot.prototype.getCollisionGeometryList = function() {
  return /** @type{!Array<!proto.PolyMesh>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.PolyMesh, 7));
};


/**
 * @param {!Array<!proto.PolyMesh>} value
 * @return {!proto.Robot} returns this
*/
proto.Robot.prototype.setCollisionGeometryList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.PolyMesh=} opt_value
 * @param {number=} opt_index
 * @return {!proto.PolyMesh}
 */
proto.Robot.prototype.addCollisionGeometry = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.PolyMesh, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Robot} returns this
 */
proto.Robot.prototype.clearCollisionGeometryList = function() {
  return this.setCollisionGeometryList([]);
};


/**
 * repeated ExternalAxis external_axes = 8;
 * @return {!Array<!proto.ExternalAxis>}
 */
proto.Robot.prototype.getExternalAxesList = function() {
  return /** @type{!Array<!proto.ExternalAxis>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ExternalAxis, 8));
};


/**
 * @param {!Array<!proto.ExternalAxis>} value
 * @return {!proto.Robot} returns this
*/
proto.Robot.prototype.setExternalAxesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.ExternalAxis=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ExternalAxis}
 */
proto.Robot.prototype.addExternalAxes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.ExternalAxis, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Robot} returns this
 */
proto.Robot.prototype.clearExternalAxesList = function() {
  return this.setExternalAxesList([]);
};


/**
 * optional MetaData data = 9;
 * @return {?proto.MetaData}
 */
proto.Robot.prototype.getData = function() {
  return /** @type{?proto.MetaData} */ (
    jspb.Message.getWrapperField(this, proto.MetaData, 9));
};


/**
 * @param {?proto.MetaData|undefined} value
 * @return {!proto.Robot} returns this
*/
proto.Robot.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Robot} returns this
 */
proto.Robot.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Robot.prototype.hasData = function() {
  return jspb.Message.getField(this, 9) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Tool.prototype.toObject = function(opt_includeInstance) {
  return proto.Tool.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Tool} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Tool.toObject = function(includeInstance, msg) {
  var f, obj = {
    toolType: jspb.Message.getFieldWithDefault(msg, 1, 0),
    tcp: (f = msg.getTcp()) && proto.CartesianPosition.toObject(includeInstance, f),
    toolId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    toolState: jspb.Message.getFieldWithDefault(msg, 4, 0),
    toolGeometry: (f = msg.getToolGeometry()) && proto.PolyMesh.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Tool}
 */
proto.Tool.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Tool;
  return proto.Tool.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Tool} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Tool}
 */
proto.Tool.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.FrameType} */ (reader.readEnum());
      msg.setToolType(value);
      break;
    case 2:
      var value = new proto.CartesianPosition;
      reader.readMessage(value,proto.CartesianPosition.deserializeBinaryFromReader);
      msg.setTcp(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setToolId(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setToolState(value);
      break;
    case 5:
      var value = new proto.PolyMesh;
      reader.readMessage(value,proto.PolyMesh.deserializeBinaryFromReader);
      msg.setToolGeometry(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Tool.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Tool.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Tool} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Tool.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getToolType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getTcp();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.CartesianPosition.serializeBinaryToWriter
    );
  }
  f = message.getToolId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getToolState();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getToolGeometry();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.PolyMesh.serializeBinaryToWriter
    );
  }
};


/**
 * optional FrameType tool_type = 1;
 * @return {!proto.FrameType}
 */
proto.Tool.prototype.getToolType = function() {
  return /** @type {!proto.FrameType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.FrameType} value
 * @return {!proto.Tool} returns this
 */
proto.Tool.prototype.setToolType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional CartesianPosition tcp = 2;
 * @return {?proto.CartesianPosition}
 */
proto.Tool.prototype.getTcp = function() {
  return /** @type{?proto.CartesianPosition} */ (
    jspb.Message.getWrapperField(this, proto.CartesianPosition, 2));
};


/**
 * @param {?proto.CartesianPosition|undefined} value
 * @return {!proto.Tool} returns this
*/
proto.Tool.prototype.setTcp = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Tool} returns this
 */
proto.Tool.prototype.clearTcp = function() {
  return this.setTcp(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Tool.prototype.hasTcp = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string tool_id = 3;
 * @return {string}
 */
proto.Tool.prototype.getToolId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.Tool} returns this
 */
proto.Tool.prototype.setToolId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int32 tool_state = 4;
 * @return {number}
 */
proto.Tool.prototype.getToolState = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.Tool} returns this
 */
proto.Tool.prototype.setToolState = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional PolyMesh tool_geometry = 5;
 * @return {?proto.PolyMesh}
 */
proto.Tool.prototype.getToolGeometry = function() {
  return /** @type{?proto.PolyMesh} */ (
    jspb.Message.getWrapperField(this, proto.PolyMesh, 5));
};


/**
 * @param {?proto.PolyMesh|undefined} value
 * @return {!proto.Tool} returns this
*/
proto.Tool.prototype.setToolGeometry = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Tool} returns this
 */
proto.Tool.prototype.clearToolGeometry = function() {
  return this.setToolGeometry(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Tool.prototype.hasToolGeometry = function() {
  return jspb.Message.getField(this, 5) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Base.prototype.toObject = function(opt_includeInstance) {
  return proto.Base.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Base} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Base.toObject = function(includeInstance, msg) {
  var f, obj = {
    baseType: jspb.Message.getFieldWithDefault(msg, 1, 0),
    baseFrame: (f = msg.getBaseFrame()) && proto.CartesianPosition.toObject(includeInstance, f),
    baseId: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Base}
 */
proto.Base.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Base;
  return proto.Base.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Base} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Base}
 */
proto.Base.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.FrameType} */ (reader.readEnum());
      msg.setBaseType(value);
      break;
    case 2:
      var value = new proto.CartesianPosition;
      reader.readMessage(value,proto.CartesianPosition.deserializeBinaryFromReader);
      msg.setBaseFrame(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setBaseId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Base.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Base.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Base} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Base.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBaseType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getBaseFrame();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.CartesianPosition.serializeBinaryToWriter
    );
  }
  f = message.getBaseId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional FrameType base_type = 1;
 * @return {!proto.FrameType}
 */
proto.Base.prototype.getBaseType = function() {
  return /** @type {!proto.FrameType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.FrameType} value
 * @return {!proto.Base} returns this
 */
proto.Base.prototype.setBaseType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional CartesianPosition base_frame = 2;
 * @return {?proto.CartesianPosition}
 */
proto.Base.prototype.getBaseFrame = function() {
  return /** @type{?proto.CartesianPosition} */ (
    jspb.Message.getWrapperField(this, proto.CartesianPosition, 2));
};


/**
 * @param {?proto.CartesianPosition|undefined} value
 * @return {!proto.Base} returns this
*/
proto.Base.prototype.setBaseFrame = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Base} returns this
 */
proto.Base.prototype.clearBaseFrame = function() {
  return this.setBaseFrame(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Base.prototype.hasBaseFrame = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string base_id = 3;
 * @return {string}
 */
proto.Base.prototype.getBaseId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.Base} returns this
 */
proto.Base.prototype.setBaseId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.CustomRobot.repeatedFields_ = [1,2,3,4,5,8];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.CustomRobot.prototype.toObject = function(opt_includeInstance) {
  return proto.CustomRobot.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.CustomRobot} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CustomRobot.toObject = function(includeInstance, msg) {
  var f, obj = {
    axisCenterList: jspb.Message.toObjectList(msg.getAxisCenterList(),
    proto.Vector3.toObject, includeInstance),
    axisDirectionList: jspb.Message.toObjectList(msg.getAxisDirectionList(),
    proto.Vector3.toObject, includeInstance),
    axisSpeedList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 3)) == null ? undefined : f,
    axisRangeMinList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 4)) == null ? undefined : f,
    axisRangeMaxList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 5)) == null ? undefined : f,
    name: jspb.Message.getFieldWithDefault(msg, 6, ""),
    shortName: jspb.Message.getFieldWithDefault(msg, 7, ""),
    geometryList: jspb.Message.toObjectList(msg.getGeometryList(),
    proto.PolyMesh.toObject, includeInstance),
    rootCs: (f = msg.getRootCs()) && proto.Matrix4x4.toObject(includeInstance, f),
    flangeCs: (f = msg.getFlangeCs()) && proto.Matrix4x4.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.CustomRobot}
 */
proto.CustomRobot.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.CustomRobot;
  return proto.CustomRobot.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.CustomRobot} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.CustomRobot}
 */
proto.CustomRobot.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Vector3;
      reader.readMessage(value,proto.Vector3.deserializeBinaryFromReader);
      msg.addAxisCenter(value);
      break;
    case 2:
      var value = new proto.Vector3;
      reader.readMessage(value,proto.Vector3.deserializeBinaryFromReader);
      msg.addAxisDirection(value);
      break;
    case 3:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setAxisSpeedList(value);
      break;
    case 4:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setAxisRangeMinList(value);
      break;
    case 5:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setAxisRangeMaxList(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setShortName(value);
      break;
    case 8:
      var value = new proto.PolyMesh;
      reader.readMessage(value,proto.PolyMesh.deserializeBinaryFromReader);
      msg.addGeometry(value);
      break;
    case 9:
      var value = new proto.Matrix4x4;
      reader.readMessage(value,proto.Matrix4x4.deserializeBinaryFromReader);
      msg.setRootCs(value);
      break;
    case 10:
      var value = new proto.Matrix4x4;
      reader.readMessage(value,proto.Matrix4x4.deserializeBinaryFromReader);
      msg.setFlangeCs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.CustomRobot.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.CustomRobot.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.CustomRobot} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CustomRobot.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAxisCenterList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Vector3.serializeBinaryToWriter
    );
  }
  f = message.getAxisDirectionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.Vector3.serializeBinaryToWriter
    );
  }
  f = message.getAxisSpeedList();
  if (f.length > 0) {
    writer.writePackedFloat(
      3,
      f
    );
  }
  f = message.getAxisRangeMinList();
  if (f.length > 0) {
    writer.writePackedFloat(
      4,
      f
    );
  }
  f = message.getAxisRangeMaxList();
  if (f.length > 0) {
    writer.writePackedFloat(
      5,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getShortName();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getGeometryList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.PolyMesh.serializeBinaryToWriter
    );
  }
  f = message.getRootCs();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.Matrix4x4.serializeBinaryToWriter
    );
  }
  f = message.getFlangeCs();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.Matrix4x4.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Vector3 axis_center = 1;
 * @return {!Array<!proto.Vector3>}
 */
proto.CustomRobot.prototype.getAxisCenterList = function() {
  return /** @type{!Array<!proto.Vector3>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Vector3, 1));
};


/**
 * @param {!Array<!proto.Vector3>} value
 * @return {!proto.CustomRobot} returns this
*/
proto.CustomRobot.prototype.setAxisCenterList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Vector3=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Vector3}
 */
proto.CustomRobot.prototype.addAxisCenter = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Vector3, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.clearAxisCenterList = function() {
  return this.setAxisCenterList([]);
};


/**
 * repeated Vector3 axis_direction = 2;
 * @return {!Array<!proto.Vector3>}
 */
proto.CustomRobot.prototype.getAxisDirectionList = function() {
  return /** @type{!Array<!proto.Vector3>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Vector3, 2));
};


/**
 * @param {!Array<!proto.Vector3>} value
 * @return {!proto.CustomRobot} returns this
*/
proto.CustomRobot.prototype.setAxisDirectionList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.Vector3=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Vector3}
 */
proto.CustomRobot.prototype.addAxisDirection = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.Vector3, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.clearAxisDirectionList = function() {
  return this.setAxisDirectionList([]);
};


/**
 * repeated float axis_speed = 3;
 * @return {!Array<number>}
 */
proto.CustomRobot.prototype.getAxisSpeedList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 3));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.setAxisSpeedList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.addAxisSpeed = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.clearAxisSpeedList = function() {
  return this.setAxisSpeedList([]);
};


/**
 * repeated float axis_range_min = 4;
 * @return {!Array<number>}
 */
proto.CustomRobot.prototype.getAxisRangeMinList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 4));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.setAxisRangeMinList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.addAxisRangeMin = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.clearAxisRangeMinList = function() {
  return this.setAxisRangeMinList([]);
};


/**
 * repeated float axis_range_max = 5;
 * @return {!Array<number>}
 */
proto.CustomRobot.prototype.getAxisRangeMaxList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 5));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.setAxisRangeMaxList = function(value) {
  return jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.addAxisRangeMax = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.clearAxisRangeMaxList = function() {
  return this.setAxisRangeMaxList([]);
};


/**
 * optional string name = 6;
 * @return {string}
 */
proto.CustomRobot.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string short_name = 7;
 * @return {string}
 */
proto.CustomRobot.prototype.getShortName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.setShortName = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * repeated PolyMesh geometry = 8;
 * @return {!Array<!proto.PolyMesh>}
 */
proto.CustomRobot.prototype.getGeometryList = function() {
  return /** @type{!Array<!proto.PolyMesh>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.PolyMesh, 8));
};


/**
 * @param {!Array<!proto.PolyMesh>} value
 * @return {!proto.CustomRobot} returns this
*/
proto.CustomRobot.prototype.setGeometryList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.PolyMesh=} opt_value
 * @param {number=} opt_index
 * @return {!proto.PolyMesh}
 */
proto.CustomRobot.prototype.addGeometry = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.PolyMesh, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.clearGeometryList = function() {
  return this.setGeometryList([]);
};


/**
 * optional Matrix4x4 root_cs = 9;
 * @return {?proto.Matrix4x4}
 */
proto.CustomRobot.prototype.getRootCs = function() {
  return /** @type{?proto.Matrix4x4} */ (
    jspb.Message.getWrapperField(this, proto.Matrix4x4, 9));
};


/**
 * @param {?proto.Matrix4x4|undefined} value
 * @return {!proto.CustomRobot} returns this
*/
proto.CustomRobot.prototype.setRootCs = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.clearRootCs = function() {
  return this.setRootCs(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CustomRobot.prototype.hasRootCs = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional Matrix4x4 flange_cs = 10;
 * @return {?proto.Matrix4x4}
 */
proto.CustomRobot.prototype.getFlangeCs = function() {
  return /** @type{?proto.Matrix4x4} */ (
    jspb.Message.getWrapperField(this, proto.Matrix4x4, 10));
};


/**
 * @param {?proto.Matrix4x4|undefined} value
 * @return {!proto.CustomRobot} returns this
*/
proto.CustomRobot.prototype.setFlangeCs = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.CustomRobot} returns this
 */
proto.CustomRobot.prototype.clearFlangeCs = function() {
  return this.setFlangeCs(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CustomRobot.prototype.hasFlangeCs = function() {
  return jspb.Message.getField(this, 10) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ExternalAxis.repeatedFields_ = [4,5,6,7,9];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ExternalAxis.prototype.toObject = function(opt_includeInstance) {
  return proto.ExternalAxis.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ExternalAxis} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ExternalAxis.toObject = function(includeInstance, msg) {
  var f, obj = {
    externalAxisType: jspb.Message.getFieldWithDefault(msg, 1, 0),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    shortName: jspb.Message.getFieldWithDefault(msg, 3, ""),
    rangeMinList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 4)) == null ? undefined : f,
    rangeMaxList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 5)) == null ? undefined : f,
    speedList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 6)) == null ? undefined : f,
    orientationList: jspb.Message.toObjectList(msg.getOrientationList(),
    proto.Matrix4x4.toObject, includeInstance),
    position: (f = msg.getPosition()) && proto.CartesianPosition.toObject(includeInstance, f),
    geometryList: jspb.Message.toObjectList(msg.getGeometryList(),
    proto.PolyMesh.toObject, includeInstance),
    data: (f = msg.getData()) && proto.MetaData.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ExternalAxis}
 */
proto.ExternalAxis.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ExternalAxis;
  return proto.ExternalAxis.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ExternalAxis} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ExternalAxis}
 */
proto.ExternalAxis.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.ExternalAxisType} */ (reader.readEnum());
      msg.setExternalAxisType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setShortName(value);
      break;
    case 4:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setRangeMinList(value);
      break;
    case 5:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setRangeMaxList(value);
      break;
    case 6:
      var value = /** @type {!Array<number>} */ (reader.readPackedFloat());
      msg.setSpeedList(value);
      break;
    case 7:
      var value = new proto.Matrix4x4;
      reader.readMessage(value,proto.Matrix4x4.deserializeBinaryFromReader);
      msg.addOrientation(value);
      break;
    case 8:
      var value = new proto.CartesianPosition;
      reader.readMessage(value,proto.CartesianPosition.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 9:
      var value = new proto.PolyMesh;
      reader.readMessage(value,proto.PolyMesh.deserializeBinaryFromReader);
      msg.addGeometry(value);
      break;
    case 10:
      var value = new proto.MetaData;
      reader.readMessage(value,proto.MetaData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ExternalAxis.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ExternalAxis.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ExternalAxis} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ExternalAxis.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getExternalAxisType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getShortName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getRangeMinList();
  if (f.length > 0) {
    writer.writePackedFloat(
      4,
      f
    );
  }
  f = message.getRangeMaxList();
  if (f.length > 0) {
    writer.writePackedFloat(
      5,
      f
    );
  }
  f = message.getSpeedList();
  if (f.length > 0) {
    writer.writePackedFloat(
      6,
      f
    );
  }
  f = message.getOrientationList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.Matrix4x4.serializeBinaryToWriter
    );
  }
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.CartesianPosition.serializeBinaryToWriter
    );
  }
  f = message.getGeometryList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      9,
      f,
      proto.PolyMesh.serializeBinaryToWriter
    );
  }
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.MetaData.serializeBinaryToWriter
    );
  }
};


/**
 * optional ExternalAxisType external_axis_type = 1;
 * @return {!proto.ExternalAxisType}
 */
proto.ExternalAxis.prototype.getExternalAxisType = function() {
  return /** @type {!proto.ExternalAxisType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.ExternalAxisType} value
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.setExternalAxisType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.ExternalAxis.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string short_name = 3;
 * @return {string}
 */
proto.ExternalAxis.prototype.getShortName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.setShortName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated float range_min = 4;
 * @return {!Array<number>}
 */
proto.ExternalAxis.prototype.getRangeMinList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 4));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.setRangeMinList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.addRangeMin = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.clearRangeMinList = function() {
  return this.setRangeMinList([]);
};


/**
 * repeated float range_max = 5;
 * @return {!Array<number>}
 */
proto.ExternalAxis.prototype.getRangeMaxList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 5));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.setRangeMaxList = function(value) {
  return jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.addRangeMax = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.clearRangeMaxList = function() {
  return this.setRangeMaxList([]);
};


/**
 * repeated float speed = 6;
 * @return {!Array<number>}
 */
proto.ExternalAxis.prototype.getSpeedList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 6));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.setSpeedList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.addSpeed = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.clearSpeedList = function() {
  return this.setSpeedList([]);
};


/**
 * repeated Matrix4x4 orientation = 7;
 * @return {!Array<!proto.Matrix4x4>}
 */
proto.ExternalAxis.prototype.getOrientationList = function() {
  return /** @type{!Array<!proto.Matrix4x4>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Matrix4x4, 7));
};


/**
 * @param {!Array<!proto.Matrix4x4>} value
 * @return {!proto.ExternalAxis} returns this
*/
proto.ExternalAxis.prototype.setOrientationList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.Matrix4x4=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Matrix4x4}
 */
proto.ExternalAxis.prototype.addOrientation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.Matrix4x4, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.clearOrientationList = function() {
  return this.setOrientationList([]);
};


/**
 * optional CartesianPosition position = 8;
 * @return {?proto.CartesianPosition}
 */
proto.ExternalAxis.prototype.getPosition = function() {
  return /** @type{?proto.CartesianPosition} */ (
    jspb.Message.getWrapperField(this, proto.CartesianPosition, 8));
};


/**
 * @param {?proto.CartesianPosition|undefined} value
 * @return {!proto.ExternalAxis} returns this
*/
proto.ExternalAxis.prototype.setPosition = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.clearPosition = function() {
  return this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ExternalAxis.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * repeated PolyMesh geometry = 9;
 * @return {!Array<!proto.PolyMesh>}
 */
proto.ExternalAxis.prototype.getGeometryList = function() {
  return /** @type{!Array<!proto.PolyMesh>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.PolyMesh, 9));
};


/**
 * @param {!Array<!proto.PolyMesh>} value
 * @return {!proto.ExternalAxis} returns this
*/
proto.ExternalAxis.prototype.setGeometryList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 9, value);
};


/**
 * @param {!proto.PolyMesh=} opt_value
 * @param {number=} opt_index
 * @return {!proto.PolyMesh}
 */
proto.ExternalAxis.prototype.addGeometry = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.PolyMesh, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.clearGeometryList = function() {
  return this.setGeometryList([]);
};


/**
 * optional MetaData data = 10;
 * @return {?proto.MetaData}
 */
proto.ExternalAxis.prototype.getData = function() {
  return /** @type{?proto.MetaData} */ (
    jspb.Message.getWrapperField(this, proto.MetaData, 10));
};


/**
 * @param {?proto.MetaData|undefined} value
 * @return {!proto.ExternalAxis} returns this
*/
proto.ExternalAxis.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ExternalAxis} returns this
 */
proto.ExternalAxis.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ExternalAxis.prototype.hasData = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * @enum {number}
 */
proto.ExternalAxisType = {
  LINEAR_RAIL: 0,
  LINEAR_DOUBLE: 1,
  LINEAR_TRIPLE: 2,
  ROTARY_SINGLE: 3,
  ROTARY_DOUBLE: 4,
  AGV: 5
};

/**
 * @enum {number}
 */
proto.CartesianReference = {
  ABSOLUTE: 0,
  RELATIVE: 1,
  PARENT: 2
};

/**
 * @enum {number}
 */
proto.FrameType = {
  FIXED: 0,
  EXTERNAL: 1
};

/**
 * @enum {number}
 */
proto.AxisName = {
  A1: 0,
  A2: 1,
  A3: 2,
  A4: 3,
  A5: 4,
  A6: 5,
  A7: 6,
  E1: 7,
  E2: 8,
  E3: 9,
  E4: 10
};

/**
 * @enum {number}
 */
proto.TaskType = {
  SIMULATE_TASK: 0,
  EXECUTE_TASK: 1,
  EXECUTE_ON_SIMULATION_SUCCESS_TASK: 2,
  SIMULATE_AND_EXECUTE_TASK: 3,
  CONTAINER: 4
};

/**
 * @enum {number}
 */
proto.MotionGroupType = {
  CP: 0,
  PTP: 1,
  SPLINE: 2
};

goog.object.extend(exports, proto);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(971);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=prc.js.map