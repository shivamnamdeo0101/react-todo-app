import React from 'react'

function ReactHookComp({item,onSelect}) {

    console.log("Redering Comp...")

  return (
    <div >
        {item}
        <button onClick={()=>onSelect(item)}>Select</button>
    </div>
  )
}

export default React.memo(ReactHookComp)