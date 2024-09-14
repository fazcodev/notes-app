import React from "react";
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import GridLayout from "react-grid-layout";

const store = (layout)=>{
    console.log(layout)}
const TrialLayout = ()=> {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: '0', x: 0, y: 0, w: 1, h: 2 },
      { i: '1', x: 0, y: 0, w: 3, h: 2, minW: 5, maxW: 4},
      { i: '2', x: 0, y: 0, w: 1, h: 2 }
    ];
    const arr = [1, 2, 3]
    return (
      <GridLayout
        className="layout border border-black"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={800}
        autoSize = {true}
        onLayoutChange = {store}
      >
        {  
            arr.map((ele, idx)=>{
                console.log(layout[idx].i)
                return <div className="border border-black" key={idx}>a</div>;

        })}
        {/* <div className="border border-black" key="a">a</div>
        <div className="border border-black" key="b">b</div>
        <div className="border border-black" key="c">c</div> */}
      </GridLayout>
    );
}


export default TrialLayout