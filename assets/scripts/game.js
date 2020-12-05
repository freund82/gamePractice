var cvs=document.getElementById("canvas");//Создаем переменную в которой наша область где игра.
var ctx=cvs.getContext("2d");//Создаем переменную в которой указываем что игра 2d

var bird = new Image();//Создаем картинки.
var bg = new Image();//задний фон
var fg = new Image();// передний фон. Картинка земля
var pipeUp = new Image(); //Препятствие сверху. В нашем случае верхняя труба
var pipeBottom = new Image();//Препятствие снизу. Нижняя труба.

bird.src="../../assets/images/flappy_bird_bird.png";
bg.src="../../assets/images/flappy_bird_bg.png";