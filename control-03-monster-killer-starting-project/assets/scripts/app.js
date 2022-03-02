const PLAYER_ATTACK = "PLAYER_ATTACK";
const PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const MONSTER_ATTACK = "MONSTER_ATTACK";
const PLAYER_HEAL = "PLAYER_HEAL";
const GAME_OVER = "GAME_OVER";

let healChecker = 0;
let bonusLife = true;
let logEntries = [];

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
    logLogic(
      GAME_OVER,
      "Player win",
      playerHealthBar.value,
      monsterHealthBar.value
    );
    resetGame();
  } else if (monsterHealthBar.value != 0 && playerHealthBar.value == 0) {
    logLogic(
      GAME_OVER,
      "Monster win",
      playerHealthBar.value,
      monsterHealthBar.value
    );
    alert("Monster win!");
    resetGame();
  } else if (playerHealthBar.value == 0 && monsterHealthBar.value === 0) {
    alert("Tie.");
    logLogic(
      GAME_OVER,
      "A DRAW",
      playerHealthBar.value,
      monsterHealthBar.value
    );
    resetGame();
  }
}
function moveMaker(moveType) {
  let playerPower;
  let attackmode;
  if (moveType === "normal") {
    playerPower = Math.round(Math.random() * 12);
    attackmode = PLAYER_ATTACK;
  } else if (moveType === "strong") {
    playerPower = Math.round(Math.random() * 18);
    attackmode = PLAYER_STRONG_ATTACK;
  }
  monsterHealthBar.value -= playerPower;
  logLogic(
    attackmode,
    playerPower,
    playerHealthBar.value,
    monsterHealthBar.value
  );
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
  logLogic(
    MONSTER_ATTACK,
    monsterPower,
    playerHealthBar.value,
    monsterHealthBar.value
  );
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
    logLogic(
      PLAYER_HEAL,
      healValue,
      playerHealthBar.value,
      monsterHealthBar.value
    );
    healChecker++;
  }
  monsterAttack();
  checkGameOver();
}
function bonusLogic() {
  playerHealthBar.value;
}
function logLogic(event, value, playerHealth, monsterHealth) {
  let moveCount;
  if (event === PLAYER_ATTACK || event === PLAYER_STRONG_ATTACK) {
    moveCount = {
      event: event,
      value: value,
      target: "MONSTER",
      playerHealth: playerHealth,
      monsterHealth: monsterHealth,
    };
  } else if (event === MONSTER_ATTACK) {
    moveCount = {
      event: event,
      value: value,
      target: "PLAYER",
      playerHealth: playerHealth,
      monsterHealth: monsterHealth,
    };
  } else if (event === PLAYER_HEAL || event === GAME_OVER) {
    moveCount = {
      event: event,
      value: value,
      playerHealth: playerHealth,
      monsterHealth: monsterHealth,
    };
  }
  logEntries.push(moveCount);
}
function logBtnHandler() {
  for (let i = 0; i < logEntries.length; i++) console.log(logEntries[i]);
}
attackBtn.addEventListener("click", attackBtnHandler);
strongAttackBtn.addEventListener("click", strongAttackBtnHandler);
healBtn.addEventListener("click", healBtnHandler);
logBtn.addEventListener("click", logBtnHandler);
