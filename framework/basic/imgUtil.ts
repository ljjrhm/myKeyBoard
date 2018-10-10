

export function requireImg(params:any[]){
   var resImg =  params.map((v, index)=>{
        v.imgurl = require(v.imgurl);
        return v;
    })
}

function loadImg(){

}