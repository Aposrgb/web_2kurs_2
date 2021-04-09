function StrLength(str=[]){
    let tmp=[];
    for(let i=0;i<str.length;i++){
        tmp[i]=str[i].length;
    }
    for(let i=0;i<str.length;i++){
        if(Math.max.apply(null,tmp)==str[i].length){
            return str[i];
        }
    }
}
function Strings(str=[]){
    let arr=[];
    let k =0 ;
    for(let i=0;i<str.length;i++){
        for(let j=0;j<str.length;j++){
            if(str[i]==str[j] && i!=j && j>i && str[j]!='%'){
                arr[k]=str[i];
                str[j]='%';
                k++; 
            }
        }
    }
    if(arr.length==0){
        arr[0]=str[0];
    }
    return arr;
}
function Str(str){
    let tmp;
    let res;
    for(let i=0;i<20;i++){
        if(i==0){
            tmp=Strings(str);
        }
        else if(i%2==0){
            tmp=Strings(res);
        }
        else{
            res=Strings(tmp);
        }
    }
    return res;
}
let str="карараркрпркоувоао";
let s=Str(str);
function Stroke(){
    if(document.getElementById('button_1').value==''){
        document.getElementById("result_1").style.display='block';
        document.getElementById('result_1').innerHTML="Нет символов";
        return;
    }
    if(document.getElementById('button_1').value.length>1){
        document.getElementById("result_1").style.display='block';
        document.getElementById('result_1').innerHTML="Введено больше 1 символа";
        return;
    }
    let tmp=[];
    let string="";
    for(let i=0;i<str.length;i++){
        tmp[i]=str[i];
        if(tmp[i]==s){
            tmp[i]=document.getElementById('button_1').value;
        }
        string+=tmp[i];
    }
    document.getElementById("result_1").style.display='block';
    document.getElementById('result_1').innerHTML=string;
}
function TwoStr(str1,str2){
    if(str1==str2 || str1.length!=str2.length){
        return false;
    }
    let tmp=[];
    let k=0;
    for(let i=0;i<str1.length;i++){
        for(let j=0;j<str1.length;j++){
            if(str1[i]==str2[j] ){
                tmp[k]=str2[j];
                str2[j]="%";
                k++;
            }
        }
    }
    if(tmp.length==str1.length){
        return true;
    }
    else{
        return false;
    }
}
console.log(TwoStr("string","itngsr"));