export function generateBlackouts(containers) {
    let choiceArr = [];
    while (choiceArr.length <= 7) {
        let choice = Math.floor(Math.random() * containers.length);
        if (!choiceArr.includes(choice)) {
            choiceArr.push(choice);
            containers[choice] = 'grid-droppable-' + choice;
        }
    }

    return containers;
}