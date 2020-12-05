var cvs=document.getElementById("canvas");//Создаем переменную в которой наша область где игра.
var ctx=cvs.getContext("2d");//Создаем переменную в которой указываем что игра 2d

var bird = new Image();//Создаем картинки.
var bg = new Image();//задний фон
var fg = new Image();// передний фон. Картинка земля
var pipeUp = new Image(); //Препятствие сверху. В нашем случае верхняя труба
var pipeBottom = new Image();//Препятствие снизу. Нижняя труба.

bird.src="assets/images/flappy_bird_bird.png";//Присваиваем переменным путь к картинкам. Картинки на холсте пока не отображаются!!!
bg.src="assets/images/flappy_bird_bg.png";
fg.src="assets/images/flappy_bird_fg.png";
pipeUp.src="assets/images/flappy_bird_pipeUp.png"
pipeBottom.src="assets/images/flappy_bird_pipeBottom.png"

//Звуковые файлы
var fly=new Audio;
var score_audio=new Audio();

fly.src="assets/audio/fly.mp3";
score_audio.src="assets/audio/score.mp3";

var gap = 90;

//При нажатии какой либо кнопки
document.addEventListener("keydown", moveUp); // При нажатии любой клавиши выполняется функция moveUp

function moveUp(){ // Смещает вверх на 20 px нашу птичку.
    yPos-=25;
    fly.play();
}

//Создание блоков
var pipe=[]; //Создаем массив труб

pipe[0] = {
    x : cvs.width, // Первый объект будет находится за экраном. это дополнительный не тот который первоначально отрисовался.
    y:0
}

//Позиция птички
var xPos = 10;
var yPos = 150;
var grav=1.5; // Переменная гравитация чтобы птичка все время падала. 1.5 то полтора пикселя
var score=0;

function draw() {//Эта функция для отрисовки картинок на холсте
    ctx.drawImage(bg, 0, 0); //Прописываем что на 2d отрисуй задний фон с координатами 0 0

    for (var i=0; i<pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y); // 100 это позиция по x и 0 это позиция по y
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap); //Здесь чтобы опустить трубу мы указываем что возьми высоту трубы pipeUp и добавь отступ из переменной gap  

        pipe[i].x--; //чтобы трубы двигались. Но блоки пройдут один раз. Чтобы постоянно пишем код дальше.

        if(pipe[i].x==125){
            pipe.push({
                x:cvs.width,
                y:Math.floor(Math.random() * pipeUp.height)-pipeUp.height //Создали случайные координаты выосты труб.
            });
        }

        //Проверяем на столкновение птички с блоками
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // Перезагрузка страницы
            }
            if(pipe[i].x ==5){//Здесь указали что если позиция блока будет по x 5 пикселей тоесть блок точно прошел то добавляем очко.
                score++;
                score_audio.play();
            }
    }
   
    ctx.drawImage(fg, 0, cvs.height-fg.height);// изначально если ставим координаты 0 0 то земля будет сверху. Чтобы сделать снизу вместо координаты y 0 ставим высоту холста - высота земли (картинка fg)
    ctx.drawImage(bird, xPos, yPos); //Это сделали для того чтобы птичка двигалась. Координаты прописали в переменных.
     yPos +=grav;//Прописав это птичка сместилась вниз на 1 чтобы постоянно надо сделать анимацию. Как бы анимационный цикл.

     ctx.fillStyle ="#000";
     ctx.font="24px Verdana";
     ctx.fillText("Счет: "+ score, 10, cvs.height - 20); //Указываем где размещать текст.

     requestAnimationFrame(draw);
}
// Важное примечание по картинкам. Картинки могут помимо координат расположения иметь параметры ширины и высоты. тогда это пишется так ctx.drawImage(bird, 10, 150, 100, 100,) Сначала координаты расположения а потом параметры ширины и высоты
pipeBottom.onload=draw;//Здесь мы указываем что после того как обнаружена последняя картинка выполни функцию draw. Если мы просто напишем draw()то картинки не отрисуются. они как бы отрисубются но вернется пустой холст.
