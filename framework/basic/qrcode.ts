declare var QRCode

export class QRcode {
    static createQRCode = (id:string,width:number,height:number,url:string):void => {
        var qrcode = new QRCode(id, {
            text: 'your content',
            width: width,
            height: height,
            colorDark : '#000000',
            colorLight : '#ffffff',
            correctLevel : QRCode.CorrectLevel.H
          });
          
          qrcode.clear();			
          qrcode.makeCode(url);
    }
}