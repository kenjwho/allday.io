export function addNavHeightToWrapper () {
  const navBarHeight = document.getElementById('nav-bar').offsetHeight
  const rappersDelight = document.getElementById('rappers-delight')
  rappersDelight.style.paddingTop = navBarHeight + 'px'
}