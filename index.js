let player1 = document.querySelector(".userOne");
let player2 = document.querySelector(".userTwo");
let player = 1;
let NamePlayerOne = "#UserName";
let NamePlayerTwo = "#UserName";

let player1Game = [];
let player2Game = [];
let Games = [];
const winnerList = [[0,3,6],[0,1,2],[3,4,5],[0,4,8],[6,4,2],[1,4,7],[2,5,8],[6,7,8]];
let control = document.querySelector(".controls");

let X_NamePlay = "close-outline";
let O_NamePlay = "radio-button-off-outline";

let boxs = document.querySelector(".boxs");
let boxArray = Array(boxs.children);

let player1Points = 0;
let player2Points = 0;
let pointplayer1 = document.querySelector(".userOne .boxProfile .points");
let pointplayer2 = document.querySelector(".userTwo .boxProfile .points");
let EndGame = [];

let line = document.querySelector('.lineWiner');

let playGame = true;



/* selectPlayer */
function Selectplay(index)
{
    if (!Games.filter(i=> i == index).length && playGame){
        if (player == 1 ) {
                SelectBox("X",index);
            }
            else if (player == 2){
                SelectBox("O",index);
            }
    }
    if(Games.length == 9)
    {
        control.classList.add("pl");
    }

    
}

function CheckWinner()
{
    for (let bigList = 0; bigList < winnerList.length; bigList++) {
        const listWin = winnerList[bigList];
        let h1 = 0;
        let h2 = 0;
        for (let smallList = 0; smallList < listWin.length; smallList++) {
            const numWin = listWin[smallList];
            if (player1Game.filter(i=> i == numWin).length) {
                h1++;
            }
            else if (player2Game.filter(i=> i == numWin).length)
            {
                h2++;
            }
        }
        if (h1 == 3 || h2 == 3 ) {
            EndGame.push(bigList);
            if (h2 > h1) {
                player2Points++;
            }
            else{
                player1Points++;
            }
            line.classList.add("win"+bigList);
            playGame = false;
            break;
        }
    }
}

function SelectBox(name, numbox) {
    boxArray.forEach(box => {
        if (numbox <= 9 && numbox >= 0) {

            box = box[numbox];
            box.classList.add('ACTBOX');
            Games.push(numbox);

            if (name == "X")
            {

                box.innerHTML = '<ion-icon name="'+X_NamePlay+'" ></ion-icon>' ;
                box.style.borderColor = "tomato";
                player1Game.push(numbox);
                player = 2;
                player1.classList.remove("play");
                player2.classList.add("play");

            }
            else if(name == "O")
            {

                box.innerHTML = '<ion-icon name="'+O_NamePlay+'" ></ion-icon>' ;
                box.style.borderColor = "slategrey";
                player2Game.push(numbox);
                player = 1;
                player2.classList.remove("play");
                player1.classList.add("play");

            }
        }
    });
    
}

function clearBox() {
    boxArray.forEach(boox => {
        for (let index = 0; index < boox.length; index++) {
            boxu = boox[index];
            boxu.style.borderColor = "transparent";
            boxu.innerHTML = "";
            line.classList.remove("win"+EndGame[EndGame.length-1]);
            player1Game = [];
            player2Game = [];
            Games = [];
            if (player1.className == "userOne play") {
                player = 2;
                player1.classList.remove("play");
                player2.classList.add("play");
            }
            else{
                player = 1;
                player2.classList.remove("play");
                player1.classList.add("play");
            }
        }
    });
}

control.addEventListener('click',()=>{
    control.classList.remove('pl');
    clearBox()
    playGame = true;

})

for (let index = 0; index < boxs.children.length; index++) {
    const box = boxs.children[index];
    box.addEventListener('click',()=>{
        Selectplay(index)
        CheckWinner()
        
        pointplayer1.innerHTML = player1Points;
        pointplayer2.innerHTML = player2Points;
        player1.children[0].children[2].innerHTML = NamePlayerOne;
        player2.children[0].children[2].innerHTML = NamePlayerTwo;
        
    })
    player1.children[0].children[2].innerHTML = NamePlayerOne;
    player2.children[0].children[2].innerHTML = NamePlayerTwo;
    pointplayer1.innerHTML = player1Points;
    pointplayer2.innerHTML = player2Points;
}


/*\ 
 *
 *
\*/



function ChangeName(player,PN){
    let BoxName = player.children[0].children[2];
    let EditName = player.children[0].children[3];
    let input = '<input type="text" name="Name" id="Name" ></input>';


    EditName.addEventListener("click",()=>{
        EditName.style.display = 'none';
        BoxName.classList.add('Edit')
        BoxName.innerHTML = input;
        BoxName.children[0].addEventListener("keypress",function (e){
            if (e.key === 'Enter') {
                if(PN == 1){
                    NamePlayerOne = BoxName.children[0].value;
                }
                else{
                    NamePlayerTwo = BoxName.children[0].value;
                }
                EditName.style.display = 'flex';
                BoxName.classList.remove('Edit')
                BoxName.innerHTML = "";
                player1.children[0].children[2].innerHTML = NamePlayerOne;
                player2.children[0].children[2].innerHTML = NamePlayerTwo;
            }
        })
    })


}


function ChangeImgProfile(img, imgNum) {
    if (imgNum <= 6)
    {
        img.children[0].children[0].children[0].src = imgNum+".png";
    }
}

let BoxImgSelect = document.querySelector(".choseImg");

function ChangeImg(player,PN) {
    var EditImg = player.children[0].children[1];
    var Img = player.children[0].children[0];

    EditImg.addEventListener("click",()=>{
        BoxImgSelect.style.transform = "scale(1)";

        if (PN === 1) {
            BoxImgSelect.classList.add("Player1");
            BoxImgSelect.classList.remove("Player2");
        }
        if (PN === 2) {
            BoxImgSelect.classList.add("Player2");
            BoxImgSelect.classList.remove("Player1");
        }
    })
    for (let index = 0; index < BoxImgSelect.children.length; index++) {
        const SmallBoxImg = BoxImgSelect.children[index];
        SmallBoxImg.addEventListener("click",()=>{
            if (BoxImgSelect.classList.length == 2) {

                if (BoxImgSelect.classList[1] == "Player1") {
                    ChangeImgProfile(player1, index+1);
                }
                if(BoxImgSelect.classList[1] == "Player2")
                {
                    ChangeImgProfile(player2, index+1)
                }
                
            }
        })
    }

}

ChangeName(player1 ,1)
ChangeImg(player1 ,1)

ChangeName(player2 ,2)
ChangeImg(player2 ,2)




document.querySelector(".ALlBox").addEventListener("click",()=>{
    BoxImgSelect.classList.remove("Player1");
    BoxImgSelect.classList.remove("Player2");
    BoxImgSelect.style.transform = "scale(0)";
})
