export function ChainManager({score, roundMultiplier, id}) {
    return (
        <div className='chain-manager'>
          {roundMultiplier > 1 ? <div>x{roundMultiplier}</div> : null}
          {score > 1 ? <div>+{score * roundMultiplier}</div> : null}
        </div>
    );
}