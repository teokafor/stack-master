export function ChainManager({score, roundMultiplier, id}) {
    return (
        <div className='chain-manager'>
          {score > 1 ? <div>+{score * roundMultiplier}</div> : null}
          {roundMultiplier > 1 ? <div>(x{roundMultiplier})</div> : null}
        </div>
    );
}