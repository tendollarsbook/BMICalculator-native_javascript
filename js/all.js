var btn = document.getElementById("btn")
var re = document.getElementById("return")
var data =JSON.parse(localStorage.getItem('record'))||[]
var del = document.querySelector(".list")

function update(data){
  var Len = data.length;
  var str= ""
  for (var i = Len-1; i > 0; i--){
    var content = "\
    <li class='li_"+data[i].Color+"'>\
      <span>"+data[i].Text+"</span>\
      <span>BMI: "+data[i].BMI+"</span>\
      <span>weight: "+data[i].Weight+" kg</span>\
      <span>height: "+data[i].Height+" cm</span>\
      <span>"+data[i].Time+"</span>\
      <a href='#' class='delete' data-index="+i+"><i class='fa fa-times'></i> 刪除</a>\
    </li>"
    str += content
  }
  console.log(str)
  document.querySelector(".content ul").innerHTML = str
  console.log("good")
}

function calc(){
  var hei = document.querySelector(".height").value/100
  var wei = document.querySelector(".weight").value*1
  var bmi = (wei/(hei*hei)).toFixed(2)
  document.querySelector(".btn h3").textContent = bmi

  function colorchange(bmi){
    if(bmi<18.5){
        return {color:'underweight',text:'過輕'}
        }
        else if(bmi<24 && bmi>=18.5){
        return {color:'ideal',text:'理想'}
        }
        else if(bmi<27 && bmi>=24){
        return {color:'overweight',text:'過重'}
        }
        else if(bmi<30 && bmi>=27){
        return {color:'light_fat',text:'輕度肥胖'}
        }
        else if(bmi<35 && bmi>=30){
        return {color:'medium_fat',text:'中度肥胖'}
        }
        else if(bmi>=35){
        return {color:'over_fat',text:'重度肥胖'}
        }
        else{
        return {color:'ideal',weight:'請重新輸入'}
        }
    };
    document.querySelector(".result_text").textContent = colorchange(bmi).text
  var date = new Date()
  var min = date.getMinutes()
  var hour = date.getHours()
  var mon = date.getMonth()
  var day = date.getDate()
  var year = date.getFullYear()
  var time = hour + ':' + min + ' ' + day + '-' + mon + '-' + year
  var info = {
    Height: String(hei*100),
    Weight: String(wei),
    BMI: bmi,
    Time: time,
    Text: colorchange(bmi).text,
    Color: colorchange(bmi).color
  }
  btn.className = info.Color+" btn"
  document.querySelector(".result_text").className = info.Color+" result_text"
  re.className = info.Color+" return"
  console.log(info)
  data.push(info)
  localStorage.setItem('record',JSON.stringify(data))
  update(data);
}


function restart(){
  btn.className = "btn"
  re.className = "return"
  document.querySelector(".btn h3").textContent ="看結果"
  document.querySelector(".result_text").className = "result_text"
  document.querySelector(".weight").value = ""
  document.querySelector(".height").value = ""
}
update(data);
console.log(data)

function erase(e){
  e.preventDefault();
  if(e.target.nodeName !== 'A'){return};
  var index = e.target.dataset.index;
  data.splice(index, 1);
  localStorage.setItem('record', JSON.stringify(data));
  update(data);
}

btn.addEventListener("click",calc,false);
re.addEventListener("click",restart,false);
del.addEventListener("click",erase,false);