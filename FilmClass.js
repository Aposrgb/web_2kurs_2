
let url_api="https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";
let token  = "8c8e1a50-6322-4135-8875-5d40a5420d86";
let data;
let krest=0;
function Load(){
    Film.List = JSON.parse(localStorage.getItem("List"));
    if(Film.List==null || Film.List.length==0){
        getMovies();
		console.log(Film.List);
    }
    else{
        ListFilm();
    }
}
async function getMovies(){
    let res = await fetch(url_api,{
        headers:{
            "Content-Type":"application/json",
            "X-API-KEY": token,
        },
    });
    data =await res.json();
    setTimeout(ListFilm,10);
}
class Otziv{
    name;otziv;raiting;
}
class Film{
    static List=[];
    otziv=[];
    name; url; country; janr; rejisser; scenariy; producer; 
    operator; compositor; budjet; mirov_sbori; rate; time_length; date;raiting_kp;
    SetFilm(i){
        let new_div = document.createElement("div");
        new_div.setAttribute('id', i);
        new_div.setAttribute('width', "38vh");
        if(this.rate=="Нет информации"){
            new_div.innerHTML='<div onclick="InFilms('+i+')" id="Films" class="Films" style ="background-image: url('+this.url+');"><p>'+this.name+" "+this.janr+'<br>'+this.time_length+'<p></div>';
        }
        else{
            new_div.innerHTML='<div onclick="InFilms('+i+')" id="Films" class="Films" style ="background-image: url('+this.url+');"><p>'+this.name+' '+this.rate+" "+this.janr+'<br>'+this.time_length+'<p></div>';
        }
        
        document.getElementById("spawn_img").appendChild(new_div);
        let z=document.createElement("div");
        let s = 'https://image.flaticon.com/icons/png/512/17/17047.png';
        z.innerHTML='<button id="Krest" class="Krest" onclick="Film.Delete('+i+')" style ="background-image: url('+s+');"></button>';
        document.getElementsByClassName("Films")[i].appendChild(z);
    }
    static Delete(i){
        krest=1;
        let z=[];
        let f=0;
        for(let j=0;j<Film.List.length;j++){
            if(i==j){
                continue;
            }
            let s = new Film();
            z[f]=Pr(s,"list",j);
            f++;
        }
        localStorage.setItem("List",JSON.stringify(z));
        window.location.reload();
    }
}
function InFilms(i){
    if(krest==1){
        return;
    }
    if(document.getElementById("0"+i)!=null){
        document.getElementById('filter').style.display="block";
        document.getElementById("0"+i).remove();
        for(let j=0;j<Film.List.length;j++){
            document.getElementById(j).style.display='flex';
            document.getElementById(j).style.width='38vh';
            
        }
        return;
    }
    document.getElementById('filter').style.display="none";
    for(let k=0;k<3;k++){
        document.getElementsByClassName('fil_tag')[k].style.display="none";
    }
    let s=0;
    for(let j=0;j<Film.List.length;j++){
        if(document.getElementById(j).style.display=='none'){
            document.getElementById(j).style.display='flex';
            continue;
        }
        if(i==0 && Film.List.length==1){
            s=-1;
        }
        if(i==j){
            continue;
        }
        document.getElementById(j).style.display='none';
        s=-1;
    }
    if(s==-1){
        let new_div = document.createElement("div");
        new_div.setAttribute('id', "0"+i);
        if(Film.List[i].rate=="Нет информации"){
            new_div.innerHTML="<h1 style='font-size:6vh;'>О фильме "+Film.List[i].name;
        }
        else{
            new_div.innerHTML="<h1 style='font-size:6vh;'>О фильме "+Film.List[i].name+" "+Film.List[i].rate;
        }
        new_div.innerHTML+="<p class='tags'> Сценарий <p><p class='text'>"+Film.List[i].scenariy+"</p><p class='tags'>Жанр</p> <p class='text'>"+Film.List[i].janr+"</p>";
        new_div.innerHTML+="<p class='tags'>Общие сведения</p><p class='text'>Продолжительность: "+Film.List[i].time_length+"</p><p class='text'>Продюсер: "+Film.List[i].producer+"</p><p class='text'>Возрастной рейтинг: "+Film.List[i].rate+"</p>";
        new_div.innerHTML+="<p class='text'>Режиссёр: "+Film.List[i].rejisser+"</p><p class='text'>Оператор: "+Film.List[i].operator+"</p><p class='text'>Мировые сборы: "+Film.List[i].mirov_sbori+"</p><p class='text'>Бюджет: "+Film.List[i].budjet+"</p>";
        new_div.innerHTML+="<p class='text'>Рейтинг Кинопоиска:"+Film.List[i].raiting_kp+"</p>";
        new_div.innerHTML+="<p class='text'>Композитор: "+Film.List[i].compositor+"</p><p class='text'>Страна: "+Film.List[i].country+"</p><p class='text'>Дата выхода: "+Film.List[i].date+"</p>";
        new_div.innerHTML+="<div class='tags'> Написать отзыв! <div class='text'>Имя <input id='name_otz' placeholder='Имя'> </div><div class='text'>Отзыв<textarea id='otziv' placeholder='Макс. 1000 символов' maxlength='1000'></textarea></div><div style='display:flex;margin:6vh;'> <div class='zvezda' onclick='zvezda(0)'> </div> <div class='zvezda' onclick='zvezda(1)'> </div><div class='zvezda' onclick='zvezda(2)'> </div> <div class='zvezda' onclick='zvezda(3)'> </div> <div class='zvezda' onclick='zvezda(4)'> </div> </div><div id='logs'></div><input value='' id='raiting' style='display:none;'><button onclick='addotziv("+i+")'>Добавить отзыв!</button>";
        new_div.innerHTML+="</div><div id='place_otz'></div></h1>";
        document.getElementById(i).style.width='100vw';
        document.getElementById(i).style.color='#8cdaff';
        document.getElementById(i).style.display='flex'; 
        document.getElementById(i).appendChild(new_div);
        setOtziv(i);
    }
}
function Otz_remove(i,k){
    document.getElementsByClassName('otzivs')[k].remove();
    z=[];
    for(let j=0;j<Film.List[i].otziv.length;j++){
        if(k==j){
            continue;
        }
        let s = new Otziv();
        s.name=Film.List[i].otziv[j].name;
        s.otziv=Film.List[i].otziv[j].otziv;
        s.raiting=Film.List[i].otziv[j].raiting;
        z.push(s);
    }
    Film.List[i].otziv =[];
    for(let j=0;j<z.length;j++){
        let s = new Otziv();
        s.name=z[j].name;
        s.otziv=z[j].otziv;
        s.raiting=z[j].raiting;
        Film.List[i].otziv.push(s);
    }
    localStorage.setItem("List",JSON.stringify(Film.List));
}
function setOtziv(i){
    let str =document.createElement('div');
    let z=Film.List[i].otziv;
    for(let j=0;j<Film.List[i].otziv.length;j++){
        str.innerHTML+="<div style='margin:4vh;box-shadow: 0px 0px 2vh 0vh black;border-radius: 5vh;background: black;' class='otzivs'><div class='tags' style='margin: 4vh;'><div class='krest_otz' onclick='Otz_remove("+i+","+j+")'></div>Имя<div><div><div class='text' style='flex-direction: row;'>"+z[j].name+"</div><div class='tags'>Оценка фильма</div> "+raiting(z[j].raiting)+"<div class='tags'>Отзыв<div><p style='padding-bottom:5vh;' class='text'>"+z[j].otziv+"</div>";
    }
    document.getElementById('place_otz').appendChild(str);
}
function raiting(raiting){
    let str="<div style='display:flex;'>";
    for(let j=0;j<raiting;j++){
        let s ="'zvezda1.png'";
        str+='<div style="background:url('+s+');background-size:4vh 2vw;height: 4vh;width: 2vw;"></div>';
    }
    return str+'</div>';
}
function ListFilm(){
    if(Film.List==null || Film.List.length==0){
        Film.List=[];
        for(let i=0;i<data.films.length;i++){
            let s = new Film();
            s=Pr(s,"",i);
            Film.List.push(s);
            s.SetFilm(i);
        }
        localStorage.setItem("List",JSON.stringify(Film.List));
        Film_spawn(false);
        return; 
    }
    Film_spawn(true);
}
function Film_spawn(b){
    if(b){
        for(let i=0;i<Film.List.length;i++){
            let s = new Film();
            Pr(s,"list",i).SetFilm(i);
        }
    }
    if(Film.List.length>0){
        let s = document.createElement("div");
        s.setAttribute('id', 'janres');
        s.innerHTML="<div>";
        for(let i=0;i<Film.List.length;i++){
            if(Check_janer(i)){
                continue;
            }
            s.innerHTML+="<div>"+Film.List[i].janr+"<input class='filter_janre'  onclick='Filter_janr("+i+")' type='radio' name='janr'></div>";
        }
        s.innerHTML+="</div>";
        document.getElementsByClassName('fil_tag')[0].appendChild(s);

        let v = document.createElement("div");
        v.setAttribute('id', 'dates');
        v.innerHTML="<div>";
        for(let i=0;i<Film.List.length;i++){
            if(Check_date(i)){
                continue;
            }
            v.innerHTML+="<div>"+Film.List[i].date+"<input class='filter_date' onclick='Filter_date("+i+")' type='radio' name='date'></div>";
        }
        v.innerHTML+="</div>";
        document.getElementsByClassName('fil_tag')[1].appendChild(v);

        let z = document.createElement("div");
        z.setAttribute('id', 'countries');
        z.innerHTML="<div>";
        for(let i=0;i<Film.List.length;i++){
            if(Check_country(i)){
                continue;
            }
            z.innerHTML+="<div>"+Film.List[i].country+"<input class='filter_country' onclick='Filter_country("+i+")' type='radio' name='country'></div>";
        }
        z.innerHTML+="</div>";
        document.getElementsByClassName('fil_tag')[2].appendChild(z);
    }
    else{
        for(let i=0;i<3;i++){
            let z = document.createElement("div");
            z.innerText='Пока нет фильмов для фильтрации';
            z.setAttribute('class', 'not_found');
            document.getElementsByClassName('fil_tag')[i].appendChild(z);
        }
    }
}

function addotziv(i){
    if(document.getElementById('name_otz').value=='' || document.getElementById('otziv').value=='' ||document.getElementById('name_otz').value==' ' || document.getElementById('otziv').value==' ' || document.getElementById('raiting').value==''){
        document.getElementById('logs').innerText='Неверные данные';
        return;
    }
    document.getElementById('logs').innerText='';
    let s = new Otziv();
    s.name=document.getElementById('name_otz').value;
    s.otziv=document.getElementById('otziv').value;
    s.raiting=document.getElementById('raiting').value;
    Film.List[i].otziv.push(s);
    localStorage.setItem("List" , JSON.stringify(Film.List));
    InFilms(i);
    InFilms(i);
}

function zvezda(j){
    j=j+1;
    let tmp=j;
    for(let i=0;i<j;i++){
        document.getElementsByClassName('zvezda')[i].setAttribute('style', "background:url('zvezda1.png');background-size: 100px 70px;");
    }
    for(tmp;tmp<5;tmp++){
        document.getElementsByClassName('zvezda')[tmp].setAttribute('style', "background:url('zvezda.png');background-size: 100px 70px;");
    }
    document.getElementById('raiting').value=j;
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
        s.raiting_kp="Нет информации";
        s.rejisser=Film.List[i].rejisser;
        s.scenariy=Film.List[i].scenariy;
        s.otziv=Film.List[i].otziv;
    }
    else{
        s.name=data.films[i].nameRu;
        s.url=data.films[i].posterUrl;
        s.time_length=data.films[i].filmLength;
        s.budjet="Нет информации";
        s.country="";
        for(let j=0;j<data.films[i].countries.length;j++){
            s.country+=data.films[i].countries[j].country+",";
        }
        s.country =s.country.substring(0,s.country.length-1);
        s.compositor="Нет информации";
        s.date=data.films[i].year;
        s.janr="";
        for(let j=0;j<data.films[i].genres.length;j++){
            s.janr+=data.films[i].genres[j].genre+",";
        }
        s.janr=s.janr.substring(0,s.janr.length-1);
        s.mirov_sbori="Нет информации";
        s.operator="Нет информации";
        s.producer="Нет информации";
        s.rate="Нет информации";
        s.raiting_kp=data.films[i].rating;
        s.rejisser="Нет информации";
        s.scenariy="Нет информации";
    }
    return s;
}





function Check_country(j){
    for(let i=0;i<Film.List.length;i++){
        if(Film.List[i].country==Film.List[j].country && i>j){
            return true;
        }
    }
    return false;
}
function Check_date(j){
    for(let i=0;i<Film.List.length;i++){
        if(Film.List[i].date==Film.List[j].date && i>j){
            return true;
        }
    }
    return false;
}
function Check_janer(j){
    for(let i=0;i<Film.List.length;i++){
        if(Film.List[i].janr==Film.List[j].janr && i>j){
            return true;
        }
    }
    return false;
}

function filters(){
    if(document.getElementsByClassName('fil_tag')[0].style.display=="block"){
        for(let i=0;i<3;i++){
            document.getElementsByClassName('fil_tag')[i].style.display="none";
        }
        return;
    }
    for(let i=0;i<3;i++){
        document.getElementsByClassName('fil_tag')[i].style.display="block";
    }
}
function Filter_country(i){
    display();
    for(let j=0;j<Film.List.length;j++){
        if(Film.List[i].country!=Film.List[j].country && i!=j){
            document.getElementById(j).style.display="none";
        }
    }
    document.getElementById('undo').style.display='block';
}
function Filter_date(i){
    display();
    for(let j=0;j<Film.List.length;j++){
        if(Film.List[i].date!=Film.List[j].date && i!=j){
            document.getElementById(j).style.display="none";
        }
    }
    document.getElementById('undo').style.display='block';
}
function Filter_janr(i){
    display();
    for(let j=0;j<Film.List.length;j++){
        if(Film.List[i].janr!=Film.List[j].janr && i!=j){
            document.getElementById(j).style.display="none";
        }
    }
    document.getElementById('undo').style.display='block';
}
function Undo(){
    for(let j=0;j<Film.List.length;j++){
        document.getElementById(j).style.display='flex';
    }
    document.getElementById('undo').style.display='none';
}
function display(){
    for(let j=0;j<Film.List.length;j++){
        document.getElementById(j).style.display='flex';
    }
}