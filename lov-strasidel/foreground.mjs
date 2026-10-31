// Exact, registration-aligned pieces of the original shop illustration form the foreground.
// Polygons follow the ceiling duct, checkout display, left shelving upright,
// round merchandise table and diagonal foreground clothing rack.
export const FOREGROUND_POLYGONS=[
[[0,18],[33,21.5],[33,24],[0,21]],
[[29,37.8],[40,37.2],[42,42],[30,42.7]],
[[35.8,51],[38.1,51],[37.6,79],[34.4,79]],
[[54,50],[56,49],[60,49.4],[62,48],[66,48.5],[69,49],[73,49.4],[77,50.6],[78,52],[74,54],[64,54.6],[57,54],[53.8,52.8]],
[[82,60],[100,58],[100,100],[68,100],[67,91],[68,82],[72,73],[77,66]]
];
// Peek anchors lie just beyond an object's edge; the foreground hides part of the body.
const shelfX=y=>35.8-(y-51)*.05-.38;
const anchors=[
[[33,37.45],[58,49.1],[shelfX(57),57],[76.5,66],[66,48.25],[shelfX(74),74]],
[[38,37.1],[63,47.95],[shelfX(61),61],[73,71],[74,49.7],[shelfX(77),77]],
[[31,37.55],[69,48.6],[shelfX(65),65],[69.8,78],[55,49.6],[shelfX(72),72]],
[[36,37.2],[72,49],[shelfX(59),59],[67.1,85],[60.5,48.75],[shelfX(76),76]],
[[40,37.05],[65,48.1],[shelfX(63),63],[66.6,91],[76,50.05],[shelfX(70),70]]
];
const slots=[2,5,7,10,12,14];
export function layerLayout(layout){const v=layout.id;return {...layout,regular:layout.regular.map((p,i)=>{const slot=slots.indexOf(i);return slot<0?{...p,behind:false,a:p.a*.84,o:p.o*.92}:{...p,x:anchors[v][slot][0],y:anchors[v][slot][1],behind:true,a:p.a*.9,o:.68}})}}
