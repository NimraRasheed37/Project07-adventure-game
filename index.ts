import inquirer from "inquirer";
import chalk from "chalk";

// Define the Spell class
class Spell {
  constructor(public name: string, public damage: number) {}
}

// Define the Player class
class Player {
  name: string;
  health: number = 100;
  spells: Spell[];

  constructor(name: string) {
    this.name = name;
    this.spells = [
      new Spell("Expelliarmus", 15),
      new Spell("Stupefy", 10),
      new Spell("Avada Kedavra", 50),
      new Spell("Expecto Patronum", 20),
      new Spell("Crucio", 30),
      new Spell("Protego", 5),
    ];
  }

  castSpell(spell: Spell, enemy: Enemy) {
    console.log(`${this.name} casts ${chalk.bold.green(spell.name)}!`);
    enemy.takeDamage(spell.damage);
  }
}

// Define the Enemy class
class Enemy {
  name: string;
  health: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  takeDamage(damage: number) {
    this.health -= damage;
    console.log(
      `${chalk.bold.red(this.name)} takes ${chalk.bold.yellow(
        damage
      )} damage! Remaining health: ${chalk.bold.blue(this.health)}`
    );
  }

  isDefeated(): boolean {
    return this.health <= 0;
  }
}

// Game setup
async function startGame() {
  // Prompt player to enter their name
  const playerData = await inquirer.prompt<{ name: string }>({
    type: "input",
    name: "name",
    message: "Please enter your name:",
  });

  const player = new Player(playerData.name);

  // Prompt player to choose an enemy
  const enemyData = await inquirer.prompt<{ enemy: string }>({
    type: "list",
    name: "enemy",
    message: "Choose your enemy:",
    choices: ["Voldemort", "Bellatrix", "Dementor", "Warewolf"],
  });

  const enemy = new Enemy(enemyData.enemy);
  console.log(`${chalk.bold.green(player.name)} is battling ${chalk.bold.red(enemy.name)}!`);

  // Game loop
  while (enemy.health > 0 && player.health > 0) {
    // Prompt player to choose a spell
    const spellData = await inquirer.prompt<{ spell: string }>({
      type: "list",
      name: "spell",
      message: "Choose your spell:",
      choices: player.spells.map((spell) => spell.name),
    });

    // Find the selected spell
    const spell = player.spells.find((spell) => spell.name === spellData.spell);
    if (spell) {
      player.castSpell(spell, enemy);
    }

    // Check if enemy is defeated
    if (enemy.isDefeated()) {
      console.log(`----${chalk.bold.red(enemy.name)} has been defeated!----`);
      break;
    }

    // Simple enemy attack (you can expand this with more logic)
    console.log(`${enemy.name} attacks!`);
    player.health -= 10;
    console.log(
      `${chalk.bold.green(
        player.name
      )} takes 10 damage! Remaining health: ${chalk.bold.blue(player.health)}`
    );

    if (player.health <= 0) {
      console.log(
        `------${chalk.bold.green(player.name)} you are defeated by ${chalk.bold.red(enemy.name)}! Game over------`
      );
      break;
    }
  }
}

startGame();
