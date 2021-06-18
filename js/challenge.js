document.addEventListener("DOMContentLoaded", () => {
   // selectors
    const pauseButton = document.getElementById("pause")
    const minusButton = document.getElementById("minus")
    const plusButton = document.getElementById("plus")
    const likeButton = document.getElementById("heart")
    const likesList = document.getElementsByTagName("ul")[0]
    const commentSubmitButton = document.getElementById("submit")
    const commentList = document.getElementById("list")
    likesObj = {} 

// functions
    // stopwatch
    let seconds = 0;
    let status = "running";
        // setInterval() calls a function at specified intervals in ms
        // 1s = 1000ms -> call stopWatch function ever 1s
        let interval = window.setInterval(stopWatch, 1000); 
    
    function stopWatch(){
        seconds++
        document.getElementById("counter").innerHTML = seconds
    } 
        
    //add comment
    function addComment(event){
        event.preventDefault();
        const commentP = document.createElement("p")
        commentP.innerHTML = document.getElementById("comment-input").value
        commentList.appendChild(commentP)
        document.getElementById("comment-input").value = ""
    }

    // decrement timer
    function decrement() {
        seconds -= 1
    }

    // increment timer
    function increment() {
        seconds += 1
    }

    // like
    function likeCounter(){
        secondsLiked = Object.keys(likesObj)
        if (secondsLiked.indexOf(seconds.toString()) === -1) {
            likesObj[seconds] = 1;
        } else {
            likesObj[seconds] = likesObj[seconds] + 1
        }
    }

    function liked(){
        const newLike = document.createElement("li")
        
        if (likesObj[seconds] === 1) {
            likeMessage = `${seconds} has been liked 1 time`
        } else {
            const lastItem = likesList.children[likesList.children.length - 1]
            lastItem.remove()
            likeMessage = `${seconds} has been liked ${likesObj[seconds]} times`;
        }
        newLike.innerText = likeMessage;
        likesList.appendChild(newLike);
        
    }

    // pause timer
    function pauseTimer(){
        if(status === "stopped") {
            interval = window.setInterval(stopWatch, 1000);
            pauseButton.innerHTML = "pause"
            status = "running"
            commentSubmitButton.disabled = false
            plusButton.disabled = false
            minusButton.disabled = false
            likeButton.disabled = false
        } else {
            window.clearInterval(interval);
            pauseButton.innerHTML = "resume"
            status = "stopped"
            commentSubmitButton.disabled = true
            plusButton.disabled = true
            minusButton.disabled = true
            likeButton.disabled = true
        }
        
    }

// Event Listeners
    //submitting comments
    commentSubmitButton.addEventListener("click", addComment)
    //minus button / decrement timer
    minusButton.addEventListener("click", decrement)
    //plus button / increment timer
    plusButton.addEventListener("click", increment)
    //pause button
    pauseButton.addEventListener("click", pauseTimer)
    //like button
    likeButton.addEventListener("click", likeCounter)
    likeButton.addEventListener("click", liked)
 
  });