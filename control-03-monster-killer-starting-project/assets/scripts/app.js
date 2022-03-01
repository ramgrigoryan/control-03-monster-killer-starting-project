let healChecker = 0;
let bonusLife = true;
defaultSet();
function defaultSet() {
  let userLifeSet = +prompt("Set level for both sides life!");
  if (userLifeSet < 30 || isNaN(userLifeSet) || userLifeSet > 1000) {
    alert("You set invalid value. Default life levels are set.");
    userLifeSet = 100;
  }
  monsterHealthBar.max = userLifeSet;
  monsterHealthBar.value = userLifeSet;
  playerHealthBar.max = userLifeSet;
  playerHealthBar.value = userLifeSet;
  healChecker = 0;
  bonusLife = true;
}
function resetGame() {
  defaultSet();
}
function checkGameOver() {
  if (monsterHealthBar.value == 0 && playerHealthBar.value != 0) {
    alert("Player win!");
    resetGame();
  } else if (monsterHealthBar.value != 0 && playerHealthBar.value == 0) {
    alert("Monster win!");
    resetGame();
  } else if (playerHealthBar.value == 0 && monsterHealthBar.value === 0) {
    alert("Tie.");
    resetGame();
  }
}
function moveMaker(moveType) {
  let playerPower;
  if (moveType === "normal") {
    playerPower = Math.round(Math.random() * 12);
  } else if (moveType === "strong") {
    playerPower = Math.round(Math.random() * 18);
  }
  monsterHealthBar.value -= playerPower;
  monsterAttack();
  checkGameOver();
}
function monsterAttack() {
  const monsterPower = Math.round(Math.random() * 15);
  if (playerHealthBar.value < monsterPower && bonusLife) {
    alert("You'd be dead, but bonus life saves you.Be very careful now");
    //bonusLifeEl.parentElement.removeChild(bonusLifeEl);
    bonusLife = false;
    return;
  }
  playerHealthBar.value -= monsterPower;
}
function attackBtnHandler() {
  moveMaker("normal");
}
function strongAttackBtnHandler() {
  moveMaker("strong");
}
function healBtnHandler() {
  if (healChecker == 1) {
    alert("Fail! You can heal yourself only once.");
    monsterAttack();
    checkGameOver();
    return;
  }
  const healValue = 20;
  if (playerHealthBar.value > 80) {
    alert("You can't heal yourself now!");
  } else {
    playerHealthBar.value += healValue;
    healChecker++;
  }
  monsterAttack();
  checkGameOver();
}
function bonusLogic() {
  playerHealthBar.value;
}
attackBtn.addEventListener("click", attackBtnHandler);
strongAttackBtn.addEventListener("click", strongAttackBtnHandler);
healBtn.addEventListener("click", healBtnHandler);
