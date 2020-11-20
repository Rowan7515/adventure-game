function Set_up () {
    OLED.init(128, 64)
    OLED.clear()
    // None
    Weapon = 0
    Max_health = 5
    Damage = 1
    Load(10)
}
function Check_for_heal () {
    if (Weapon == 2 && (Spells[0] == "Heal" || Spells[1] == "Heal")) {
        Spell_available = 1
    } else {
        Spell_available = 0
    }
}
// Loading bar
function Load (Speed: number) {
    OLED.clear()
    _ = 0
    for (let index = 0; index < 101; index++) {
        OLED.drawLoading(_)
        _ += 1
        basic.pause(Speed)
    }
    OLED.clear()
}
function Wait_until_AB_prassed () {
    while (!(input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B))) {
        basic.pause(2)
    }
    if (input.buttonIsPressed(Button.A)) {
        A_1_B_2 = 1
    }
    if (input.buttonIsPressed(Button.B)) {
        A_1_B_2 = 2
    }
}
function Choose_class () {
    OLED.writeStringNewLine("What do you want to be?")
    OLED.writeStringNewLine("(A= knight B= wizard)")
    Wait_until_AB_prassed()
    if (A_1_B_2 == 1) {
        // Sword
        Weapon = 1
        OLED.writeStringNewLine("You weapon is a sword")
        OLED.writeStringNewLine("It does " + Damage + " damage")
    } else {
        // Wand
        Weapon = 2
        OLED.writeStringNewLine("What do you want to be you first spell?")
        Spell_options = ["Missile", "Heal"]
        OLED.writeStringNewLine("(A= missile B= Heal")
        Wait_until_AB_prassed()
        if (A_1_B_2 == 1) {
            Spells.push(Spell_options.shift())
        } else {
            Spells.push(Spell_options.pop())
        }
        OLED.writeStringNewLine("What do you want to be you second spell?")
        OLED.clear()
        Spell_options.push("Shield")
        OLED.writeStringNewLine("(A= " + Spell_options[0] + " B= shield")
        Wait_until_AB_prassed()
        if (A_1_B_2 == 1) {
            Spells.push(Spell_options.shift())
        } else {
            Spells.push(Spell_options.pop())
        }
        OLED.writeStringNewLine("Your spells are " + Spells[0] + " and " + Spells[1])
    }
}
function Upgrade_damage_or_health (Amount: number) {
    OLED.writeStringNewLine("(A= damage B= health)")
    Wait_until_AB_prassed()
    if (A_1_B_2 == 1) {
        Damage += 1
        OLED.writeStringNewLine("Your damage is now " + Damage)
    } else {
        Max_health += 1
        OLED.writeStringNewLine("Your max health is now " + Max_health)
    }
}
function Wait_until_A_pressed () {
    OLED.writeStringNewLine("(A to continue)")
    while (!(input.buttonIsPressed(Button.A))) {
        basic.pause(2)
    }
}
function What_spell () {
    OLED.writeStringNewLine("Which spell do you want to use?")
    OLED.writeStringNewLine("(A= " + Spells[0] + " B= " + Spells[1] + ")")
    Wait_until_AB_prassed()
    if (A_1_B_2 == 1) {
        OLED.writeStringNewLine("You use " + Spells[0])
        Used_spell = Spells[0]
    } else {
        OLED.writeStringNewLine("You use " + Spells[1])
        Used_spell = Spells[1]
    }
}
function Check_for_missile () {
    if (Weapon == 2 && (Spells[0] == "Missile" || Spells[1] == "Missile")) {
        Spell_available = 1
    } else {
        Spell_available = 0
    }
}
function Check_for_shield () {
    if (Weapon == 2 && (Spells[0] == "Shield" || Spells[1] == "Shield")) {
        Spell_available = 1
    } else {
        Spell_available = 0
    }
}
let Used_spell = ""
let Spell_options: string[] = []
let _ = 0
let Spells: string[] = []
let Max_health = 0
let Random_number = 0
let Spell_available = 0
let Damage = 0
let Weapon = 0
let A_1_B_2 = 0
Set_up()
OLED.writeStringNewLine("Hello brave adventurer!")
Wait_until_A_pressed()
OLED.writeStringNewLine("You want to go kill the dragon?")
OLED.writeStringNewLine("(A= yes B= no)")
Wait_until_AB_prassed()
if (A_1_B_2 == 2) {
    OLED.clear()
    OLED.writeStringNewLine("Goodbye.")
    control.reset()
} else {
    OLED.writeStringNewLine("Let's go!")
    basic.pause(2000)
    Load(1)
    Choose_class()
    basic.pause(100)
    Wait_until_A_pressed()
    Load(5)
    OLED.writeStringNewLine("You walk into the forest")
    Wait_until_A_pressed()
    OLED.writeStringNewLine("You see a mysterious hooded figure walking towards you")
    Wait_until_A_pressed()
    OLED.clear()
    OLED.writeStringNewLine("Do you attack or talk to them?")
    OLED.writeStringNewLine("(A= attack B= talk")
    Wait_until_AB_prassed()
    if (A_1_B_2 == 1) {
        OLED.writeStringNewLine("You attack him")
        if (Weapon == 1) {
            OLED.writeStringNewLine("You strike him with your sword dealing " + Damage + " damage")
            OLED.writeStringNewLine("He has 4 health")
            OLED.clear()
            OLED.writeStringNewLine("He whips around and attacks")
        } else {
            Check_for_shield()
            if (Spell_available == 1) {
                Spell_available = 0
                OLED.writeStringNewLine("You block the attack")
            } else {
                Random_number = randint(1, 3)
                OLED.writeStringNewLine("He hits, dealing " + Random_number + " damage")
                OLED.writeStringNewLine("You have " + (Max_health - Random_number) + " health")
            }
        }
    } else {
        OLED.writeStringNewLine("You walk up to him and say hello")
        Wait_until_A_pressed()
        OLED12864_I2C.clear()
        OLED.writeStringNewLine("\"Hello\"")
        OLED.clear()
        OLED.writeStringNewLine("\"I can upgrade your damage or you max health\"")
        Upgrade_damage_or_health(1)
    }
}
