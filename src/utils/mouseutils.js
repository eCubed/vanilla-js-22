export const isRMBClicked = (e) => {
  e = e || window.event;

  if ("which" in e) {
    console.log(`Right clicked!!!! browser has e.button ${e.which}`)
  }

  if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      return e.which === 3; 
  else if ("button" in e)  // IE, Opera 
      return e.button === 2; 
}