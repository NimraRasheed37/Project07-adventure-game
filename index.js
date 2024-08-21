import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.black.bgYellow("*****Welcome to Harry Potter Duel game by Nimra Rasheed*****\n"));
// Define the Spell class
class Spell {
    name;
    damage;
    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }
}
// Define the Player class
class Player {
    name;
    health = 100;
    spells;
    constructor(name) {
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
    castSpell(spell, enemy) {
        console.log(`${this.name} casts ${chalk.bold.green(spell.name)}!`);
        enemy.takeDamage(spell.damage);
    }
}
// Define the Enemy class
class Enemy {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    takeDamage(damage) {
        this.health -= damage;
        console.log(`${chalk.bold.red(this.name)} takes ${chalk.bold.yellow(damage)} damage! Remaining health: ${chalk.bold.blue(this.health)}`);
    }
    isDefeated() {
        return this.health <= 0;
    }
}
// Game setup
async function startGame() {
    // Prompt player to enter their name
    const playerData = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Please enter your name:",
    });
    const player = new Player(playerData.name);
    // Prompt player to choose an enemy
    const enemyData = await inquirer.prompt({
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
        const spellData = await inquirer.prompt({
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
            console.log(`----${chalk.bold.red(enemy.name)} has been defeated by ${chalk.green(player.name)}!----`);
            break;
        }
        // Simple enemy attack (you can expand this with more logic)
        console.log(`${enemy.name} attacks!`);
        player.health -= 10;
        console.log(`${chalk.bold.green(player.name)} takes 10 damage! Remaining health: ${chalk.bold.blue(player.health)}`);
        if (player.health <= 0) {
            console.log(`------${chalk.bold.green(player.name)} you are defeated by ${chalk.bold.red(enemy.name)}! Game over------`);
            break;
        }
    }
}
startGame();
