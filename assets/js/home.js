const d = new Date();

const date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
document.getElementById('date').innerHTML = date;

const time = d.getHours() + ":" + (d.getMinutes()<10?'0':'')+(d.getMinutes());
document.getElementById('time').innerHTML = time;