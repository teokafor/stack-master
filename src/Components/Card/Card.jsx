export function Card({isDragging, isSelected, type}) {

    // Not sure why null objects are passed first (StrictMode?) 
    // Either way, a more solid workaround should be implemented.
    if (type === null) type = {shape: './gridlines', mult: ''}; 

    // Mutate class list based on current card state
    let classes = "card-base-state";
    if (isDragging) classes += " card-dragging-state";
    if (isSelected) classes += " card-selected-state";

    const style = {backgroundImage: `url(./${type.shape}.svg)` };

    return (
        <div className={classes}>
            <div className="card-mult-top">{type.mult}</div>
            <div className="card-inner-shape" style={style}></div>
            <div className="card-mult-bot">{type.mult}</div>
        </div>
    );
}

export function DummyCard() {
    return (
    <div className="dummy-card"></div>
    );
}