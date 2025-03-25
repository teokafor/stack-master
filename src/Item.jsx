// For testing purposes only.

export function Item(props) {

    // Mutate class list based on current card state
    let classes = "card-test";
    if(props.isDragging) classes += " dragging" 

    return (
        <div className={classes}>
            {props.value}
        </div>
    );
}