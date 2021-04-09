class Film{
    static List=[];
    otziv=[];
    name; url; country; janr; rejisser; scenariy; producer; 
    operator; compositor; budjet; mirov_sbori; rate; time_length; date;
}
window.onkeydown=function(e){
    if(e.code=="Enter"){
        AddFilm();
    }
}
function AddFilm(){
    Film.List=JSON.parse(localStorage.getItem("List"));
    if(Captcha("name") || Captcha("url") || Captcha("country") || Captcha('janr') || Captcha("rejisser") || Captcha("scenariy") || Captcha("producer") || Captcha("operator") || Captcha("compositor") || Captcha("budjet") || Captcha("mirov_sbori") || Captcha("rate") || length() || Captcha("date")){
        document.getElementById('result').innerText="Неверные данные";
        return;
    }
    for(let i=0;i<Film.List.length;i++){
        if(Film.List[i].name==document.getElementById("name").value || document.getElementById("url").value==Film.List[i].url){
            document.getElementById('result').innerText="Имя или ссылка уже есть в каталоге";
            return;
        }
    }
    document.getElementById('result').innerText="";
    let film=new Film();
    film=Pr(film,"doc",0);
    Film.List.push(film);
    localStorage.setItem("List" , JSON.stringify(Film.List));
    window.location.reload();
}
function Pr(s=new Film(), str , i){
    if(str=="list"){
        s.name = Film.List[i].name;
        s.url = Film.List[i].url;
        s.time_length=Film.List[i].time_length;
        s.budjet=Film.List[i].budjet;
        s.country=Film.List[i].country;
        s.compositor=Film.List[i].compositor;
        s.date=Film.List[i].date;
        s.janr=Film.List[i].janr;
        s.mirov_sbori=Film.List[i].mirov_sbori;
        s.operator=Film.List[i].operator;
        s.producer=Film.List[i].producer;
        s.rate=Film.List[i].rate;
        s.rejisser=Film.List[i].rejisser;
        s.scenariy=Film.List[i].scenariy;
        s.otziv=Film.List[i].otziv;
    }
    else if(str=="doc"){
        s.name=document.getElementById('name').value;
        s.url=document.getElementById('url').value;
        s.time_length=document.getElementById("time_hour").value+"ч:"+document.getElementById("time_min").value+"м:"+document.getElementById("time_sec").value+"с";
        s.budjet=document.getElementById("budjet").value;
        s.country=document.getElementById("country").value;
        s.compositor=document.getElementById("compositor").value;
        s.date=document.getElementById("date").value;
        s.janr=document.getElementById("janr").value;
        s.mirov_sbori=document.getElementById("mirov_sbori").value;
        s.operator=document.getElementById("operator").value;
        s.producer=document.getElementById("producer").value;
        s.rate=document.getElementById("rate").value+"+";
        s.rejisser=document.getElementById("rejisser").value;
        s.scenariy=document.getElementById("scenariy").value;
    }
    return s;
}
function length(){
    if(document.getElementById("time_hour").value==0 && document.getElementById("time_min").value==0 && document.getElementById("time_sec").value==0){
        return true;
    }
    else if(document.getElementById("time_hour").value==00 && document.getElementById("time_min").value==00 && document.getElementById("time_sec").value==00){
        return true;
    }
    return false;
}
function Captcha(id){
    if(document.getElementById(id).value=='' || document.getElementById(id).value[0]==' '){
        return true;
    }
    return false;
}