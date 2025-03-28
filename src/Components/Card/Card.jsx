export function Card({isDragging, isSelected, type}) {
    // Mutate class list based on current card state
    let classes = "card-base-state";
    if (isDragging) classes += " card-dragging-state";
    if (isSelected) classes += " card-selected-state";

    return (
        <div className={classes}>
            <div className="card-mult-top">{type}</div>
            <div className="card-inner-shape"></div>
            <div className="card-mult-bot">1x</div>
        </div>
    );
}

export function DummyCard() {
    return (
    <div className="dummy-card"></div>
    );
}