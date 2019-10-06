var currentWord = null;
var leftWord = null;
var currentState = null;

function animate(){
  if (frameCount%60==0){
    if (leftWord!=null){
      //make the next move
      currentState = currentState.getNextState(leftWord.charAt(0));
      if (currentState==null){
        leftWord = null;
        console.log(currentWord+" is NOT in the given Language!");
        currentWord = null;
        return;
      }
      leftWord = leftWord.substring(1, leftWord.length);
      if (leftWord.length==0){
        leftWord=null;
        if (currentState.isFinit()){
          console.log(currentWord+" is in the given Language!");
        }else{
          console.log(currentWord+" is NOT in the given Language!");
        }
        currentWord=null;
      }
    }
  }
}

function startAnimation(){
  frameCount=0;
  currentWord = inCheckWord.value();
  leftWord = currentWord;
  if (automata.getqs().length>0){
    currentState = automata.getqs()[0];
    if (leftWord==""){
      leftWord=null;
      if (currentState.isFinit()){
        console.log(currentWord+" is in the given Language!");
      }else{
        console.log(currentWord+" is NOT in the given Language!");
      }
      currentWord=null;
    }
  }
}
