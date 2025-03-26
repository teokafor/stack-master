export function Card(props) {
    // Mutate class list based on current card state
    let classes = "card-base-state";
    if (props.isDragging) classes += " card-dragging-state";
    if (props.isSelected) classes += " card-selected-state";

    return (
        <div className={classes}>
            {props.value}
        </div>
    );
}