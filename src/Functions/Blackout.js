export function generateBlackouts(containers) {
    let choiceArr = [];
    while (choiceArr.length <= 5) {
        let choice = Math.floor(Math.random() * containers.length);
        if (!choiceArr.includes(choice)) {
            choiceArr.push(choice);
            containers[choice] = 'grid-blackout-droppable-' + choice;
        }
    }
    return containers;
}