document.querySelector(".butten span").onclick = function () {
    let yourName = prompt("Enter Your name");
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "UnKnown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".butten").remove();
}
let trry = document.querySelector(".try span");
trry.innerHTML = 5;
let duration = 1000;
let blockContainer = document.querySelector(".game");
let blocks = Array.from(blockContainer.children);
let counter = [...Array(blocks.length).keys()];


shuffle(counter);


blocks.forEach((block, index) => {
    block.style.order = counter[index];
    block.addEventListener("click", () => {
        flipblock(block);
    })
})

function flipblock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");
    let allFlipedBlocks = blocks.filter(flipedblock => flipedblock.classList.contains("is-flipped"));
    if (allFlipedBlocks.length == 2) {
        // console.log(`two`);
        stopClick();
        checkMatchBlock(allFlipedBlocks[0], allFlipedBlocks[1]);
    }
}

function checkMatchBlock(firstBlock, secondBlock) {
    if (firstBlock.dataset.name == secondBlock.dataset.name) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        document.querySelector("#success").play();
    } else {
        trry.innerHTML = parseInt(trry.innerHTML) - 1;
        console.log(trry);
        if (trry.innerHTML == 0) {
            document.querySelector(".butten-two").style.display = "flex";
            document.querySelector(".txt").style.display = "flex";
            let bt = document.querySelector(".end");
            bt.style.display = "block";
            bt.onclick = () => {
                trry.innerHTML = 5;
                blocks.forEach((block)=>{
                    block.classList.remove("has-match");
                });
                document.querySelector(".butten-two").style.display = "none";
                document.querySelector(".txt").style.display = "none";
                document.querySelector(".end").style.display = "none";
            };
        }
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration)
        document.querySelector("#fail").play();
    }
}


function stopClick() {
    blockContainer.classList.add("stop-clicking");
    setTimeout(() => {
        blockContainer.classList.remove("stop-clicking");
    }, duration)
}

function shuffle(arr) {
    let current = arr.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = arr[current];
        arr[current] = arr[random];
        arr[random] = temp;
    }
    return arr;
}
