function load_images(){virus_image = new Image;    virus_image.src = "img/v1.png";    player_img = new Image;   player_img.src = "img/face.png";    vac_img = new Image;    vac_img.src = "img/vac.jpeg";}// Add movement to the birdfunction init(){// DOM Tree traversal to find an element    canvas = document.getElementById("myCanvas");    console.log(canvas);    // Work with canvas    pen = canvas.getContext('2d');    console.log(pen);    score = 0;    game_over= false;// Create a box//JSON Objects    e1 = {        x : 40,        y : 50,        w : 25,        h : 30,        speed : 5,    };    e2 = {        x : 120,        y : 50,        w : 35,        h : 30,        speed : 10,    };    e3 = {        x : 200,        y : 40,        w : 30,        h : 30,        speed : 8,    };    enemy = [e1,e2,e3];    player = {        x : 3,        y : 150/2,        w : 30,        h : 25,        speed : 20,        moving : "false",    }    vac = {        x : 275,        y : 150/2,        w : 20,        h : 25,    }    // create an eventListener    canvas.addEventListener('mousedown', function (){        console.log('you press mouse');        player.moving = true;    });    canvas.addEventListener('mouseup', function (){        console.log('you release mouseup');        player.moving = false;    });}// Game Loopfunction draw(){//clear the old screen (entire area)    pen.clearRect(0, 0, 1200, 500);//draw bird on screen    pen.fillStyle = "red";    // pen.fillRect(bird.x,bird.y,bird.w,bird.h,);    for (let i = 0; i < enemy.length; i++) {        pen.drawImage(virus_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h); //  to show corona image        pen.drawImage(player_img, player.x, player.y, player.w, player.h);        pen.drawImage(vac_img, vac.x, vac.y, vac.w, vac.h);    }    pen.fillStyle = "white";   pen.fillText("Score " +score, 10,10);}function isColliding(b1,b2){    //x,y,w,h    if(Math.abs(b1.x - b2.x)<=30 && Math.abs(b1.y-b2.y)<=30){        return true;    }    return false;}function update(){// player state    if (player.moving === true){        player.x += player.speed;        score += 20    }    //loop check collision btw corona and player    for(let i=0; i<enemy.length; i++){        if(isColliding(enemy[i],player)){            score -= i*100;            if(score<0){                game_over = true;                alert("Game Over");            }        }    }    //collision vac and player    if (isColliding(vac,player)){        game_over = true;        draw();        alert("Your score" +score);        //break the game loop    }    for (let i = 0; i < enemy.length; i++) {        enemy[i].y += enemy[i].speed;        if (enemy[i].y > 150 - enemy[i].h || enemy[i].y < 0) {            enemy[i].speed *= -1;        }    }}function gameLoop(){    if(game_over===true){        clearInterval(f); //it stops the setInterval    } draw(); update();}// start of the gameload_images();init();// repeated call gameLoopvar f = setInterval(gameLoop, 100); // it'll delay the gameLoop and call it with a delay